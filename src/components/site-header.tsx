import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="whitespace-nowrap text-sm font-bold tracking-tight sm:text-[0.9375rem] [font-variation-settings:'wdth'_112]"
        >
          {site.name}
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
