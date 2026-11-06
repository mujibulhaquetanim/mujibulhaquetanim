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
- Articles: `src/content/articles/*.ts`, registered in `posts.ts`. A post with `body` renders
  at `/writing/[slug]` (BlogPosting JSON-LD, in the sitemap); a post with only `url` forwards
  there; a draft gets an in-progress page that is `noindex`. Bodies are typed blocks (`p`,
  `h2`, `list`, `code`) and inline `backticks` render as code. The published ones are written
  from real Zasmate troubleshooting notes: keep them in plain first person, and never copy in
  hosts, IPs, app or Page ids, tokens or tenant names.
- `src/app/`: routes. `/`, `/work`, `/work/[slug]`, `/about`, `/writing`, plus sitemap, robots, OG image.
- `src/components/`: `message-trace.tsx` is the interactive hero; `section.tsx` holds the shared section layout.
- `src/lib/seo.ts`: `pageMetadata()` builds each page's full metadata (canonical, Open Graph,
  Twitter). Next replaces nested metadata objects per segment, so pages must use it rather
  than setting `openGraph` by hand. Also the site-wide Person and WebSite JSON-LD.
- `src/components/profile-photo.tsx`: the LinkedIn photo (`site.photo`, via unavatar.io with
  the GitHub avatar as fallback), allowed by exact `images.remotePatterns` in `next.config.ts`.
- `src/lib/github.ts`: contribution calendar and streak, fetched server-side with `"use cache"`.
  It asks for the full history and the last year at once and falls back to the last year
  (then the streak is left out). Full success is cached for a day, last-year-only for hours,
  failure for minutes; failures log a `[github]` line with the reason. It must never throw:
  an error inside a cached function fails the build, and the community API it uses does
  time out.
- `src/lib/network.ts` raises Node's 250 ms per-address connect limit: from Bangladesh, with
  no IPv6 route, connections to that API (in Germany) failed at random. Loaded by
  `src/instrumentation.ts` (running server) and by `github.ts` (build workers skip
  instrumentation).
- `next.config.ts` redirects old Vite URLs (`/projects`, `/blogs`, `/tech-stack`, ...). It also
  turns off Turbopack's persistent dev and build caches: they served a stale `globals.css`,
  so CSS changes silently went missing (Netlify keeps `.next/cache` between deploys).

## Email, subscribers and the CMS

- **Forms** (`src/components/forms.tsx`, actions in `src/app/actions.ts`): the contact form
  emails `EMAIL_TO` with the visitor as reply-to; the subscribe form sends a double opt-in
  link (HMAC-signed, 48 h, `src/lib/signed-token.ts`) and only `/subscribe/confirm` adds the
  address to the Resend segment, after a button press (mail scanners open links). Addresses
  are checked for shape and MX records first. Bot defence: honeypot field, a minimum fill
  time and a per-IP limit (in memory, best effort). Without the env vars the forms say
  email isn't set up instead of failing.
- **New-article emails** (`src/app/api/notify/route.ts`): `POST` with
  `Authorization: Bearer $NOTIFY_SECRET`. Sends one Resend broadcast per published article
  from the last 14 days whose broadcast (`New article: <slug>`) doesn't exist yet, so it is
  safe to call repeatedly. `.github/workflows/notify-subscribers.yml` calls it after each
  push to `main`, once the live site reports that commit (`GET /api/notify`). Resend queues the sending and adds the unsubscribe link.
  One-off announcements: send a broadcast to the same segment from the Resend dashboard.
- **Env vars** are listed in `.env.example`. Set them in Netlify (site configuration >
  environment variables) and put `NOTIFY_SECRET` in the GitHub repo secrets too.
- **CMS**: Decap at `/admin` (`public/admin/`), pinned with an SRI hash. It edits
  `src/content/recommendations.json` (the `enabled` switch shows or hides `/recommendations`
  and its nav link). Sign-in is GitHub OAuth via Netlify: create a GitHub OAuth App with
  callback `https://api.netlify.com/auth/done`, then add it under Netlify > Access &
  security > OAuth. Only accounts with write access to this repo can save; every save is a
  commit to `main`. Locally: `npx decap-server` alongside `pnpm dev`.

## Design rules

The look is deliberately not a template. Keep it that way:

- Four themes, switched from the header (`ThemeSwitcher`) and stored in `localStorage`:
  - **paper**: editorial print. Light porcelain, accent blue, Instrument Serif headings over
    the mono body, italic section titles, greyscale photo. No motion at all.
  - **terminal**: green phosphor, `>` prompts on section titles, typed headings with a
    block cursor, scanline overlay, terminal-selection link hovers, tinted square photo.
  - **kinetic**: the award-site theme. Dark violet with lime and pink, Syne display type,
    word-rise headings, ring cursor in difference blend and magnetic buttons (`KineticFx`),
    scroll-velocity marquee (`VelocityMarquee`), film grain, scroll progress line, scroll
    reveals (`.reveal`), drifting backdrop. The home hero plays one entrance (`.hero-in`
    with a `--delay`). Reveals are time-based and run through the Web Animations API in
    `KineticFx`, never by setting attributes on server markup (that breaks hydration).
    Kinetic motion is meant to be slow enough to follow: entrances run about 1.1–1.8 s.
  - **bento**: the original Vite site's slate tile grid and the default theme, because it
    shows nearly everything on one screen. It swaps the home page for a one-screen bento
    layout (`src/components/bento/`) and uses the original fonts (IBM Plex Sans, Bricolage
    Grotesque) and tile styles. Other pages keep their structure
    with bento colours. `LayoutSwitch` server-renders both home layouts; CSS shows the right
    one before paint and the hidden one unmounts after hydration. So crawlers reading raw
    HTML see one h1 and no repeated headings, headings in the standard layout use
    `LayoutHeading` (or `AnimatedHeading inLayout`): a `div[data-heading]` until the theme
    is known, styled like the real tag in `globals.css`. The bento grid has a minimum, not
    a fixed, height so short windows scroll instead of clipping the bottom row.
  `themeBootScript` in `src/lib/theme-config.ts` sets `data-theme` before paint (no flash);
  first visits get `DEFAULT_THEME`, the first entry in `THEMES` (bento).
- Every theme defines the same tokens in `globals.css` (`paper`, `ink`, `ink-2`, `line`,
  `accent`, `marigold`, `marigold-ink`). Components use only tokens, never raw colours, so
  a new theme is just a new token block plus optional `[data-theme=…]` effects.
- Theme-specific effects live in CSS under `[data-theme=…]` selectors or in client
  components that read `useTheme()`. Paper stays effect-free.
- Reduced motion turns off all theme animation; animated headings render static text.
- Each theme must look like its own site, not a recolour. JetBrains Mono is the body face
  for paper, terminal and kinetic; headings use the theme's display face (Instrument Serif,
  JetBrains Mono, Syne). Bento uses IBM Plex Sans and Bricolage Grotesque throughout.
- The theme switcher pings until the visitor has tried another theme once (`theme-explored`
  in `localStorage`).
- Never branch render output on `useReducedMotion()` directly; it differs between server and
  first client render. Use `useHydratedReducedMotion()` from `src/lib/use-reduced-motion.ts`.
- No `body:has(...)` rules for page-level styles. With Cache Components a page you leave
  stays in the DOM, hidden by `<Activity>`, so the rule leaks onto the next page (the bento
  home once hid the footer site-wide). Render a `<style>` from the page and disable it in a
  ref cleanup, as `BentoHomeStyles` does.
- Base element styles live in `@layer base` and component classes in `@layer components`.
  Unlayered CSS beats Tailwind utilities regardless of specificity, so only `[data-theme=…]`
  overrides should sit outside a layer.
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
