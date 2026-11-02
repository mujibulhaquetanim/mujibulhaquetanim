import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AnimatedHeading } from "@/components/animated-heading";
import { ArticleBody } from "@/components/article-body";
import { SubscribeForm } from "@/components/forms";
import { getPost, posts, type Post } from "@/content/posts";
import { site } from "@/content/site";
import { jsonLd, pageMetadata, personId } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));

export async function generateMetadata({ params }: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const base = pageMetadata({ title: post.title, description: post.excerpt, path: `/writing/${post.slug}` });
  if (post.body) {
    return {
      ...base,
      authors: [{ name: site.name, url: site.url }],
      keywords: post.topics,
      openGraph: { ...base.openGraph, type: "article", publishedTime: post.date, authors: [site.url], tags: post.topics },
    };
  }
  // A draft page is a placeholder, not an article; keep it out of search results until it ships.
  return { ...base, robots: { index: false, follow: true } };
}

function articleJsonLd(post: Post) {
  const url = `${site.url}/writing/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: post.date,
    keywords: post.topics.join(", "),
    inLanguage: "en",
    author: { "@id": personId },
    publisher: { "@id": personId },
  };
}

/*
  Articles written here render in full. Articles published elsewhere (post.url) forward
  there. Drafts get an in-progress page, so every card on /writing opens something.
*/
export default async function PostPage({ params }: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  if (!post.body && post.status === "published" && post.url) redirect(post.url);

  return post.body ? <Article post={post} body={post.body} /> : <Draft post={post} />;
}

function Article({ post, body }: { post: Post; body: NonNullable<Post["body"]> }) {
  const more = posts.filter((p) => p.slug !== post.slug && p.body);
  return (
    <article className="mx-auto max-w-[1180px] px-5 pt-12 sm:px-8 lg:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleJsonLd(post)) }} />
      <Link href="/writing" className="link text-[0.9375rem] text-ink-2">
        All writing
      </Link>

      <header className="mt-8 max-w-[68ch]">
        <p className="text-[0.9375rem] text-ink-2">
          {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
          {post.date && ", "}
          {post.readMinutes} minute read, on {post.topics.join(", ")}
        </p>
        <AnimatedHeading
          text={post.title}
          className="mt-4 text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.04em]"
        />
        <p className="mt-6 text-lg leading-relaxed text-ink-2">{post.excerpt}</p>
      </header>

      <div className="mt-10 border-t border-line pt-4">
        <ArticleBody blocks={body} />
      </div>

      <footer className="mt-16 max-w-[68ch] border-t border-line pt-6 text-ink-2">
        <p>
          Written by {site.name}, {site.role.toLowerCase()} at {site.employer.name}. Questions or a
          different take? Email me at{" "}
          <a href={`mailto:${site.email}`} className="link text-ink">
            {site.email}
          </a>
          .
        </p>
      </footer>

      <div className="mt-10 max-w-[68ch]">
        <SubscribeForm title="Want the next one?" />
      </div>

      {more.length > 0 && <PostList title="More writing" items={more} />}
    </article>
  );
}

function Draft({ post }: { post: Post }) {
  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <article className="mx-auto max-w-[1180px] px-5 pt-12 sm:px-8 lg:pt-20">
      <Link href="/writing" className="link text-[0.9375rem] text-ink-2">
        All writing
      </Link>

      <header className="mt-8 max-w-[760px]">
        <p className="text-[0.9375rem] text-ink-2">
          <span className="mr-2 rounded-md border border-marigold px-1.5 py-0.5 text-marigold-ink">In progress</span>
          {post.readMinutes} minute read, on {post.topics.join(", ")}
        </p>
        <AnimatedHeading
          text={post.title}
          className="mt-4 text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.04em]"
        />
        <p className="mt-6 text-lg leading-relaxed text-ink-2">{post.excerpt}</p>
      </header>

      <div className="mt-10 max-w-[760px]">
        <SubscribeForm
          title="This article is still being written"
          note="It isn't ready to publish yet. Subscribe and you'll get an email when it's out, along with anything else I publish."
        />
      </div>

      {others.length > 0 && <PostList title="Other writing" items={others} />}
    </article>
  );
}

function PostList({ title, items }: { title: string; items: Post[] }) {
  return (
    <section aria-label={title} className="mt-16 max-w-[760px]">
      <h2 className="section-title text-lg font-bold">{title}</h2>
      <ul className="mt-4 border-t border-line">
        {items.map((p) => (
          <li key={p.slug} className="border-b border-line">
            <Link href={`/writing/${p.slug}`} className="group block py-4">
              <span className="font-bold decoration-2 underline-offset-[0.2em] group-hover:underline">{p.title}</span>
              <span className="mt-1 block text-[0.875rem] text-ink-2">
                {p.body ? "" : "In progress, "}
                {p.readMinutes} minute read, on {p.topics.join(", ")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
