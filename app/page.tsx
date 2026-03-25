import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { AwardsSection } from "@/components/sections/awards";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectCard } from "@/components/sections/project-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/projects";
import { typography } from "@/styles/design-system";

export const revalidate = 3600;

const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";

export default async function HomePage() {
  const projects = await getFeaturedProjects();
  const featuredProject =
    projects.find((project) => project.slug.toLowerCase() === "clinkz") ?? projects[0];
  const supportingProjects = projects
    .filter((project) => project.slug !== featuredProject?.slug)
    .slice(0, 2);
  const featuredKeywords = featuredProject
    ? featuredProject.tags
        .filter((tag) => tag.toLowerCase() !== featuredProject.language?.toLowerCase())
        .slice(0, 5)
    : [];

  return (
    <div>
      <section id="about" className="section">
        <div className="container">
          <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20">
            <Reveal className="max-w-2xl space-y-6">
              <div className="space-y-3">
                <h1 className={typography.pageTitle}>Hi, I&apos;m Pratik</h1>
                <p className="text-[1.5rem] font-semibold tracking-tight text-violet-700 md:text-[1.9rem]">
                  Application Security Engineer
                </p>
              </div>

              <p className="max-w-2xl text-base leading-8 text-slate-700 md:text-lg">
                I have 6+ years of experience securing enterprise and government systems across
                application security, DevSecOps, and offensive testing. I focus on finding real
                vulnerabilities, understanding how systems behave under attack, and helping teams
                fix what actually matters.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="w-full max-w-[360px] lg:justify-self-end">
              <div className="overflow-hidden rounded-[36px] shadow-[0_28px_70px_rgba(124,58,237,0.14)]">
                <Image
                  src="/pratik-vaibhav.png"
                  alt="Pratik Vaibhav"
                  width={720}
                  height={900}
                  priority
                  className="h-[340px] w-full object-cover md:h-[420px]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="experience" className="section section-alt">
        <div className="container">
          <Reveal className="max-w-2xl space-y-5">
            <h2 className={typography.sectionTitle}>Professional Experience</h2>
            <p className={typography.sectionDescription}>
              A focused timeline of roles covering application security, DevSecOps, penetration
              testing, and security program delivery.
            </p>
          </Reveal>

          <div className="mt-10 border-t border-slate-200" />

          <Reveal delay={0.05} className="mt-12">
            <ExperienceSection />
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <Reveal className="max-w-2xl space-y-5">
            <h2 className={typography.sectionTitle}>Projects</h2>
            <p className={typography.sectionDescription}>
              A small set of projects focused on improving how security testing is performed,
              validated, and operationalized.
            </p>
          </Reveal>

          {featuredProject ? (
            <div className="mt-14 space-y-10">
              <div className="grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
                <Reveal>
                  <div className="rounded-[32px] bg-white/82 p-7 shadow-[0_18px_46px_rgba(124,58,237,0.08)]">
                    <div className="space-y-5">
                      <p className={typography.panelLabel}>Featured project</p>
                      <h3 className="text-[2rem] font-semibold tracking-tight text-slate-900 md:text-[2.4rem]">
                        {featuredProject.title}
                      </h3>
                      <p className="max-w-2xl text-base leading-8 text-slate-700">
                        {featuredProject.excerpt}
                      </p>
                      {featuredKeywords.length ? (
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-700">
                          {featuredKeywords.join(" / ")}
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                      <div className="space-y-2">
                        <p className={typography.panelLabel}>What it does</p>
                        <p className={typography.cardText}>{featuredProject.problem}</p>
                      </div>
                      <div className="space-y-2">
                        <p className={typography.panelLabel}>How it works</p>
                        <p className={typography.cardText}>
                          {featuredProject.architecture.processing[0]}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className={typography.panelLabel}>Why it matters</p>
                        <p className={typography.cardText}>{featuredProject.securityImpact[0]}</p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      {featuredProject.readmeUrl ? (
                        <Button asChild variant="secondary" size="sm">
                          <Link href={featuredProject.readmeUrl} target="_blank" rel="noreferrer">
                            View README
                          </Link>
                        </Button>
                      ) : null}
                      <Button asChild size="sm">
                        <Link href={featuredProject.github} target="_blank" rel="noreferrer">
                          View repo
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="space-y-6 lg:pt-10">
                    <div className="space-y-3">
                      <p className={typography.panelLabel}>System</p>
                      <p className={typography.cardText}>
                        Autonomous penetration testing workflows built around target modeling,
                        attack-surface expansion, and evidence-backed validation.
                      </p>
                    </div>
                    <div className="h-px w-full bg-slate-200" />
                    <div className="space-y-3">
                      <p className={typography.panelLabel}>Workflow</p>
                      <p className={typography.cardText}>
                        Agentic orchestration coordinates crawling, tool execution, finding
                        correlation, and operator-readable reporting.
                      </p>
                    </div>
                    <div className="h-px w-full bg-slate-200" />
                    <div className="space-y-3">
                      <p className={typography.panelLabel}>Impact</p>
                      <p className={typography.cardText}>
                        The goal is to surface stronger vulnerability evidence and reduce the gap
                        between scanner output and real offensive validation.
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              {supportingProjects.length ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {supportingProjects.map((project, index) => (
                    <Reveal key={project.slug} delay={index * 0.06}>
                      <ProjectCard project={project} compact />
                    </Reveal>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <section id="awards" className="section section-alt">
        <div className="container">
          <Reveal>
            <AwardsSection />
          </Reveal>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
            <Reveal className="space-y-5">
              <h2 className={typography.sectionTitle}>Contact</h2>
              <p className={typography.sectionDescription}>
                Feel free to reach out if you&apos;re building something interesting.
              </p>

              <div className="space-y-4 pt-6">
                <p className={typography.panelLabel}>Resume</p>
                <Button asChild>
                  <Link href={resumePath} target="_blank" rel="noreferrer">
                    Download resume
                    <Download className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
