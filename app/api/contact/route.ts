import { NextRequest, NextResponse } from "next/server";

import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site";
import { ContactSchema } from "@/lib/validation";
import { hasResendConfig, sendContactEmail } from "@/services/resend";

export const runtime = "nodejs";

function buildHeaders(limit: number, remaining: number, resetAt: number) {
  return {
    "Cache-Control": "no-store",
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
  };
}

const MAX_BODY_BYTES = 16 * 1024;

/**
 * Client IP for rate limiting. Prefer headers set by the Vercel edge, which a client
 * cannot forge. Only fall back to the *last* X-Forwarded-For hop (appended by the
 * nearest proxy); the first hop is client-controlled and would let an attacker rotate
 * fake IPs to bypass the rate limit.
 */
function getClientIdentifier(request: NextRequest) {
  const vercelIp = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  if (vercelIp) return vercelIp;

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const hops = request.headers.get("x-forwarded-for")?.split(",").map((hop) => hop.trim()).filter(Boolean);
  return hops?.at(-1) || "unknown";
}

function readCompanyHoneypot(payload: unknown) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return "";
  }

  const company = Reflect.get(payload, "company");
  return typeof company === "string" ? company.trim() : "";
}

function getAllowedOrigins() {
  const origins = new Set([new URL(siteConfig.url).origin]);
  // Vercel preview deployments
  if (process.env.VERCEL_URL) origins.add(`https://${process.env.VERCEL_URL}`);
  // Local development only; never trust localhost origins in production
  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }
  return origins;
}

function hasAllowedOrigin(request: NextRequest) {
  const allowedOrigins = getAllowedOrigins();
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (origin && allowedOrigins.has(origin)) {
    return true;
  }

  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      return allowedOrigins.has(refererOrigin);
    } catch {
      return false;
    }
  }

  return false;
}

function hasValidCsrfToken(request: NextRequest) {
  const headerToken = request.headers.get("x-csrf-token");
  const cookieToken = request.cookies.get("csrf-token")?.value;
  return Boolean(headerToken && cookieToken && headerToken === cookieToken);
}

export async function POST(request: NextRequest) {
  const identifier = getClientIdentifier(request);
  const rateLimitResult = await rateLimit(identifier);
  const headers = buildHeaders(
    rateLimitResult.limit,
    rateLimitResult.remaining,
    rateLimitResult.resetAt
  );

  if (!rateLimitResult.configured) {
    return NextResponse.json(
      { error: "Contact abuse protection is not configured yet." },
      { status: 503, headers }
    );
  }

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers }
    );
  }

  if (!hasAllowedOrigin(request) || !hasValidCsrfToken(request)) {
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403, headers }
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413, headers });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "Unsupported content type." }, { status: 415, headers });
  }

  let payload: unknown;

  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request too large." }, { status: 413, headers });
    }
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400, headers });
  }

  if (readCompanyHoneypot(payload)) {
    return NextResponse.json({ ok: true }, { status: 200, headers });
  }

  const parsed = ContactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide valid contact details and a complete message." },
      { status: 400, headers }
    );
  }

  if (parsed.data.nickname) {
    return NextResponse.json(
      { success: true, message: "Message received. I will get back to you soon." },
      { status: 200, headers }
    );
  }

  if (!hasResendConfig()) {
    return NextResponse.json(
      { error: "Contact service is not configured yet." },
      { status: 503, headers }
    );
  }

  try {
    const { error } = await sendContactEmail({
      ...parsed.data,
      identifier,
    });

    if (error) {
      console.error("Contact API error", {
        error,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: "Unable to send message right now. Please try again later." },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully." },
      { status: 201, headers }
    );
  } catch (error) {
    console.error("Contact API error", {
      error: error instanceof Error ? error.message : error,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { error: "Unable to send message right now. Please try again later." },
      { status: 500, headers }
    );
  }
}
