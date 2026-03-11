import { NextRequest, NextResponse } from "next/server";

import { rateLimit } from "@/lib/rate-limit";
import { hasSupabaseAdminConfig, supabaseAdmin } from "@/lib/supabase";
import { contactFormSchema } from "@/lib/validators/contact";
import type { ContactMessage } from "@/types/contact";

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

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400, headers });
  }

  if (readCompanyHoneypot(payload)) {
    return NextResponse.json({ ok: true }, { status: 200, headers });
  }

  const parsed = contactFormSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide valid contact details and a complete message." },
      { status: 400, headers }
    );
  }

  if (parsed.data.nickname) {
    return NextResponse.json(
      { message: "Message received. I will get back to you soon." },
      { status: 200, headers }
    );
  }

  if (!hasSupabaseAdminConfig() || !supabaseAdmin) {
    return NextResponse.json(
      { error: "Contact service is not configured yet." },
      { status: 503, headers }
    );
  }

  try {
    const userAgent = request.headers.get("user-agent");
    const messageRecord: ContactMessage = {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      company: parsed.data.organization || null,
      subject: parsed.data.subject || null,
      ipAddress: identifier,
      userAgent: userAgent ? userAgent.slice(0, 512) : null,
    };

    const { error } = await supabaseAdmin.from("messages").insert({
      name: messageRecord.name,
      email: messageRecord.email,
      company: messageRecord.company,
      subject: messageRecord.subject,
      message: messageRecord.message,
      ip_address: messageRecord.ipAddress,
      user_agent: messageRecord.userAgent,
    });

    if (error) {
      return NextResponse.json(
        { error: "Unable to send message right now. Please try again later." },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      { message: "Message received. I will get back to you soon." },
      { status: 201, headers }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to send message right now. Please try again later." },
      { status: 500, headers }
    );
  }
}
