# mujibulhaquetanim.dev

This repository has two jobs. `README.md` is my GitHub profile page, and the rest is the source
of [mujibulhaquetanim.dev](https://mujibulhaquetanim.dev). This file covers the site.

The site is a rebuild of my earlier React and Vite portfolio,
[mujibv.1](https://github.com/mujibulhaquetanim/Frontend-Functionalities/tree/main/Portfolios/mujibv.1),
moved to Next.js with server rendering, real SEO metadata, live GitHub data and a theme system.
The original bento tile grid is still there as the default theme.

## What's in it

- Next.js 16 (App Router, Cache Components, Partial Prefetching, React Compiler)
- Tailwind CSS 4 and `motion`
- Four themes that each look like their own site: **bento** (the default, a one-screen tile
  grid), **paper** (editorial serif, no motion), **terminal** (green phosphor, typed headings)
  and **kinetic** (word-rise headlines, blend-mode cursor, magnetic buttons, velocity marquee)
- SEO: per-page canonical and Open Graph data, Person, WebSite, project and breadcrumb
  structured data, a sitemap, a web manifest and a generated share image
- A contact form and double opt-in email subscriptions through Resend. New articles are
  announced automatically after each deploy
- Decap CMS at `/admin` (GitHub sign-in) for content such as recommendations
- An interactive hero that traces one customer message through Zasmate
- GitHub activity and streak, fetched on the server and cached for a day

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build and type check
pnpm lint
```

The forms and subscriber emails need the environment variables listed in `.env.example`.
Without them the site still runs, and the forms say that email isn't set up.

For the CMS locally, run `npx decap-server` alongside `pnpm dev`.

## Where things are

- `src/content/`: all copy and data (site, projects, profile, articles)
- `src/app/`: routes, sitemap, robots and the share image
- `src/components/`: UI, including the bento home layout and the theme switcher
- `src/lib/`: SEO helpers, theme config and the GitHub data fetch
- `public/admin/`: the Decap CMS config

`CLAUDE.md` has the detailed notes on architecture and design rules.
