import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/sections/project-card";
import { Badge } from "@/components/ui/badge";
import { getProjects } from "@/lib/projects";
import { spacing, typography } from "@/styles/design-system";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of tools and experiments focused on improving application security workflows, testing approaches, and signal quality.",
};

export const dynamic = "force-static";
export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className={`container ${spacing.section}`}>
      <Reveal className={spacing.sectionHeader}>
        <Badge className="w-fit">Projects</Badge>
        <div className="max-w-3xl space-y-4">
          <h1 className={typography.pageTitle}>Projects and tooling</h1>
          <p className={typography.pageDescription}>
            A collection of tools and experiments focused on improving application security
            workflows, testing approaches, and signal quality.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
