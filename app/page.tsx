import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowUpRight, Download, GitFork, Github, ShieldCheck, Star } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { AwardsSection } from "@/components/sections/awards";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectCard } from "@/components/sections/project-card";
import { SkillsSection } from "@/components/sections/skills";
import { Button } from "@/components/ui/button";
import { getGithubActivity, getGithubProfileStats } from "@/lib/github";
import { getFeaturedProjects } from "@/lib/projects";
import { typography } from "@/styles/design-system";

export const revalidate = 3600;

const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";

export default async function HomePage() {
  const [projects, githubStats, githubActivity] = await Promise.all([
    getFeaturedProjects(),
    getGithubProfileStats(),
    getGithubActivity(),
  ]);
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
      label: "Public repos",
      value: githubStats?.totalRepositories ?? projects.length,
    },
    {
      label: "GitHub stars",
      value: githubStats?.stars ?? projects.reduce((total, project) => total + (project.stars ?? 0), 0),
    },
    {
      label: "Pull requests",
      value: githubStats?.pullRequests ?? "Live",
    },
    {
      label: "Activity streak",
      value: githubStats?.contributionStreak ? `${githubStats.contributionStreak}d` : "Synced",
    },
  ];

  return (
    <div>
      <section id="about" className="section hero-section">
        <div className="container relative z-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <Reveal className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 shadow-sm backdrop-blur">
                <ShieldCheck className="h-4 w-4" />
                Application Security Engineer
              </div>

              <div className="space-y-5">
                <h1 className="max-w-[860px] text-[3.2rem] font-black leading-[0.94] tracking-[-0.06em] text-slate-950 md:text-[5.5rem]">
                  I build secure systems and prove where they break.
                </h1>
                <p className="max-w-[680px] text-lg font-medium leading-8 text-slate-700 md:text-xl">
                  I work across AppSec, DevSecOps, offensive testing, and security
                  automation, turning vulnerability noise into engineering decisions teams
                  can act on.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="#projects">
                    View live GitHub work
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

              <div className="grid gap-3 sm:grid-cols-4">
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
              <div className="relative mx-auto max-w-[360px]">
                <div className="absolute inset-[-22px] rounded-[44px] bg-gradient-to-br from-cyan-300/35 via-blue-500/20 to-amber-200/35 blur-2xl" />
                <div className="relative overflow-hidden rounded-[36px] border border-white/80 bg-slate-950 p-3 shadow-[0_34px_90px_rgba(15,23,42,0.26)]">
                  <Image
                    src="/pratik-vaibhav.png"
                    alt="Pratik Vaibhav"
                    width={520}
                    height={620}
                    priority
                    sizes="(max-width: 1024px) 320px, 360px"
                    className="aspect-[4/5] rounded-[28px] object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-slate-950/82 p-4 text-white shadow-2xl backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                      Current focus
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      Agentic security testing, evidence-led vulnerability validation, and
                      AppSec workflow automation.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
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
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800">
              <Github className="h-4 w-4" />
              Auto-synced from GitHub
            </div>
            <h2 className={typography.sectionTitle}>Live Engineering Work</h2>
            <p className={typography.sectionDescription}>
              Repositories are refreshed through the GitHub API and ranked by recency,
              stars, forks, and metadata quality so the portfolio keeps pace with active
              work.
            </p>
          </Reveal>

          {featuredProject ? (
            <div className="mt-10 space-y-8">
              <Reveal>
                <div className="relative overflow-hidden rounded-[34px] border border-slate-900/10 bg-slate-950 p-5 text-white shadow-[0_32px_90px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1 md:p-7">
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
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {supportingProjects.map((project, index) => (
                    <Reveal key={project.slug} delay={index * 0.06} className="opacity-90">
                      <ProjectCard project={project} compact />
                    </Reveal>
                  ))}
                </div>
              ) : null}

              {githubActivity.length ? (
                <Reveal delay={0.08}>
                  <div className="rounded-[28px] border border-slate-200/80 bg-white/76 p-5 shadow-[0_18px_46px_rgba(15,23,42,0.08)] backdrop-blur">
                    <div className="mb-4 flex items-center gap-2">
                      <Activity className="h-4 w-4 text-cyan-700" />
                      <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-900">
                        Recent GitHub activity
                      </h3>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      {githubActivity.slice(0, 4).map((item) => (
                        <Link
                          key={`${item.type}-${item.repo}-${item.createdAt}`}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:text-slate-950"
                        >
                          {item.message}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
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
