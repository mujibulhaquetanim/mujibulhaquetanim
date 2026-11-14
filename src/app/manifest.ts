import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}, ${site.role}`,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    // The default (Bento) theme's page colour.
    background_color: "#2d3e5d",
    theme_color: "#2d3e5d",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
