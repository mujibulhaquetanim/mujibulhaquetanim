"use client";

/*
  Page-level rules for the bento home: no footer (the contact tile replaces it) and a
  header as wide as the tile grid. They used to be `body:has([data-bento-home])` rules,
  but with Cache Components Next keeps the previous page in the DOM, hidden by
  <Activity>, so after leaving home they still matched and /about lost its footer.
  This stylesheet is server-rendered, so it applies before first paint, and it is
  switched off while Activity hides the page (the ref cleanup runs on hide).
*/
const css = `
[data-theme="bento"] body > footer { display: none; }
[data-theme="bento"] body > header > div { max-width: 90rem; padding-inline: 1rem; }
`;

export function BentoHomeStyles() {
  return (
    <style
      ref={(style) => {
        if (!style) return;
        style.media = "";
        return () => {
          style.media = "not all";
        };
      }}
    >
      {css}
    </style>
  );
}
