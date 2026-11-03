# v3.0.0 — The Dossier

The portfolio is now a declassified case file: readable at a glance for recruiters, with plenty to find for the curious. This release also hardens security across the site and repository.

**Live:** https://ptkvaibhav.vercel.app

## Highlights

### A new look: the dossier
- Paper sheets on a kraft desk, stencil and typewriter type, handwritten margin notes, rubber stamps, highlighter and label-maker tags. Dark mode is the same file under a desk lamp.
- **Personnel file** hero with a clipped polaroid, a decrypting status line and key findings.
- **Service record**: experience as a case-file timeline.
- **Evidence exhibits**: projects as retro windows, each with real case notes (problem, how it works, impact, what's next).
- **Capabilities assessment** index cards, **commendation** certificates, and a **Form 27-B** contact form.
- Plain-English navigation, so there's nothing to learn.

### Built for phones
No sideways scrolling, a full-screen mobile menu, 16px form fields (no iOS zoom), and case notes that open as a bottom sheet.

### Easter eggs
Open the dev-tools console, try the Konami code (↑↑↓↓←→←→BA), type "hire", or search ⌘K for something classified. Desktop visitors get an investigator cursor.

## Security

- All production dependency advisories fixed, including two critical (Next.js, DOMPurify). `npm audit --omit=dev`: 0 vulnerabilities.
- Contact API: rate limiting can no longer be bypassed with a forged `X-Forwarded-For`; production rejects `localhost` origins; non-JSON and oversized requests are refused.
- Contact emails HTML-escape all user input.
- Stricter CSP and extra headers (CORP, Permissions-Policy); RFC 9116 `security.txt`.
- Repository: read-only GitHub Actions token by default, private-only vulnerability reporting, grouped Dependabot security updates.

Verified against a production build: forged origins, CSRF mismatches, oversized or non-JSON bodies, unknown fields and email header injection are all rejected; nothing is reflected into the page; every script carries the CSP nonce. Details in [docs/security.md](security.md).

## Under the hood

- Next.js 15.5.28 · React 19.3 · Zod 4 · ESLint 9 · CycloneDX 6 (SBOM spec 1.6) · CI on Node 22.
- Removed: interactive lab, sound effects, contribution heatmap, unused code and the unused Supabase schema.
- New developer guide in [docs/README.md](README.md); the root README is now a focused GitHub profile.

Full list of changes: [CHANGELOG.md](../CHANGELOG.md) · [v2.1.0...v3.0.0](https://github.com/ptkvaibhav/ptkvaibhav/compare/v2.1.0...v3.0.0)
