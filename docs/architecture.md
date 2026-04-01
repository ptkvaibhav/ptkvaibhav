# Architecture

## Overview

This repository hosts a Next.js App Router portfolio designed as a production-oriented personal site with server-side contact handling and security controls.

## Application Structure

- `app/`: App Router pages, layouts, route handlers, and error boundaries
- `components/`: Presentational and interactive UI components
- `components/ui/`: Shared design primitives
- `lib/`: Shared utilities, validation, configuration, and data helpers
- `services/`: External service integrations such as Resend
- `types/`: Shared TypeScript types

## Runtime Model

- The UI is rendered through Next.js App Router.
- The contact flow is handled through `app/api/contact/route.ts`.
- Middleware applies CSP and request hardening before application code runs.
- Static assets are served from `public/`.

## Contact Flow

1. The browser submits the contact form to `/api/contact`.
2. The request is validated with Zod.
3. CSRF and origin checks are applied.
4. Input is sanitized before email composition.
5. The message is sent through Resend.
6. Rate limiting is enforced through Upstash Redis.

## Component Organization

- Layout components live under `components/layout/`
- Feature sections live under `components/sections/`
- Form handling lives under `components/forms/`

This keeps application structure predictable and makes it easier to review or extend without mixing service concerns into UI layers.
