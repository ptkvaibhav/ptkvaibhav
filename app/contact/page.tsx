import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} for application security, offensive security, or research collaborations.`,
};

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
  {
    label: "X",
    href: siteConfig.social.x,
    value: "x.com/ptkvaibhav",
    icon: Twitter,
  },
];

export default function ContactPage() {
  return (
    <section className="container py-20 md:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="space-y-6">
          <Badge variant="accent" className="w-fit">
            Contact
          </Badge>
          <div className="space-y-4">
            <h1 className="font-serif text-5xl tracking-tight text-white md:text-6xl">
              Let&apos;s talk about security work that requires depth.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-zinc-400">
              I am open to conversations around application security, offensive security,
              security automation, internal tooling, and research-heavy engineering work.
            </p>
          </div>
          <div className="grid gap-4">
            {channels.map((channel) => {
              const Icon = channel.icon;

              return (
                <Link
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={channel.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-emerald-400/30 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-background text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-500">{channel.label}</p>
                      <p className="text-base text-zinc-200 transition group-hover:text-white">
                        {channel.value}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <Card className="surface-grid p-8">
            <CardHeader className="space-y-3">
              <CardTitle>Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
