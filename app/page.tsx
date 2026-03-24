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

  return (
    <div>
      <section id="about" className="section">
        <div className="container">
          <Reveal className="text-container space-y-8">
            <h1 className={typography.pageTitle}>Application Security Engineer</h1>
            <p className={typography.pageDescription}>
              6+ years securing enterprise and government systems across application,
              infrastructure, and DevSecOps environments.
            </p>
            <div className="text-container text-base text-slate-600">
              <p>
                Most of my work involves testing production systems, identifying weaknesses that
                matter, and helping teams fix them in a way that scales.
              </p>
              <p>
                I don&apos;t rely on scanner output alone. I look at how applications behave, how
                attackers think, and whether a finding actually changes risk for the business.
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

          <Reveal delay={0.05} className="mt-14 max-w-5xl">
            <ExperienceSection />
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <Reveal className="text-container space-y-5">
            <h2 className={typography.sectionTitle}>Selected Work</h2>
            <p className={typography.sectionDescription}>
              A small set of projects focused on improving how security testing is performed,
              validated, and operationalized.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} compact />
              </Reveal>
            ))}
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
          <Reveal className="text-container space-y-5">
            <h2 className={typography.sectionTitle}>Contact and Resume</h2>
            <p className={typography.sectionDescription}>
              If you&apos;re hiring, collaborating, or want to discuss security problems, feel free
              to reach out.
            </p>
          </Reveal>

          <div className="mt-14 text-container space-y-14">
            <Reveal className="space-y-4">
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
              <div className="space-y-3">
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
