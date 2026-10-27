# TwiYo repository audit

**Audit date:** 2026-10-27  
**Scope:** repository integrity, static-demo behavior, build/CI hygiene, deployment boundary. This is a source-level review, not a penetration test or legal approval.

## Repository state

- The TwiYo source was imported into `main` through [PR #1](https://github.com/looloofy69-sketch/TwiYo/pull/1).
- The import changed 149 files. The initial pull-request workflow passed dependency installation, the demo quality gate, TypeScript, unit tests, and the static build.
- The hardening branch `audit/demo-hardening-2026-10` regenerated `pnpm-lock.yaml` after applying patched dependency floors and removed the one-time source-import machinery.
- GitHub Actions passed dependency installation, demo quality gate (15 checks), TypeScript, unit tests, and the static build. The post-fix `pnpm audit --prod --audit-level=low` diagnostic reported **No known vulnerabilities found** for the resolved production dependency graph.
- The temporary first-import workflow, trigger, shell helper and stale import guide are removed by the hardening branch. A source archive is an input artifact, not application source.

## Functional changes in the hardening branch

- Product details are remounted when the product slug changes, preventing variant/quantity/added feedback state from leaking between dynamic product routes.
- Cart quantity merging now normalizes both operands to preserve the bounded integer invariant even when the helper is called directly with invalid values.
- Unit tests cover invalid merge values, and the static quality gate checks the keyed product route.

## Important boundary and risks

1. **Static demo versus backend scaffold.** The validated demo path is `pnpm build:static`. The repository also contains starter Express/OAuth/tRPC/Drizzle code. That backend path is not approved for production and must not be deployed until authentication, session lifetime, authorization, request limits, rate limits, secret handling, database and dependency behavior are reviewed.
2. **Image portability.** Several sample images use `/manus-storage/async-images/...` URLs. CSS fallbacks preserve layout when the host is unavailable, but they do not replace verified, production-controlled assets. Replace with approved local or intentionally hosted assets and test all image responses before launch.
3. **Accessibility/browser validation.** CI checks types and static output but does not exercise visual states in real browsers, screen readers, touch targets, or keyboard-only flows. Run a documented manual/automated accessibility and end-to-end review before launch.
4. **Business readiness.** Catalogue, currency, prices, services, fulfilment, payment, support identity, market-specific policies and a production domain remain unapproved. The demo must remain non-transactional.

## Release criteria

- All GitHub Actions checks on the current hardening PR pass, including production dependency advisory scanning.
- No temporary bootstrap artifacts remain in the default source tree.
- Static build and output routes remain valid.
- Browser-based walkthrough and WCAG 2.2 AA review are completed.
- Production-domain metadata and approved assets are provided only after the business decisions are settled.
- Any backend deployment receives a separate, evidence-backed security review.

**Status:** source is in GitHub and the static demo baseline has passed CI. This report does not claim production readiness.
