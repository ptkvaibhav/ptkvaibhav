"use client";

import Link from "next/link";
import { useEffect } from "react";


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
      <div className="container flex min-h-[60vh] items-center justify-center">
        <div className="paper w-full max-w-xl px-6 py-10 text-center sm:px-10">
          <span className="stamp px-4 py-2 text-4xl">Incident</span>
          <h1 className="mt-8 font-display text-5xl font-black uppercase leading-none text-foreground">Something broke</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Ironic, given the line of work. Try again, or head back to the main file.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={reset}
              className="inline-flex h-12 items-center rounded-md border-2 border-foreground bg-foreground px-6 font-mono text-sm font-semibold text-paper"
            >
              Try again
            </button>
            <Link href="/" className="inline-flex h-12 items-center rounded-md border-2 border-foreground px-6 font-mono text-sm font-semibold text-foreground">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
