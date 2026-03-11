import { z } from "zod";

function sanitizeInlineText(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();
}

function sanitizeMultilineText(value: string) {
  return value
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const nameSchema = z
  .string()
  .transform(sanitizeInlineText)
  .pipe(z.string().min(2, "Name must be at least 2 characters.").max(120));

const emailSchema = z
  .string()
  .transform((value) => sanitizeInlineText(value).toLowerCase())
  .pipe(z.string().email("Please enter a valid email address.").max(160));

const optionalInlineText = (maxLength: number) =>
  z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((value) => sanitizeInlineText(value ?? ""))
    .pipe(z.string().max(maxLength));

const subjectSchema = optionalInlineText(160).refine(
  (value) => value.length === 0 || value.length >= 4,
  "Subject must be at least 4 characters when provided."
);

const messageSchema = z
  .string()
  .transform(sanitizeMultilineText)
  .pipe(
    z
      .string()
      .min(24, "Message must be at least 24 characters.")
      .max(2000, "Message must be 2000 characters or fewer.")
  );

const honeypotSchema = z
  .string()
  .optional()
  .or(z.literal(""))
  .transform((value) => sanitizeInlineText(value ?? ""))
  .pipe(z.string().max(0));

export const contactFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    company: optionalInlineText(160),
    organization: optionalInlineText(160),
    subject: subjectSchema,
    message: messageSchema,
    nickname: honeypotSchema,
  })
  .strict();

export type ContactFormInput = z.infer<typeof contactFormSchema>;
