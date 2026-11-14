import { NextResponse, type NextRequest } from "next/server";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { recommendations } from "@/content/recommendations";

const known = {
  work: new Set(projects.map((p) => p.slug)),
  writing: new Set(posts.map((p) => p.slug)),
};

// Articles published elsewhere: /writing/<slug> forwards to them.
const forwarded = new Map(
  posts.filter((p) => !p.body && p.status === "published" && p.url).map((p) => [p.slug, p.url!]),
);

/*
  Decided here rather than in the pages, before anything renders:
  - Unknown /work/[slug] and /writing/[slug] addresses, and /recommendations while the CMS
    has it switched off, go straight to the static 404. Rendering them reaches notFound()
    only after the prerendered shell has been sent, which on Netlify ends as a 500
    instead of a 404 (the slug pages stream inside loading.tsx's Suspense boundary).
  - Forwarded articles get a real 307, not a redirect() made after streaming started.
*/
export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  if (section === "recommendations" && !slug && !recommendations.enabled) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
  if ((section === "work" || section === "writing") && slug && !known[section].has(slug)) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
  const external = section === "writing" && slug ? forwarded.get(slug) : undefined;
  if (external) return NextResponse.redirect(external, 307);
  return NextResponse.next();
}

export const config = {
  matcher: ["/work/:slug", "/writing/:slug", "/recommendations"],
};
