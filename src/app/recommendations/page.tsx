import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/section";
import { recommendations } from "@/content/recommendations";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Recommendations",
  description: "What people I've worked with say about working with Mujibul Haque Tanim.",
  path: "/recommendations",
});

// Switched on and off from the CMS; while off, the page doesn't exist.
export default function RecommendationsPage() {
  if (!recommendations.enabled) notFound();

  return (
    <>
      <PageIntro title="Recommendations">
        <p>From people I&apos;ve worked with, quoted as they wrote them.</p>
      </PageIntro>
      <div className="mx-auto max-w-[1180px] px-5 pt-14 sm:px-8">
        <ul className="grid max-w-[900px] gap-6 md:grid-cols-2">
          {recommendations.items.map((r) => (
            <li key={`${r.name}-${r.date ?? ""}`} className="reveal">
              <figure className="flex h-full flex-col rounded-md border border-line p-6">
                <blockquote className="flex-1 whitespace-pre-line leading-relaxed">{r.quote}</blockquote>
                <figcaption className="mt-5 border-t border-line pt-4 text-[0.9375rem]">
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="link font-bold">
                      {r.name}
                    </a>
                  ) : (
                    <span className="font-bold">{r.name}</span>
                  )}
                  <span className="block text-ink-2">{r.role}</span>
                  <span className="block text-ink-2">{r.relationship}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
