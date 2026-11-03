"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Menu, X, Search, Moon, Sun, Volume2, VolumeX, ArrowUpRight } from "lucide-react";

import { useTheme } from "@/components/providers/theme-provider";
import { useSound } from "@/components/providers/sound-provider";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";

const iconButton =
  "inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { resolvedTheme, toggleTheme } = useTheme();
  const { isMuted, toggleMute, playSound } = useSound();

  const sectionIds = useMemo(() => siteConfig.nav.map((item) => item.href.replace("#", "")), []);

  // Track the section currently in view to highlight its nav link.
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
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and close on Escape while the mobile menu is open.
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

  const openCommandPalette = () => {
    playSound("click");
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Blur lives on its own layer: backdrop-filter on <header> would trap the fixed mobile menu inside it. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 border-b transition-colors duration-200",
          isMenuOpen
            ? "border-border bg-background"
            : isScrolled
              ? "border-border bg-background/85 backdrop-blur-xl"
              : "border-transparent"
        )}
      />
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="#about"
          onClick={() => {
            playSound("click");
            closeMenu();
          }}
          className="flex items-center gap-2.5 rounded-full"
          aria-label="Pratik Vaibhav — back to top"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-mono text-xs font-bold text-background">
            PV
          </span>
          <span className="hidden text-[15px] font-semibold tracking-tight text-foreground sm:inline">
            Pratik Vaibhav
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => {
            const isActive = item.href === `#${activeSection}`;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                onClick={() => playSound("click")}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-secondary font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open command palette"
            className={cn(iconButton, "md:w-auto md:gap-2 md:px-3")}
          >
            <Search className="h-4 w-4" />
            <kbd className="hidden rounded border border-border bg-secondary px-1.5 font-mono text-[10px] md:inline">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => {
              toggleMute();
              if (isMuted) playSound("success");
            }}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            className={cn(iconButton, "hidden sm:inline-flex")}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-primary" />}
          </button>

          <button
            type="button"
            onClick={() => {
              playSound("toggle");
              toggleTheme();
            }}
            aria-label="Toggle color theme"
            className={iconButton}
          >
            {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="#contact"
            onClick={() => playSound("click")}
            className="ml-2 hidden h-9 items-center rounded-full bg-foreground px-4 text-[13px] font-semibold text-background transition-opacity hover:opacity-90 md:inline-flex"
          >
            Get in touch
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className={cn(iconButton, "lg:hidden")}
            onClick={() => {
              playSound("click");
              setIsMenuOpen((open) => !open);
            }}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-border bg-background lg:hidden"
        >
          <nav aria-label="Mobile" className="container flex flex-col py-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  playSound("click");
                  closeMenu();
                }}
                className={cn(
                  "flex items-center justify-between border-b border-border py-4 text-lg font-medium",
                  item.href === `#${activeSection}` ? "text-primary" : "text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="container grid gap-3 pb-10 pt-2">
            <Link
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground text-sm font-semibold text-background"
            >
              Download resume <ArrowUpRight className="h-4 w-4" />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-border text-sm font-medium text-foreground"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-border text-sm font-medium text-foreground"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                toggleMute();
                if (isMuted) playSound("success");
              }}
              className="flex h-12 items-center justify-center gap-2 rounded-full text-sm text-muted-foreground sm:hidden"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              Sound effects {isMuted ? "off" : "on"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
