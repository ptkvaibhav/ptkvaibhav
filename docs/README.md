# Portfolio site — developer guide

Source for **[ptkvaibhav.vercel.app](https://ptkvaibhav.vercel.app)**. The repository root `README.md` doubles as the GitHub profile README, so all developer documentation lives here.

- [Architecture](architecture.md) — how the app is put together
- [Security](security.md) — controls, threat model and how they are verified
- [Changelog](../CHANGELOG.md) · [Release notes](release-v3.0.0.md)

## Stack

| Area | Choice |
| :--- | :--- |
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 3 with CSS-variable design tokens (`app/globals.css`) |
| Fonts | Self-hosted WOFF2 in `app/fonts` via `next/font/local` (IBM Plex Sans/Mono, Big Shoulders, Special Elite, Caveat); builds need no network access to Google Fonts |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Rate limiting | Upstash Redis (`@upstash/ratelimit`) |
| Hosting | Vercel |

## Getting started

Requires Node.js 20.18+ (CI uses Node 22).

```bash
npm ci
cp .env.example .env.local   # fill in what you need, see below
npm run dev                  # http://localhost:3000
```

The site runs without any environment variables. The contact form returns a "not configured" error until the Resend and Upstash variables are set; that is intentional, so the form never runs without abuse protection.

## Environment variables

| Variable | Required for | Notes |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, contact-form origin check | Production: `https://ptkvaibhav.vercel.app`. Falls back to the Vercel production domain, then `http://localhost:3000`. |
| `RESEND_API_KEY` | Contact form | Emails are sent to the address in `lib/site.ts`. |
| `UPSTASH_REDIS_REST_URL` | Contact form | Rate limit: 5 requests per minute per client IP. |
| `UPSTASH_REDIS_REST_TOKEN` | Contact form | |
| `GITHUB_TOKEN` | Optional | Raises the GitHub REST API rate limit for project and profile data. No scopes needed. |

## Scripts

| Command | What it does |
| :--- | :--- |
| `npm run dev` | Local dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint 9 (flat config, `eslint.config.mjs`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run security:audit` | `npm audit --omit=dev` |
| `npm run sbom` | Regenerate `sbom.json` (CycloneDX 1.6) |

## Editing content

| What | Where |
| :--- | :--- |
| Name, email, social links, nav | `lib/site.ts` |
| Roles and achievements | `lib/content.ts` |
| Projects (fallback copy and case notes) | `lib/projects.ts` — live stars/forks/descriptions come from the GitHub API |
| Skills | `components/sections/skills.tsx` |
| Awards | `components/sections/awards.tsx` |
| Hero copy and key findings | `components/sections/hero-profile.tsx` |
| Resume PDF | `public/resume/Pratik_Vaibhav_Resume.pdf` |
| Photo | `public/pratik-vaibhav.png` |

## CI and dependency policy

- **CI** (`.github/workflows/ci.yml`): lint, type check and production build on every PR and push to `main`.
- **Security** (`.github/workflows/security.yml`): `npm audit --omit=dev`, SBOM generation and CodeQL on every PR, push to `main` and weekly.
- **Dependabot** (`.github/dependabot.yml`): grouped security fixes as soon as advisories land; weekly grouped minor/patch PRs (runtime and tooling separately); majors one at a time; GitHub Actions monthly. Majors that need a planned migration are held: Next.js, Tailwind CSS and `tailwind-merge` (Tailwind 4), ESLint, and TypeScript 7 (not yet supported by Next.js 15).

## Releasing

1. Update `CHANGELOG.md` and add `docs/release-vX.Y.Z.md`.
2. Bump `version` in `package.json` and run `npm install` and `npm run sbom`.
3. Merge to `main` (Vercel deploys automatically), then tag `vX.Y.Z` on the merge commit and publish a GitHub release from the release notes.
