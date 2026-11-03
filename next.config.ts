import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  // No "X-Powered-By: Next.js" header; it tells crawlers and scanners nothing useful.
  poweredByHeader: false,
  experimental: {
    // Turbopack's persistent caches served a stale compile of globals.css (the Tailwind
    // loader's output) to both `next dev` and `next build`, so CSS changes silently went
    // missing. Netlify keeps .next/cache between deploys, so a deploy could too. Builds
    // here are small; fresh output is worth the extra seconds.
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
  // Netlify's COMMIT_REF, baked in at build so GET /api/notify can say which commit is live.
  env: { BUILD_COMMIT: process.env.COMMIT_REF ?? "local" },
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
