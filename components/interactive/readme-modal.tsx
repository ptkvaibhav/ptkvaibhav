"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";

import type { Project } from "@/types/project";

type ReadmeModalProps = {
  project: Project | null;
  onClose: () => void;
};

function Block({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-6">
      <h4 className="field-label">{title}</h4>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground/85">
            <span aria-hidden className="font-mono text-xs font-bold leading-6 text-stamp">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** "Case notes" sheet for a project. Bottom sheet on phones, centered sheet on desktop. */
export function ReadmeModal({ project, onClose }: ReadmeModalProps) {
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!project) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project || typeof document === "undefined") return null;

  // Portal to <body> so transformed ancestors (cards, reveal animations) can't trap the fixed overlay.
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="case-notes-title">
      <div className="fixed inset-0 bg-black/55 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />

      <div className="paper ruled relative z-10 max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-t-xl px-5 pb-10 pt-6 sm:max-h-[85vh] sm:rounded-md sm:px-10 sm:pt-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="field-label">Case notes · {project.status}</p>
            <h3 id="case-notes-title" className="mt-2 font-display text-4xl font-black uppercase leading-none text-foreground sm:text-5xl">
              {project.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close case notes"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-foreground text-foreground hover:bg-manila/50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-5 text-[16px] leading-relaxed text-foreground">{project.description || project.excerpt}</p>

        {project.problem ? (
          <p className="mt-5 border-l-2 border-stamp pl-4 font-mono text-[13px] leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">The problem: </span>
            {project.problem}
          </p>
        ) : null}

        <Block title="How it works" items={project.architecture?.processing} />
        <Block title="Building blocks" items={project.components} />
        <Block title="Security impact" items={project.securityImpact} />
        <Block title="Next on the list" items={project.futureWork} />

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="label-tape !text-[10px]">{tag}</span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-t border-dashed border-foreground/30 pt-6">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-md border-2 border-foreground bg-foreground px-5 font-mono text-sm font-semibold text-paper shadow-[3px_3px_0_0_hsl(var(--stamp))]"
          >
            View source on GitHub <ArrowUpRight className="h-4 w-4" />
          </a>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-md border-2 border-foreground px-5 font-mono text-sm font-semibold text-foreground"
            >
              Live demo <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}
