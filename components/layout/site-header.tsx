import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="font-serif text-2xl tracking-tight text-white">
            {siteConfig.name}
          </Link>
        </div>

        <nav className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="ghost">
            <Link href={siteConfig.social.github} target="_blank" rel="noreferrer">
              GitHub
            </Link>
          </Button>
          <Button asChild size="sm" variant="secondary">
            <Link href="/contact">Let&apos;s talk</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

