import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { AwardsSection } from "@/components/sections/awards";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectCard } from "@/components/sections/project-card";
import { SkillsSection } from "@/components/sections/skills";
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
            <div className="w-full max-w-[136px] pt-14 md:max-w-[140px]">
              <div className="relative animate-[hero-scale-in_0.72s_ease-out_both]">
                <div className="pointer-events-none absolute inset-[-18px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),rgba(124,58,237,0.04)_58%,transparent_76%)] blur-2xl" />
                <div className="overflow-hidden rounded-full shadow-[0_18px_42px_rgba(124,58,237,0.14)]">
                  <Image
                    src="/pratik-vaibhav.png"
                    alt="Pratik Vaibhav"
                    width={160}
                    height={160}
                    priority
                    sizes="(max-width: 768px) 120px, 160px"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex max-w-[680px] flex-col items-center space-y-4">
              <h1 className={`${typography.pageTitle} tracking-[0.03em]`}>Hi, I&apos;m Pratik.</h1>
              <p className="max-w-[640px] text-[1.45rem] font-semibold leading-8 tracking-tight text-violet-700 md:text-[1.8rem]">
                Application Security Engineer specializing in securing enterprise and
                government systems across application, infrastructure, and DevSecOps
                environments.
              </p>
              <p className="max-w-[620px] text-sm font-medium leading-6 text-slate-700 md:text-[0.95rem]">
                I design security architectures, lead testing strategies, and build
                automation that improves how vulnerabilities are identified and fixed at
                scale.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <SkillsSection />
          </Reveal>
        </div>
      </section>

      <section id="experience" className="section section-alt">
        <div className="container">
          <Reveal className="text-container space-y-5">
            <h2 className={typography.sectionTitle}>Professional Experience</h2>
            <p className={typography.sectionDescription}>
              Security leadership across enterprise and government systems spanning
              architecture decisions, testing strategy, and production risk management.
            </p>
          </Reveal>

          <div className="mt-10 border-t border-slate-200" />

          <Reveal delay={0.05} className="mt-9">
            <ExperienceSection />
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <Reveal className="text-container space-y-5">
            <h2 className={typography.sectionTitle}>Projects</h2>
            <p className={typography.sectionDescription}>
              Security tooling focused on autonomous testing, validation depth, and better
              vulnerability signal.
            </p>
          </Reveal>

          {featuredProject ? (
            <div className="mt-10 space-y-8">
              <Reveal>
                <div className="rounded-[28px] border border-violet-200/70 bg-white/88 p-5 shadow-[0_18px_42px_rgba(124,58,237,0.12)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(124,58,237,0.16)] md:p-6">
                  <div className="space-y-3">
                    <p className={typography.panelLabel}>Flagship Project</p>
                    <h3 className="text-[2.05rem] font-semibold tracking-tight text-slate-900 md:text-[2.25rem]">
                      {featuredProject.title}
                    </h3>
                    <p className="max-w-[560px] text-sm leading-6 text-slate-700 md:text-[0.95rem]">
                      An autonomous penetration testing system using agentic AI to dynamically
                      adapt testing strategies based on real-world attack methodologies.
                    </p>
                    {featuredKeywords.length ? (
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-700">
                        {featuredKeywords.join(" / ")}
                      </p>
                    ) : null}
                  </div>

                  <ul className="mt-5 space-y-2 pl-5 text-sm leading-6 text-slate-600 marker:text-violet-600">
                    <li>Correlates CVEs, bug bounty writeups, and exploit research</li>
                    <li>Automates reconnaissance, fuzzing, and vulnerability validation</li>
                    <li>Designed to reduce manual pentesting effort</li>
                    <li>Focuses on discovering non-obvious vulnerabilities</li>
                    <li>Continuously evolves testing methodology using AI reasoning</li>
                  </ul>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {featuredProject.readmeUrl ? (
                      <Button asChild variant="secondary" size="sm">
                        <Link
                          href={featuredProject.readmeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View README
                        </Link>
                      </Button>
                    ) : null}
                    <Button asChild size="sm">
                      <Link
                        href={featuredProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View repo
                      </Link>
                    </Button>
                  </div>
                </div>
              </Reveal>

              {supportingProjects.length ? (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {supportingProjects.map((project, index) => (
                    <Reveal key={project.slug} delay={index * 0.06} className="opacity-90">
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
                If you&apos;re hiring, collaborating, or want to discuss security problems,
                feel free to reach out.
              </p>

              <div className="space-y-4 pt-6">
                <p className={typography.panelLabel}>Resume</p>
                <Button asChild>
                  <Link href={resumePath} target="_blank" rel="noopener noreferrer">
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
