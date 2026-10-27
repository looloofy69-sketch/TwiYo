# TwiYo repository audit

**Audit date:** 2026-10-27  
**Scope:** repository integrity, static-demo behavior, build/CI hygiene, deployment boundary. This is a source-level review, not a penetration test or legal approval.

## Repository state

- The TwiYo source was imported into `main` through [PR #1](https://github.com/looloofy69-sketch/TwiYo/pull/1).
- The import changed 149 files. The initial pull-request workflow passed dependency installation, the demo quality gate, TypeScript, unit tests, and the static build.
- The hardening branch `audit/demo-hardening-2026-10` regenerated `pnpm-lock.yaml` after applying patched dependency floors and removed the one-time source-import machinery.
- The dependency repair run passed lockfile installation, the 15-check demo quality gate, TypeScript, unit tests, and static build. `pnpm audit --prod --audit-level=low` reported **No known vulnerabilities found** for the resolved production dependency graph.
- Playwright browser journeys and axe scans were added. The first real-browser run exposed serious contrast and accessible-name problems; those issues were fixed in the review branch and the rerun is the acceptance gate before merge.
- The temporary first-import workflow, trigger, shell helper and stale import guide are removed by the hardening branch. A source archive is an input artifact, not application source.

## Functional changes in the hardening branch

- Product details are remounted when the product slug changes, preventing variant/quantity/added feedback state from leaking between dynamic product routes.
- Cart quantity merging now normalizes both operands to preserve the bounded integer invariant even when the helper is called directly with invalid values.
- Unit tests cover invalid merge values, and the static quality gate checks the keyed product route.

## Important boundary and risks

1. **Static demo versus backend scaffold.** The validated demo path is `pnpm build:static`. The repository also contains starter Express/OAuth/tRPC/Drizzle code. That backend path is not approved for production and must not be deployed until authentication, session lifetime, authorization, request limits, rate limits, secret handling, database and dependency behavior are reviewed.
2. **Image portability.** Several sample images use `/manus-storage/async-images/...` URLs. CSS fallbacks preserve layout when the host is unavailable, but they do not replace verified, production-controlled assets. Replace with approved local or intentionally hosted assets and test all image responses before launch.
3. **Accessibility/browser validation.** CI now exercises the major user journeys on Chromium desktop and a mobile viewport and runs axe WCAG-tagged scans across the key routes. This can catch common regressions but does not exercise all browsers, all responsive states, screen readers, or keyboard-only behavior. Manual review is still required.
4. **Business readiness.** Catalogue, currency, prices, services, fulfilment, payment, support identity, market-specific policies and a production domain remain unapproved. The demo must remain non-transactional.

## Release criteria

- All GitHub Actions checks on the final hardening PR head pass, including production dependency audit, Playwright journeys, axe severity-gate, TypeScript, unit tests, and static build.
- No temporary bootstrap artifacts remain in the default source tree.
- Static build and output routes remain valid.
- Browser-based walkthrough and WCAG 2.2 AA review are completed.
- Production-domain metadata and approved assets are provided only after the business decisions are settled.
- Any backend deployment receives a separate, evidence-backed security review.

**Status:** source is in GitHub and the static demo baseline has passed CI. This report does not claim production readiness.
