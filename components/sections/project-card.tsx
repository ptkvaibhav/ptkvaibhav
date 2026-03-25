import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[28px] bg-white/78 shadow-[0_12px_36px_rgba(124,58,237,0.08)] transition duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_18px_44px_rgba(124,58,237,0.12)]",
        featured ? "min-h-[320px] p-6 md:p-7" : "min-h-[260px] p-5 md:p-6"
      )}
    >
      <div className="space-y-3">
        {visibleTags.length ? (
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-700">
            {visibleTags.join(" / ")}
          </p>
        ) : null}

        <div className="space-y-2">
          <h3 className={cn(typography.cardTitle, featured && "text-2xl md:text-3xl")}>
            {project.title}
          </h3>
          {shouldRenderSummary ? (
            <p
              className={cn(
                "text-sm leading-7 text-slate-600 md:text-base",
                featured ? "line-clamp-3 max-w-3xl" : "line-clamp-2"
              )}
            >
              {summary}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
        {project.readmeUrl ? (
          <Button asChild variant="secondary" size="sm">
            <Link href={project.readmeUrl} target="_blank" rel="noreferrer">
              View README
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : null}
        <Button asChild variant="secondary" size="sm">
          <Link href={project.github} target="_blank" rel="noreferrer">
            View repo
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
