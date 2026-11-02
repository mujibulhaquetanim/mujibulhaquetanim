// Shared by the server layout (boot script) and client components (switcher, hooks).

// The first theme is the default for first visits.
export const THEMES = [
  { id: "bento", label: "Bento", note: "Everything on one screen" },
  { id: "paper", label: "Paper", note: "Light and calm" },
  { id: "terminal", label: "Terminal", note: "Green phosphor" },
  { id: "kinetic", label: "Kinetic", note: "Lots of motion" },
] as const;

export const DEFAULT_THEME: ThemeId = THEMES[0].id;

export type ThemeId = (typeof THEMES)[number]["id"];

export const THEME_STORAGE_KEY = "theme";

const ids = JSON.stringify(THEMES.map((t) => t.id));

/*
  Runs inline in <head> before first paint so the saved theme never flashes.
  First visit, or a stored value that is no longer a theme: the default (Bento).
*/
export const themeBootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(${ids}.indexOf(t)<0){t="${DEFAULT_THEME}"}d.dataset.theme=t}catch(e){d.dataset.theme="${DEFAULT_THEME}"}})()`;
