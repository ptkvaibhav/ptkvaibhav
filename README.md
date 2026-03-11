# ptkvaibhav.dev

## Overview

This repository contains the source code for a modern personal engineering portfolio focused on:

- Application Security
- Offensive Security
- Security Automation
- Research-driven tooling

The site is designed to present technical work clearly, document project case studies, and surface active GitHub engineering activity without relying on client-side API calls.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- Supabase
- Vercel

## Architecture

Key architectural decisions:

- Server Components are used for data fetching so GitHub and content data are resolved on the server and cached with ISR.
- ISR is used for GitHub project sync and activity feeds to keep data current without calling external APIs on every request.
- Supabase handles contact form persistence through server-side API routes.
- Security headers and CSP are enforced through Next.js configuration.
- Typed data models keep project, research, contact, and GitHub data structures consistent across the app.

## Features

- Dynamic GitHub project sync
- GitHub activity feed
- Technical project case studies
- Research article previews
- Security workbench hero
- Contact form with validation and rate limiting

## Local Development

```bash
git clone https://github.com/ptkvaibhav/ptkvaibhav.dev.git
cd ptkvaibhav.dev
npm install
npm run dev
```

## Environment Variables

Create a local `.env` file with the following values:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GITHUB_TOKEN`

Optional values already supported by the project:

- `CONTACT_RATE_LIMIT_WINDOW_MS`
- `CONTACT_RATE_LIMIT_MAX_REQUESTS`

## Supabase Security Configuration

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code or browser-delivered bundles.
- Use Row Level Security policies on every table that stores project or contact data.
- Restrict API access to the minimum Supabase roles required for each workflow.
- Enable Supabase audit logs so administrative and data access activity can be reviewed.
- Store Supabase credentials in Vercel Environment Variables instead of committing them.
- Rotate Supabase keys periodically and after any suspected exposure.

## Deployment

The site is intended for deployment on Vercel. Connect the repository to a Vercel project, configure the required environment variables, and deploy from the default branch. ISR-backed GitHub data and App Router server rendering work well within the Vercel Hobby deployment model used by this project.

## Vercel Security

- Store secrets only in Vercel Environment Variables and never commit deployment credentials.
- Disable preview deployment secrets when they are not required by the workflow.
- Enable available Vercel firewall protections to reduce unwanted traffic and abuse.
- Configure domain-level HTTPS enforcement for every production hostname.
- Keep secure headers configured through `next.config.mjs` so transport and browser protections are applied consistently.

## Abuse Protection

The contact API uses Redis-backed distributed rate limiting through Upstash. This avoids the weak process-local behavior of in-memory counters on serverless platforms and keeps abuse controls consistent across cold starts, parallel invocations, and multiple regions.

## Security

Security considerations built into the project:

- CSP headers and additional security headers are configured through Next.js
- Input validation is enforced with Zod
- Contact route requests are rate-limited
- GitHub API usage is server-side only, preventing token exposure in the browser

If you discover a vulnerability, please follow the instructions in [SECURITY.md](./SECURITY.md).

## License

MIT License. See [LICENSE](./LICENSE).
