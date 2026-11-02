"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, type ThemeId } from "@/lib/theme-config";

export { THEMES, type ThemeId } from "@/lib/theme-config";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = () => (document.documentElement.dataset.theme as ThemeId) ?? DEFAULT_THEME;
// Unknown on the server; client components render the theme-neutral version first.
const getServerSnapshot = () => null;

export function useTheme(): ThemeId | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setTheme(theme: ThemeId) {
  const apply = () => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Storage blocked: the theme still applies for this visit.
    }
  };
  // Cross-fade where supported; otherwise switch instantly.
  if (document.startViewTransition) document.startViewTransition(apply);
  else apply();
}
