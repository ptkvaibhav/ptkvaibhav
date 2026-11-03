"use client";

import Image from "next/image";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";

import { useSound } from "@/components/providers/sound-provider";
import { siteConfig } from "@/lib/site";

const stats = [
  { value: "100+", label: "PSIRT incidents handled", detail: "33% faster MTTR" },
  { value: "70→38d", label: "Secret invalidation time", detail: "TruffleHog program" },
  { value: "~0%", label: "False positives", detail: "Down from 30%" },
  { value: "Top 1%", label: "Performance rating", detail: "Deloitte" },
];

const socialLink =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground";

export function HeroProfileSection({ resumePath = "/resume/Pratik_Vaibhav_Resume.pdf" }: { resumePath?: string }) {
  const { playSound } = useSound();
  const click = () => playSound("click");

  return (
    <section id="about" className="relative scroll-mt-16 pb-16 pt-10 md:pb-24 md:pt-20">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          <div className="min-w-0">
            {/* Mobile portrait sits inline with the status line */}
            <div className="mb-8 flex items-center gap-4 lg:hidden">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-card">
                <Image
                  src="/pratik-vaibhav.png"
                  alt="Pratik Vaibhav"
                  fill
                  sizes="64px"
                  priority
                  className="object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground">Pratik Vaibhav</p>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" /> Bangalore, India
                </p>
              </div>
            </div>

            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Senior Product Security Engineer · Guidewire
            </p>

            <h1 className="mt-6 text-[2.5rem] font-bold leading-[1.04] tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              I build secure systems and{" "}
              <span className="text-primary">prove where they break.</span>
            </h1>

            <p className="mt-6 max-w-[620px] text-base leading-relaxed text-muted-foreground sm:text-lg">
              I work on the Product Security Incident Response Team at{" "}
              <span className="font-medium text-foreground">Guidewire Software</span>, after nearly seven years in
              application security at <span className="font-medium text-foreground">Deloitte</span>. My focus is
              incident response, secret governance, scanner correlation, and AI agents that take the toil out of
              vulnerability triage.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#projects"
                onClick={click}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                See my work <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={click}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
              <div className="flex items-center justify-center gap-2 pt-2 sm:ml-2 sm:pt-0">
                <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" onClick={click} className={socialLink} aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" onClick={click} className={socialLink} aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href={`mailto:${siteConfig.email}`} onClick={click} className={socialLink} aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Desktop portrait */}
          <div className="relative hidden lg:block">
            <div aria-hidden className="absolute -inset-6 rounded-[40px] bg-primary/10 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card">
              <Image
                src="/pratik-vaibhav.png"
                alt="Pratik Vaibhav"
                fill
                sizes="340px"
                priority
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 pt-16">
                <p className="font-semibold text-white">Pratik Vaibhav</p>
                <p className="flex items-center gap-1 text-sm text-white/70">
                  <MapPin className="h-3.5 w-3.5" /> Bangalore, India
                </p>
              </div>
            </div>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-border md:mt-20 lg:grid-cols-4 [&>div]:bg-card gap-px">
          {stats.map((stat) => (
            <div key={stat.label} className="p-5 md:p-6">
              <dt className="text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
              <dd className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{stat.value}</dd>
              <dd className="mt-1 font-mono text-[11px] text-muted-foreground">{stat.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
