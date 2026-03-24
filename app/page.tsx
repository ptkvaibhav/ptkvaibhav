import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/sections/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeaturedProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { spacing, typography } from "@/styles/design-system";

export const revalidate = 3600;

export default async function HomePage() {
  const projects = await getFeaturedProjects();

  return (
    <div className="pb-16">
      <section className={`relative container ${spacing.section}`}>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
        <Reveal className="max-w-4xl space-y-8">
          <Badge className="w-fit">Cybersecurity Engineer</Badge>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {siteConfig.description}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-400">{siteConfig.bio}</p>
          </div>
          <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
            <Button asChild size="lg">
              <Link href="/projects">
                View projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <section className={`container ${spacing.section}`}>
        <Reveal className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className={typography.sectionLabel}>Featured Projects</p>
            <h2 className={typography.sectionTitle}>Selected security tooling and case studies.</h2>
            <p className={typography.sectionDescription}>
              Three representative builds that show how I approach application behavior, offensive
              validation, and automation that produces signal instead of noise.
            </p>
          </div>
          <Button asChild variant="secondary" size="sm">
            <Link href="/projects">All projects</Link>
          </Button>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <ProjectCard project={project} compact />
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`container ${spacing.section}`}>
        <Reveal>
          <Card className="surface-grid overflow-hidden p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className={typography.sectionLabel}>Contact</p>
                <h2 className={typography.sectionTitle}>
                  Interested in application security, offensive research, or tooling work?
                </h2>
                <p className={typography.sectionDescription}>
                  If you&apos;re hiring, collaborating, or evaluating security engineering talent,
                  the fastest way to reach me is through the contact page.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/contact">Contact me</Link>
              </Button>
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
