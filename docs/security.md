# Security

## Overview

The repository includes application-level and repository-level controls intended to reduce common deployment and supply-chain risks.

## Content Security Policy

- CSP is applied through middleware.
- Script execution is constrained with a nonce-based policy.
- Framing is disabled.
- Browser security headers are also configured through Next.js.

## Input Validation and Sanitization

- Contact input is validated with Zod.
- Email body content is sanitized before being sent through Resend.
- Invalid origins and CSRF token failures are rejected early.

## Rate Limiting

- Contact submissions are protected with Redis-backed distributed rate limiting via Upstash.
- The implementation is designed for serverless environments and avoids in-memory counters.

## SCA and SBOM

- `npm audit` is used to surface dependency vulnerabilities.
- `cyclonedx-npm` generates `sbom.json` for software bill of materials tracking.
- GitHub workflows run security automation as part of repository hygiene.

## Repository Controls

- Secrets are excluded through `.gitignore`
- Security reporting is documented in `SECURITY.md`
- CI and security workflows are defined under `.github/workflows/`
