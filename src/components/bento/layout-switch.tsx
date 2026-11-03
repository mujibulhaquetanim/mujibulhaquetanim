"use client";

import type { ReactNode } from "react";
import { useTheme } from "@/lib/theme";

/*
  The Bento theme has its own home layout. Both layouts are server-rendered (the server
  doesn't know the visitor's theme) and CSS shows the right one before first paint.
  After hydration the hidden one unmounts, and switching themes mounts the other.
*/
export function LayoutSwitch({ bento, standard }: { bento: ReactNode; standard: ReactNode }) {
  const theme = useTheme();
  return (
    <>
      {(theme === null || theme === "bento") && <div className="only-bento-layout">{bento}</div>}
      {(theme === null || theme !== "bento") && <div className="not-bento-layout">{standard}</div>}
    </>
  );
}

export type HeadingTag = "h1" | "h2" | "h3";

/*
  Crawlers that read the raw HTML see both home layouts, so headings in the standard one
  would compete with the bento ones (two h1s, the same project title twice). Until the
  theme is known, a standard-layout heading is a div marked data-heading, which
  globals.css styles like the real tag; after hydration it becomes the heading. The
  bento layout, the default and what search engines render, keeps its real headings.
*/
export function useLayoutHeadingTag(tag: HeadingTag) {
  const theme = useTheme();
  return theme === null ? { Tag: "div" as const, marker: tag } : { Tag: tag, marker: undefined };
}

export function LayoutHeading({ as, className, children }: { as: HeadingTag; className?: string; children: ReactNode }) {
  const { Tag, marker } = useLayoutHeadingTag(as);
  return (
    <Tag data-heading={marker} className={className}>
      {children}
    </Tag>
  );
}
