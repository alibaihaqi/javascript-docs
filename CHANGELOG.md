# Changelog

All notable changes to the JavaScript learning-docs site. Newest first.
Format loosely follows [Keep a Changelog](https://keepachangelog.com/).

## 2026-07-05 — Advanced tier

### Added
- **Advanced tier** (`src/advanced/`, 10 pages + index): evolves the CLI todo into a web API — Express server with PostgreSQL (`pg`), REST CRUD, JWT auth with bcrypt, middleware (logging, error, auth), Docker + docker-compose, Jest integration tests, GitHub Actions CI/CD, and production practices (env vars, graceful shutdown, rate limiting, health checks). Wired into the sidebar, nav, and home feature card.

## 2026-07-04 — Intermediate tier

### Added
- **Intermediate tier** (`src/intermediate/`, 7 pages): grows the beginner CLI
  todo with `done`/`remove` commands, a `list --pending` filter, and async
  seeding from a public API via `fetch` (`seed`). Still zero dependencies.

## 2026-07-04 — Beginner tier + toolchain alignment

### Added
- **Beginner tier** (`src/beginner/`, 7 pages): a zero-dependency Node CLI todo
  app — `add`/`list` persisted to `todos.json`, a tested `todo` module.
- **`CLAUDE.md`** — public-safe repo conventions.

### Changed
- Upgraded VitePress to 1.6.4; pinned Node to 26.4.0 (`.node-version` + deploy
  workflow).

## Earlier — Topic documentation

### Added
- Introduction plus topic sections: JavaScript basics, data structures, Bun,
  and NestJS; VitePress site with GitHub Pages deploy.
