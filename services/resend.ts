import "server-only";

import DOMPurify from "isomorphic-dompurify";
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

function sanitizeForEmail(value: string) {
  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
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
    subject: `Portfolio Contact: ${safeSubject}`,
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
