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

- Colours are tokens in `globals.css` (porcelain paper, green-black ink, cobalt for interaction).
  Marigold appears only inside the hero trace. Use `marigold-ink` for marigold text.
- One typeface, Mona Sans, with headings set wider via `font-variation-settings: "wdth"`.
  Martian Mono is for real log or code text only, never for labels.
- Content is left-aligned. Sections put the title in a narrow left column (`<Section>`).
- Avoid ALL-CAPS eyebrow labels, `A · B` meta strings, arrows appended to link text,
  gradient or glow decoration, glass cards, and fade-in-on-scroll for every section.
- The hero trace is the only motion that runs on its own. Everything else animates only in
  response to the visitor.
- Copy is plain and specific, in sentence case. Don't invent metrics; numbers come from
  `src/content` or live data.

## Images

Project screenshots live in `public/projects/` and are imported statically in
`src/content/projects.ts`. Keep files small: the original GIFs were 60–85 MB and are now
animated WebP. Convert new recordings to WebP or video before adding them.
