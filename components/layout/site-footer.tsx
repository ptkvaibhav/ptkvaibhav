import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="container flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-700">Pratik Vaibhav</p>
          <p className="text-sm text-slate-600">{siteConfig.bio}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <Link href={siteConfig.social.github} target="_blank" rel="noreferrer">
            GitHub
          </Link>
          <Link href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </Link>
          <Link href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Link>
        </div>
      </div>
    </footer>
  );
}
