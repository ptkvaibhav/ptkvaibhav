"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Menu, X } from "lucide-react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";
  const sectionIds = useMemo(
    () => siteConfig.nav.map((item) => item.href.replace("#", "")),
    []
  );

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -50% 0px",
        threshold: [0.15, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    const syncActiveSection = () => {
      const hash = window.location.hash.replace("#", "");

      if (hash && sectionIds.includes(hash)) {
        setActiveSection(hash);
      }
    };

    syncActiveSection();
    window.addEventListener("hashchange", syncActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncActiveSection);
    };
  }, [sectionIds]);

  useEffect(() => {
    const updateIndicator = () => {
      const nav = navRef.current;
      const indicator = indicatorRef.current;
      const activeLink = linkRefs.current[`#${activeSection}`];

      if (!nav || !indicator || !activeLink) {
        return;
      }

      const navBounds = nav.getBoundingClientRect();
      const linkBounds = activeLink.getBoundingClientRect();

      gsap.to(indicator, {
        x: linkBounds.left - navBounds.left,
        width: linkBounds.width,
        autoAlpha: 1,
        duration: 0.28,
        ease: "power2.out",
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function isActiveRoute(href: string) {
    return href === `#${activeSection}`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="container relative flex items-center justify-between gap-6 py-4">
        <div className="flex items-center gap-8">
          <Link
            href="#about"
            className="text-xl font-semibold tracking-tight text-slate-900 md:hidden"
            onClick={closeMenu}
          >
            Pratik
          </Link>
          <nav
            ref={navRef}
            className="relative hidden flex-wrap items-center gap-6 text-sm md:flex"
          >
            <span
              ref={indicatorRef}
              className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-violet-600 opacity-0"
            />
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                ref={(element) => {
                  linkRefs.current[item.href] = element;
                }}
                aria-current={isActiveRoute(item.href) ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap py-2 text-sm font-medium transition-colors after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-violet-600 after:transition-transform after:duration-200 hover:text-slate-900 hover:after:scale-x-100",
                  isActiveRoute(item.href) ? "text-violet-700" : "text-slate-500"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild size="sm" variant="secondary">
            <Link href={resumePath} target="_blank" rel="noreferrer">
              Resume
            </Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link
              href={siteConfig.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="#contact">Let&apos;s talk</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div
          className={`absolute left-0 right-0 top-full overflow-hidden border-b border-slate-200 bg-white transition-all duration-300 md:hidden ${
            isMenuOpen ? "max-h-[24rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container py-4">
            <nav className="flex flex-col gap-2 text-sm text-slate-700">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActiveRoute(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-3 py-2 transition hover:bg-slate-50 hover:text-slate-900",
                    isActiveRoute(item.href) ? "bg-violet-50 text-violet-700" : "text-slate-700"
                  )}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button asChild size="sm" variant="secondary" className="col-span-2">
                <Link href={resumePath} target="_blank" rel="noreferrer" onClick={closeMenu}>
                  Resume
                </Link>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <Link
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  onClick={closeMenu}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <Link
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  onClick={closeMenu}
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
              <Button asChild size="sm" className="col-span-2">
                <Link href="#contact" onClick={closeMenu}>
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
