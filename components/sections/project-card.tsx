import Link from "next/link";
import { ArrowUpRight, Clock3, GitFork, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { typography } from "@/styles/design-system";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
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

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const formattedLastUpdated = formatLastUpdated(project.lastUpdated);
  const hasProjectMetadata =
    typeof project.stars === "number" ||
    typeof project.forks === "number" ||
    Boolean(formattedLastUpdated);
  const visibleTags = project.tags
    .filter((tag) => tag.toLowerCase() !== project.language?.toLowerCase())
    .slice(0, compact ? 2 : 3);
  const summary = project.excerpt?.trim() || project.title;
  const shouldRenderSummary = summary.toLowerCase() !== project.title.trim().toLowerCase();

  return (
    <Card className="relative flex h-full flex-col p-6">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title} project details`}
        className="absolute inset-0 z-0 rounded-xl"
      />
      <CardHeader className="relative z-10 space-y-4">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent">{project.status}</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.language ? <Badge>{project.language}</Badge> : null}
            {visibleTags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <CardTitle className={typography.cardTitle}>{project.title}</CardTitle>
          {shouldRenderSummary ? (
            <CardDescription className="line-clamp-2 text-base leading-7 text-stone-300/85">
              {summary}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="relative z-10 mt-auto space-y-5 pt-4">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <div className="flex flex-wrap gap-2">
            {project.readmeUrl ? (
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="bg-white/[0.05] hover:bg-white/[0.08]"
              >
                <Link href={project.readmeUrl} target="_blank" rel="noreferrer">
                  View README
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : null}
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="bg-white/[0.05] hover:bg-white/[0.08]"
            >
              <Link href={project.github} target="_blank" rel="noreferrer">
                View repo
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        {hasProjectMetadata ? (
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
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
      </CardContent>
    </Card>
  );
}
