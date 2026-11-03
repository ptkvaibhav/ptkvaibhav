import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

import { siteConfig } from "@/lib/site";

const links = [
  { href: siteConfig.social.github, label: "GitHub", icon: Github, external: true },
  { href: siteConfig.social.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
  { href: `mailto:${siteConfig.email}`, label: "Email", icon: Mail, external: false },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            © {new Date().getFullYear()} · Senior Product Security Engineer
          </p>
        </div>
        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a
            href="#about"
            className="ml-2 inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
