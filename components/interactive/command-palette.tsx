"use client";

import * as React from "react";
import { Search, Download, ShieldCheck, Briefcase, Award, FolderGit2, Mail, Moon, Sun, ExternalLink, X, CornerDownLeft, Sparkles, Activity, EyeOff, Copy } from "lucide-react";
import { showToast } from "@/components/dossier/toast";
import { useTheme } from "@/components/providers/theme-provider";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type CommandItem = {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Socials" | "Classified";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { resolvedTheme, toggleTheme } = useTheme();

  const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";

  const close = React.useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const navigateTo = React.useCallback((hash: string) => {
    close();
    const el = document.getElementById(hash.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [close]);

  const items: CommandItem[] = React.useMemo(
    () => [
      {
        id: "nav-about",
        title: "Personnel file (top)",
        category: "Navigation",
        icon: ShieldCheck,
        action: () => navigateTo("#about"),
      },
      {
        id: "nav-experience",
        title: "Experience — Guidewire & Deloitte",
        category: "Navigation",
        icon: Briefcase,
        action: () => navigateTo("#experience"),
      },
      {
        id: "nav-skills",
        title: "Skills",
        category: "Navigation",
        icon: Sparkles,
        action: () => navigateTo("#skills"),
      },
      {
        id: "nav-projects",
        title: "Projects",
        category: "Navigation",
        icon: FolderGit2,
        action: () => navigateTo("#projects"),
      },
            {
        id: "nav-github",
        title: "GitHub activity",
        category: "Navigation",
        icon: Activity,
        action: () => navigateTo("#github-activity"),
      },
      {
        id: "nav-awards",
        title: "Awards & NULLCON talk",
        category: "Navigation",
        icon: Award,
        action: () => navigateTo("#awards"),
      },
      {
        id: "nav-contact",
        title: "Contact",
        category: "Navigation",
        icon: Mail,
        action: () => navigateTo("#contact"),
      },
      {
        id: "act-resume",
        title: "Download resume (PDF)",
        category: "Actions",
        icon: Download,
        action: () => {
          close();
          window.open(resumePath, "_blank", "noopener,noreferrer");
        },
        shortcut: "PDF",
      },
      {
        id: "act-theme",
        title: resolvedTheme === "dark" ? "Turn the lights on (light mode)" : "Turn the desk lamp off (dark mode)",
        category: "Actions",
        icon: resolvedTheme === "dark" ? Sun : Moon,
        action: () => {
          toggleTheme();
          close();
        },
        shortcut: "Theme",
      },
      {
        id: "act-email",
        title: "Copy email address",
        category: "Actions",
        icon: Copy,
        action: () => {
          close();
          navigator.clipboard?.writeText(siteConfig.email).then(
            () => showToast({ title: "Copied", body: siteConfig.email }),
            () => showToast({ title: "Email", body: siteConfig.email })
          );
        },
      },
      {
        id: "soc-github",
        title: "Visit GitHub Profile",
        category: "Socials",
        icon: ExternalLink,
        action: () => {
          close();
          window.open(siteConfig.social.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "soc-linkedin",
        title: "Connect on LinkedIn",
        category: "Socials",
        icon: ExternalLink,
        action: () => {
          close();
          window.open(siteConfig.social.linkedin, "_blank", "noopener,noreferrer");
        },
      },
    ],
    [navigateTo, close, resumePath, resolvedTheme, toggleTheme]
  );

  // Secret commands only appear when typed exactly.
  const secretItems: CommandItem[] = React.useMemo(
    () => [
      {
        id: "secret-declassify",
        title: "declassify — lift every redaction on the page",
        category: "Classified",
        icon: EyeOff,
        action: () => {
          close();
          document.documentElement.classList.add("declassified");
          showToast({ title: "Declassified", body: "Every redaction lifted. flag{p4l3tt3_p0w3r_us3r}" });
        },
      },
      {
        id: "secret-hire",
        title: "sudo hire pratik",
        category: "Classified",
        icon: ShieldCheck,
        action: () => {
          close();
          showToast({ title: "Permission granted", body: "Opening a secure channel… (your mail app)." });
          window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("sudo hire pratik")}`;
        },
      },
    ],
    [close]
  );

  const filteredItems = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    const secrets = secretItems.filter((item) => (q.length >= 4 && item.title.startsWith(q)) || item.title.split(" — ")[0] === q);
    if (secrets.length) return secrets;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [items, secretItems, query]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  React.useEffect(() => {
    const handleOpenPalette = () => setIsOpen(true);
    window.addEventListener("open-command-palette", handleOpenPalette);
    return () => window.removeEventListener("open-command-palette", handleOpenPalette);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredItems[selectedIndex];
      if (selected) {
        selected.action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px]" onClick={close} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-md border-2 border-foreground bg-paper shadow-hard">
        <div className="flex items-center justify-between border-b-2 border-foreground bg-foreground px-3 py-1.5 font-mono text-xs text-paper">
          <span>search.exe — index of contents</span>
          <span className="opacity-60">⌘K</span>
        </div>
        <div className="flex items-center gap-3 border-b border-dashed border-foreground/30 px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-stamp" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Jump to a section or run an action…"
            className="flex-1 bg-transparent font-mono text-base text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-sm"
          />
          <button onClick={close} aria-label="Close command palette" className="rounded-md p-1 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[50vh] space-y-0.5 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <p className="py-8 text-center font-mono text-xs text-muted-foreground">No records found. (Some commands are classified.)</p>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-sm px-3 py-2.5 text-left text-sm transition-colors",
                    isSelected ? "bg-highlight/60 text-foreground dark:bg-highlight/25" : "text-foreground/80"
                  )}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {item.category}
                    {isSelected ? <CornerDownLeft className="h-3 w-3" /> : null}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-dashed border-foreground/30 px-4 py-2 font-mono text-[11px] text-muted-foreground">
          <span><strong className="text-foreground">↑↓</strong> move</span>
          <span><strong className="text-foreground">↵</strong> open</span>
          <span><strong className="text-foreground">esc</strong> close</span>
        </div>
      </div>
    </div>
  );
}
