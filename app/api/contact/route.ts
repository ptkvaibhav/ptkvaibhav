import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site";
import { contactFormSchema } from "@/lib/validators/contact";

export const runtime = "nodejs";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
      { success: true, message: "Message received. I will get back to you soon." },
      { status: 200, headers }
    );
  }

  if (!resend) {
    return NextResponse.json(
      { error: "Contact service is not configured yet." },
      { status: 503, headers }
    );
  }

  try {
    const subject = parsed.data.subject || "New Message";
    const organization = parsed.data.organization ? escapeHtml(parsed.data.organization) : null;
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [siteConfig.email],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h3>New Message</h3>
        <p><strong>Name:</strong> ${escapeHtml(parsed.data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(parsed.data.email)}</p>
        ${
          organization
            ? `<p><strong>Organization:</strong> ${organization}</p>`
            : ""
        }
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p>${escapeHtml(parsed.data.message).replace(/\n/g, "<br />")}</p>
        <p><strong>IP:</strong> ${escapeHtml(identifier)}</p>
      `,
      replyTo: parsed.data.email,
    });

    if (error) {
      return NextResponse.json(
        { error: "Unable to send message right now. Please try again later." },
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully." },
      { status: 201, headers }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to send message right now. Please try again later." },
      { status: 500, headers }
    );
  }
}
