"use client";

import { THEMES, setTheme, useTheme } from "@/lib/theme";

// One button that cycles Paper → Terminal → Kinetic, labelled like a shell setting.
export function ThemeSwitcher() {
  const theme = useTheme();
  const index = Math.max(
    0,
    THEMES.findIndex((t) => t.id === theme),
  );
  const current = THEMES[index];
  const next = THEMES[(index + 1) % THEMES.length];

  return (
    <button
      type="button"
      onClick={() => setTheme(next.id)}
      aria-label={`Theme: ${current.label}. Switch to ${next.label} (${next.note.toLowerCase()})`}
      title={`Switch to ${next.label}: ${next.note}`}
      className="ml-1 flex items-center gap-2 rounded-md border border-line px-2 py-1 text-xs text-ink-2 transition-colors hover:border-ink hover:text-ink sm:ml-2"
    >
      {/* Three dots preview the palettes; the current one is filled. */}
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
