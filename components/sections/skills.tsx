"use client";

import * as React from "react";
import { Shield, Terminal, Cloud, Cpu, Sparkles, Lock } from "lucide-react";
import { Stamp } from "@/components/dossier/stamp";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export type CompetencyDomain = {
  id: string;
  title: string;
  short: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  summary: string;
  practicalApplications: string[];
  toolsAndStandards: { name: string; tag: string }[];
  proficiencyLevel: "Production Lead" | "Core Competency" | "Advanced Mastery";
};

const competencyDomains: CompetencyDomain[] = [
  {
    id: "psirt",
    short: "Incident response",
    title: "Product Security Incident Response (PSIRT)",
    badge: "Current Focus & Specialization",
    icon: Shield,
    accentColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    summary:
      "Direct ownership of enterprise security incident response lifecycles, exploit reachability validation, TruffleHog secret governance, and rapid cross-functional mitigation.",
    practicalApplications: [
      "Triaged and resolved 100+ production security incidents with a 33% reduction in MTTR.",
      "Spearheaded enterprise TruffleHog secret remediation, shrinking invalidation time from 70 to 38 days.",
      "Engineered autonomous Claude AI skills & custom CVE triage agents for new vulnerability intake.",
      "Conducted root-cause investigations, emergency patch governance, and executive post-mortems.",
    ],
    toolsAndStandards: [
      { name: "TruffleHog", tag: "Secret Governance" },
      { name: "CVE / NVD Analysis", tag: "Vulnerability Intel" },
      { name: "Incident Triage", tag: "33% Faster MTTR" },
      { name: "Claude AI Skills", tag: "Agentic Automation" },
      { name: "Emergency Patching", tag: "Risk Mitigation" },
    ],
    proficiencyLevel: "Production Lead",
  },
  {
    id: "appsec",
    short: "AppSec & DevSecOps",
    title: "Application Security & DevSecOps Governance",
    badge: "Enterprise Leadership",
    icon: Lock,
    accentColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    summary:
      "Designing and operating end-to-end Secure SDLC programs, multi-scanner correlation pipelines (SAST + DAST + SCA), and zero-friction CI/CD security gate enforcement.",
    practicalApplications: [
      "Correlated SAST, DAST, and SCA findings to reduce false positives from 30% to near-zero.",
      "Owned application security architecture & threat modeling across US government healthcare systems.",
      "Led, mentored, and upskilled a 14-member Application Security engineering team at Deloitte.",
      "Automated security quality gates across GitHub Actions, GitLab CI, and enterprise Jenkins pipelines.",
    ],
    toolsAndStandards: [
      { name: "Fortify SSC / SCA", tag: "Enterprise SAST" },
      { name: "Fortify WebInspect", tag: "Automated DAST" },
      { name: "Checkmarx & Snyk", tag: "Code & Package SCA" },
      { name: "STRIDE Modeling", tag: "Architecture Review" },
      { name: "CycloneDX SBOM", tag: "Supply Chain Security" },
    ],
    proficiencyLevel: "Production Lead",
  },
  {
    id: "offensive",
    short: "Offensive",
    title: "Offensive Security & Penetration Testing",
    badge: "Hands-on Verification",
    icon: Terminal,
    accentColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    summary:
      "Deep manual penetration testing across modern web applications, microservice APIs, and identity protocols to uncover high-impact logic flaws beyond automated scanners.",
    practicalApplications: [
      "Discovered critical vulnerabilities (SQLi, IDOR, Auth Bypass, SSRF) in enterprise production applications.",
      "Evaluated complex business logic workflows to identify privilege escalation paths and state manipulation.",
      "Developed custom Burp Suite extensions to bridge DAST evidence directly into tracking platforms.",
      "Created reproducible exploit proofs-of-concept (PoCs) to validate actual attacker reachability.",
    ],
    toolsAndStandards: [
      { name: "Burp Suite Professional", tag: "Advanced Testing" },
      { name: "API Security Testing", tag: "REST, GraphQL, OAuth" },
      { name: "OWASP Top 10 / ASVS", tag: "Standard Compliance" },
      { name: "Authentication Flaws", tag: "MFA / SSO / JWT" },
      { name: "Custom Exploit PoCs", tag: "Evidence Validation" },
    ],
    proficiencyLevel: "Advanced Mastery",
  },
  {
    id: "ai-automation",
    short: "AI automation",
    title: "AI-Driven Security Automation & Agents",
    badge: "Conference Speaker Topic",
    icon: Sparkles,
    accentColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    summary:
      "Engineering autonomous agentic testing loops, model-assisted vulnerability verification, and intelligent scanner orchestration to eliminate manual analyst toil.",
    practicalApplications: [
      "Delivered speaker session at NULLCON 2025: 'Smart Automation using Artificial Intelligence'.",
      "Created Clinkz, an autonomous pentesting system with AI agent loops and evidence-driven reporting.",
      "Engineered custom Claude AI skills to automate routine PSIRT secret validation and triage handoffs.",
      "Built Invoker, an AI-assisted scanner signal discovery framework for high-confidence vulnerability ranking.",
    ],
    toolsAndStandards: [
      { name: "Claude AI Skills", tag: "PSIRT Workflows" },
      { name: "Clinkz Platform", tag: "Autonomous Pentesting" },
      { name: "SARIF Normalization", tag: "Unified Findings" },
      { name: "Agentic Loop Control", tag: "Recon & Exploits" },
      { name: "Invoker Framework", tag: "Vulnerability Triage" },
    ],
    proficiencyLevel: "Production Lead",
  },
  {
    id: "engineering",
    short: "Engineering",
    title: "Security Software Engineering",
    badge: "Core Engineering",
    icon: Cpu,
    accentColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    summary:
      "Writing clean, hardened code in Python, Java, TypeScript, and SQL to build production-grade security parsers, CLI tools, and distributed cloud applications.",
    practicalApplications: [
      "Engineered the Burp to Fortify Parser plugin (Java & Python) to normalize DAST telemetry for enterprise intake.",
      "Developed nyx, a safety-first local file intelligence tool using SHA-256 fingerprinting.",
      "Designed secure REST APIs, database schemas, and cryptographic signing utilities.",
      "Hardened full-stack Next.js and Node.js applications with strict nonce CSP, double-submit CSRF, and rate limits.",
    ],
    toolsAndStandards: [
      { name: "Python", tag: "Tooling & Exploit Scripts" },
      { name: "Java", tag: "Enterprise Plugins & APIs" },
      { name: "TypeScript / Node.js", tag: "Type-Safe Systems" },
      { name: "PostgreSQL / Redis", tag: "State & Rate Limiting" },
      { name: "Bash / Shell", tag: "Linux Automation" },
    ],
    proficiencyLevel: "Advanced Mastery",
  },
  {
    id: "cloud-infra",
    short: "Cloud",
    title: "Cloud Infrastructure & Platform Hardening",
    badge: "DevSecOps",
    icon: Cloud,
    accentColor: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    summary:
      "Securing cloud workloads, containerized orchestration environments, and HTTP transport layers against misconfigurations, privilege abuse, and lateral movement.",
    practicalApplications: [
      "Hardened enterprise OpenShift / Kubernetes clusters and container base images against CVEs.",
      "Configured strict defense-in-depth HTTP headers (HSTS Preload, Nonce CSP, X-Frame-Options DENY).",
      "Implemented distributed sliding-window rate limiting via Redis to prevent automated API scraping and DDoS.",
      "Enforced least-privilege RBAC, secret management boundaries, and network segregation.",
    ],
    toolsAndStandards: [
      { name: "Docker", tag: "Container Hardening" },
      { name: "OpenShift / K8s", tag: "Cluster Security" },
      { name: "Strict CSP & HSTS", tag: "Web Transport Security" },
      { name: "Upstash Redis", tag: "Rate Limiting" },
      { name: "Linux / POSIX", tag: "Kernel Hardening" },
    ],
    proficiencyLevel: "Core Competency",
  },
];

const tilts = [-1.2, 0.8, -0.6, 1.1, -0.9, 0.5];
const tapes = ["left-6 -rotate-6", "right-8 rotate-3", "left-1/2 -translate-x-1/2 rotate-1", "left-10 rotate-6", "right-6 -rotate-3", "left-1/3 -rotate-2"];

function SkillCard({ domain, index }: { domain: CompetencyDomain; index: number }) {
  const [expanded, setExpanded] = React.useState(false);
  const Icon = domain.icon;
  const isLead = domain.proficiencyLevel === "Production Lead";

  return (
    <article
      style={{ ["--tilt" as string]: `${tilts[index % tilts.length]}deg` }}
      className="paper relative flex flex-col px-5 pb-6 pt-8 transition-transform duration-300 md:[transform:rotate(var(--tilt))] md:hover:[transform:rotate(0deg)_scale(1.015)]"
    >
      <span aria-hidden className={cn("tape -top-3", tapes[index % tapes.length])} />

      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border-2 border-foreground text-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <Stamp rotate={isLead ? 6 : -5} tone={isLead ? "red" : "blue"} className="text-[13px]">
          {domain.proficiencyLevel}
        </Stamp>
      </div>

      <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{domain.badge}</p>
      <h3 className="mt-1 text-xl font-semibold leading-snug text-foreground">{domain.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">{domain.summary}</p>

      <ul className={cn("mt-4 space-y-2 border-t border-dashed border-foreground/30 pt-4 md:block", expanded ? "block" : "hidden")}>
        {domain.practicalApplications.map((app) => (
          <li key={app} className="flex gap-2.5 text-sm leading-snug text-foreground/80">
            <span aria-hidden className="font-mono text-xs font-bold leading-5 text-stamp">✓</span>
            <span>{app}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="mt-3 self-start font-hand text-xl text-blueink underline decoration-1 underline-offset-4 md:hidden"
      >
        {expanded ? "fold it back up" : "show the evidence →"}
      </button>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Tools">
        {domain.toolsAndStandards.map((tool) => (
          <li key={tool.name} className="label-tape !text-[10px]" title={tool.tag}>
            {tool.name}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function SkillsSection() {
  return (
    <>
      <SectionHeader
        index="03"
        eyebrow="Capabilities assessment"
        title="What I'm good at"
        note="verified, not vibes"
        description="Six areas I work in every week, with the receipts and the tools behind each one."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {competencyDomains.map((domain, i) => (
          <SkillCard key={domain.id} domain={domain} index={i} />
        ))}
      </div>
    </>
  );
}
