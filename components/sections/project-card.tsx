"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText, GitFork, Star } from "lucide-react";

import { ReadmeModal } from "@/components/interactive/readme-modal";
import { showToast } from "@/components/dossier/toast";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  exhibit: string;
  featured?: boolean;
  tilt?: number;
};

function fileName(project: Project) {
  const ext = (project.language ?? project.tags[0] ?? "").toLowerCase();
  const map: Record<string, string> = { python: "py", java: "jar", typescript: "ts", javascript: "js", go: "go", rust: "rs" };
  return `${project.slug}.${map[ext] ?? "exe"}`;
}

export function ProjectCard({ project, exhibit, featured = false, tilt = 0 }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tags = project.tags.slice(0, featured ? 5 : 4);
  const stars = project.stars ?? 0;
  const forks = project.forks ?? 0;

  return (
    <>
      <article
        style={{ ["--tilt" as string]: `${tilt}deg` }}
        className={cn(
          "group flex h-full min-w-0 flex-col overflow-hidden rounded-md border-2 border-foreground bg-paper shadow-hard transition-transform duration-300 md:[transform:rotate(var(--tilt))] md:hover:[transform:rotate(0deg)_translateY(-4px)]"
        )}
      >
        {/* Retro window title bar */}
        <div className="flex items-center justify-between gap-3 border-b-2 border-foreground bg-foreground px-3 py-1.5 text-paper">
          <p className="min-w-0 truncate font-mono text-xs">
            <span className="font-semibold">Exhibit {exhibit}</span>
            <span className="opacity-60"> — {fileName(project)}</span>
          </p>
          <div aria-hidden className="flex shrink-0 gap-1">
            <span className="flex h-4 w-4 items-center justify-center border border-paper/60 text-[9px] leading-none">_</span>
            <span className="flex h-4 w-4 items-center justify-center border border-paper/60 text-[9px] leading-none">□</span>
            <button
              type="button"
              tabIndex={-1}
              onClick={() => showToast({ title: "Access denied", body: "Evidence cannot be destroyed. Chain of custody, you know." })}
              className="flex h-4 w-4 items-center justify-center border border-paper/60 text-[10px] leading-none hover:bg-stamp"
              data-cursor="Destroy?"
            >
              ×
            </button>
          </div>
        </div>

        <div className={cn("flex flex-1 flex-col p-5", featured && "md:p-8")}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <span className="text-stamp">● {project.status}</span>
            {project.language ? <span>{project.language}</span> : null}
            {stars > 0 ? (
              <span className="inline-flex items-center gap-1"><Star className="h-3 w-3" /> {stars}</span>
            ) : null}
            {forks > 0 ? (
              <span className="inline-flex items-center gap-1"><GitFork className="h-3 w-3" /> {forks}</span>
            ) : null}
          </div>

          <h3
            className={cn(
              "mt-3 break-words font-display font-black uppercase leading-[0.95] text-foreground",
              featured ? "text-4xl md:text-6xl" : "text-3xl"
            )}
          >
            {project.title}
          </h3>

          <p className={cn("mt-3 leading-relaxed text-foreground/85", featured ? "max-w-2xl text-[17px]" : "text-[15px]")}>
            {project.excerpt}
          </p>

          {featured && project.problem ? (
            <p className="mt-4 max-w-2xl border-l-2 border-stamp pl-4 font-mono text-[13px] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Why it exists: </span>
              {project.problem}
            </p>
          ) : null}

          {tags.length ? (
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
              {tags.map((tag) => (
                <li key={tag} className="label-tape !text-[10px]">{tag}</li>
              ))}
            </ul>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              data-cursor="Read"
              className="inline-flex h-10 items-center gap-2 rounded-md border-2 border-foreground px-4 font-mono text-[13px] font-semibold text-foreground transition-colors hover:bg-manila/50"
            >
              <FileText className="h-4 w-4" /> Case notes
            </button>
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-md border-2 border-foreground bg-foreground px-4 font-mono text-[13px] font-semibold text-paper transition-colors hover:bg-stamp hover:border-stamp"
            >
              Source <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </article>

      <ReadmeModal project={isModalOpen ? project : null} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
