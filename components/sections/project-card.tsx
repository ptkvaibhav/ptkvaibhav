import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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

export function ProjectCard({ project, compact = false, featured = false }: ProjectCardProps) {
  const visibleTags = project.tags
    .filter((tag) => tag.toLowerCase() !== project.language?.toLowerCase())
    .slice(0, featured ? 5 : compact ? 2 : 3);
  const summary = project.excerpt?.trim() || project.title;
  const shouldRenderSummary = summary.toLowerCase() !== project.title.trim().toLowerCase();

  return (
    <Card
      className={cn(
        "flex h-full flex-col transition duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_18px_44px_rgba(124,58,237,0.12)]",
        featured ? "min-h-[320px] p-6 md:p-7" : "min-h-[280px] p-5 md:p-6"
      )}
    >
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-2">
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
                "text-sm leading-7 text-slate-600 md:text-base",
                featured ? "line-clamp-3 max-w-3xl" : "line-clamp-2"
              )}
            >
              {summary}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="mt-auto flex flex-wrap items-center gap-2 pt-4">
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
      </CardContent>
    </Card>
  );
}
