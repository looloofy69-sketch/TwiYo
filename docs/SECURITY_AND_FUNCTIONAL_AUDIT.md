# TwiYo functional and security audit

**Date:** 2026-10-27  
**Review type:** source-level inspection of the imported repository and the documented static demo path. Not a penetration test, not an accessibility certification, and not approval to launch a real business.

## Verdict

The **static demo boundary is clearly implemented**: checkout has no payment fields or network submission, the cart is React-memory state, order references are fake, and enquiry submission only changes local UI state. The original source import passed dependency installation, route/demo checks, TypeScript, unit tests, and the static build in GitHub Actions.

The dependency review has now been resolved for the current lockfile: on 2026-10-27, `pnpm audit --prod --audit-level=low` reported **No known vulnerabilities found**. The same GitHub Actions run passed the demo quality gate, TypeScript, unit tests, and the static build. This is a point-in-time advisory scan of the resolved production dependency graph, not a penetration test. The remaining release risks are deployment ambiguity (a starter server scaffold sits beside the static demo), external image-host portability, and missing browser-based accessibility/E2E evidence.

## Findings and disposition

### Fixed in the hardening branch

- **Product route state isolation:** `ProductPage` owns variant, quantity and “added” state. When a router reuses the component while the `/products/:slug` parameter changes, local state could remain from the prior product. A keyed route wrapper now remounts the component per slug, and `pnpm quality:demo` guards that contract.
- **Cart invariant enforcement:** the exported merge helper previously trusted caller inputs and could return `NaN` or an invalid quantity if called directly with malformed numbers. It now normalizes both inputs; tests cover invalid operands as well as the maximum of 99.
- **Repository hygiene:** the first-import workflow, one-time trigger, empty-repository script and stale initial-import guide are removed; a repository ignore rule protects against re-adding the temporary ZIP.
- **CI coverage:** the demo workflow now runs on pull requests and pushes to `main`, includes a production dependency advisory scan, uses current upstream major versions of the GitHub actions, and keeps the static build/type/unit checks.

### High-priority before production

1. **Do not deploy the server scaffold by accident.** Use `pnpm build:static` for the current prototype. The repo also contains `server/_core/index.ts`, OAuth, tRPC and Drizzle scaffolding; `pnpm build`/ `pnpm start` selects a different runtime. That runtime has not been approved or fully audited for production. Before enabling it, review authentication and authorization paths, session expiry and cookie behavior, request size limits, rate limiting, secret configuration, schema/migrations, error behavior and dependency advisories.
2. **Replace platform-specific sample images.** `client/src/data/siteData.ts` and the homepage reference `/manus-storage/async-images/...`. A global image-error handler and CSS fallback avoid broken-image chrome, but do not guarantee the actual artwork will load on a different host. Replace these with approved, controlled assets and test response status, MIME type and dimensions in the target deployment.
3. **Keep business functions disabled.** There is no verified real catalogue, price/currency decision, payment provider, fulfilment service, durable order/lead store, CRM/email routing, or secured admin. Fake forms and statuses are not operational records.

### Additional validation still required

- Run browser end-to-end paths at common mobile and desktop widths: shop search/filter, product variant/quantity, cart edit/remove, simulated checkout, confirmation, service detail, and enquiry query selection.
- Complete keyboard-only and screen-reader review, focus visibility, contrast, touch target, error-message and reduced-motion checks against WCAG 2.2 AA.
- Test image loading/offline behavior and page metadata on the intended host. Canonical URLs and production social URLs should remain unset until a real domain is approved.
- Confirm that `pnpm audit --prod --audit-level=high` passes in the current branch CI and triage any findings before merging.
- Conduct separate security testing if the Express/OAuth/Drizzle scaffold is intentionally activated. The clean production dependency audit reduces known package-advisory risk but does not establish that the backend is configured securely or appropriate for production.

## Evidence boundaries

Observed source behavior and completed GitHub Actions results are stated as facts. Production target, domain, market, products, operating policy and backend activation are unresolved decisions. No real payment, order placement, lead submission or production deployment was performed as part of this audit.
