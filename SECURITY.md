# Security Policy

This repository powers my production portfolio at **https://ptkvaibhav.vercel.app**. I take reports seriously — it would be a little awkward not to.

## Reporting a vulnerability

Please report privately by email: **ptkvaibhav@gmail.com** (subject: `Security: <short summary>`).

Do not open a public issue, pull request or discussion for a vulnerability.

Include, where you can:

- What the issue is and where (URL, route, component, workflow)
- Steps to reproduce or a minimal proof of concept
- The impact you believe it has
- Any suggested fix

## What to expect

| Step | Target |
| :--- | :--- |
| Acknowledgement | within 3 business days |
| Triage and severity assessment | within 7 business days |
| Fix for critical/high issues | as fast as practical, usually within 14 days |

I'll keep you updated, credit you in the release notes if you'd like, and let you know when it is safe to disclose.

## Scope

In scope:

- https://ptkvaibhav.vercel.app and its routes, including `POST /api/contact`
- Security headers, CSP and middleware
- This repository's GitHub Actions workflows and dependency configuration

Out of scope:

- Third-party services themselves (Vercel, Resend, Upstash, GitHub)
- Denial of service through volumetric traffic
- Missing best-practice headers with no demonstrable impact
- The easter-egg "flags" — they are meant to be found 🙂

## Safe harbor

Good-faith research that respects this policy, avoids privacy violations and service disruption, and does not access data that isn't yours will not be pursued.

## Supported versions

Only the latest release, deployed from `main`, is supported.

The security design and how it was verified are documented in [docs/security.md](docs/security.md).
