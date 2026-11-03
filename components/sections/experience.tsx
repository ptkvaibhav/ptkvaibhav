"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { professionalExperience } from "@/lib/content";
import { useSound } from "@/components/providers/sound-provider";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);
  const { playSound } = useSound();

  const roles = professionalExperience.roles;
  const activeRole = roles[selectedRoleIdx] ?? roles[0];

  return (
    <>
      <SectionHeader
        index="01"
        eyebrow="Experience"
        title="Seven years securing products at scale."
        description="From hands-on penetration testing to leading a 14-person AppSec team, and now running product security incident response."
      />

      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
        {/* Role selector: horizontal scroll on mobile, vertical timeline on desktop */}
        <div
          role="tablist"
          aria-label="Roles"
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:-mx-8 md:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-border lg:px-0"
        >
          {roles.map((role, idx) => {
            const isSelected = idx === selectedRoleIdx;
            return (
              <button
                key={`${role.title}-${role.period}`}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  playSound("click");
                  setSelectedRoleIdx(idx);
                }}
                className={cn(
                  "relative shrink-0 rounded-xl border px-4 py-3 text-left transition-colors lg:rounded-none lg:border-0 lg:py-4 lg:pl-6",
                  isSelected
                    ? "border-primary/40 bg-primary/10 lg:bg-transparent"
                    : "border-border bg-card hover:bg-secondary lg:bg-transparent lg:hover:bg-transparent"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-px top-0 hidden h-full w-0.5 transition-colors lg:block",
                    isSelected ? "bg-primary" : "bg-transparent"
                  )}
                />
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {role.brand}
                  {idx === 0 ? (
                    <span className="rounded-full bg-primary/15 px-1.5 py-px text-[10px] font-semibold text-primary">Now</span>
                  ) : null}
                </span>
                <span
                  className={cn(
                    "mt-1 block whitespace-nowrap text-sm font-semibold lg:whitespace-normal",
                    isSelected ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {role.title}
                </span>
                <span className="mt-0.5 block whitespace-nowrap text-xs text-muted-foreground">{role.period}</span>
              </button>
            );
          })}
        </div>

        {/* Selected role detail */}
        <div role="tabpanel" className="surface p-5 sm:p-8">
          <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{activeRole.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {activeRole.company} · {activeRole.location} · {activeRole.period}
              </p>
            </div>
          </div>

          {activeRole.metrics.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {activeRole.metrics.map((metric) => (
                <span
                  key={metric}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {metric}
                </span>
              ))}
            </div>
          ) : null}

          <ul className="mt-6 space-y-4">
            {activeRole.focus.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
