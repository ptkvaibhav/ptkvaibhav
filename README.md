# Pratik Vaibhav

Application Security Engineer focused on securing enterprise and government systems across application security, DevSecOps, and offensive testing.

[Website](https://ptkvaibhav.dev) • [LinkedIn](https://www.linkedin.com/in/ptkvaibhav/) • [GitHub](https://github.com/ptkvaibhav)

## What This Repository Is

This repository powers my portfolio site at [ptkvaibhav.dev](https://ptkvaibhav.dev) and is also the repository shown on my public GitHub profile.

It is maintained as a production-grade personal site rather than a reusable starter. The focus here is clear positioning, secure engineering practices, and a clean record of the systems and tooling work I want people to associate with my name.

## Current Focus

- Application security for enterprise and government-facing systems
- Secure architecture, threat-informed testing, and DevSecOps integration
- Vulnerability validation and signal reduction instead of scanner-driven noise
- Security tooling that improves how teams identify, prioritize, and fix real issues

## Selected Work

- **Clinkz**  
  Autonomous penetration testing system built around agentic workflows, dynamic vulnerability discovery, and evidence-driven analysis.

- **Burp to Fortify Parser**  
  Normalizes Burp Suite findings into formats that fit enterprise SAST/DAST workflows more cleanly.

- **Invoker**  
  Security automation work focused on reducing manual effort across testing and workflow orchestration.

## Security and Engineering Posture

- Next.js App Router with server-side API handling
- Resend-backed contact flow
- Zod validation and DOMPurify sanitization
- Upstash Redis rate limiting
- CSP and response hardening through middleware and platform headers
- SBOM generation and software composition checks in CI
- Dependabot limited to controlled weekly minor and patch updates

Additional implementation notes live in [docs/architecture.md](./docs/architecture.md) and [docs/security.md](./docs/security.md).

## Local Development

This is a personal repository, but the project can still be run locally if needed.

```bash
git clone https://github.com/ptkvaibhav/ptkvaibhav.git
cd ptkvaibhav
npm install
npm run dev
```

## Environment Variables

Only the active environment variables are documented here:

```bash
NEXT_PUBLIC_SITE_URL=
RESEND_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
GITHUB_TOKEN=
```

`GITHUB_TOKEN` is optional, but useful for higher GitHub API limits when syncing portfolio project metadata.

## Repository Governance

- Default branch: `main`
- PR-based change flow
- CI build and lint checks
- Security workflow with audit, SBOM, and CodeQL analysis
- Dependabot enabled with major-version noise suppressed

## License

This repository is licensed under the MIT License. See [LICENSE](./LICENSE).
