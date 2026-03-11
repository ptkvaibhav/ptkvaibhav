import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/sections/project-detail";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projects",
    };
  }

  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.excerpt,
      url: `${siteConfig.url}/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
