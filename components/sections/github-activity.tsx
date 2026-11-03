import { ArrowUpRight } from "lucide-react";

import { siteConfig } from "@/lib/site";
import type { GithubUserProfile } from "@/lib/github";

export interface GithubActivityProps {
  userProfile?: GithubUserProfile | null;
}

/** Small GitHub "surveillance log" card with public profile stats. */
export function GithubActivitySection({ userProfile }: GithubActivityProps) {
  const stats = [
    { label: "Public repositories", value: userProfile?.publicRepos },
    { label: "Followers", value: userProfile?.followers },
  ].filter((stat): stat is { label: string; value: number } => typeof stat.value === "number");

  return (
    <div id="github-activity" className="paper mt-10 flex scroll-mt-24 flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between md:p-8">
      <div>
        <p className="field-label">Surveillance log · GitHub</p>
        <p className="mt-2 font-mono text-sm text-foreground">Subject has been observed committing code regularly.</p>
        <a
          href={siteConfig.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 font-mono text-sm font-semibold text-foreground underline decoration-stamp decoration-2 underline-offset-4"
        >
          github.com/ptkvaibhav <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {stats.length > 0 ? (
        <dl className="flex gap-8 border-t border-dashed border-foreground/30 pt-4 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="font-display text-4xl font-black text-foreground">{stat.value}</dd>
              <dt className="mt-0.5 text-xs text-muted-foreground">{stat.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
