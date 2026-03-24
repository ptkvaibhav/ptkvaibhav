import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { getAllResearchPosts, getResearchPostBySlug } from "@/lib/research";
import { siteConfig } from "@/lib/site";
import { spacing, typography } from "@/styles/design-system";

type ResearchPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function generateStaticParams() {
  return getAllResearchPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ResearchPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getResearchPostBySlug(slug);

  if (!post) {
    return {
      title: "Research",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${siteConfig.url}/research/${post.slug}`,
    },
  };
}

export default async function ResearchPostPage({ params }: ResearchPostPageProps) {
  const { slug } = await params;
  const post = getResearchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className={`container ${spacing.section}`}>
      <div className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <div className="space-y-4">
            <p className={typography.sectionLabel}>
              {formatDate(post.publishedAt)} {" / "} {post.readTime}
            </p>
            <h1 className={typography.pageTitle}>{post.title}</h1>
            <p className={typography.pageDescription}>{post.excerpt}</p>
          </div>
        </header>

        <div className="space-y-6 text-lg leading-9 text-zinc-300">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
