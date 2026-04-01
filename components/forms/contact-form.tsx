"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type ContactFormInput, contactFormSchema } from "@/lib/validators/contact";
import type { ContactApiResponse } from "@/types/contact";

type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const [toast, setToast] = useState<FormState | null>(null);

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
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

  const onSubmit = form.handleSubmit(async (values) => {
    setFormState({ status: "idle" });
    setToast(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          : "Message sent successfully.";

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
    <>
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">
              Name
            </label>
            <Input id="name" placeholder="Pratik Vaibhav" {...form.register("name")} />
            {form.formState.errors.name ? (
              <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email ? (
              <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="organization" className="text-sm font-medium text-slate-700">
              Organization
            </label>
            <Input id="organization" placeholder="Optional" {...form.register("organization")} />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-slate-700">
              Subject
            </label>
            <Input
              id="subject"
              placeholder="How can we work together?"
              {...form.register("subject")}
            />
            {form.formState.errors.subject ? (
              <p className="text-sm text-red-600">{form.formState.errors.subject.message}</p>
            ) : null}
          </div>
        </div>

        <div className="hidden" aria-hidden="true">
          <Input
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            {...form.register("company")}
          />
          <Input tabIndex={-1} autoComplete="off" {...form.register("nickname")} />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-slate-700">
            Message
          </label>
          <Textarea
            id="message"
            maxLength={2000}
            placeholder="Tell me what you are building, testing, or hiring for."
            {...form.register("message")}
          />
          {form.formState.errors.message ? (
            <p className="text-sm text-red-600">{form.formState.errors.message.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send message
              </>
            )}
          </Button>

          {formState.message ? (
            <p
              className={
                formState.status === "success"
                  ? "text-sm text-violet-700"
                  : "text-sm text-red-600"
              }
            >
              {formState.message}
            </p>
          ) : null}
        </div>

        <p className="text-xs leading-5 text-slate-500">
          This endpoint is rate-limited, validated, and sanitized.
        </p>
      </form>

      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-5 right-5 z-[60] max-w-sm rounded-2xl border px-4 py-3 text-sm shadow-lg ${
            toast.status === "success"
              ? "border-violet-200 bg-white text-slate-900"
              : "border-red-200 bg-white text-red-700"
          }`}
        >
          {toast.message}
        </div>
      ) : null}
    </>
  );
}
