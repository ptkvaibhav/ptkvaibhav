# Pratik Vaibhav

Application Security Engineer focused on securing enterprise and government systems across application security, DevSecOps, and offensive testing.

[Website](https://ptkvaibhav.dev) • [LinkedIn](https://www.linkedin.com/in/ptkvaibhav/) • [GitHub](https://github.com/ptkvaibhav)

## Focus

- Application security for enterprise and government-facing systems
- Secure architecture, threat-informed testing, and DevSecOps integration
- Vulnerability validation and signal reduction instead of scanner-driven noise
- Security tooling that improves how teams identify, prioritize, and fix real issues

## Projects

- Project data is auto-synced from the GitHub API at render time with hourly revalidation.
- Repositories are ranked by recency, stars, forks, language metadata, topics, and description quality.
- The UI surfaces repository purpose, stars, forks, language, README links, update recency, and source download links.

Curated fallback descriptions remain in `lib/projects.ts` for flagship repositories, so the site still has strong content if the GitHub API is unavailable.

## Development

```bash
npm install
npm run dev
```

## Quality And Security

```bash
npm run lint
npm run build
npm audit
npm run sbom
```

OWASP Dependency-Check was run with the official CLI against `package.json` and `package-lock.json`; generated reports are written to `reports/dependency-check` and intentionally ignored by git.

Optional production environment variables:

- `GITHUB_TOKEN` increases GitHub API rate limits for live repository sync.
- `RESEND_API_KEY` enables the contact form email delivery.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` enable contact form rate limiting.
