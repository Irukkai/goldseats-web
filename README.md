# goldseats-web

Frontend for [GoldSeats](https://goldseats.app) — browse films, see where they
are playing nearby, and pick the best seat in the house.

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The home page reports whether `goldseats-api` is
reachable, so start the backend too — see
[goldseats-api](../goldseats-api/README.md).

## Scripts

| Script                 | What it does                    |
| ---------------------- | ------------------------------- |
| `npm run dev`          | Dev server on port 3000         |
| `npm run build`        | Production build                |
| `npm run lint`         | ESLint (`next/core-web-vitals`) |
| `npm run typecheck`    | `tsc --noEmit`                  |
| `npm test`             | Vitest suite                    |
| `npm run format`       | Prettier write                  |
| `npm run format:check` | Prettier check (what CI runs)   |

## Layout

```
src/
  app/          App Router routes, layouts, and global styles
  components/   shared UI kit
  lib/          API client, env access, helpers
reference/      the original hand-written landing page, kept for M3 migration
```

## Design tokens

The gold-on-near-black palette from the original landing page lives in
`src/app/globals.css` under Tailwind v4's `@theme` block. Use the token
utilities (`bg-ink`, `bg-ink-card`, `text-cream-muted`, `text-gold`,
`shadow-card`, `rounded-card`, `font-display`) instead of literal hex values so
the palette stays changeable in one place.

| Token          | Value     | Use                         |
| -------------- | --------- | --------------------------- |
| `ink`          | `#0a0a0f` | page background             |
| `ink-elevated` | `#101019` | raised surfaces, navbar     |
| `ink-card`     | `#141420` | cards                       |
| `cream`        | `#f5f7ff` | primary text                |
| `cream-muted`  | `#9ca1ba` | secondary text              |
| `gold`         | `#ffd700` | accent, recommended seats   |
| `gold-soft`    | `#f5a623` | secondary accent, gradients |

Typefaces are Inter (body) and Playfair Display (`font-display`), loaded
through `next/font` so there is no render-blocking request to Google.

## Talking to the API

All backend calls go through `src/lib/api.ts`. Add a typed wrapper there rather
than calling `fetch` from a component, and read configuration from
`src/lib/env.ts` rather than `process.env`.

```ts
const films = await apiFetch<Film[]>("/api/v1/films/now-playing", {
  revalidate: 300,
});
```

## Legacy landing page

`reference/legacy-landing.html` is the single-file marketing page that is
currently deployed. It is kept verbatim as the source of truth for the M3
migration into React components and is excluded from linting and formatting.

## Related

- [goldseats-api](../goldseats-api) — FastAPI backend
- [goldseats-docs](../goldseats-docs) — architecture, conventions, roadmap
