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

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllResearchPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ResearchPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getResearchPostBySlug(slug);

  if (!post) {
    return {
      title: "Archived Research",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${siteConfig.url}/archive/research/${post.slug}`,
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
        <header className="space-y-5">
          <Badge className="w-fit">Archived Research</Badge>
          <h1 className={typography.pageTitle}>{post.title}</h1>
          <div className="flex flex-wrap gap-3 text-sm text-zinc-500">
            <span>{post.publishedAt}</span>
            <span>{post.readTime}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <p className={typography.pageDescription}>{post.excerpt}</p>
        </header>

        <div className="space-y-6 text-base leading-8 text-stone-300/85">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
