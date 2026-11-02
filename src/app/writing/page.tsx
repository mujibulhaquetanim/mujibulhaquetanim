import type { Metadata } from "next";
import { PageIntro } from "@/components/section";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles by Mujibul Haque Tanim on backend architecture, real-time systems and AI.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const published = posts.filter((p) => p.status === "published");
  const drafts = posts.filter((p) => p.status === "draft");

  return (
    <>
      <PageIntro title="Writing">
        <p>
          Notes on problems I&apos;ve had to solve at work.{" "}
          {published.length === 0
            ? "Nothing is published yet; these are the drafts I'm working on."
            : "Drafts in progress are listed below the published pieces."}
        </p>
      </PageIntro>

      <div className="mx-auto max-w-[1180px] px-5 pt-14 sm:px-8">
        <ul className="max-w-[760px] border-t border-line">
          {[...published, ...drafts].map((post) => {
            const body = (
              <>
                <h2 className="text-xl font-bold leading-snug">
                  {post.title}
                </h2>
                <p className="mt-2 text-ink-2">{post.excerpt}</p>
                <p className="mt-3 text-[0.875rem] text-ink-2">
                  {post.status === "draft" ? "Draft, " : ""}
                  {post.readMinutes} minute read, on {post.topics.join(", ")}
                </p>
              </>
            );
            return (
              <li key={post.slug} className="border-b border-line py-6">
                {post.status === "published" && post.url ? (
                  <a href={post.url} className="group block [&_h2]:group-hover:underline">
                    {body}
                  </a>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
