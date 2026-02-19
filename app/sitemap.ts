import type { MetadataRoute } from "next";
import { posts } from "#site/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/blogs", "/projects", "/contact"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const blogRoutes = posts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${siteConfig.url}/blogs/${post.slugAsParams}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...routes, ...blogRoutes];
}
