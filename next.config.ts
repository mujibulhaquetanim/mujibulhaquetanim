import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // URLs from the previous Vite version of the site, kept so old links and search results still land.
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects/:path*", destination: "/work", permanent: true },
      { source: "/tech-stack", destination: "/about#toolbox", permanent: true },
      { source: "/blogs", destination: "/writing", permanent: true },
      { source: "/work-updates", destination: "/", permanent: true },
      { source: "/coming-soon", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
