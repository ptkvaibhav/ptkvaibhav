import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { professionalExperience } from "@/lib/content";
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
  const currentRole = professionalExperience.roles[0];

  return (
    <div className="pb-20">
      <section className={`container ${spacing.section}`}>
        <Reveal className="max-w-4xl space-y-8">
          <Badge className="w-fit">Cybersecurity Engineer</Badge>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              {siteConfig.description}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-300/85">{siteConfig.bio}</p>
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
        <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            <p className={typography.sectionLabel}>About</p>
            <h2 className={typography.sectionTitle}>
              I like security work that stays close to real software behavior.
            </h2>
            <p className={typography.sectionDescription}>
              My work sits between application security, offensive validation, and engineering
              systems. I spend most of my time looking for weak assumptions in modern applications,
              proving what actually matters, and building workflows that help teams fix the right
              issues sooner.
            </p>
          </div>
          <div className="space-y-5 text-base leading-8 text-stone-300/85">
            <p>
              That usually means going deeper than scanner output. I care about evidence,
              application behavior, and whether a finding changes how a team should think about
              risk.
            </p>
            <p>
              I also enjoy building the tooling around that work: parsers, automation, and systems
              that reduce noise instead of adding more of it.
            </p>
            <Button asChild variant="secondary" size="sm">
              <Link href="/about">Read more about how I work</Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <section className={`container ${spacing.section}`}>
        <Reveal>
          <Card className="p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="space-y-4">
                <p className={typography.sectionLabel}>Experience</p>
                <h2 className={typography.sectionTitle}>
                  {professionalExperience.brand} - {currentRole.title}
                </h2>
                <p className={typography.sectionDescription}>
                  {currentRole.period}. Security leadership across US government-facing systems,
                  application testing, and delivery workflows.
                </p>
              </div>
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2">
                  {currentRole.metrics.slice(0, 3).map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs font-medium text-zinc-100"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400" />
                    <p className={typography.cardText}>
                      Led product security work for Deloitte Health Interactive systems serving US
                      government clients.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400" />
                    <p className={typography.cardText}>
                      Improved overall security posture by 33 percent through shift-left AppSec and
                      review workflows.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400" />
                    <p className={typography.cardText}>
                      Built AI-driven Burp Suite testing tooling that helped uncover critical
                      application flaws.
                    </p>
                  </div>
                </div>
                <Button asChild variant="secondary" size="sm">
                  <Link href="/experience">
                    View full experience
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </Reveal>
      </section>

      <section className={`container ${spacing.section}`}>
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className={typography.sectionLabel}>Featured Projects</p>
            <h2 className={typography.sectionTitle}>
              A few projects that show how I like to work.
            </h2>
            <p className={typography.sectionDescription}>
              Focused on offensive testing, workflow tooling, and security analysis that produces
              usable evidence.
            </p>
          </div>
          <Button asChild variant="secondary" size="sm">
            <Link href="/projects">View all projects</Link>
          </Button>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <ProjectCard project={project} compact />
            </Reveal>
          ))}
        </div>
      </section>

      <section className={`container ${spacing.section}`}>
        <Reveal>
          <Card className="overflow-hidden p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className={typography.sectionLabel}>Contact</p>
                <h2 className={typography.sectionTitle}>
                  Interested in application security, offensive testing, or tooling work?
                </h2>
                <p className={typography.sectionDescription}>
                  If you&apos;re hiring, collaborating, or just want to talk through AppSec,
                  offensive testing, or automation ideas, the contact page is the best place to
                  start.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/contact">Let&apos;s talk</Link>
              </Button>
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
