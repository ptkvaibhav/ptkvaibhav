"use client";

import * as React from "react";
import { Search, Shield, Terminal, Cloud, Cpu, Sparkles, Lock, X } from "lucide-react";
import { useSound } from "@/components/providers/sound-provider";
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

function SkillCard({ domain }: { domain: CompetencyDomain }) {
  const [expanded, setExpanded] = React.useState(false);
  const Icon = domain.icon;
  return (
    <article className="surface flex flex-col p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{domain.badge}</p>
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-foreground">{domain.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{domain.summary}</p>

      <ul className={cn("mt-5 space-y-2.5 border-t border-border pt-5 md:block", expanded ? "block" : "hidden")}>
        {domain.practicalApplications.map((app) => (
          <li key={app} className="flex gap-2.5 text-sm leading-snug text-muted-foreground">
            <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
            <span>{app}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="mt-4 self-start text-sm font-medium text-primary md:hidden"
      >
        {expanded ? "Show less" : "Show highlights"}
      </button>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {domain.toolsAndStandards.map((tool) => (
          <span key={tool.name} className="chip" title={tool.tag}>
            {tool.name}
          </span>
        ))}
      </div>
    </article>
  );
}

export function SkillsSection() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDomain, setSelectedDomain] = React.useState<string>("all");
  const { playSound } = useSound();

  const handleDomainFilter = (domainId: string) => {
    playSound("click");
    setSelectedDomain(domainId);
  };

  const filteredDomains = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return competencyDomains
      .map((domain) => {
        if (selectedDomain !== "all" && domain.id !== selectedDomain) return null;
        if (!q) return domain;

        const matchingTools = domain.toolsAndStandards.filter(
          (t) => t.name.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q)
        );
        const matches =
          domain.title.toLowerCase().includes(q) ||
          domain.summary.toLowerCase().includes(q) ||
          domain.practicalApplications.some((app) => app.toLowerCase().includes(q)) ||
          matchingTools.length > 0;

        if (!matches) return null;
        return {
          ...domain,
          toolsAndStandards: matchingTools.length > 0 ? matchingTools : domain.toolsAndStandards,
        };
      })
      .filter((domain): domain is CompetencyDomain => Boolean(domain));
  }, [selectedDomain, searchQuery]);

  const filters = [{ id: "all", short: "All" }, ...competencyDomains];

  return (
    <>
      <SectionHeader
        index="03"
        eyebrow="Skills"
        title="What I bring to a security team."
        description="Six areas I work in day to day, with the outcomes and tools behind each one."
        action={
          <label className="relative block w-full md:w-72">
            <span className="sr-only">Filter skills</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. Burp, TruffleHog"
              className="h-11 w-full rounded-full border border-input bg-card pl-10 pr-10 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none sm:text-sm"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </label>
        }
      />

      <div className="no-scrollbar -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 md:-mx-8 md:flex-wrap md:px-8 lg:mx-0 lg:px-0">
        {filters.map((filter) => {
          const isSelected = selectedDomain === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleDomainFilter(filter.id)}
              className={cn(
                "h-9 shrink-0 rounded-full border px-4 text-sm transition-colors",
                isSelected
                  ? "border-foreground bg-foreground font-medium text-background"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {filter.short}
            </button>
          );
        })}
      </div>

      {filteredDomains.length === 0 ? (
        <p className="surface p-8 text-center text-sm text-muted-foreground">
          Nothing matches &ldquo;{searchQuery}&rdquo;. Try another keyword.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDomains.map((domain) => (
            <SkillCard key={domain.id} domain={domain} />
          ))}
        </div>
      )}
    </>
  );
}
