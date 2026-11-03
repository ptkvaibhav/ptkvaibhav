"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Moon, Sun, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";

import { useTheme } from "@/components/providers/theme-provider";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";

const iconButton =
  "inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { resolvedTheme, toggleTheme } = useTheme();

  const sectionIds = useMemo(() => siteConfig.nav.map((item) => item.href.replace("#", "")), []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const openCommandPalette = () => window.dispatchEvent(new CustomEvent("open-command-palette"));
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Background on its own layer so the fixed mobile menu isn't trapped by backdrop-filter. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 border-b-2 border-foreground",
          isMenuOpen ? "bg-paper" : "bg-background/90 backdrop-blur-md"
        )}
      />
      <div className="container flex h-16 items-end justify-between gap-4">
        <Link
          href="#about"
          onClick={closeMenu}
          className="mb-3 flex items-center gap-3"
          aria-label="Pratik Vaibhav — back to top"
          data-cursor="Top"
        >
          <span className="stamp !border-2 !px-1.5 !py-1 text-lg" style={{ ["--stamp-rot" as string]: "-6deg" }}>
            PV
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-extrabold uppercase tracking-wide text-foreground">
              Pratik Vaibhav
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
              File no. PV-2019-SEC
            </span>
          </span>
        </Link>

        {/* Desktop nav: folder tabs sitting on the header rule */}
        <nav aria-label="Primary" className="hidden items-end gap-1 lg:flex">
          {siteConfig.nav.map((item, i) => {
            const isActive = item.href === `#${activeSection}`;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative -mb-[2px] rounded-t-md border-2 px-4 pb-2 pt-1.5 font-mono text-[13px] font-medium transition-all",
                  isActive
                    ? "border-foreground border-b-paper bg-paper pt-2.5 text-foreground"
                    : "border-transparent text-muted-foreground hover:-translate-y-0.5 hover:border-foreground/40 hover:border-b-transparent hover:bg-manila/60 hover:text-foreground"
                )}
              >
                <span className="mr-1.5 text-[10px] text-muted-foreground">0{i + 1}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mb-3 flex items-center gap-1">
          <button type="button" onClick={openCommandPalette} aria-label="Open command palette (⌘K)" className={cn(iconButton, "md:w-auto md:gap-2 md:px-2.5")}>
            <Search className="h-4 w-4" />
            <kbd className="hidden rounded-sm border border-foreground/30 px-1 font-mono text-[10px] md:inline">⌘K</kbd>
          </button>
          <button type="button" onClick={toggleTheme} aria-label="Toggle desk lamp (dark mode)" className={iconButton} data-cursor={resolvedTheme === "dark" ? "Lights on" : "Lights off"}>
            {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden h-10 items-center gap-2 rounded-md border-2 border-foreground bg-foreground px-4 font-mono text-[13px] font-semibold text-paper shadow-[3px_3px_0_0_hsl(var(--stamp))] transition-transform hover:-translate-x-px hover:-translate-y-px md:inline-flex"
          >
            <Download className="h-4 w-4" /> Resume
          </a>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className={cn(iconButton, "lg:hidden")}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper lg:hidden">
          <div className="container py-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Index of contents</p>
            <nav aria-label="Mobile" className="mt-3 flex flex-col">
              {siteConfig.nav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-baseline gap-3 border-b border-dashed border-foreground/25 py-4"
                >
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  <span
                    className={cn(
                      "font-display text-3xl font-extrabold uppercase",
                      item.href === `#${activeSection}` ? "text-stamp" : "text-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                  <span aria-hidden className="flex-1 translate-y-[-4px] border-b border-dotted border-foreground/30" />
                  <span className="font-mono text-xs text-muted-foreground">p.{i + 2}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-8 grid gap-3">
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex h-12 items-center justify-center gap-2 rounded-md border-2 border-foreground bg-foreground font-mono text-sm font-semibold text-paper shadow-[3px_3px_0_0_hsl(var(--stamp))]"
              >
                <Download className="h-4 w-4" /> Download resume
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-md border-2 border-foreground font-mono text-sm font-medium text-foreground">
                  <GithubIcon className="h-4 w-4" /> GitHub
                </a>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-md border-2 border-foreground font-mono text-sm font-medium text-foreground">
                  <LinkedinIcon className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
