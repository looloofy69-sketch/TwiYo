# TwiYo

TwiYo is a React/Vite concept demo that presents two separate journeys under one brand: a sample shop and illustrative marketing services.

> **Demo only:** sample products, prices, variants and service offers are fictional. Cart and fake confirmation state exist only in React memory. Checkout has no payment step, and the enquiry form only displays local confirmation. No order or lead is transmitted or stored.

## Run the demo locally

Requirements: Node.js 22 and pnpm 10.18.0 (pinned in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev:static
```

The development server uses port 3000 unless the environment supplies `PORT`.

## Verification

```sh
pnpm quality:demo
pnpm check
pnpm test
pnpm build:static
```

The static build and its route-specific prerendered HTML are written to `dist/public`. GitHub Actions runs the demo quality gate, production-dependency advisory audit, TypeScript check, unit tests, and static build on pull requests and pushes to `main`.

## Architecture and deployment boundary

The **static demo path** is `pnpm dev:static` / `pnpm build:static`. It does not connect to a production database, payment provider, customer store, email/CRM system, or product analytics.

The repository also contains a starter Node/Express, OAuth, tRPC, and Drizzle scaffold under `server/` and `drizzle/`. That scaffold is **not approved for production use** and is not needed by the static demo build. Do not deploy `pnpm build` / `pnpm start` or add live credentials until its authentication, session management, rate limits, request limits, authorization, database model, secrets handling, and dependency posture have been separately reviewed.

## Where to change things

- Catalogue, illustrative prices, variants, service examples, and metadata: `client/src/data/siteData.ts`.
- Public pages and demo flows: `client/src/pages/`.
- Cart domain rules: `client/src/lib/cartRules.ts` and `client/src/contexts/CartContext.tsx`.
- Shared layout and page metadata: `client/src/components/`.
- Design system and responsive behavior: `client/src/index.css`.
- Static SEO fallback and route pages: `scripts/prerender.ts`.
- Demo boundaries enforced in CI: `scripts/quality-gate.mjs`.

## Launch is still blocked on business decisions

Before converting the demo into a real business, approve the operator identity, target markets, languages and currency, actual catalogue and services, pricing, inventory and fulfilment, payment and settlement provider, support channels, market-appropriate policies, data flows, secure admin permissions and MFA, retention/deletion, backups, monitoring, and production domain. Replace draft-generated Manus-hosted visuals with approved, deployable assets. The admin page is a non-operational mockup, not a secured admin system.

See [the demo quality gate](docs/DEMO_QUALITY_GATE.md), [repository audit](docs/REPOSITORY_AUDIT.md), and [security and functional audit](docs/SECURITY_AND_FUNCTIONAL_AUDIT.md).
