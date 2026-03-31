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
          <Reveal className="flex flex-col items-center text-center">
            <div className="w-full max-w-[160px] pt-8">
              <div className="overflow-hidden rounded-full shadow-[0_16px_40px_rgba(124,58,237,0.12)]">
                <Image
                  src="/pratik-vaibhav.png"
                  alt="Pratik Vaibhav"
                  width={320}
                  height={320}
                  priority
                  className="aspect-square w-full object-cover"
                />
              </div>
            </div>

            <div className="mt-6 flex max-w-[700px] flex-col items-center space-y-3">
              <h1 className={typography.pageTitle}>Hi, I&apos;m Pratik</h1>
              <p className="text-[1.45rem] font-semibold tracking-tight text-violet-700 md:text-[1.65rem]">
                Application Security Engineer
              </p>
              <p className="max-w-[700px] text-base font-medium leading-[1.6] text-slate-700">
                I work on securing real-world systems by identifying vulnerabilities,
                understanding attack behavior, and helping teams fix what actually matters.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="experience" className="section section-alt">
        <div className="container">
          <Reveal className="text-container space-y-5">
            <h2 className={typography.sectionTitle}>Professional Experience</h2>
            <p className={typography.sectionDescription}>
              A focused timeline of roles covering application security, DevSecOps, penetration
              testing, and security program delivery.
            </p>
          </Reveal>

          <div className="mt-8 border-t border-slate-200" />

          <Reveal delay={0.05} className="mt-10">
            <ExperienceSection />
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <Reveal className="text-container space-y-5">
            <h2 className={typography.sectionTitle}>Projects</h2>
            <p className={typography.sectionDescription}>
              A small set of projects focused on improving how security testing is performed,
              validated, and operationalized.
            </p>
          </Reveal>

          {featuredProject ? (
            <div className="mt-12 space-y-8">
              <Reveal>
                <div className="rounded-[28px] bg-white/82 p-6 shadow-[0_14px_36px_rgba(124,58,237,0.08)] md:p-7">
                  <div className="space-y-4">
                    <p className={typography.panelLabel}>Featured project</p>
                    <h3 className="text-[1.75rem] font-semibold tracking-tight text-slate-900 md:text-[2rem]">
                      {featuredProject.title}
                    </h3>
                    <p className="max-w-[700px] text-base leading-[1.6] text-slate-700">
                      Clinkz is an autonomous offensive testing system that coordinates discovery,
                      validation, and reporting across agent-driven security workflows.
                    </p>
                    <p className={typography.cardText}>{featuredProject.architecture.processing[0]}</p>
                    <p className={typography.cardText}>{featuredProject.securityImpact[0]}</p>
                    {featuredKeywords.length ? (
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-700">
                        {featuredKeywords.join(" / ")}
                      </p>
                    ) : null}
                  </div>

                  <ul className="mt-6 space-y-2 pl-5 text-sm leading-7 text-slate-600 marker:text-violet-600">
                    <li>Agent-driven testing workflows</li>
                    <li>Dynamic vulnerability discovery</li>
                    <li>Evidence-based reporting system</li>
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
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

              {supportingProjects.length ? (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
          <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
            <Reveal className="text-container space-y-5">
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
