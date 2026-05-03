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

      <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/82 shadow-[0_18px_46px_rgba(15,23,42,0.08)] backdrop-blur">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="grid gap-3 border-t border-slate-200/80 px-5 py-4 first:border-t-0 md:grid-cols-[220px_minmax(0,1fr)] md:items-start"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">
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
