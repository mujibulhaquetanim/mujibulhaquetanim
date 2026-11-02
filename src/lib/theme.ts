"use client";

import { useSyncExternalStore } from "react";

export const THEMES = [
  { id: "paper", label: "Paper", note: "Light and calm" },
  { id: "terminal", label: "Terminal", note: "Green phosphor" },
  { id: "kinetic", label: "Kinetic", note: "Lots of motion" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const THEME_STORAGE_KEY = "theme";

/*
  Runs inline in <head> before first paint so the saved theme never flashes.
  First visit: dark system preference gets Terminal, otherwise Paper.
*/
export const themeBootScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="paper"&&t!=="terminal"&&t!=="kinetic"){t=matchMedia("(prefers-color-scheme: dark)").matches?"terminal":"paper"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="paper"}})()`;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = () => (document.documentElement.dataset.theme as ThemeId) ?? "paper";
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
