import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <article className="container py-20 md:py-24">
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
            <h1 className="font-serif text-5xl tracking-tight text-white md:text-6xl">
              {project.title}
            </h1>
            <p className="text-lg leading-8 text-zinc-400">{project.description}</p>
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
              <p className="text-xs uppercase tracking-wider text-zinc-500">Project summary</p>
              <CardTitle>What this build is about</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-8 text-zinc-300">{project.excerpt}</p>
            </CardContent>
          </Card>
          <Card className="p-8">
            <CardHeader className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Problem</p>
              <CardTitle>The problem it solves</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-8 text-zinc-300">{project.problem}</p>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-zinc-500">Architecture</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              System architecture overview
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {architectureColumns.map((column) => (
              <Card key={column.key} className="p-6">
                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl">{column.label}</CardTitle>
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
              <p className="text-xs uppercase tracking-wider text-zinc-500">Key components</p>
              <CardTitle>Important parts of the system</CardTitle>
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
              <p className="text-xs uppercase tracking-wider text-zinc-500">Security implications</p>
              <CardTitle>How it improves security posture</CardTitle>
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
            <p className="text-xs uppercase tracking-wider text-zinc-500">Future work</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Experimental directions and next steps
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
