import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { awards } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { typography } from "@/styles/design-system";

export function AwardsSection() {
  return (
    <div className="space-y-8">
      <div className="text-container space-y-3">
        <p className={typography.sectionLabel}>Recognition</p>
        <h2 className={typography.sectionTitle}>A few milestones outside the project list.</h2>
        <p className={typography.sectionDescription}>
          Awards and speaking work that reflect consistency, delivery, and how I show up in the
          broader security community.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {awards.map((award) => (
          <div key={award.title} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-violet-600" />
              <p className="text-xs uppercase tracking-wide text-violet-700">{award.highlight}</p>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{award.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">{award.description}</p>
          </div>
        ))}
      </div>

      <Link
        href={siteConfig.social.linkedin}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition hover:text-violet-700"
      >
        View more
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
