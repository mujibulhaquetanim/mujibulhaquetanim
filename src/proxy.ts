import { NextResponse, type NextRequest } from "next/server";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";

const known = {
  work: new Set(projects.map((p) => p.slug)),
  writing: new Set(posts.map((p) => p.slug)),
};

/*
  Unknown /work/[slug] and /writing/[slug] addresses go straight to the static 404.
  Rendering them reaches notFound() only after the prerendered shell has been sent,
  which on Netlify ends as a 500 instead of a 404.
*/
export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  if ((section === "work" || section === "writing") && slug && !known[section].has(slug)) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/work/:slug", "/writing/:slug"],
};
