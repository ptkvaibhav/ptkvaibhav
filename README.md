# ptkvaibhav.dev

Enterprise-focused application security portfolio built with Next.js App Router, typed server-side integrations, and production-oriented security controls.

## Live Demo

- Production: https://ptkvaibhav.dev

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- React 19
- GSAP
- Resend
- Upstash Redis / Ratelimit
- Zod
- Vercel

## Architecture Overview

This repository powers a single-page portfolio focused on application security, offensive testing, and security engineering work.

- App Router is used for server-rendered routes, layouts, and API handlers.
- UI is organized under `components/` with shared primitives under `components/ui/`.
- Contact submission is handled through `app/api/contact/route.ts`.
- Email delivery is isolated in `services/resend.ts`.
- Validation and request typing are centralized in `lib/validation.ts` and `types/contact.ts`.
- Security controls such as CSP, CSRF checks, and request hardening are applied in middleware and API handlers.

Additional implementation details are documented in [docs/architecture.md](./docs/architecture.md).

## Security Features

- Nonce-based Content Security Policy
- CSRF protection with origin validation and token checks
- Zod-based input validation
- DOMPurify sanitization for email payloads
- Redis-backed distributed rate limiting via Upstash
- Security headers through Next.js and middleware
- Automated SCA support through `npm audit` and SBOM generation
- Server-side handling of all sensitive contact workflows

Security design details are documented in [docs/security.md](./docs/security.md).

## Features

- Single-page portfolio with anchored navigation
- Structured experience and project storytelling
- Production contact flow using Resend
- Typed validation and shared request models
- Security-focused operational posture and repository governance

## Setup

```bash
git clone https://github.com/ptkvaibhav/ptkvaibhav.dev.git
cd ptkvaibhav.dev
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env.local` and provide values for the variables you need:

```bash
NEXT_PUBLIC_SITE_URL=
RESEND_API_KEY=
GITHUB_TOKEN=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

The committed `.env.example` file contains the full supported set.

## Deployment

The site is intended for deployment on Vercel.

1. Import the repository into Vercel.
2. Configure environment variables in the Vercel project settings.
3. Deploy from the protected production branch.
4. Confirm CI and security workflows pass before promoting changes.

## Screenshots

Screenshots are optional and can be added later under `docs/` if needed for release notes or portfolio previews.

## Branch Protection

For production use, configure GitHub branch protection on `main`:

- Require pull request reviews before merge
- Block direct commits to `main`
- Require CI and security workflows to pass
- Require branch up to date before merge when possible

Default branch: `main`

## License

This repository is licensed under the MIT License. See [LICENSE](./LICENSE).
