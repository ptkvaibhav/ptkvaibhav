import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { spacing, typography } from "@/styles/design-system";
import type { Project } from "@/types/project";

type ProjectDetailProps = {
  project: Project;
};

const architectureColumns = [
  { key: "inputs", label: "Input sources" },
  { key: "processing", label: "Processing components" },
  { key: "outputs", label: "Output" },
] as const;

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className={`container ${spacing.section}`}>
      <div className="mx-auto max-w-6xl space-y-16">
        <Reveal className="space-y-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="accent">{project.status}</Badge>
            {project.language ? <Badge>{project.language}</Badge> : null}
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <div className="max-w-4xl space-y-4">
            <h1 className={typography.pageTitle}>{project.title}</h1>
            <p className={typography.pageDescription}>{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={project.github} target="_blank" rel="noreferrer">
                GitHub repository
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            {project.liveUrl ? (
              <Button asChild variant="secondary">
                <Link href={project.liveUrl} target="_blank" rel="noreferrer">
                  Live output
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : null}
          </div>
        </Reveal>

        <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-8">
            <CardHeader className="space-y-3">
              <p className={typography.sectionLabel}>Project summary</p>
              <CardTitle className={typography.cardTitle}>What this build is about</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-8 text-zinc-300">{project.excerpt}</p>
            </CardContent>
          </Card>
          <Card className="p-8">
            <CardHeader className="space-y-3">
              <p className={typography.sectionLabel}>Problem</p>
              <CardTitle className={typography.cardTitle}>The problem it solves</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-8 text-zinc-300">{project.problem}</p>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal className="space-y-6">
          <div className="space-y-3">
            <p className={typography.sectionLabel}>Architecture</p>
            <h2 className={typography.sectionTitle}>
              System architecture overview
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {architectureColumns.map((column) => (
              <Card key={column.key} className="p-6">
                <CardHeader className="space-y-3">
                  <CardTitle className={typography.cardTitle}>{column.label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.architecture[column.key].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                    >
                      <p className="text-sm leading-7 text-zinc-300">{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>

        <Reveal className="grid gap-6 lg:grid-cols-2">
          <Card className="p-8">
            <CardHeader className="space-y-3">
              <p className={typography.sectionLabel}>Key components</p>
              <CardTitle className={typography.cardTitle}>Important parts of the system</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.components.map((component) => (
                <div
                  key={component}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <p className="text-sm leading-7 text-zinc-300">{component}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardHeader className="space-y-3">
              <p className={typography.sectionLabel}>Security implications</p>
              <CardTitle className={typography.cardTitle}>How it improves security posture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {project.securityImpact.map((impact) => (
                <div
                  key={impact}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <p className="text-sm leading-7 text-zinc-300">{impact}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </Reveal>

        <Reveal className="space-y-6">
          <div className="space-y-3">
            <p className={typography.sectionLabel}>Future work</p>
            <h2 className={typography.sectionTitle}>
              Experimental directions and next steps
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {project.futureWork.map((item) => (
              <Card key={item} className="p-6">
                <CardContent>
                  <p className="text-sm leading-7 text-zinc-300">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>
      </div>
    </article>
  );
}
