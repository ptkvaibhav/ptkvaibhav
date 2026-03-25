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

  return (
    <div>
      <section id="about" className="section">
        <div className="container">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="overflow-hidden rounded-full shadow-[0_22px_60px_rgba(124,58,237,0.18)]">
              <Image
                src="/pratik-vaibhav.png"
                alt="Pratik Vaibhav"
                width={190}
                height={190}
                priority
                className="h-[190px] w-[190px] object-cover"
              />
            </div>

            <div className="mt-8 space-y-4">
              <h1 className={typography.pageTitle}>Hi there, I&apos;m Pratik</h1>
              <p className="text-2xl font-semibold tracking-tight text-violet-700 md:text-3xl">
                I&apos;m an Application Security Engineer
              </p>
              <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-700">
                I have 6+ years of experience securing enterprise and government systems across
                application security, DevSecOps, and offensive testing.
              </p>
              <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-700">
                I focus on finding real vulnerabilities, understanding how systems behave under
                attack, and helping teams fix what actually matters.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="experience" className="section section-alt">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl space-y-5 text-center">
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
          <Reveal className="mx-auto max-w-3xl space-y-5 text-center">
            <h2 className={typography.sectionTitle}>Projects</h2>
            <p className={typography.sectionDescription}>
              A small set of projects focused on improving how security testing is performed,
              validated, and operationalized.
            </p>
          </Reveal>

          <div className="mx-auto mt-14 max-w-5xl space-y-8">
            {featuredProject ? (
              <Reveal>
                <ProjectCard project={featuredProject} featured />
              </Reveal>
            ) : null}

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
          <Reveal className="mx-auto max-w-3xl space-y-5 text-center">
            <h2 className={typography.sectionTitle}>Contact</h2>
            <p className={typography.sectionDescription}>
              If you&apos;re hiring, collaborating, or want to discuss security problems, feel free
              to reach out.
            </p>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-5xl gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
            <Reveal className="space-y-4 text-center lg:text-left">
              <p className={typography.panelLabel}>Resume</p>
              <p className={typography.cardText}>
                Download my resume for a concise overview of experience, projects, and impact.
              </p>
              <Button asChild>
                <Link href={resumePath} target="_blank" rel="noreferrer">
                  Download resume
                  <Download className="h-4 w-4" />
                </Link>
              </Button>
            </Reveal>

            <Reveal delay={0.05} className="space-y-6">
              <div className="space-y-3 text-center lg:text-left">
                <p className={typography.panelLabel}>Form</p>
                <p className={typography.cardText}>
                  If you&apos;re hiring, collaborating, or want to discuss security problems, feel
                  free to reach out.
                </p>
              </div>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
