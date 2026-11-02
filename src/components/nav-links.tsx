"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex items-center text-sm sm:gap-2 sm:text-[0.9375rem]">
      {links.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`rounded-md px-2 py-1 transition-colors ${
              active ? "text-ink underline decoration-2 underline-offset-[0.4em]" : "text-ink-2 hover:text-ink"
            }`}
          >
            {label}
          </Link>
        );
      })}
      <a
        href={site.resume}
        download
        className="ml-1 hidden rounded-md px-2 py-1 text-ink-2 transition-colors hover:text-ink sm:inline"
      >
        Résumé
      </a>
    </nav>
  );
}
