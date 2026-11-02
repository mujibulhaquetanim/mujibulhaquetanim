import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images: {
    // Exact matches only: the profile photo (site.photo) and its GitHub fallback.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unavatar.io",
        pathname: "/linkedin/mujibulhaquetanim",
        search: `?fallback=${encodeURIComponent("https://avatars.githubusercontent.com/u/70325279?v=4")}`,
      },
      { protocol: "https", hostname: "avatars.githubusercontent.com", pathname: "/u/70325279", search: "?v=4" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // The CMS is a static page in public/admin.
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
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
