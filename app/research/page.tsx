import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { ResearchCard } from "@/components/sections/research-card";
import { Badge } from "@/components/ui/badge";
import { getAllResearchPosts } from "@/lib/research";

export const metadata: Metadata = {
  title: "Research",
  description: "Research notes on application security, offensive security, and security automation.",
};

export const dynamic = "force-static";
export const revalidate = 3600;

export default function ResearchPage() {
  const posts = getAllResearchPosts();

  return (
    <section className="container py-20 md:py-24">
      <Reveal className="mb-10 space-y-6">
        <Badge variant="accent" className="w-fit">
          Research / Blog
        </Badge>
        <div className="max-w-3xl space-y-4">
          <h1 className="font-serif text-5xl tracking-tight text-white md:text-6xl">
            Writing on adversarial behavior, security engineering, and offensive automation.
          </h1>
          <p className="text-lg leading-8 text-zinc-400">
            A running body of work on how modern applications behave under pressure, how
            security tooling should fit into real engineering environments, and where agentic
            systems can improve offensive workflows.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.05}>
            <ResearchCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
