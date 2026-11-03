import { ArrowUpRight, Mail } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { HeroProfileSection } from "@/components/sections/hero-profile";
import { ExperienceSection } from "@/components/sections/experience";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectCard } from "@/components/sections/project-card";
import { GithubActivitySection } from "@/components/sections/github-activity";
import { AwardsSection } from "@/components/sections/awards";
import { Stamp } from "@/components/dossier/stamp";
import { SectionHeader } from "@/components/ui/section-header";
import { getFeaturedProjects } from "@/lib/projects";
import { getGithubUserProfile } from "@/lib/github";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";
const EXHIBIT_LETTERS = "ABCDEFGH";
const TILTS = [0.8, -0.7, 0.5, -0.9];

export default async function HomePage() {
  const [projects, githubProfile] = await Promise.all([getFeaturedProjects(), getGithubUserProfile()]);

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
              eyebrow="Evidence exhibits"
              title="Things I've built"
              note="all open source, go poke them"
              description="Autonomous pentesting, DAST parsers and triage tools. Open any exhibit for the case notes."
              action={
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-foreground underline decoration-stamp decoration-2 underline-offset-4"
                >
                  All repositories <ArrowUpRight className="h-4 w-4" />
                </a>
              }
            />
          </Reveal>

          <div className="grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2 md:gap-8">
            {featuredProject ? (
              <Reveal className="min-w-0 md:col-span-2">
                <ProjectCard project={featuredProject} exhibit="A" featured />
              </Reveal>
            ) : null}
            {supportingProjects.map((project, i) => (
              <Reveal key={project.slug} className="min-w-0">
                <ProjectCard project={project} exhibit={EXHIBIT_LETTERS[i + 1]} tilt={TILTS[i % TILTS.length]} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <GithubActivitySection userProfile={githubProfile} />
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
            <SectionHeader
              index="05"
              eyebrow="Request form 27-B"
              title="Get in touch"
              note="I actually reply"
              description="Product security, incident response, AppSec leadership, speaking, or security automation. Fill in the form or just email me."
            />
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-12">
              <div className="paper ruled relative px-5 py-7 sm:px-10 sm:py-10">
                <div className="mb-6 flex items-center justify-between gap-4 border-b-2 border-foreground pb-3">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground">Form 27-B · Request for contact</p>
                  <p className="hidden font-mono text-xs text-muted-foreground sm:block">Page 1 of 1</p>
                </div>
                <ContactForm />
              </div>

              <aside className="flex flex-col gap-6">
                <div className="paper p-6">
                  <p className="field-label">Prefer email?</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-3 inline-flex max-w-full items-center gap-2 break-all font-mono text-[15px] font-semibold text-foreground underline decoration-stamp decoration-2 underline-offset-4"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    {siteConfig.email}
                  </a>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Usually answered within a day. Recruiters: a role title and a sentence about the team is plenty.
                  </p>
                </div>
                <div className="flex justify-center py-4 lg:py-8">
                  <Stamp rotate={-12} className="px-5 py-3 text-4xl">Inbox open</Stamp>
                </div>
              </aside>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
