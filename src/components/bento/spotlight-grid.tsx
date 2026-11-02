"use client";

import type { PointerEvent, ReactNode } from "react";

// Feeds the .spotlight glow: track the cursor relative to whichever tile it is over.
function trackSpotlight(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const tile = (e.target as HTMLElement).closest<HTMLElement>(".tile");
  if (!tile) return;
  const rect = tile.getBoundingClientRect();
  tile.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  tile.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export function SpotlightGrid({ className, children }: { className: string; children: ReactNode }) {
  return (
    <section aria-label="Overview" onPointerMove={trackSpotlight} className={`spotlight ${className}`}>
      {children}
    </section>
  );
}
