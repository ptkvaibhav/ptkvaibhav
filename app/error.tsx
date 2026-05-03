"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="section">
      <div className="container flex min-h-[70vh] flex-col items-start justify-center gap-6">
        <span className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-800">
          Error
        </span>
        <div className="text-container space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
            Something went wrong.
          </h1>
          <p className="text-base text-slate-600 md:text-lg">
            The page hit an unexpected error. You can try again, or head back to the homepage.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={reset}>Try again</Button>
          <Button asChild variant="secondary">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
