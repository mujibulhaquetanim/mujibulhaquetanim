import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-20 sm:px-8 lg:pt-32">
      <p className="font-mono text-sm text-ink-2 [font-variation-settings:'wdth'_87.5]">404</p>
      <h1 className="mt-3 max-w-[16ch] text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
        There&apos;s no page at this address.
      </h1>
      <p className="mt-5 max-w-[52ch] text-lg text-ink-2">
        It may have moved when the site was rebuilt. Most things are under Work or About.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-solid">
          Go to the home page
        </Link>
        <Link href="/work" className="btn btn-quiet">
          See my work
        </Link>
      </div>
    </div>
  );
}
