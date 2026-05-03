import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, GitFork, Github, ShieldCheck, Star } from "lucide-react";

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
    .slice(0, 5);
  const featuredKeywords = featuredProject
    ? featuredProject.tags
        .filter((tag) => tag.toLowerCase() !== featuredProject.language?.toLowerCase())
        .slice(0, 5)
    : [];
  const stats = [
    {
      label: "Security delivery",
      value: "6+ yrs",
    },
    {
      label: "False positives cut",
      value: "30%",
    },
    {
      label: "Performance band",
      value: "Top 1%",
    },
    {
      label: "Team mentored",
      value: "14",
    },
  ];

  return (
    <div>
      <section id="about" className="section hero-section">
        <div className="container relative z-10">
          <div className="hero-card p-5 md:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center xl:grid-cols-[minmax(0,1fr)_360px]">
              <Reveal className="min-w-0 space-y-7">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-200/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 shadow-sm backdrop-blur">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span className="truncate">Application Security Engineer</span>
                </div>

                <div className="space-y-5">
                  <h1 className="max-w-[760px] text-[clamp(2.7rem,7vw,5.15rem)] font-black leading-[0.94] tracking-[-0.065em] text-slate-950">
                    I build secure systems and prove where they break.
                  </h1>
                  <p className="max-w-[660px] text-base font-medium leading-8 text-slate-700 md:text-lg">
                    I work across AppSec, DevSecOps, offensive testing, and security
                    automation, turning vulnerability noise into engineering decisions teams
                    can act on.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="#projects">
                      View security projects
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link href={resumePath} target="_blank" rel="noopener noreferrer">
                      Download resume
                      <Download className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-3xl border border-white/70 bg-white/72 p-4 shadow-[0_16px_44px_rgba(15,23,42,0.08)] backdrop-blur"
                    >
                      <p className="text-2xl font-black tracking-tight text-slate-950">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="relative mx-auto w-full max-w-[360px]">
                  <div className="absolute inset-[-18px] rounded-[42px] bg-gradient-to-br from-cyan-300/35 via-blue-500/20 to-amber-200/35 blur-2xl" />
                  <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-slate-950 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.24)]">
                    <Image
                      src="/pratik-vaibhav.png"
                      alt="Pratik Vaibhav"
                      width={520}
                      height={620}
                      priority
                      sizes="(max-width: 1024px) 300px, 360px"
                      className="aspect-[4/5] w-full rounded-[24px] object-cover"
                    />
                    <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-slate-950/84 p-4 text-white shadow-2xl backdrop-blur">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                        Current focus
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">
                        Agentic security testing, evidence-led validation, and AppSec workflow
                        automation.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-panel p-5 md:p-8">
            <SkillsSection />
          </Reveal>
        </div>
      </section>

      <section id="experience" className="section section-alt">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center space-y-5">
            <h2 className={typography.sectionTitle}>Professional Experience</h2>
            <p className={typography.sectionDescription}>
              Security leadership across enterprise and government systems spanning
              architecture decisions, testing strategy, and production risk management.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="section-panel mt-9 p-5 md:p-8">
            <ExperienceSection />
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800">
              <Github className="h-4 w-4" />
              Auto-synced from GitHub
            </div>
            <h2 className={typography.sectionTitle}>Security Projects</h2>
            <p className={`${typography.sectionDescription} mx-auto`}>
              A focused selection of security tools and engineering projects. GitHub data
              keeps stars, forks, language, README links, and source downloads current
              without turning this into an activity log.
            </p>
          </Reveal>

          {featuredProject ? (
            <div className="mt-10 space-y-6">
              <Reveal>
                <div className="relative overflow-hidden rounded-[34px] border border-slate-900/10 bg-slate-950 p-5 text-white shadow-[0_32px_90px_rgba(15,23,42,0.24)] transition duration-300 hover:-translate-y-1 md:p-8">
                  <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-28 left-12 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
                  <div className="relative space-y-3">
                    <p className={typography.panelLabel}>Flagship Project</p>
                    <h3 className="text-[2.25rem] font-black tracking-[-0.04em] text-white md:text-[3.2rem]">
                      {featuredProject.title}
                    </h3>
                    <p className="max-w-[680px] text-sm leading-6 text-slate-300 md:text-base">
                      {featuredProject.excerpt}
                    </p>
                    {featuredKeywords.length ? (
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                        {featuredKeywords.join(" / ")}
                      </p>
                    ) : null}
                  </div>

                  <div className="relative mt-6 flex flex-wrap gap-3 text-sm font-medium text-slate-200">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2">
                      <Star className="h-4 w-4 text-amber-300" />
                      {featuredProject.stars ?? 0} stars
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2">
                      <GitFork className="h-4 w-4 text-cyan-200" />
                      {featuredProject.forks ?? 0} forks
                    </span>
                    {featuredProject.language ? (
                      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2">
                        {featuredProject.language}
                      </span>
                    ) : null}
                  </div>

                  <ul className="relative mt-6 grid gap-2 pl-5 text-sm leading-6 text-slate-300 marker:text-cyan-300 md:grid-cols-2">
                    <li>Correlates CVEs, bug bounty writeups, and exploit research</li>
                    <li>Automates reconnaissance, fuzzing, and vulnerability validation</li>
                    <li>Designed to reduce manual pentesting effort</li>
                    <li>Focuses on discovering non-obvious vulnerabilities</li>
                  </ul>

                  <div className="relative mt-6 flex flex-wrap items-center gap-3">
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
                    {featuredProject.downloadUrl ? (
                      <Button asChild variant="secondary" size="sm">
                        <Link
                          href={featuredProject.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download source
                          <Download className="h-4 w-4" />
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
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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
          <Reveal className="section-panel p-5 md:p-8">
            <AwardsSection />
          </Reveal>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="section-panel grid gap-10 p-5 md:p-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
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
