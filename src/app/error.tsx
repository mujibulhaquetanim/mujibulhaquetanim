"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/content/site";

// Unexpected runtime errors in any page: say so plainly and offer a retry.
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-20 sm:px-8 lg:pt-32">
      <p className="font-mono text-sm text-ink-2">Error</p>
      <h1 className="mt-3 max-w-[20ch] text-[clamp(1.9rem,4.2vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
        Something broke while loading this page.
      </h1>
      <p className="mt-5 max-w-[52ch] text-lg text-ink-2">
        It&apos;s on my side, not yours. Trying again usually works. If it keeps happening, I&apos;d
        like to know at{" "}
        <a href={`mailto:${site.email}`} className="link text-ink">
          {site.email}
        </a>
        .
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={() => retry()} className="btn btn-solid">
          Try again
        </button>
        <Link href="/" className="btn btn-quiet">
          Go to the home page
        </Link>
      </div>
    </div>
  );
}
