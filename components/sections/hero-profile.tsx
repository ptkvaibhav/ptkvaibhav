"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDown, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";

import { DecryptText } from "@/components/dossier/decrypt-text";
import { Redacted } from "@/components/dossier/redacted";
import { showToast } from "@/components/dossier/toast";
import { siteConfig } from "@/lib/site";

const findings = [
  { value: "100+", label: "Security incidents handled", note: "MTTR down 33%" },
  { value: "70→38", label: "Days to invalidate leaked secrets", note: "TruffleHog program" },
  { value: "30%→0", label: "False-positive rate", note: "SAST × DAST × SCA" },
  { value: "Top 1%", label: "Performance rating", note: "Deloitte" },
];

const fields = [
  { k: "Name", v: "Pratik Vaibhav" },
  { k: "Current post", v: "Senior Product Security Engineer, PSIRT" },
  { k: "Agency", v: "Guidewire Software" },
  { k: "Previously", v: "Deloitte · AppSec lead, 2019–2026" },
  { k: "Base", v: "Bangalore, India" },
];

function Paperclip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 110" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
      <path d="M28 30 V88 a10 10 0 0 1 -20 0 V20 a14 14 0 0 1 28 0 V80" />
    </svg>
  );
}

export function HeroProfileSection({ resumePath = "/resume/Pratik_Vaibhav_Resume.pdf" }: { resumePath?: string }) {
  const stampClicks = React.useRef(0);

  const onStampClick = () => {
    stampClicks.current += 1;
    if (stampClicks.current === 5) {
      stampClicks.current = 0;
      showToast({ title: "Ouch", body: "That stamp has been approved enough. flag{st4mp_0f_4ppr0v4l}" });
    }
  };

  return (
    <section id="about" className="relative z-[1] scroll-mt-20 pb-10 pt-8 md:pb-16 md:pt-14">
      <div className="container">
        {/* Folder tab peeking out behind the sheet */}
        <div className="relative">
          <div className="absolute -top-6 left-6 h-10 w-48 rounded-t-lg border-2 border-b-0 border-foreground/20 bg-manila px-4 pt-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70 md:left-10">
            Personnel file
          </div>

          <article className="paper relative px-5 pb-8 pt-6 sm:px-8 md:px-12 md:pb-12 md:pt-8">
            {/* File header strip */}
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-dashed border-foreground/30 pb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>
                Classification: <span className="text-foreground">Public</span> (mostly)
              </span>
              <span>File no. PV-2019-SEC</span>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14">
              {/* Polaroid + form fields */}
              <div className="flex flex-col gap-8 sm:flex-row lg:flex-col">
                <figure className="relative mx-auto w-[220px] shrink-0 -rotate-3 bg-white p-3 pb-12 shadow-lift transition-transform duration-300 hover:rotate-0 sm:mx-0 lg:mx-auto lg:w-[260px]">
                  <Paperclip className="absolute -top-7 left-8 z-10 h-20 w-7 text-zinc-400" />
                  <div className="relative aspect-square overflow-hidden bg-zinc-900">
                    <Image
                      src="/pratik-vaibhav.png"
                      alt="Portrait of Pratik Vaibhav"
                      fill
                      sizes="(min-width: 1024px) 236px, 196px"
                      priority
                      className="object-cover object-top grayscale-[35%] contrast-[1.05]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={onStampClick}
                    aria-label="Status: active"
                    data-cursor="Stamp it"
                    className="absolute -bottom-6 -right-3 z-10 sm:-right-12"
                  >
                    <span className="stamp animate-stamp-in bg-paper/40 px-2.5 py-1 text-xl sm:px-3 sm:py-1.5 sm:text-2xl [animation-delay:500ms] lg:text-3xl" style={{ ["--stamp-rot" as string]: "-14deg" }}>
                      Active duty
                    </span>
                  </button>
                  <figcaption className="absolute inset-x-0 bottom-2 text-center font-hand text-xl text-zinc-700">
                    subject, probably mid-triage
                  </figcaption>
                </figure>

                <dl className="w-full space-y-3 self-center font-mono text-sm">
                  {fields.map((f) => (
                    <div key={f.k} className="flex flex-col border-b border-foreground/15 pb-2 sm:flex-row sm:gap-3 lg:flex-col lg:gap-0">
                      <dt className="field-label w-32 shrink-0 pt-0.5">{f.k}</dt>
                      <dd className="text-foreground">{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Statement */}
              <div className="relative min-w-0">

                <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-stamp sm:text-sm">
                  <DecryptText text={"> Decrypting subject profile... OK"} duration={1100} />
                </p>

                <h1 className="mt-5 font-display text-[3.1rem] font-black uppercase leading-[0.88] tracking-tight text-foreground sm:text-7xl lg:text-[5.6rem]">
                  I build secure systems
                  <br className="hidden sm:block" /> and prove where{" "}
                  <span className="relative inline-block">
                    <span className="relative z-[1]">they break.</span>
                    <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full text-stamp sm:h-4">
                      <path d="M2 14 C 60 4, 120 18, 180 8 S 270 6, 298 12" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>

                <p className="mt-7 max-w-[640px] text-[17px] leading-relaxed text-foreground/85">
                  Senior Product Security Engineer on the <span className="highlight">incident response team at Guidewire</span>,
                  and before that nearly seven years of application security at Deloitte. I triage incidents, chase leaked secrets,
                  correlate scanner noise into real findings, and build AI agents that do the boring parts.
                </p>
                <p className="mt-3 font-mono text-sm text-muted-foreground">
                  Known weaknesses: <Redacted>filter coffee and a well-written post-mortem</Redacted>
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href="#experience"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md border-2 border-foreground bg-foreground px-6 font-mono text-sm font-semibold text-paper shadow-[4px_4px_0_0_hsl(var(--stamp))] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                  >
                    Read the file <ArrowDown className="h-4 w-4" />
                  </a>
                  <a
                    href={resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md border-2 border-foreground bg-paper px-6 font-mono text-sm font-semibold text-foreground transition-colors hover:bg-manila/50"
                  >
                    <Download className="h-4 w-4" /> Resume (PDF)
                  </a>
                  <div className="flex items-center justify-center gap-1 pt-1 sm:pt-0">
                    {[
                      { href: siteConfig.social.github, label: "GitHub", Icon: GithubIcon, external: true },
                      { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon, external: true },
                      { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail, external: false },
                    ].map(({ href, label, Icon, external }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
                <p aria-hidden className="mt-3 hidden -rotate-2 font-hand text-2xl text-blueink sm:block">
                  ↑ recruiters, start here. it&apos;s a quick read, promise.
                </p>
              </div>
            </div>

            {/* Key findings */}
            <div className="mt-12 border-t-2 border-foreground pt-6">
              <p className="field-label">Key findings</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
                {findings.map((f, i) => (
                  <div key={f.label} className="relative">
                    <dd className="font-display text-4xl font-black text-foreground sm:text-5xl">
                      <span className={i === 0 ? "highlight" : undefined}>{f.value}</span>
                    </dd>
                    <dt className="mt-1 text-sm font-medium leading-snug text-foreground">{f.label}</dt>
                    <dd className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{f.note}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
