import "server-only";

import { cache } from "react";

import { getGithubProjects } from "@/lib/github";
import type { Project } from "@/types/project";

const staticProjects: Project[] = [
  {
    slug: "clinkz",
    title: "Clinkz",
    excerpt:
      "An autonomous penetration testing platform exploring agent loops, tool orchestration, and evidence-driven reporting.",
    description:
      "Clinkz is a multi-stage offensive security project built around autonomous recon, crawl, exploit validation, and reporting workflows. It is where I experiment with agentic pentesting systems, Dockerized toolchains, and evidence-first offensive automation.",
    tags: ["Python", "LLM systems", "Security automation", "Docker"],
    github: "https://github.com/ptkvaibhav/clinkz",
    featured: true,
    status: "Active development",
  },
  {
    slug: "burp-to-fortify-parser",
    title: "Burp to Fortify Parser",
    excerpt:
      "A bridge between Burp findings and Fortify-aligned review workflows for cleaner vulnerability intake.",
    description:
      "Burp to Fortify Parser converts Burp output into a structure that fits Fortify-oriented review pipelines, reducing manual re-entry and improving the handoff between testing output and remediation workflows.",
    tags: ["Burp Suite", "Fortify", "Parsing", "Workflow tooling"],
    github: "https://github.com/ptkvaibhav/Burp_to_Fortify_Parser",
    featured: true,
    status: "Maintained",
  },
  {
    slug: "invoker",
    title: "Invoker",
    excerpt:
      "An AI-assisted vulnerability scanning project focused on better signal discovery and triage quality.",
    description:
      "Invoker is an exploratory security project around AI-assisted vulnerability analysis and scanning workflows. It reflects my interest in using automation to increase analyst depth without amplifying noise.",
    tags: ["AI security", "Vulnerability scanning", "Python"],
    github: "https://github.com/ptkvaibhav/invoker",
    featured: true,
    status: "Exploratory build",
  },
];

function mergeProjectWithFallback(project: Project): Project {
  const fallback = staticProjects.find((staticProject) => staticProject.slug === project.slug);

  if (!fallback) {
    return project;
  }

  return {
    ...fallback,
    ...project,
    excerpt: project.excerpt || fallback.excerpt,
    description: project.description || fallback.description,
    tags: project.tags.length ? project.tags : fallback.tags,
    status: project.status || fallback.status,
  };
}

function getProjectSortScore(project: Project) {
  const updatedAt = project.lastUpdated ? new Date(project.lastUpdated).getTime() : 0;
  return Number.isNaN(updatedAt) ? 0 : updatedAt;
}

function sortProjects(projects: Project[]) {
  return [...projects].sort((left, right) => {
    if (left.featured !== right.featured) {
      return Number(right.featured) - Number(left.featured);
    }

    const updatedDifference = getProjectSortScore(right) - getProjectSortScore(left);
    if (updatedDifference !== 0) {
      return updatedDifference;
    }

    const starsDifference = (right.stars || 0) - (left.stars || 0);
    if (starsDifference !== 0) {
      return starsDifference;
    }

    return left.title.localeCompare(right.title);
  });
}

export const getProjects = cache(async (): Promise<Project[]> => {
  try {
    const githubProjects = await getGithubProjects();

    if (!githubProjects.length) {
      return sortProjects(staticProjects);
    }

    return sortProjects(githubProjects.map(mergeProjectWithFallback));
  } catch {
    return sortProjects(staticProjects);
  }
});

export async function getFeaturedProjects() {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, 3);
}
