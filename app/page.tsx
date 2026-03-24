import Link from "next/link";
import { Download, Github, Linkedin, Mail } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { AwardsSection } from "@/components/sections/awards";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectCard } from "@/components/sections/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { typography } from "@/styles/design-system";

export const revalidate = 3600;

const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";

const contactLinks = [
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    value: siteConfig.email,
    icon: Mail,
  },
  {
    label: "GitHub",
    href: siteConfig.social.github,
    value: "github.com/ptkvaibhav",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    value: "linkedin.com/in/ptkvaibhav",
    icon: Linkedin,
  },
] as const;

export default async function HomePage() {
  const projects = await getFeaturedProjects();

  return (
    <div>
      <section id="about" className="section">
        <div className="container">
          <Reveal className="space-y-16">
            <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="w-fit">About</Badge>
                  <h1 className={typography.pageTitle}>Application Security Engineer</h1>
                  <p className="max-w-3xl text-xl font-semibold leading-8 text-zinc-100">
                    6+ years securing enterprise and government systems across application,
                    infrastructure, and DevSecOps environments.
                  </p>
                </div>
                <div className="space-y-5 text-base leading-8 text-stone-300/90">
                  <p>I work in application security with a focus on real-world risk.</p>
                  <p>
                    Most of my work involves testing production systems, identifying weaknesses
                    that matter, and helping teams fix them in a way that scales.
                  </p>
                  <p>
                    I don&apos;t rely on scanner output alone. I look at how applications behave,
                    how attackers think, and whether a finding actually changes risk for the
                    business.
                  </p>
                </div>
              </div>

              <div className="space-y-5 pt-2 text-base leading-8 text-stone-300/90">
                <p>
                  My experience spans secure SDLC, penetration testing, and security program
                  design across large systems.
                </p>
                <p>
                  I&apos;ve led product security efforts for US government-facing applications,
                  built internal tooling to improve signal quality, and helped engineering teams
                  move from noise to actionable security decisions.
                </p>
                <p>Security should improve how teams build &mdash; not slow them down.</p>
              </div>
            </div>

            <div className="max-w-3xl space-y-6 text-base leading-8 text-stone-300/90">
              <h2 className={typography.sectionTitle}>Security engineering focused on real systems.</h2>
              <p>
                I work in application security with a focus on how systems behave under real
                conditions.
              </p>
              <p>
                Over the past 6+ years, I&apos;ve worked across application security, DevSecOps,
                and penetration testing in environments where security decisions have real impact
                &mdash; particularly in US government-facing systems.
              </p>
              <p>
                My work is less about identifying issues and more about validating risk. I focus
                on understanding how a system can fail, whether a vulnerability is actually
                exploitable, and how teams can fix issues without slowing down development.
              </p>
              <p>
                I&apos;ve led security efforts across large applications, built internal tooling to
                reduce false positives, and helped teams move from reactive testing to structured
                security programs.
              </p>
              <div className="space-y-3">
                <p>I&apos;m particularly interested in:</p>
                <ul className="space-y-2">
                  <li>- Application behavior under attack</li>
                  <li>- Reducing noise in vulnerability management</li>
                  <li>- Building systems that improve security decision-making</li>
                </ul>
              </div>
              <p>
                Security, to me, is about clarity &mdash; understanding what matters, and acting
                on it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="container">
          <Reveal className="space-y-4">
            <Badge className="w-fit">Experience</Badge>
            <h2 className={typography.sectionTitle}>Professional experience</h2>
            <p className={typography.sectionDescription}>
              A focused timeline of roles covering application security, DevSecOps, penetration
              testing, and security program delivery.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-16">
            <ExperienceSection />
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <Reveal className="space-y-4">
            <Badge className="w-fit">Projects</Badge>
            <h2 className={typography.sectionTitle}>Selected work</h2>
            <p className={typography.sectionDescription}>
              A small set of projects focused on improving how security testing is performed,
              validated, and operationalized.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} compact />
              </Reveal>
            ))}
          </div>
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
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="space-y-10">
              <div className="space-y-4">
                <Badge className="w-fit">Contact</Badge>
                <h2 className={typography.sectionTitle}>Contact and resume</h2>
                <p className={typography.sectionDescription}>
                  If you&apos;re hiring, collaborating, or want to discuss security problems, feel
                  free to reach out.
                </p>
              </div>

              <div className="space-y-4 rounded-xl border border-white/10 p-6 md:p-8">
                <div className="space-y-3">
                  <h3 className={typography.cardTitle}>Resume</h3>
                  <p className={typography.cardText}>
                    Download my resume for a concise overview of experience, projects, and impact.
                  </p>
                </div>
                <Button asChild>
                  <Link href={resumePath} target="_blank" rel="noreferrer">
                    Download resume
                    <Download className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                <p className={typography.panelLabel}>Direct links</p>
                <div className="space-y-3">
                  {contactLinks.map((channel) => {
                    const Icon = channel.icon;

                    return (
                      <Link
                        key={channel.label}
                        href={channel.href}
                        target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={channel.href.startsWith("mailto:") ? undefined : "noreferrer"}
                        className="flex items-center gap-4 rounded-xl border border-white/10 p-4 transition hover:border-emerald-400/30"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-emerald-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-zinc-500">{channel.label}</p>
                          <p className="text-base text-zinc-100">{channel.value}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-xl border border-white/10 p-6 md:p-8">
                <div className="mb-6 space-y-3">
                  <h3 className={typography.cardTitle}>Send a message</h3>
                  <p className={typography.cardText}>
                    If you&apos;re hiring, collaborating, or want to discuss security problems,
                    feel free to reach out.
                  </p>
                </div>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
