---
title: 09 GitHub Actions
tier: advanced
platform: javascript
position: 9
---

# 09 — GitHub Actions

[Hub](https://alibaihaqi.github.io/learning-docs/) › JavaScript › [Advanced](./index) › 09 GitHub Actions

**Goal:** create a CI/CD pipeline that installs dependencies, runs lint, runs
integration tests with a PostgreSQL service container, builds the Docker image,
and pushes it to a registry.

## CI workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:17-alpine
        env:
          POSTGRES_DB: todos_test
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version-file: .node-version
          cache: "npm"

      - run: npm ci

      - run: node bin/migrate.js
        env:
          PGDATABASE: todos_test
          PGPASSWORD: postgres

      - run: npm test
        env:
          PGDATABASE: todos_test
          PGPASSWORD: postgres

  build:
    needs: [test]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - uses: docker/setup-buildx-action@v3

      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
```

## Explanation

| Step | Purpose |
|------|---------|
| `services.postgres` | Spins up a fresh Postgres container with a health check before the test job starts |
| `migrate` | Runs the schema migration against the service container |
| `test` | Runs Jest with `--forceExit` to cleanly tear down after tests |
| `build` | Only on main; logs into GitHub Container Registry and pushes the image |

## Lint check

Add a lint step (requires `npm install -D eslint`):

```yaml
      - run: npx eslint .
```

Add to the `test` job, before the `npm test` step:

```yaml
      - run: npx eslint .
```

## Checkpoint

Push the workflow to GitHub and open a PR. The CI tab should show:

```
✓ test (ubuntu-latest) — 6 passed
✓ build (ubuntu-latest) — pushed ghcr.io/your-org/your-repo:latest
```

To run the same check locally without pushing, use [act](https://github.com/nektos/act):

```bash
act -j test
```

---

Next: [10 Production practices](./10-production-practices)
