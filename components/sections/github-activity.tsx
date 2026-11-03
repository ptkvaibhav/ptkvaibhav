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
  if (count === 0) return "bg-secondary";
  if (count <= 3) return "bg-primary/30";
  if (count <= 8) return "bg-primary/55";
  if (count <= 16) return "bg-primary/80";
  return "bg-primary";
}

const legend = [0, 2, 6, 12, 20];

export function GithubActivitySection({ calendar, userProfile }: GithubActivityProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [hoveredDay, setHoveredDay] = React.useState<{ date: string; count: number } | null>(null);

  const weeks = React.useMemo(() => calendar?.weeks?.slice(-26) ?? [], [calendar]);
  const totalContributions = calendar?.totalContributions;

  // On narrow screens, start the heatmap scrolled to the most recent weeks.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [weeks]);

  const stats = [
    { label: "Contributions (1y)", value: totalContributions },
    { label: "Public repos", value: userProfile?.publicRepos },
    { label: "Followers", value: userProfile?.followers },
  ].filter((stat): stat is { label: string; value: number } => typeof stat.value === "number");

  return (
    <div id="github-activity" className="surface mt-4 scroll-mt-20 p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">GitHub activity</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {hoveredDay
              ? `${hoveredDay.count} contribution${hoveredDay.count === 1 ? "" : "s"} on ${hoveredDay.date}`
              : "Last six months of contributions."}
          </p>
        </div>
        <a
          href={siteConfig.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary"
        >
          @ptkvaibhav <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {weeks.length > 0 ? (
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
                    className={cn("h-3 w-3 rounded-[3px]", levelClass(day.contributionCount))}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {weeks.length > 0 ? (
        <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-muted-foreground">
          <span>Less</span>
          {legend.map((n) => (
            <span key={n} className={cn("h-2.5 w-2.5 rounded-[2px]", levelClass(n))} />
          ))}
          <span>More</span>
        </div>
      ) : null}

      {stats.length > 0 ? (
      <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
        {stats.map((stat) => (
          <div key={stat.label} className="min-w-0">
            <dt className="truncate text-xs text-muted-foreground">{stat.label}</dt>
            <dd className="mt-1 text-xl font-semibold tracking-tight text-foreground">{stat.value}</dd>
          </div>
        ))}
      </dl>
      ) : null}
    </div>
  );
}
