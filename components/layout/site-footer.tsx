import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/70 bg-white/82 py-8 backdrop-blur">
      <div className="container flex flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="max-w-xl space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-800">{siteConfig.name}</p>
          <p className="text-sm text-slate-600">{siteConfig.bio}</p>
          <p className="text-xs leading-5 text-slate-500">
            This site follows secure coding practices including CSP, input validation, and rate
            limiting.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="sm" variant="secondary">
            <Link href={resumePath} target="_blank" rel="noopener noreferrer">
              Resume
            </Link>
          </Button>
          <Link
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            <Github className="h-4 w-4" />
            GitHub
          </Link>
          <Link
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Link>
          <Button asChild size="sm">
            <Link href="#contact">Let&apos;s talk</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
