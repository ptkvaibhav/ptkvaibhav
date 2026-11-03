"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, GitFork, Star } from "lucide-react";

import { ReadmeModal } from "@/components/interactive/readme-modal";
import { useSound } from "@/components/providers/sound-provider";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  compact?: boolean;
  featured?: boolean;
};

export function ProjectCard({ project, compact = false, featured = false }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { playSound } = useSound();

  const visibleTags = project.tags
    .filter((tag) => tag.toLowerCase() !== project.language?.toLowerCase())
    .slice(0, featured ? 5 : compact ? 3 : 4);
  const summary = project.excerpt?.trim() || "";
  const showSummary = summary && summary.toLowerCase() !== project.title.trim().toLowerCase();
  const stars = project.stars ?? 0;
  const forks = project.forks ?? 0;

  const openDetails = () => {
    playSound("click");
    setIsModalOpen(true);
  };

  return (
    <>
      <article
        className={cn(
          "group surface relative flex h-full min-w-0 flex-col p-6 transition-colors hover:border-foreground/20",
          featured && "md:p-8"
        )}
      >
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {featured ? <span className="text-primary">Featured</span> : null}
          {featured ? <span aria-hidden>·</span> : null}
          <span>{project.status}</span>
          {project.language ? (
            <>
              <span aria-hidden>·</span>
              <span>{project.language}</span>
            </>
          ) : null}
        </div>

        <h3
          className={cn(
            "mt-3 break-words font-semibold tracking-tight text-foreground",
            featured ? "text-2xl md:text-3xl" : "text-xl"
          )}
        >
          {project.title}
        </h3>

        {showSummary ? (
          <p
            className={cn(
              "mt-3 text-[15px] leading-relaxed text-muted-foreground",
              featured ? "max-w-2xl" : "line-clamp-3"
            )}
          >
            {summary}
          </p>
        ) : null}

        {visibleTags.length ? (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openDetails}
              className="inline-flex h-9 items-center rounded-full border border-border px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Details
            </button>
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound("click")}
              className="inline-flex h-9 items-center gap-1 rounded-full bg-foreground px-4 text-[13px] font-semibold text-background transition-opacity hover:opacity-90"
            >
              Code <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {stars > 0 || forks > 0 ? (
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5" /> {stars}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" /> {forks}
              </span>
            </div>
          ) : null}
        </div>
      </article>

      <ReadmeModal project={isModalOpen ? project : null} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
