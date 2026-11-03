"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactSchema, type ContactFormValues, type ContactInput } from "@/lib/validation";
import type { ContactApiResponse } from "@/types/contact";

type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const [toast, setToast] = useState<FormState | null>(null);

  const form = useForm<ContactFormValues, unknown, ContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      organization: "",
      subject: "",
      message: "",
      nickname: "",
    },
  });

  useEffect(() => {
    if (!toast || toast.status === "idle") {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function getCookieValue(name: string) {
    const cookies = document.cookie.split("; ");
    const target = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    return target ? decodeURIComponent(target.split("=").slice(1).join("=")) : "";
  }

  const onSubmit = form.handleSubmit(async (values) => {
    setFormState({ status: "idle" });
    setToast(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": getCookieValue("csrf-token"),
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as ContactApiResponse;

      if (!response.ok || ("error" in payload && payload.error)) {
        const message =
          "error" in payload && payload.error
            ? payload.error
            : "Unable to send message right now. Please try again later.";
        setFormState({ status: "error", message });
        setToast({ status: "error", message });
        return;
      }
      const message =
        "message" in payload && payload.message
          ? payload.message
          : "Message delivered securely. Thank you for reaching out!";

      form.reset();
      setFormState({ status: "success", message });
      setToast({ status: "success", message });
    } catch {
      const message = "Unable to send message right now. Please try again later.";
      setFormState({ status: "error", message });
      setToast({ status: "error", message });
    }
  });

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="name" className="field-label">
              Name
            </label>
            <Input
              id="name"
              placeholder="e.g. Alex Rivera"
              
              {...form.register("name")}
            />
            {form.formState.errors.name ? (
              <p className="font-mono text-xs text-stamp">{form.formState.errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="alex@company.com"
              
              {...form.register("email")}
            />
            {form.formState.errors.email ? (
              <p className="font-mono text-xs text-stamp">{form.formState.errors.email.message}</p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="organization" className="field-label">
              Organization <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <Input
              id="organization"
              placeholder="Company / Team name"
              
              {...form.register("organization")}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="subject" className="field-label">
              Subject
            </label>
            <Input
              id="subject"
              placeholder="AppSec Lead Role / Pentest Inquiry"
              
              {...form.register("subject")}
            />
            {form.formState.errors.subject ? (
              <p className="font-mono text-xs text-stamp">{form.formState.errors.subject.message}</p>
            ) : null}
          </div>
        </div>

        {/* Honeypot anti-spam */}
        <div className="hidden" aria-hidden="true">
          <Input tabIndex={-1} autoComplete="off" aria-hidden="true" {...form.register("company")} />
          <Input tabIndex={-1} autoComplete="off" {...form.register("nickname")} />
        </div>

        <div className="space-y-1">
          <label htmlFor="message" className="field-label">
            Message
          </label>
          <Textarea
            id="message"
            maxLength={2000}
            rows={4}
            placeholder="Describe your security challenge, project scope, or open role requirements..."
            className="resize-none"
            {...form.register("message")}
          />
          {form.formState.errors.message ? (
            <p className="font-mono text-xs text-stamp">{form.formState.errors.message.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            data-cursor="Stamp & send"
            className="h-14 w-full -rotate-1 rounded-md border-[3px] border-stamp bg-transparent px-8 font-stencil text-2xl font-black uppercase tracking-[0.12em] text-stamp hover:rotate-0 hover:bg-stamp hover:text-paper sm:w-auto"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Stamp &amp; send
              </>
            )}
          </Button>

          {formState.message ? (
            <p
              className={
                formState.status === "success"
                  ? "font-mono text-xs font-semibold text-blueink"
                  : "font-mono text-xs font-semibold text-stamp"
              }
            >
              {formState.message}
            </p>
          ) : (
            <p className="font-mono text-[11px] text-muted-foreground">
              Rate-limited and sanitised server-side.
            </p>
          )}
        </div>
      </form>

      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className="paper fixed inset-x-4 bottom-4 z-[80] animate-toast-in px-5 py-4 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-sm"
        >
          <p className="font-stencil text-xl font-black uppercase tracking-wider text-stamp">
            {toast.status === "success" ? "Request filed" : "Returned to sender"}
          </p>
          <p className="mt-1 font-mono text-xs leading-relaxed text-foreground">{toast.message}</p>
        </div>
      ) : null}
    </div>
  );
}
