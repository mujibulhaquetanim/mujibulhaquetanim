import Link from "next/link";

// The Suspense boundary around the article page; see work/[slug]/loading.tsx.
export default function Loading() {
  return (
    <div aria-busy className="mx-auto min-h-[70vh] max-w-[1180px] px-5 pt-12 sm:px-8 lg:pt-20">
      <Link href="/writing" className="link text-[0.9375rem] text-ink-2">
        All writing
      </Link>
    </div>
  );
}
