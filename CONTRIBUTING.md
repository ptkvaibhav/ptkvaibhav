# Contributing

## Contribution Policy

This repository is not maintained as a general open-source project.

- Contributions are restricted.
- Feature contributions are not accepted unless explicitly invited.
- Pull requests are limited to critical bug fixes, documentation corrections, or security-related improvements.
- All pull requests require maintainer review before merge.

## Before Opening a Pull Request

If you have been asked to contribute, keep changes narrow and well-scoped.

1. Create a branch from the current integration branch.
2. Make the smallest viable change.
3. Run the required checks:

```bash
npm install
npm run lint
npm run build
```

4. Do not commit secrets, credentials, generated local environment files, or build artifacts other than approved repository outputs such as `sbom.json`.

## Security-Sensitive Issues

Do not file public issues for security problems. Follow the reporting process in [SECURITY.md](./SECURITY.md).
