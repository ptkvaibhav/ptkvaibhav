import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container flex min-h-[70vh] flex-col items-start justify-center gap-6">
        <span className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-800">
          404
        </span>
        <div className="text-container space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
            This route does not exist.
          </h1>
          <p className="text-base text-slate-600 md:text-lg">
            The page may have moved, or it was never meant to be public. Head back to the
            homepage and start from there.
          </p>
        </div>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </section>
  );
}
