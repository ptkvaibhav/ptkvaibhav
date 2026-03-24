import type { Metadata } from "next";
import Link from "next/link";
import { Download, Github, Linkedin, Mail } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";
import { spacing, typography } from "@/styles/design-system";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name}, download the resume, and get in touch for application security or offensive security work.`,
};

const resumePath = "/resume/Pratik_Vaibhav_Resume.pdf";

const channels = [
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
];

export default function ContactPage() {
  return (
    <section className={`container ${spacing.section}`}>
      <Reveal className={spacing.sectionHeader}>
        <Badge className="w-fit">Contact</Badge>
        <h1 className={typography.pageTitle}>Contact, resume, and direct links.</h1>
        <p className={typography.pageDescription}>
          Everything is in one place here: resume access, the contact form, and direct links to
          reach out.
        </p>
      </Reveal>

      <Reveal>
        <Card className="p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className={typography.sectionTitle}>Resume</h2>
            <Button asChild size="lg">
              <Link href={resumePath} target="_blank" rel="noreferrer">
                Download resume
                <Download className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal delay={0.04}>
          <Card className="p-8">
            <CardHeader className="space-y-3">
              <CardTitle className={typography.cardTitle}>Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.06}>
          <Card className="p-8">
            <CardHeader className="space-y-3">
              <CardTitle className={typography.cardTitle}>Direct links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {channels.map((channel) => {
                const Icon = channel.icon;

                return (
                  <Link
                    key={channel.label}
                    href={channel.href}
                    target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={channel.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-emerald-400/30 hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-background text-emerald-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-zinc-500">{channel.label}</p>
                        <p className="text-base text-zinc-100 transition group-hover:text-white">
                          {channel.value}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
