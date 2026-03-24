import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { awards } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { typography } from "@/styles/design-system";

export function AwardsSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className={typography.sectionLabel}>Recognition</p>
        <h2 className={typography.sectionTitle}>A few milestones outside the project list.</h2>
        <p className={typography.sectionDescription}>
          Awards and speaking work that reflect consistency, delivery, and how I show up in the
          broader security community.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {awards.map((award) => (
          <div key={award.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-xs uppercase tracking-wide text-emerald-400">{award.highlight}</p>
            <h3 className="mt-3 text-lg font-semibold text-zinc-100">{award.title}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-300/85">{award.description}</p>
          </div>
        ))}
      </div>

      <Link
        href={siteConfig.social.linkedin}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-emerald-300"
      >
        View more
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
