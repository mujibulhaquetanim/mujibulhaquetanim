"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import { useLayoutHeadingTag, type HeadingTag } from "@/components/bento/layout-switch";
import { useTheme } from "@/lib/theme";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";

/*
  A heading whose entrance depends on the theme:
    paper, bento — static text
    terminal     — typed out once, then a blinking block cursor
    kinetic      — words rise out of a mask one after another (CSS, see .word-rise)
  The real text is always in the DOM for screen readers and search engines, and an
  invisible copy reserves the final size so nothing shifts while it animates.
  `inLayout` marks a heading in the standard home layout (see useLayoutHeadingTag).
*/
export function AnimatedHeading({
  text,
  as = "h1",
  inLayout = false,
  className,
}: {
  text: string;
  as?: HeadingTag;
  inLayout?: boolean;
  className?: string;
}) {
  const theme = useTheme();
  const layoutTag = useLayoutHeadingTag(as);
  const { Tag, marker } = inLayout ? layoutTag : { Tag: as, marker: undefined };
  const reduceMotion = useHydratedReducedMotion();
  const typing = !reduceMotion && theme === "terminal";
  const rising = !reduceMotion && theme === "kinetic";
  const [typed, setTyped] = useState<{ theme: string | null; shown: string }>({ theme: null, shown: text });

  useEffect(() => {
    if (!typing) return;
    let i = 0;
    let raf = 0;
    let last = 0;
    // ~38ms per character, like a fast typist.
    const tick = (now: number) => {
      if (now - last > 38) {
        last = now;
        i += 1;
        setTyped({ theme, shown: text.slice(0, i) });
      }
      if (i < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [typing, theme, text]);

  const showCaret = theme === "terminal" && !reduceMotion;
  let visual: ReactNode = text;
  if (typing) visual = typed.theme === theme ? typed.shown : "";
  if (rising) {
    visual = text.split(" ").map((word, i) => (
      <Fragment key={i}>
        {i > 0 && " "}
        <span className="word-mask">
          <span className="word-rise" style={{ animationDelay: `${250 + i * 110}ms` }}>
            {word}
          </span>
        </span>
      </Fragment>
    ));
  }

  return (
    <Tag data-heading={marker} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="grid">
        <span className="invisible col-start-1 row-start-1">
          {text}
          {showCaret && <span className="caret" />}
        </span>
        {/* globals.css hides this layer in animated themes until hydrated, so the
            animated heading doesn't flash in full first. */}
        <span className="col-start-1 row-start-1" data-heading-visual data-ready={theme ? "" : undefined}>
          {visual}
          {showCaret && <span className="caret" />}
        </span>
      </span>
    </Tag>
  );
}
