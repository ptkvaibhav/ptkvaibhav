import type { MetadataRoute } from "next";

import { researchPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/projects", "/research", "/labs", "/contact", "/resume"];

  return [
    ...routes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
    })),
    ...researchPosts.map((post) => ({
      url: `${siteConfig.url}/research/${post.slug}`,
      lastModified: new Date(post.publishedAt),
    })),
  ];
}
