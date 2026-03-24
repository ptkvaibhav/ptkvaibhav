import Image from "next/image";

import { professionalExperience } from "@/lib/content";
import { typography } from "@/styles/design-system";

export function ExperienceSection() {
  return (
    <div className="relative space-y-12 before:absolute before:left-[0.35rem] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-white/10">
      {professionalExperience.roles.map((role) => (
        <article key={`${role.title}-${role.period}`} className="relative pl-10">
          <span className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-background">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={professionalExperience.logo}
                alt={`${professionalExperience.brand} logo`}
                width={20}
                height={20}
                className="h-5 w-auto"
              />
              <p className="text-sm font-medium text-zinc-200">{role.company}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight text-white">{role.title}</h3>
              <p className={typography.panelLabel}>{role.period}</p>
            </div>

            {role.metrics.length ? (
              <p className="text-sm font-medium leading-7 text-emerald-300">
                {role.metrics.join(" | ")}
              </p>
            ) : null}

            <div className="space-y-3">
              {role.focus.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400" />
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
