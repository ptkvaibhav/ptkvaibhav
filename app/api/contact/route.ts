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

function getClientIdentifier(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return realIp || "unknown";
}

function readCompanyHoneypot(payload: unknown) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return "";
  }

  const company = Reflect.get(payload, "company");
  return typeof company === "string" ? company.trim() : "";
}

function getAllowedOrigins() {
  const configuredOrigin = new URL(siteConfig.url).origin;
  return new Set([configuredOrigin, "http://localhost:3000", "http://127.0.0.1:3000"]);
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

  let payload: unknown;

  try {
    payload = await request.json();
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
