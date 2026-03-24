import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { typography } from "@/styles/design-system";
import type { ResearchPost } from "@/types/research";

type ResearchCardProps = {
  post: ResearchPost;
};

export function ResearchCard({ post }: ResearchCardProps) {
  return (
    <Card className="h-full p-6">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="space-y-3">
          <p className="text-sm text-zinc-500">
            {post.publishedAt} {" / "} {post.readTime}
          </p>
          <CardTitle className={typography.cardTitle}>{post.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="max-w-[34rem] overflow-hidden text-base leading-7 text-zinc-400 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
          {post.excerpt}
        </p>
        <Link
          href={`/archive/research/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-emerald-300"
        >
          Read article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
