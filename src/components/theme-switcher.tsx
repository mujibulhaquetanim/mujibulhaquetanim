"use client";

import { useSyncExternalStore } from "react";
import { THEMES, setTheme, useTheme } from "@/lib/theme";

const EXPLORED_KEY = "theme-explored";

// Whether the visitor has tried another theme yet; the ping invites them until they have.
const exploredListeners = new Set<() => void>();
function subscribeExplored(onChange: () => void) {
  exploredListeners.add(onChange);
  return () => exploredListeners.delete(onChange);
}
function getExplored() {
  try {
    return localStorage.getItem(EXPLORED_KEY) === "1";
  } catch {
    return true;
  }
}
// The server renders no ping, so it only appears after hydration.
const getExploredOnServer = () => true;

function markExplored() {
  try {
    localStorage.setItem(EXPLORED_KEY, "1");
  } catch {
    // Storage blocked: the ping just stays.
  }
  exploredListeners.forEach((fn) => fn());
}

// One button that cycles Bento → Paper → Terminal → Kinetic, labelled like a shell setting.
export function ThemeSwitcher() {
  const theme = useTheme();
  const explored = useSyncExternalStore(subscribeExplored, getExplored, getExploredOnServer);
  const index = Math.max(
    0,
    THEMES.findIndex((t) => t.id === theme),
  );
  const current = THEMES[index];
  const next = THEMES[(index + 1) % THEMES.length];

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next.id);
        markExplored();
      }}
      aria-label={`Theme: ${current.label}. Switch to ${next.label} (${next.note.toLowerCase()})`}
      title={`Switch to ${next.label}: ${next.note}`}
      className="relative ml-1 flex items-center gap-2 rounded-md border border-line px-2 py-1 text-xs text-ink-2 transition-colors hover:border-ink hover:text-ink sm:ml-2"
    >
      {!explored && (
        <span aria-hidden className="absolute -right-1 -top-1 flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex size-full rounded-full bg-accent" />
        </span>
      )}
      {/* One dot per theme; the current one is filled. */}
      <span aria-hidden className="flex gap-1">
        {THEMES.map((t) => (
          <span
            key={t.id}
            className={`size-2 rounded-full border border-current ${t.id === current.id ? "bg-accent border-accent" : ""}`}
          />
        ))}
      </span>
      <span className="hidden sm:inline">
        {/* Rendered after hydration; the server doesn't know the visitor's theme. */}
        {theme ? current.label.toLowerCase() : "theme"}
      </span>
    </button>
  );
}
