import Link from "next/link";
import { ArrowUpRight, Clock3, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GithubActivity } from "@/types/github";

type GitHubActivityProps = {
  activities: GithubActivity[];
};

function formatRelativeTime(dateString: string) {
  const timestamp = new Date(dateString).getTime();

  if (Number.isNaN(timestamp)) {
    return "Recently";
  }

  const elapsed = timestamp - Date.now();
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (Math.abs(elapsed) < hour) {
    return formatter.format(Math.round(elapsed / minute), "minute");
  }

  if (Math.abs(elapsed) < day) {
    return formatter.format(Math.round(elapsed / hour), "hour");
  }

  return formatter.format(Math.round(elapsed / day), "day");
}

export function GitHubActivity({ activities }: GitHubActivityProps) {
  if (!activities.length) {
    return null;
  }

  return (
    <Card className="p-6">
      <CardHeader className="space-y-3">
        <Badge variant="accent" className="w-fit">
          GitHub Feed
        </Badge>
        <CardTitle className="text-3xl">Recent repository activity.</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <Link
            key={`${activity.type}-${activity.repo}-${activity.createdAt}`}
            href={activity.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-emerald-400/30 hover:bg-black/30"
          >
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-emerald-300">
                <Github className="h-4 w-4" />
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-medium text-zinc-100">{activity.message}</p>
                <p className="text-sm text-zinc-500">{activity.repo}</p>
                <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                  <Clock3 className="h-3.5 w-3.5" />
                  <span>{formatRelativeTime(activity.createdAt)}</span>
                </div>
              </div>
            </div>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-zinc-500 transition group-hover:text-emerald-300" />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
