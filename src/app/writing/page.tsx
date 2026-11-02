import type { Metadata } from "next";
import Link from "next/link";
import { SubscribeForm } from "@/components/forms";
import { PageIntro } from "@/components/section";
import { posts } from "@/content/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Writing",
  description: "Articles by Mujibul Haque Tanim on backend architecture, real-time systems and AI.",
  path: "/writing",
});

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));

export default function WritingPage() {
  const published = posts.filter((p) => p.status === "published");
  const drafts = posts.filter((p) => p.status === "draft");

  return (
    <>
      <PageIntro title="Writing">
        <p>
          Notes on problems I&apos;ve had to solve at work, mostly while building Zasmate.{" "}
          {published.length === 0
            ? "Nothing is published yet; these are the drafts I'm working on."
            : "Drafts in progress are listed below the published pieces."}
        </p>
      </PageIntro>

      <div className="mx-auto max-w-[1180px] px-5 pt-14 sm:px-8">
        <ul className="max-w-[760px] border-t border-line">
          {/* Every card opens something: published pieces go to the article, drafts to their
              in-progress page. */}
          {[...published, ...drafts].map((post) => {
            const external = post.status === "published" && post.url;
            const body = (
              <>
                <h2 className="text-xl font-bold leading-snug decoration-2 underline-offset-[0.2em] group-hover:underline">
                  {post.title}
                </h2>
                <p className="mt-2 text-ink-2">{post.excerpt}</p>
                <p className="mt-3 text-[0.875rem] text-ink-2">
                  {post.status === "draft" && (
                    <span className="mr-2 rounded-md border border-marigold px-1.5 py-0.5 text-marigold-ink">
                      In progress
                    </span>
                  )}
                  {post.date && `${formatDate(post.date)}, `}
                  {post.readMinutes} minute read, on {post.topics.join(", ")}
                </p>
              </>
            );
            return (
              <li key={post.slug} className="reveal border-b border-line">
                {external ? (
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="group block py-6">
                    {body}
                  </a>
                ) : (
                  <Link href={`/writing/${post.slug}`} className="group block py-6">
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-12 max-w-[760px]">
          <SubscribeForm />
        </div>
      </div>
    </>
  );
}
