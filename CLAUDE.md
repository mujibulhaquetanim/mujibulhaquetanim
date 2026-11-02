@AGENTS.md

# Portfolio: mujibulhaquetanim.dev

Personal site of Mujibul Haque Tanim, built with Next.js 16 (App Router, Cache Components,
Partial Prefetching, React Compiler), Tailwind CSS 4 and `motion`. Rebuilt in November 2026
from the old Vite version in `Frontend-Functionalities/Portfolios/mujibv.1`.

`README.md` at the root is the **GitHub profile README** (this is the `username/username`
repo). Never overwrite it with project docs; put those here.

## Commands

- `pnpm dev`: local dev server
- `pnpm build`: production build (also type-checks)
- `pnpm lint`: ESLint

## Layout

- `src/content/`: all copy and data (site, projects, profile, posts). Edit content here, not in pages.
- `src/app/`: routes. `/`, `/work`, `/work/[slug]`, `/about`, `/writing`, plus sitemap, robots, OG image.
- `src/components/`: `message-trace.tsx` is the interactive hero; `section.tsx` holds the shared section layout.
- `src/lib/github.ts`: contribution calendar and streak, fetched server-side with `"use cache"`.
  Success is cached for a day, failure for minutes. It must never throw: an error inside a
  cached function fails the build, and the community API it uses does time out.
- `next.config.ts` redirects old Vite URLs (`/projects`, `/blogs`, `/tech-stack`, ...).

## Design rules

The look is deliberately not a template. Keep it that way:

- Three themes, switched from the header (`ThemeSwitcher`) and stored in `localStorage`:
  - **paper**: light porcelain, accent blue, no ambient motion. The calm default.
  - **terminal**: green phosphor, `>` prompts on section titles, typed headings with a
    block cursor, scanline overlay, terminal-selection link hovers.
  - **kinetic**: dark violet with lime and pink, scrambled headings, colour sweep on h1,
    scroll reveals (`.reveal`, CSS scroll timelines), drifting backdrop, cursor glow.
  `themeBootScript` in `src/lib/theme.ts` sets `data-theme` before paint (no flash); first
  visits get terminal on a dark system, paper otherwise.
- Every theme defines the same tokens in `globals.css` (`paper`, `ink`, `ink-2`, `line`,
  `accent`, `marigold`, `marigold-ink`). Components use only tokens, never raw colours, so
  a new theme is just a new token block plus optional `[data-theme=…]` effects.
- Theme-specific effects live in CSS under `[data-theme=…]` selectors or in client
  components that read `useTheme()`. Paper stays effect-free.
- Reduced motion turns off all theme animation; animated headings render static text.
- One typeface: JetBrains Mono for everything. Big headings use tight negative tracking.
- Content is left-aligned. Sections put the title in a narrow left column (`<Section>`).
- Avoid ALL-CAPS eyebrow labels, `A · B` meta strings, arrows appended to link text and
  glass cards. Decoration belongs to a theme, not to the base styles.
- Screenshots get `bg-white`; some PNGs have transparent areas that look broken on dark themes.
- Copy is plain and specific, in sentence case. Don't invent metrics; numbers come from
  `src/content` or live data.

## Images

Project screenshots live in `public/projects/` and are imported statically in
`src/content/projects.ts`. Keep files small: the original GIFs were 60–85 MB and are now
animated WebP. Convert new recordings to WebP or video before adding them.
