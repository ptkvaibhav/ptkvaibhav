import { typography } from "@/styles/design-system";

const skillGroups = [
  {
    title: "AppSec Program",
    items: [
      "SAST",
      "DAST",
      "SCA",
      "Secure SDLC",
      "Threat Modeling",
      "Security Architecture Reviews",
      "Risk Acceptance",
      "Remediation Governance",
      "Vulnerability Triage",
      "False-positive Reduction",
    ],
  },
  {
    title: "Testing",
    items: [
      "Web Penetration Testing",
      "API Security Testing",
      "Authentication Testing",
      "Authorization Testing",
      "Business Logic Testing",
      "OWASP Top 10",
      "Evidence Validation",
      "Exploit Reproduction",
      "Security Reporting",
    ],
  },
  {
    title: "Security Tools",
    items: [
      "Burp Suite",
      "Fortify SSC",
      "WebInspect",
      "Checkmarx",
      "Veracode",
      "Snyk",
      "AppScan",
      "Prisma Cloud",
      "Nessus",
      "OWASP Dependency-Check",
      "CycloneDX SBOM",
      "GitHub Dependabot",
      "npm audit",
    ],
  },
  {
    title: "Cloud & Platform",
    items: [
      "OpenShift",
      "Docker",
      "Linux",
      "CI/CD Pipelines",
      "GitHub Actions",
      "Vercel",
      "Supabase",
      "Upstash Redis",
      "Security Headers",
      "CSP",
      "Rate Limiting",
    ],
  },
  {
    title: "Engineering",
    items: [
      "Python",
      "Java",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "React",
      "Node.js",
      "REST APIs",
      "SQL",
      "Shell Scripting",
      "Git",
    ],
  },
  {
    title: "Automation & AI",
    items: [
      "DevSecOps",
      "Security Automation",
      "AI-assisted Testing",
      "Agentic Workflows",
      "Parser Development",
      "Scanner Orchestration",
      "Finding Normalization",
      "Evidence Pipelines",
    ],
  },
] as const;

export function SkillsSection() {
  return (
    <div className="space-y-7">
      <div className="text-container space-y-4">
        <h2 className={typography.sectionTitle}>Skills</h2>
        <p className={typography.sectionDescription}>
          Practical security engineering coverage across enterprise AppSec, offensive
          validation, cloud delivery, automation, and the tooling used to operationalize it.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="min-w-0 rounded-[26px] border border-slate-200/70 bg-white/76 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)]"
          >
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
