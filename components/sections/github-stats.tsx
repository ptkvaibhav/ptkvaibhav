"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

const statsUrl =
  "https://github-readme-stats.vercel.app/api?username=ptkvaibhav&show_icons=true&hide_border=true&theme=transparent&title_color=ffffff&text_color=a1a1aa&icon_color=34d399&bg_color=00000000&ring_color=34d399";

const languagesUrl =
  "https://github-readme-stats.vercel.app/api/top-langs/?username=ptkvaibhav&layout=compact&hide_border=true&theme=transparent&title_color=ffffff&text_color=a1a1aa&bg_color=00000000";

export function GitHubStats() {
  const [hasLoadError, setHasLoadError] = useState(false);

  return (
    <Card className="surface-grid overflow-hidden p-6">
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Badge variant="accent" className="w-fit">
            GitHub Activity
          </Badge>
          <CardTitle className="max-w-2xl text-3xl">
            Open-source work, active repos, and engineering signal from GitHub.
          </CardTitle>
        </div>
        <Button asChild variant="ghost">
          <Link href={siteConfig.social.github} target="_blank" rel="noreferrer">
            Visit profile
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      {hasLoadError ? (
        <CardContent className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <div className="flex flex-col items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-emerald-300">
              <Github className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">GitHub</p>
              <p className="text-lg text-zinc-200">View my GitHub profile</p>
              <p className="max-w-xl text-sm leading-7 text-zinc-400">
                The embedded stats service is unavailable right now, but the profile and
                repositories are still available directly.
              </p>
            </div>
            <Button asChild>
              <Link href={siteConfig.social.github} target="_blank" rel="noreferrer">
                View my GitHub profile
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      ) : (
        <CardContent className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-emerald-300">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Profile</p>
                <p className="text-sm text-zinc-200">github.com/ptkvaibhav</p>
              </div>
            </div>
            <img
              src={statsUrl}
              alt="GitHub contribution and repository stats for Pratik Vaibhav"
              className="h-auto w-full rounded-2xl"
              decoding="async"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setHasLoadError(true)}
            />
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
            <p className="mb-4 text-sm text-zinc-500">Language distribution</p>
            <img
              src={languagesUrl}
              alt="Most-used languages across Pratik Vaibhav's public GitHub repositories"
              className="h-auto w-full rounded-2xl"
              decoding="async"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setHasLoadError(true)}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
