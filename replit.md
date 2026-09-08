# SignalForge Trading Platform

SignalForge is an authenticated trading-intelligence workspace that normalizes incoming provider signals, makes readiness and risk visible, and keeps execution explicitly gated.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/signalforge run dev` — run the SignalForge web workspace
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Clerk is managed through the Replit Auth pane; the API uses `CLERK_SECRET_KEY` and the web app uses `VITE_CLERK_PUBLISHABLE_KEY`.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Web: React + Vite + TanStack Query + Wouter

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for API contracts
- `lib/api-client-react` and `lib/api-zod` — generated React Query hooks and Zod schemas
- `lib/db/src/schema` — Drizzle persistence models
- `artifacts/api-server/src/routes` — authenticated API route handlers
- `artifacts/signalforge/src/App.tsx` and `src/index.css` — SignalForge workspace UI and visual system

## Architecture decisions

- Clerk is the only authentication boundary; do not add local Passport, bcrypt, JWT, or fake session storage.
- API mutations are scoped to the authenticated Clerk user and fail closed when no session is present.
- Fresh workspaces use explicit empty states. No sample signals, brokers, providers, trades, payments, or KYC records are seeded.
- External capabilities such as Telegram, MetaApi, payments, and KYC must report not-configured states instead of simulating success.
- OpenAPI changes require running the API code generator before consuming new client or validation types.

## Product

- Public marketing and Clerk sign-in/sign-up routes.
- Authenticated dashboard, signal center, source configuration, broker readiness, risk controls, analytics, provider marketplace, and settings surfaces.
- Persistent signal-source creation/update and risk-profile save behavior backed by PostgreSQL.

## User preferences

- Keep the product dark-first and institutional, with restrained motion and clear execution boundaries.

## Gotchas

- The web Vite config requires `PORT` and `BASE_PATH`; use the managed workflow or provide both for a production build.
- The API server uses structured pino logging; do not add `console.log` or `console.error` to server code.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
