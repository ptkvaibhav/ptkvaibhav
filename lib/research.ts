import "server-only";

import { researchPosts } from "@/lib/content";
import type { ResearchPost } from "@/types/research";

export function getAllResearchPosts(): ResearchPost[] {
  return [...researchPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getResearchPostBySlug(slug: string): ResearchPost | undefined {
  return researchPosts.find((post) => post.slug === slug);
}
