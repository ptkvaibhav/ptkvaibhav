import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { ResearchCard } from "@/components/sections/research-card";
import { Badge } from "@/components/ui/badge";
import { getAllResearchPosts } from "@/lib/research";
import { spacing, typography } from "@/styles/design-system";

export const metadata: Metadata = {
  title: "Research",
  description: "A small set of research notes on application security, tooling, and offensive automation.",
};

export const dynamic = "force-static";
export const revalidate = 3600;

export default function ResearchPage() {
  const posts = getAllResearchPosts().slice(0, 2);

  return (
    <section className={`container ${spacing.section}`}>
      <Reveal className={spacing.sectionHeader}>
        <Badge className="w-fit">Research</Badge>
        <h1 className={typography.pageTitle}>A small set of working notes.</h1>
        <p className={typography.pageDescription}>
          Short writing on application behavior, offensive automation, and the practical design of
          security tooling.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.05}>
            <ResearchCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
