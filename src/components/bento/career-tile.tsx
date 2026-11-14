import Link from "next/link";
import type { CSSProperties } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { milestones } from "@/content/profile";

/*
  The rail draws down and the milestones slide in with CSS animations, not motion's
  whileInView: that one server-renders the list at opacity 0, so it stayed invisible
  until JavaScript ran (or for good, if it failed), and it moved regardless of the
  reduced-motion setting. The global reduced-motion rule ends these instantly.
*/
export function CareerTile() {
  return (
    <Link href="/about" className="tile tile-link group flex h-full flex-col overflow-hidden p-3 xl:p-4">
      <h2 className="flex items-center gap-1 text-base font-bold leading-tight text-white xl:text-lg">
        Career path
        <LuArrowUpRight
          aria-hidden
          className="size-3.5 opacity-60 transition-all duration-300 ease-out-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 xl:size-4"
        />
      </h2>

      <ol className="relative mt-2.5 flex flex-1 flex-col justify-between gap-2 pl-5">
        <span
          aria-hidden
          className="rail-in absolute bottom-2 left-[5px] top-1.5 w-px origin-top bg-gradient-to-b from-signal via-white/30 to-white/10"
        />
        {milestones.map(({ year, title, detail, current }, i) => (
          <li
            key={`${year}-${title}`}
            className="slide-in relative min-w-0"
            style={{ "--delay": `${400 + i * 120}ms` } as CSSProperties}
          >
            <span
              aria-hidden
              className={`absolute -left-5 top-1 flex size-[11px] items-center justify-center rounded-full border-2 ${
                current ? "border-signal bg-signal" : "border-slate-400 bg-slate-700"
              }`}
            >
              {current && <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal/60" />}
            </span>
            <p className="flex items-baseline gap-2 text-sm leading-tight lg:text-xs xl:text-sm">
              <span className="truncate font-semibold text-white">{title}</span>
              {current && <span className="shrink-0 text-[10px] font-semibold text-signal">Now</span>}
              <span className="ml-auto shrink-0 text-[10px] tabular-nums text-slate-300 xl:text-[11px]">{year}</span>
            </p>
            <p className="truncate text-[11px] text-slate-300 xl:text-xs">{detail}</p>
          </li>
        ))}
      </ol>
    </Link>
  );
}
