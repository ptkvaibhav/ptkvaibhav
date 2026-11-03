# Architecture

A single-page Next.js 15 App Router site. One server-rendered page, one API route, edge middleware, and a handful of client components for interactivity.

## Layout

```
app/
  layout.tsx            Root layout: fonts, theme bootstrap script (nonce), JSON-LD, header/footer, palette, easter eggs, cursor
  page.tsx              The dossier: hero → experience → projects → skills → awards → contact (revalidates hourly)
  api/contact/route.ts  Contact form handler (Node.js runtime)
  not-found.tsx, error.tsx, robots.ts, sitemap.ts
middleware.ts           Per-request CSP nonce + CSRF cookie
components/
  dossier/              Theme primitives: Stamp, Redacted, DecryptText, cursor, easter eggs + toast
  sections/             Page sections (hero, experience, project card, GitHub card, skills, awards)
  interactive/          ⌘K command palette, project "case notes" modal
  layout/               Header (folder-tab nav, mobile index) and footer
  forms/                Contact form
  providers/            Theme provider (light "paper" / dark "desk lamp")
  ui/                   Button, Input, Textarea, SectionHeader
  motion/reveal.tsx     GSAP scroll reveal
lib/                    site config, content, projects, GitHub client, fonts, validation, rate limiting
services/resend.ts      Contact email composition and delivery
```

## Data flow

- **Projects** (`lib/projects.ts`): fetched server-side from the GitHub REST API for `ptkvaibhav`, merged with curated copy in `staticProjects` by slug, cached for an hour (`revalidate = 3600`). If GitHub is unreachable, the curated copy is shown.
- **GitHub card** (`lib/github.ts`): public repo and follower counts from the REST API; hidden if the API fails rather than showing placeholder numbers.
- **Experience, skills, awards**: static content in `lib/content.ts` and the section components.

## Contact flow

1. The form (`components/forms/contact-form.tsx`) validates in the browser with the shared Zod schema and posts JSON to `/api/contact` with the `X-CSRF-Token` header copied from the `csrf-token` cookie.
2. The route rate-limits by client IP (Upstash, 5/min), then checks `Origin`/`Referer` against the site origin and the double-submit CSRF token.
3. It rejects non-JSON (415) and bodies over 16 KB (413), runs the honeypot fields, then validates with the same Zod schema (strict: unknown fields rejected; control characters stripped).
4. `services/resend.ts` HTML-escapes every field and emails it to the site owner with `Reply-To` set to the sender.

## Theming

- Design tokens are CSS variables in `app/globals.css` (`--paper`, `--stamp`, `--blueink`, `--highlight`, …) mapped into Tailwind in `tailwind.config.ts`.
- Light mode is the default. An inline, nonce'd script in `layout.tsx` applies the saved theme before first paint; `ThemeProvider` keeps it in sync and persists it to `localStorage` (`ptk-theme`).
- Motion respects `prefers-reduced-motion` globally; the custom cursor is disabled on touch devices and with reduced motion.

## Overlays

The case-notes modal is rendered through a React portal into `<body>` so that transformed ancestors (tilted cards, GSAP reveals) can't become its containing block. The mobile menu sits outside the header's `backdrop-filter` layer for the same reason.
