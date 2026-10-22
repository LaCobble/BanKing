# Contributing

Thanks for your interest! BanKing is a finished school/personal project, kept as a portfolio piece, so changes are mostly small fixes. Issues and pull requests are still welcome.

## Prerequisites

- Node.js 18 or later (CI uses Node 20) and npm
- A MongoDB instance (local or hosted)

## Run and check locally

```bash
npm ci
cp .env.example .env   # then set DB_URL
npm run dev             # or: npm start
```

Before opening a PR, make sure `node --check` passes on the files you touched; the CI also checks that the server modules load.

## Workflow

1. Create a branch from `main` named `type/short-topic` (for example `fix/search-crash`, `docs/readme`).
2. Write commits following [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): description`.
3. Open a pull request against `main` and fill in the template. The CI must be green.
4. Pull requests are merged with **squash and merge**.

## Versioning and releases

The project follows [Semantic Versioning](https://semver.org/). Add your change under `## [Unreleased]` in `CHANGELOG.md`. A release is cut by moving those entries under a new version heading and pushing a `vX.Y.Z` tag on `main`: the Release workflow then publishes the GitHub Release with the matching changelog section.

## Rules

- Never commit secrets (`.env`, API keys, passwords): use the example files.
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md). Report vulnerabilities privately (see [SECURITY.md](SECURITY.md)).
