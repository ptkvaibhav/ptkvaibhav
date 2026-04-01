import { typography } from "@/styles/design-system";

const skillGroups = [
  {
    title: "Application Security",
    items: ["SAST", "DAST", "SCA", "Penetration Testing"],
  },
  {
    title: "Tools",
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
    ],
  },
  {
    title: "Platforms",
    items: ["OpenShift", "CI/CD pipelines"],
  },
  {
    title: "Languages",
    items: ["Python"],
  },
  {
    title: "Concepts",
    items: [
      "Threat Modeling",
      "DevSecOps",
      "Secure Architecture",
      "AI-assisted security testing",
    ],
  },
] as const;

export function SkillsSection() {
  return (
    <div className="space-y-8">
      <div className="text-container space-y-5">
        <h2 className={typography.sectionTitle}>Skills</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-[24px] border border-violet-100 bg-white/82 p-5 shadow-[0_12px_32px_rgba(124,58,237,0.08)]"
          >
            <h3 className="text-[1.15rem] font-semibold tracking-tight text-slate-900">
              {group.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{group.items.join(", ")}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
