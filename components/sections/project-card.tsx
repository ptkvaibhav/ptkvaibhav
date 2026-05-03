import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, GitFork, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { typography } from "@/styles/design-system";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
  featured?: boolean;
};

export function ProjectCard({ project, compact = false, featured = false }: ProjectCardProps) {
  const visibleTags = project.tags
    .filter((tag) => tag.toLowerCase() !== project.language?.toLowerCase())
    .slice(0, featured ? 5 : compact ? 2 : 3);
  const summary = project.excerpt?.trim() || project.title;
  const shouldRenderSummary = summary.toLowerCase() !== project.title.trim().toLowerCase();
  const updatedLabel = project.lastUpdated
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(project.lastUpdated))
    : null;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/82 shadow-[0_18px_46px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,23,42,0.14)]",
        featured ? "min-h-[320px] p-5" : "min-h-[260px] p-4 opacity-95 hover:opacity-100"
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-300 opacity-80" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-200/20 blur-3xl transition duration-300 group-hover:bg-cyan-200/40" />
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {project.language ? (
            <span className="rounded-full border border-slate-200 bg-slate-950 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white">
              {project.language}
            </span>
          ) : null}
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-emerald-700">
            {project.status}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className={cn(typography.cardTitle, featured && "text-2xl md:text-3xl")}>
            {project.title}
          </h3>
          {shouldRenderSummary ? (
            <div className="space-y-1">
              <p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-cyan-800">
                What it is for
              </p>
              <p
                className={cn(
                  "text-sm leading-6 text-slate-600 md:text-[0.95rem]",
                  featured ? "line-clamp-4 max-w-3xl" : "line-clamp-3"
                )}
              >
                {summary}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
          <Star className="h-3.5 w-3.5 text-amber-500" />
          {project.stars ?? 0} stars
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
          <GitFork className="h-3.5 w-3.5 text-cyan-600" />
          {project.forks ?? 0} forks
        </span>
        {updatedLabel ? (
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1">
            Updated {updatedLabel}
          </span>
        ) : null}
      </div>

      {visibleTags.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        {project.readmeUrl ? (
          <Button asChild variant="secondary" size="sm">
            <Link href={project.readmeUrl} target="_blank" rel="noopener noreferrer">
              View README
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : null}
        {project.downloadUrl ? (
          <Button asChild variant="secondary" size="sm">
            <Link href={project.downloadUrl} target="_blank" rel="noopener noreferrer">
              Download
              <ArrowDownToLine className="h-4 w-4" />
            </Link>
          </Button>
        ) : null}
        <Button asChild variant="secondary" size="sm">
          <Link href={project.github} target="_blank" rel="noopener noreferrer">
            View repo
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
