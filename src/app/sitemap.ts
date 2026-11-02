import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/writing"].map((path) => ({
    url: `${site.url}${path}`,
    priority: path === "" ? 1 : 0.8,
  }));
  const work = projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.6 }));
  return [...pages, ...work];
}
