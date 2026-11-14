import Link from "next/link";

/*
  The Suspense boundary around the project page. The page reads `params`, which the
  shared App Shell for this route can't include, so without a boundary here a client
  navigation into a project would wait for the server instead of starting at once.
  Direct visits still get the full prerendered page (generateStaticParams).
*/
export default function Loading() {
  return (
    <div aria-busy className="mx-auto min-h-[70vh] max-w-[1180px] px-5 pt-12 sm:px-8 lg:pt-20">
      <Link href="/work" className="link text-[0.9375rem] text-ink-2">
        All work
      </Link>
    </div>
  );
}
