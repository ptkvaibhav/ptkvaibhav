import "server-only";

import { Resend } from "resend";

import { siteConfig } from "@/lib/site";
import type { ContactInput } from "@/lib/validation";

type ContactEmailPayload = Pick<
  ContactInput,
  "name" | "email" | "organization" | "subject" | "message"
> & {
  identifier: string;
};

let resendClient: Resend | null = null;

function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }

  resendClient ??= new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

/**
 * HTML-escape user input before interpolating it into the email body. Escaping (rather
 * than tag-stripping) keeps the sender's text intact and can't be bypassed by parser
 * differentials, since nothing user-supplied is ever interpreted as markup.
 */
function sanitizeForEmail(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function hasResendConfig() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendContactEmail(input: ContactEmailPayload) {
  const resend = getResendClient();

  if (!resend) {
    throw new Error("Resend is not configured.");
  }

  const safeName = sanitizeForEmail(input.name);
  const safeEmail = sanitizeForEmail(input.email);
  const safeOrganization = input.organization
    ? sanitizeForEmail(input.organization)
    : null;
  const safeSubject = sanitizeForEmail(input.subject || "New Message");
  const safeMessage = sanitizeForEmail(input.message).replace(/\n/g, "<br />");
  const safeIdentifier = sanitizeForEmail(input.identifier);

  return resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: [siteConfig.email],
    // Plain-text header: use the raw (already control-character-free) subject, not HTML entities.
    subject: `Portfolio Contact: ${input.subject || "New Message"}`,
    html: `
      <h3>New Message</h3>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      ${safeOrganization ? `<p><strong>Organization:</strong> ${safeOrganization}</p>` : ""}
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <p>${safeMessage}</p>
      <p><strong>IP:</strong> ${safeIdentifier}</p>
    `,
    replyTo: input.email,
  });
}
