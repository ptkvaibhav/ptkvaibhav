import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-start justify-center gap-6 py-24">
      <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-emerald-300">
        404
      </span>
      <div className="max-w-2xl space-y-4">
        <h1 className="font-serif text-5xl tracking-tight text-white md:text-6xl">
          This route does not exist.
        </h1>
        <p className="max-w-xl text-base text-zinc-400 md:text-lg">
          The page may have moved, or it was never meant to be public. Head back to the
          homepage and start from there.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </section>
  );
}

