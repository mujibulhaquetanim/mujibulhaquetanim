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
