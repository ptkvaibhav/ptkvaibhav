"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Menu, X } from "lucide-react";
import gsap from "gsap";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type SectionNavigationProps = {
  activeSection: string;
  linkRefs?: React.MutableRefObject<Record<string, HTMLAnchorElement | null>>;
  onNavigate?: () => void;
};

function SectionNavigation({
  activeSection,
  linkRefs,
  onNavigate,
}: SectionNavigationProps) {
  function isActiveRoute(href: string) {
    return href === `#${activeSection}`;
  }

  return (
    <>
      {siteConfig.nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          ref={(element) => {
            if (linkRefs) {
              linkRefs.current[item.href] = element;
            }
          }}
          aria-current={isActiveRoute(item.href) ? "page" : undefined}
          className={cn(
            "rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-slate-50 hover:text-slate-900 md:rounded-none md:px-0 md:hover:bg-transparent md:after:absolute md:after:bottom-1 md:after:left-0 md:after:h-px md:after:w-full md:after:origin-left md:after:scale-x-0 md:after:bg-violet-600 md:after:transition-transform md:after:duration-200 md:hover:after:scale-x-100",
            isActiveRoute(item.href)
              ? "bg-violet-50 text-violet-700 md:bg-transparent"
              : "text-slate-700 md:text-slate-500"
          )}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

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
            aria-label="Primary navigation"
            className={cn(
              "hidden text-sm",
              isMenuOpen &&
                "absolute left-0 right-0 top-full z-40 flex flex-col gap-2 border-b border-slate-200 bg-white px-5 py-4 shadow-[0_18px_42px_rgba(15,23,42,0.08)]",
              "md:static md:flex md:flex-row md:flex-wrap md:items-center md:gap-6 md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none"
            )}
          >
            <span
              ref={indicatorRef}
              className="pointer-events-none absolute bottom-0 left-0 hidden h-px w-0 bg-violet-600 opacity-0 md:block"
            />
            <SectionNavigation
              activeSection={activeSection}
              linkRefs={linkRefs}
              onNavigate={closeMenu}
            />

            <div className="mt-4 grid grid-cols-2 gap-2 md:hidden">
              <Button asChild size="sm" variant="secondary" className="col-span-2">
                <Link
                  href={resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  Resume
                </Link>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <Link
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  rel="noopener noreferrer"
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
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild size="sm" variant="secondary">
            <Link href={resumePath} target="_blank" rel="noopener noreferrer">
              Resume
            </Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
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
              rel="noopener noreferrer"
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
      </div>
    </header>
  );
}
