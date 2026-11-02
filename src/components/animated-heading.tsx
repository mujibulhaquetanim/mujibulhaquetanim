"use client";

import { useEffect, useState, type ElementType } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "@/lib/theme";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/\\[]{}";

/*
  A heading whose entrance depends on the theme:
    paper    — static text
    terminal — typed out once, then a blinking block cursor
    kinetic  — each character decodes from random glyphs, left to right
  The real text is always in the DOM for screen readers and search engines, and an
  invisible copy reserves the final size so nothing shifts while it animates.
*/
export function AnimatedHeading({
  text,
  as: Tag = "h1",
  className,
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const animated = !reduceMotion && (theme === "terminal" || theme === "kinetic");
  const [frame, setFrame] = useState<{ theme: string | null; shown: string }>({
    theme: null,
    shown: text,
  });

  useEffect(() => {
    if (!animated) return;
    let i = 0;
    let raf = 0;
    let last = 0;

    const tick = (now: number) => {
      if (theme === "terminal") {
        // ~38ms per character, like a fast typist.
        if (now - last > 38) {
          last = now;
          i += 1;
          setFrame({ theme, shown: text.slice(0, i) });
        }
      } else {
        // Reveal one more settled character every frame-ish; the rest stay scrambled.
        i += 0.55;
        const settled = Math.floor(i);
        const shown = Array.from(text, (ch, idx) =>
          idx < settled || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        ).join("");
        setFrame({ theme, shown });
      }
      if (i < text.length) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animated, theme, text]);

  // Until this theme's animation has produced a frame, show nothing (animated themes) or the text.
  const visible = !animated ? text : frame.theme === theme ? frame.shown : "";
  const showCaret = theme === "terminal" && !reduceMotion;

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="grid">
        <span className="invisible col-start-1 row-start-1">
          {text}
          {showCaret && <span className="caret" />}
        </span>
        {/* globals.css hides this layer in animated themes until hydrated, so the typed
            heading doesn't flash in full first. */}
        <span
          className="col-start-1 row-start-1"
          data-heading-visual
          data-ready={theme ? "" : undefined}
        >
          {visible}
          {showCaret && <span className="caret" />}
        </span>
      </span>
    </Tag>
  );
}
