"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { ContributionCalendar, GithubUserProfile } from "@/lib/github";

export interface GithubActivityProps {
  calendar?: ContributionCalendar | null;
  userProfile?: GithubUserProfile | null;
}

function levelClass(count: number) {
  if (count === 0) return "bg-foreground/[0.07]";
  if (count <= 3) return "bg-stamp/30";
  if (count <= 8) return "bg-stamp/55";
  if (count <= 16) return "bg-stamp/80";
  return "bg-stamp";
}

const legend = [0, 2, 6, 12, 20];

/** Contribution heatmap styled as an ink-stamped surveillance log. */
export function GithubActivitySection({ calendar, userProfile }: GithubActivityProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [hoveredDay, setHoveredDay] = React.useState<{ date: string; count: number } | null>(null);

  const weeks = React.useMemo(() => calendar?.weeks?.slice(-26) ?? [], [calendar]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [weeks]);

  const stats = [
    { label: "Contributions, last year", value: calendar?.totalContributions },
    { label: "Public repositories", value: userProfile?.publicRepos },
    { label: "Followers", value: userProfile?.followers },
  ].filter((stat): stat is { label: string; value: number } => typeof stat.value === "number");

  if (!weeks.length && !stats.length) return null;

  return (
    <div id="github-activity" className="paper mt-10 scroll-mt-24 p-5 md:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="field-label">Surveillance log · GitHub</p>
          <p className="mt-2 font-mono text-sm text-foreground">
            {hoveredDay
              ? `${hoveredDay.date}: ${hoveredDay.count} contribution${hoveredDay.count === 1 ? "" : "s"}`
              : "Subject has been observed committing code regularly."}
          </p>
        </div>
        <a
          href={siteConfig.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-foreground underline decoration-stamp decoration-2 underline-offset-4"
        >
          github.com/ptkvaibhav <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {weeks.length > 0 ? (
        <>
          <div ref={scrollRef} className="no-scrollbar mt-6 overflow-x-auto">
            <div className="flex w-max gap-[3px] sm:w-full sm:justify-between">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day) => (
                    <div
                      key={day.date}
                      onMouseEnter={() => setHoveredDay({ date: day.date, count: day.contributionCount })}
                      onMouseLeave={() => setHoveredDay(null)}
                      title={`${day.contributionCount} contributions on ${day.date}`}
                      className={cn("h-3 w-3 rounded-[2px]", levelClass(day.contributionCount))}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[11px] text-muted-foreground">
            <span>quiet</span>
            {legend.map((n) => (
              <span key={n} className={cn("h-2.5 w-2.5 rounded-[2px]", levelClass(n))} />
            ))}
            <span>busy</span>
          </div>
        </>
      ) : null}

      {stats.length > 0 ? (
        <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-dashed border-foreground/30 pt-5">
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-0">
              <dd className="font-display text-3xl font-black text-foreground">{stat.value}</dd>
              <dt className="mt-0.5 text-xs leading-snug text-muted-foreground">{stat.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
