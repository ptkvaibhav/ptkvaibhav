"use client";

import * as React from "react";
import { X, ExternalLink, Download, Star, GitFork, ShieldCheck, Terminal, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/project";

type ReadmeModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ReadmeModal({ project, onClose }: ReadmeModalProps) {
  React.useEffect(() => {
    if (!project) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 max-h-[90dvh] w-full max-w-2xl space-y-6 overflow-y-auto rounded-t-3xl border border-border bg-card p-5 pb-8 text-foreground shadow-2xl sm:max-h-[85vh] sm:rounded-3xl sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {project.status || "ACTIVE"}
              </span>
              {project.language && (
                <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-0.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {project.language}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-1 font-semibold text-slate-700 dark:text-slate-300">
            <Star className="h-3.5 w-3.5 text-amber-500" />
            {project.stars ?? 0} GitHub Stars
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-1 font-semibold text-slate-700 dark:text-slate-300">
            <GitFork className="h-3.5 w-3.5 text-cyan-500" />
            {project.forks ?? 0} Forks
          </span>
        </div>

        {/* Excerpt / Overview */}
        <div className="space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
            Architecture &amp; Purpose
          </h4>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {project.excerpt}
          </p>
        </div>

        {/* Security Impact Points */}
        <div className="space-y-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 p-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" />
            Key Engineering Highlights
          </h4>
          <ul className="grid gap-2 text-xs text-slate-600 dark:text-slate-300 font-mono">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">&bull;</span>
              <span>Automated vulnerability discovery and attack surface mapping</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">&bull;</span>
              <span>CVE intelligence ingestion &amp; bug bounty correlation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">&bull;</span>
              <span>Designed to minimize manual pentester triage effort</span>
            </li>
          </ul>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800 pt-4">
          {project.readmeUrl && (
            <Button asChild variant="secondary" size="sm">
              <a href={project.readmeUrl} target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-4 w-4" />
                Raw README
              </a>
            </Button>
          )}
          {project.downloadUrl && (
            <Button asChild variant="secondary" size="sm">
              <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                Source Archive
              </a>
            </Button>
          )}
          <Button asChild size="sm">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

