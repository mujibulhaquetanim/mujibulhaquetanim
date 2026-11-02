import Link from "next/link";
import { AnimatedHeading } from "@/components/animated-heading";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-20 sm:px-8 lg:pt-32">
      <p className="font-mono text-sm text-ink-2">404</p>
      <AnimatedHeading
        text="There's no page at this address."
        className="mt-3 max-w-[20ch] text-[clamp(1.9rem,4.2vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.04em]"
      />
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
