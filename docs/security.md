# Security

How the site is protected, and how each control was verified. To report a vulnerability, see [SECURITY.md](../SECURITY.md).

## Attack surface

| Surface | Exposure |
| :--- | :--- |
| Server-rendered page | Renders static content and GitHub API data; no user input is reflected. |
| `POST /api/contact` | The only endpoint that accepts user input. Sends an email; stores nothing. |
| Client components | Theme preference in `localStorage`; no user-generated content is rendered. |
| Third parties | Resend (email), Upstash (rate limiting), GitHub REST API (public data). |

## Browser controls

- **Content Security Policy** (`middleware.ts`), with a fresh nonce on every request:
  `default-src 'self'; script-src 'self' 'nonce-…'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; frame-src 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; worker-src 'self'; manifest-src 'self'; upgrade-insecure-requests`.
  Every script, including the theme bootstrap and JSON-LD, carries the nonce. `'unsafe-inline'` is allowed for styles only, which React's `style` attributes require.
- **Headers** (`next.config.mjs`): HSTS (2 years, preload), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Cross-Origin-Opener-Policy` and `Cross-Origin-Resource-Policy: same-origin`, a restrictive `Permissions-Policy`, `X-DNS-Prefetch-Control: off`; `X-Powered-By` removed.
- **XSS**: React escaping everywhere. The only `dangerouslySetInnerHTML` uses are the static theme script and JSON-LD, which is serialized with `<` escaped. Links taken from the GitHub API must be `http(s)`. All `target="_blank"` links use `rel="noopener noreferrer"`.

## Contact API

| Control | Detail |
| :--- | :--- |
| Rate limiting | Upstash sliding window, 5 requests/min per client IP. The IP comes from `x-vercel-forwarded-for` / `x-real-ip` set by the Vercel edge, never the client-controlled first `X-Forwarded-For` hop. Fails closed (503) if Redis is unavailable. |
| Origin check | `Origin`/`Referer` must match the site origin (plus the current Vercel preview URL). `localhost` is accepted only outside production. |
| CSRF | Double-submit token: `csrf-token` cookie (SameSite=Lax, Secure in production) must equal the `X-CSRF-Token` header. |
| Request shape | `application/json` only (415), 16 KB max (413), strict Zod schema (unknown fields rejected), control characters stripped from single-line fields (no email header injection). |
| Bots | Two honeypot fields return a fake success. |
| Output | Every field is HTML-escaped before it goes into the email body. |

## Verification (v3.0.0)

Run against a production build (`next start`) with a mock rate limiter:

- Missing, foreign and `localhost` origins → 403; CSRF mismatch → 403; `text/plain` → 415; 50 KB body → 413; extra field → 400; CRLF in email → 400.
- `<script>` in the query string is not reflected; every `<script>` tag carries the CSP nonce.
- No secrets in git history or client bundles; `npm audit --omit=dev` reports 0 vulnerabilities.

## Supply chain

- `npm audit --omit=dev`, CycloneDX SBOM (`sbom.json`) and CodeQL run on every PR, on `main` and weekly.
- Dependabot opens grouped security PRs as soon as advisories are published (see `.github/dependabot.yml`).
- GitHub Actions run with a read-only `GITHUB_TOKEN` by default.
- Known, accepted: moderate advisories in dev-only tooling (`minimatch`/`glob` pulled in by ESLint plugins and the SBOM generator's build chain). They never ship to the site and can't be resolved without breaking those tools; Dependabot will pick up fixes when upstream releases them.

## Secrets

`.env*` files are git-ignored. Server secrets (`RESEND_API_KEY`, `UPSTASH_*`, `GITHUB_TOKEN`) are only read in `server-only` modules and never reach the client bundle.
