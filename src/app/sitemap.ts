import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { recommendations } from "@/content/recommendations";
import { site } from "@/content/site";

// Content ships with each deploy, so the build time is the last change.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/about", "/writing", "/contact", ...(recommendations.enabled ? ["/recommendations"] : [])];
  const pages = paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const work = projects.map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
    images: [new URL(p.image.src, site.url).href],
  }));
  // Only finished articles; draft pages are noindex placeholders.
  const articles = posts
    .filter((p) => p.body)
    .map((p) => ({
      url: `${site.url}/writing/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    }));
  return [...pages, ...work, ...articles];
}
