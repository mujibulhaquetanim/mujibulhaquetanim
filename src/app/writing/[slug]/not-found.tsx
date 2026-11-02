import Link from "next/link";
import { AnimatedHeading } from "@/components/animated-heading";
import { posts } from "@/content/posts";

// An article address that doesn't exist: point to the ones that do.
export default function PostNotFound() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-20 sm:px-8 lg:pt-32">
      <p className="font-mono text-sm text-ink-2">404</p>
      <AnimatedHeading
        text="There's no article at this address."
        className="mt-3 max-w-[20ch] text-[clamp(1.9rem,4.2vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.04em]"
      />
      <p className="mt-5 max-w-[52ch] text-lg text-ink-2">
        The link may be mistyped, or the article was renamed. These are the ones I&apos;m writing:
      </p>
      <ul className="mt-6 max-w-[760px] border-t border-line">
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-line">
            <Link href={`/writing/${p.slug}`} className="group block py-4 font-bold">
              <span className="decoration-2 underline-offset-[0.2em] group-hover:underline">{p.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/writing" className="btn btn-solid">
          All writing
        </Link>
        <Link href="/" className="btn btn-quiet">
          Home page
        </Link>
      </div>
    </div>
  );
}
