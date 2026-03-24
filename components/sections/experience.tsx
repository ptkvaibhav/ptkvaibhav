import Image from "next/image";

import { professionalExperience } from "@/lib/content";
import { typography } from "@/styles/design-system";

export function ExperienceSection() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4">
          <div className="w-fit rounded-xl border border-white/10 p-4">
            <Image
              src={professionalExperience.logo}
              alt={`${professionalExperience.brand} logo`}
              width={164}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <div className="space-y-2">
            <p className={typography.panelLabel}>Company</p>
            <h3 className={typography.cardTitle}>{professionalExperience.brand}</h3>
            <p className={typography.cardText}>{professionalExperience.company}</p>
            <p className={typography.cardText}>{professionalExperience.location}</p>
          </div>
        </div>
        <p className="max-w-2xl text-base leading-8 text-stone-300/90">
          {professionalExperience.summary}
        </p>
      </div>

      <div className="relative space-y-12 before:absolute before:left-[0.35rem] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-white/10 md:before:left-2">
        {professionalExperience.roles.map((role) => (
          <div key={`${role.title}-${role.period}`} className="relative pl-8 md:pl-12">
            <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-emerald-400 ring-8 ring-background md:left-[0.1rem]" />
            <div className="space-y-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight text-white">{role.title}</h3>
                  <p className={typography.panelLabel}>{role.company}</p>
                </div>
                <p className={typography.panelLabel}>{role.period}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {role.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300"
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
