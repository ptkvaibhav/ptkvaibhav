"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-serif text-2xl tracking-tight text-white"
            onClick={closeMenu}
          >
            {siteConfig.name}
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-200 transition hover:bg-white/[0.08] md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav className="hidden md:flex flex-wrap items-center gap-2 text-sm text-zinc-400">
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

        <div className="hidden md:flex items-center gap-2">
          <Button asChild size="sm" variant="ghost">
            <Link href={siteConfig.social.github} target="_blank" rel="noreferrer">
              GitHub
            </Link>
          </Button>
          <Button asChild size="sm" variant="secondary">
            <Link href="/contact">Let&apos;s talk</Link>
          </Button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isMenuOpen ? "max-h-[24rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-glow">
            <nav className="flex flex-col gap-2 text-sm text-zinc-300">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 transition hover:bg-white/5 hover:text-white"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <Button asChild size="sm" variant="ghost">
                <Link
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                >
                  GitHub
                </Link>
              </Button>
              <Button asChild size="sm" variant="secondary">
                <Link href="/contact" onClick={closeMenu}>
                  Let&apos;s talk
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
