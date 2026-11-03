import Link from "next/link";

import { Stamp } from "@/components/dossier/stamp";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container flex min-h-[60vh] items-center justify-center">
        <div className="paper relative w-full max-w-xl px-6 py-10 text-center sm:px-10">
          <Stamp rotate={-10} className="px-4 py-2 text-4xl">File not found</Stamp>
          <h1 className="mt-8 font-display text-5xl font-black uppercase leading-none text-foreground">Error 404</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            This page was either shredded, moved, or never existed. No cover-up, promise.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center rounded-md border-2 border-foreground bg-foreground px-6 font-mono text-sm font-semibold text-paper shadow-[4px_4px_0_0_hsl(var(--stamp))]"
          >
            Back to the main file
          </Link>
        </div>
      </div>
    </section>
  );
}
