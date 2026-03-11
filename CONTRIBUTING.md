# Contributing

## Scope

This repository backs a personal engineering portfolio. Contributions are welcome when they improve correctness, accessibility, security, performance, or documentation without disrupting the existing content and design direction.

## Getting Started

1. Fork the repository.
2. Create a feature branch from `master`.
3. Install dependencies with `npm install`.
4. Run the local development server with `npm run dev`.
5. Run checks before opening a pull request:

```bash
npm run lint
npm run build
```

## Pull Request Guidelines

- Keep changes focused and scoped.
- Preserve the existing App Router architecture unless a change clearly requires otherwise.
- Prefer server-side data fetching for GitHub or Supabase integrations.
- Maintain TypeScript strictness and avoid introducing unused code.
- Include screenshots or notes for visible UI changes when relevant.

## Reporting Issues

If you find a bug, open an issue with:

- A concise summary
- Reproduction steps
- Expected behavior
- Actual behavior
- Relevant environment details

Security-sensitive issues should not be filed publicly. Please use the process in [SECURITY.md](./SECURITY.md).
