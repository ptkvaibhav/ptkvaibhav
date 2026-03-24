"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { sendMonitoringAlert } from "@/lib/monitoring";

type ResumePreviewProps = {
  src: string;
};

export function ResumePreview({ src }: ResumePreviewProps) {
  const [hasPreviewError, setHasPreviewError] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function verifyResume() {
      try {
        const response = await fetch(src, {
          method: "HEAD",
          cache: "no-store",
        });

        if (!response.ok && isActive) {
          setHasPreviewError(true);
          await sendMonitoringAlert({
            page: "/contact",
            errorType: "pdf_head_request_failed",
            timestamp: new Date().toISOString(),
          });
        }
      } catch {
        if (!isActive) {
          return;
        }

        setHasPreviewError(true);
        await sendMonitoringAlert({
          page: "/contact",
          errorType: "pdf_request_error",
          timestamp: new Date().toISOString(),
        });
      }
    }

    void verifyResume();

    return () => {
      isActive = false;
    };
  }, [src]);

  async function handlePreviewError() {
    setHasPreviewError(true);
    await sendMonitoringAlert({
      page: "/contact",
      errorType: "pdf_preview_unavailable",
      timestamp: new Date().toISOString(),
    });
  }

  return (
    <div className="space-y-4">
      <object
        data={src}
        type="application/pdf"
        className="h-[800px] w-full rounded-xl border border-white/10 bg-white/[0.03]"
        aria-label="Resume"
        onError={() => {
          void handlePreviewError();
        }}
      >
        <p className="p-6 text-sm leading-7 text-zinc-300">
          PDF preview unavailable.{" "}
          <Link href={src} className="text-emerald-400 underline" target="_blank" rel="noreferrer">
            Download instead.
          </Link>
        </p>
      </object>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm ${hasPreviewError ? "text-amber-300" : "text-zinc-500"}`}>
          {hasPreviewError
            ? "Preview failed to load in this browser. A monitoring alert was sent."
            : "If your browser blocks inline PDF previews, open the file directly instead."}
        </p>
        <Button asChild variant="secondary">
          <Link href={src} target="_blank" rel="noreferrer">
            Download PDF
            <Download className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
