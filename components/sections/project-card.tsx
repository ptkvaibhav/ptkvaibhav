import Link from "next/link";
import { ArrowUpRight, Clock3, GitFork, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <Card className="surface-grid h-full p-6">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="accent">{project.status}</Badge>
          {project.language ? <Badge>{project.language}</Badge> : null}
          {project.tags.slice(0, compact ? 2 : 4).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="space-y-2">
          <CardTitle>{project.title}</CardTitle>
          <CardDescription className="text-base leading-7 text-zinc-400">
            {compact ? project.excerpt : project.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">{project.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {project.readmeUrl ? (
              <Button asChild variant="ghost" size="sm">
                <Link href={project.readmeUrl} target="_blank" rel="noreferrer">
                  View README
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : null}
            <Button asChild variant="ghost" size="sm">
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
