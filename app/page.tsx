import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/sections/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeaturedProjects } from "@/lib/projects";
import { spacing, typography } from "@/styles/design-system";

export const revalidate = 3600;

export default async function HomePage() {
  const projects = await getFeaturedProjects();

  return (
    <div className="pb-20">
      <section className={`container ${spacing.section}`}>
        <Reveal className="max-w-5xl space-y-8">
          <div className="space-y-4">
            <p className={typography.sectionLabel}>About</p>
            <h1 className={typography.pageTitle}>Application Security Engineer</h1>
            <p className="max-w-3xl text-xl font-medium leading-8 text-zinc-100">
              6+ years securing enterprise and government systems across application,
              infrastructure, and DevSecOps environments.
            </p>
          </div>
          <div className="max-w-4xl space-y-5 text-base leading-8 text-stone-300/85">
            <p>I work in application security with a focus on real-world risk.</p>
            <p>
              Most of my work involves testing production systems, identifying weaknesses that
              matter, and helping teams fix them in a way that scales.
            </p>
            <p>
              I don&apos;t rely on scanner output alone. I look at how applications behave, how
              attackers think, and whether a finding actually changes risk for the business.
            </p>
            <p>
              My experience spans secure SDLC, penetration testing, and security program design
              across large systems.
            </p>
            <p>
              I&apos;ve led product security efforts for US government-facing applications, built
              internal tooling to improve signal quality, and helped engineering teams move from
              noise to actionable security decisions.
            </p>
            <p>Security should improve how teams build — not slow them down.</p>
          </div>
        </Reveal>
      </section>

      <section className={`container ${spacing.section}`}>
        <Reveal className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-4">
            <p className={typography.sectionLabel}>Experience</p>
            <h2 className={typography.sectionTitle}>Deloitte — Lead Solution Advisor</h2>
            <p className={typography.sectionDescription}>
              Security leadership across large-scale government systems, focused on application
              security, DevSecOps, and delivery workflows.
            </p>
          </div>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400" />
              <p className={typography.cardText}>
                Led product security for US government-facing applications
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400" />
              <p className={typography.cardText}>
                Improved security posture by 33% through structured AppSec programs
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400" />
              <p className={typography.cardText}>
                Built internal tooling to improve vulnerability signal and triage
              </p>
            </div>
            <Button asChild variant="secondary" size="sm">
              <Link href="/experience">
                View full experience
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <section className={`container ${spacing.section}`}>
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className={typography.sectionLabel}>Projects</p>
            <h2 className={typography.sectionTitle}>Selected work</h2>
            <p className={typography.sectionDescription}>
              A small set of projects focused on improving how security testing is performed,
              validated, and operationalized.
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
                  Interested in working together or discussing security problems?
                </h2>
                <p className={typography.sectionDescription}>
                  I&apos;m always open to conversations around application security, offensive
                  testing, and security engineering.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/contact">
                  Let&apos;s talk
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
