import Image from "next/image";

import { professionalExperience } from "@/lib/content";
import { typography } from "@/styles/design-system";

export function ExperienceSection() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1.28fr]">
      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div className="w-fit rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <Image
            src={professionalExperience.logo}
            alt={`${professionalExperience.brand} logo`}
            width={164}
            height={40}
            className="h-10 w-auto"
          />
        </div>
        <div className="space-y-3">
          <p className={typography.panelLabel}>Company</p>
          <div>
            <h2 className={typography.sectionTitle}>{professionalExperience.brand}</h2>
            <p className={typography.cardText}>{professionalExperience.company}</p>
            <p className={typography.cardText}>{professionalExperience.location}</p>
          </div>
        </div>
        <p className="max-w-md text-base leading-8 text-zinc-300">
          {professionalExperience.summary}
        </p>
      </aside>

      <div className="space-y-10">
        {professionalExperience.roles.map((role) => (
          <div
            key={`${role.title}-${role.period}`}
            className="border-l border-white/10 pl-6 md:pl-8"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <p className={typography.panelLabel}>{role.period}</p>
                <h3 className="text-xl font-semibold tracking-tight text-white">{role.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {role.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-200"
                  >
                    {metric}
                  </span>
                ))}
              </div>
              <div className="space-y-3">
                {role.focus.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400" />
                    <p className={typography.cardText}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
