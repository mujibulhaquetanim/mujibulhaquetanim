import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1180px] items-center justify-between gap-3 px-5 sm:px-8">
        <Link href="/" className="whitespace-nowrap text-sm font-bold tracking-tight">
          {/* The full name doesn't fit beside the nav on phones in a monospace face. */}
          <span className="sm:hidden" aria-label={site.name}>
            M. H. Tanim
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>
        <div className="flex items-center">
          <NavLinks />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
