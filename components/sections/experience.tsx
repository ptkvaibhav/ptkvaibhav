"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { Stamp } from "@/components/dossier/stamp";
import { SectionHeader } from "@/components/ui/section-header";
import { professionalExperience } from "@/lib/content";
import { cn } from "@/lib/utils";

function years(period: string) {
  const match = period.match(/(\d{4}).*?(\d{4}|Present)/i);
  return match ? { from: match[1], to: match[2] } : { from: period, to: "" };
}

export function ExperienceSection() {
  const roles = professionalExperience.roles;
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (idx: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });

  return (
    <>
      <SectionHeader
        index="01"
        eyebrow="Service record"
        title="Where I've worked"
        note="5 roles, 0 boring ones"
        description="From manual pentesting to leading a 14-person AppSec team to running product security incident response. Most recent first."
      />

      <ol className="relative space-y-6 md:space-y-8">
        {/* timeline spine */}
        <span aria-hidden className="absolute bottom-4 left-[7px] top-4 w-0.5 bg-foreground/20 md:left-[147px]" />

        {roles.map((role, idx) => {
          const isOpen = open.has(idx);
          const isCurrent = idx === 0;
          const { from, to } = years(role.period);
          const panelId = `role-panel-${idx}`;

          return (
            <li key={`${role.title}-${role.period}`} className="relative grid gap-3 pl-8 md:grid-cols-[140px_minmax(0,1fr)] md:gap-6 md:pl-0">
              {/* timeline dot */}
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-6 h-4 w-4 rounded-full border-2 border-foreground md:left-[140px]",
                  isCurrent ? "bg-stamp" : "bg-paper"
                )}
              />

              <div className="md:pr-8 md:pt-4 md:text-right">
                <p className="whitespace-nowrap font-display text-2xl font-black leading-none text-foreground">
                  {from}
                  <span className="text-muted-foreground">–{to === "Present" ? "now" : to.slice(2)}</span>
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{isCurrent ? "current" : `${Number(to) - Number(from) || "<1"} yr${Number(to) - Number(from) === 1 ? "" : "s"}`}</p>
              </div>

              <article className={cn("paper overflow-hidden transition-shadow", isOpen && "shadow-lift")}>
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  data-cursor={isOpen ? "Close file" : "Open file"}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left md:p-6"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="label-tape">{role.brand}</span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        Case 0{roles.length - idx} · {role.period}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold leading-snug text-foreground md:text-2xl">{role.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {role.company} · {role.location}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-3">
                    {isCurrent ? (
                      <Stamp rotate={8} className="hidden text-base sm:inline-flex">Current</Stamp>
                    ) : (
                      <Stamp rotate={6} tone="ink" className="hidden text-sm opacity-50 sm:inline-flex">Closed</Stamp>
                    )}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground text-foreground">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </div>
                </button>

                {isOpen ? (
                  <div id={panelId} className="border-t border-dashed border-foreground/30 px-5 pb-6 pt-5 md:px-6">
                    {role.metrics.length > 0 ? (
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {role.metrics.map((metric) => (
                          <span key={metric} className="highlight font-mono text-sm font-medium text-foreground">
                            {metric}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <ul className="mt-5 space-y-3">
                      {role.focus.map((item) => (
                        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-foreground/85">
                          <span aria-hidden className="mt-1 font-mono text-xs font-bold text-stamp">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>
    </>
  );
}
