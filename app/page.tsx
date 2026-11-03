import { ArrowUpRight, Mail } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { HeroProfileSection } from "@/components/sections/hero-profile";
import { ExperienceSection } from "@/components/sections/experience";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectCard } from "@/components/sections/project-card";
import { InteractiveLabSection } from "@/components/sections/interactive-lab";
import { GithubActivitySection } from "@/components/sections/github-activity";
import { AwardsSection } from "@/components/sections/awards";
import { SectionHeader } from "@/components/ui/section-header";
import { getFeaturedProjects } from "@/lib/projects";
import { getGithubContributions, getGithubUserProfile } from "@/lib/github";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";

export default async function HomePage() {
  const [projects, contributionCalendar, githubProfile] = await Promise.all([
    getFeaturedProjects(),
    getGithubContributions(),
    getGithubUserProfile(),
  ]);

  const featuredProject =
    projects.find((project) => project.slug.toLowerCase() === "clinkz") ?? projects[0];
  const supportingProjects = projects
    .filter((project) => project.slug !== featuredProject?.slug)
    .slice(0, 4);

  return (
    <>
      <HeroProfileSection resumePath={resumePath} />

      <section id="experience" className="section">
        <div className="container">
          <Reveal>
            <ExperienceSection />
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <Reveal>
            <SectionHeader
              index="02"
              eyebrow="Projects"
              title="Open-source security tooling."
              description="Autonomous pentesting, DAST parsers, and triage tools built to produce evidence you can reproduce."
              action={
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  All repositories <ArrowUpRight className="h-4 w-4" />
                </a>
              }
            />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {featuredProject ? (
              <Reveal className="md:col-span-2">
                <ProjectCard project={featuredProject} featured />
              </Reveal>
            ) : null}
            {supportingProjects.map((project) => (
              <Reveal key={project.slug}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <GithubActivitySection calendar={contributionCalendar} userProfile={githubProfile} />
          </Reveal>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="container">
          <Reveal>
            <SkillsSection />
          </Reveal>
        </div>
      </section>

      <section id="interactive-console" className="section">
        <div className="container">
          <Reveal>
            <InteractiveLabSection />
          </Reveal>
        </div>
      </section>

      <section id="awards" className="section">
        <div className="container">
          <Reveal>
            <AwardsSection />
          </Reveal>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div>
                <SectionHeader
                  index="06"
                  eyebrow="Contact"
                  title="Let’s talk."
                  description="Product security, incident response, AppSec leadership, speaking, or security automation. I usually reply within a day."
                  className="mb-8 md:mb-8"
                />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex max-w-full items-center gap-2 break-all text-lg font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
                >
                  <Mail className="h-5 w-5 shrink-0 text-primary" />
                  {siteConfig.email}
                </a>
              </div>

              <div className="surface p-5 sm:p-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
