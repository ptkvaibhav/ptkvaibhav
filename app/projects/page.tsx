import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/sections/project-card";
import { Badge } from "@/components/ui/badge";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected security engineering, automation, and research projects by Pratik Vaibhav.",
};

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="container py-20 md:py-24">
      <Reveal className="mb-10 space-y-6">
        <Badge variant="accent" className="w-fit">
          Projects
        </Badge>
        <div className="max-w-3xl space-y-4">
          <h1 className="font-serif text-5xl tracking-tight text-white md:text-6xl">
            Projects exploring application behavior, offensive automation, and security tooling.
          </h1>
          <p className="text-lg leading-8 text-zinc-400">
            These builds sync from GitHub on a one-hour interval with a static fallback in place,
            reflecting how I think about security analysis, workflow improvement, and
            research-driven engineering.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
