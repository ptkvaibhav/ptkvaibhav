import Image from "next/image";

import { professionalExperience } from "@/lib/content";
import { typography } from "@/styles/design-system";

export function ExperienceSection() {
  return (
    <div className="border-l-2 border-slate-200 pl-6">
      {professionalExperience.roles.map((role) => (
        <article key={`${role.title}-${role.period}`} className="relative mb-12 last:mb-0">
          <span className="absolute -left-[33px] top-[6px] h-2 w-2 rounded-full bg-violet-600" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={professionalExperience.logo}
                alt={`${professionalExperience.brand} logo`}
                width={20}
                height={20}
                className="h-5 w-auto"
              />
              <p className="text-sm font-medium text-slate-700">{role.company}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">{role.title}</h3>
              <p className={typography.panelLabel}>{role.period}</p>
            </div>

            {role.metrics.length ? (
              <p className="text-sm font-medium leading-7 text-violet-700">
                {role.metrics.join(" | ")}
              </p>
            ) : null}

            <div className="space-y-3">
              {role.focus.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-violet-600" />
                  <p className={typography.cardText}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
