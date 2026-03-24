import Link from "next/link";
import { ArrowUpRight, Clock3, GitFork, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { typography } from "@/styles/design-system";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
  featured?: boolean;
};

function formatLastUpdated(lastUpdated?: string) {
  if (!lastUpdated) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(lastUpdated));
}

export function ProjectCard({ project, compact = false, featured = false }: ProjectCardProps) {
  const formattedLastUpdated = formatLastUpdated(project.lastUpdated);
  const hasProjectMetadata =
    typeof project.stars === "number" ||
    typeof project.forks === "number" ||
    Boolean(formattedLastUpdated);
  const visibleTags = project.tags
    .filter((tag) => tag.toLowerCase() !== project.language?.toLowerCase())
    .slice(0, featured ? 4 : compact ? 2 : 3);
  const summary = project.excerpt?.trim() || project.title;
  const shouldRenderSummary = summary.toLowerCase() !== project.title.trim().toLowerCase();

  return (
    <Card
      className={cn(
        "flex h-full flex-col transition duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]",
        featured ? "min-h-[360px] p-8" : "min-h-[320px] p-6"
      )}
    >
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent">{project.status}</Badge>
          {project.language ? <Badge>{project.language}</Badge> : null}
          {visibleTags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="space-y-2">
          <CardTitle className={cn(typography.cardTitle, featured && "text-2xl md:text-3xl")}>
            {project.title}
          </CardTitle>
          {shouldRenderSummary ? (
            <CardDescription
              className={cn(
                "text-base leading-7 text-slate-600",
                featured ? "line-clamp-3 max-w-3xl" : "line-clamp-2"
              )}
            >
              {summary}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="mt-auto space-y-5 pt-4">
        {hasProjectMetadata ? (
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            {typeof project.stars === "number" ? (
              <div className="inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5" />
                <span>{project.stars}</span>
              </div>
            ) : null}
            {typeof project.forks === "number" ? (
              <div className="inline-flex items-center gap-1.5">
                <GitFork className="h-3.5 w-3.5" />
                <span>{project.forks}</span>
              </div>
            ) : null}
            {formattedLastUpdated ? (
              <div className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" />
                <span>Updated {formattedLastUpdated}</span>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
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
      </CardContent>
    </Card>
  );
}
