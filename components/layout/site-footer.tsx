import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

import { siteConfig } from "@/lib/site";

const links = [
  { href: siteConfig.social.github, label: "GitHub", icon: Github, external: true },
  { href: siteConfig.social.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
  { href: `mailto:${siteConfig.email}`, label: "Email", icon: Mail, external: false },
];

export function SiteFooter() {
  return (
    <footer className="relative z-[1] border-t-2 border-foreground bg-background">
      <div className="container py-10">
        <p className="text-center font-stencil text-3xl font-black uppercase tracking-[0.12em] text-foreground/80 sm:text-4xl">
          — End of file —
        </p>
        <p className="mt-2 text-center font-typewriter text-sm text-muted-foreground">
          This document will not self-destruct. Feel free to share it.
        </p>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-dashed border-foreground/30 pt-6 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pratik Vaibhav · File no. PV-2019-SEC · Press ⌘K to search
          </p>
          <div className="flex items-center gap-1">
            {links.map(({ href, label, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a
              href="#about"
              className="ml-2 inline-flex h-10 items-center gap-1.5 rounded-md border-2 border-foreground px-3 font-mono text-xs font-semibold text-foreground"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
