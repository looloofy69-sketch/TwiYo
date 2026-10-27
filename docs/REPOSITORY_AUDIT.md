# TwiYo repository and demo audit

**Audit date:** 2026-10-27  
**Audit basis:** user-provided `code.zip` candidate source and GitHub repository metadata.

## Repository state

At inspection time, `looloofy69-sketch/TwiYo` existed as a public GitHub repository but had size `0` and no committed source files. The uploaded candidate snapshot contains 143 files before this quality-gate pass. The remote repository therefore cannot be described as patched until the source has been committed and the commit verified on GitHub.

## Changes made to the candidate source

- Added `scripts/quality-gate.mjs` and `pnpm quality:demo` to provide repeatable static checks for route coverage, metadata coverage, simulated-only checkout and enquiry behavior, memory-only cart behavior, unavailable sample items, bounded quantities, draft policies, admin-preview warnings, robots directives, and production URL handling.
- Prevented sample products marked `sample-unavailable` from being added through the product page or cart domain boundary.
- Centralized quantity validation and capped quantities at 99, including repeated additions. Added focused unit tests in `client/src/lib/cartRules.test.ts`.
- Added `docs/DEMO_QUALITY_GATE.md` and a GitHub Actions workflow for dependency-backed verification.
- Updated the README and TODO to record the test status without claiming unrun checks passed.

## Verification evidence

- `node scripts/quality-gate.mjs`: **14 passed, 0 failed**.
- Cart-rule runtime smoke test using Node.js type stripping: **passed**.
- `package.json` JSON parsing: **passed**.
- `pnpm install --frozen-lockfile`, TypeScript checking, Vitest, and static build: **not run to completion**. The environment could not resolve/reach `registry.npmjs.org` (`EAI_AGAIN`) while Corepack attempted to provision pnpm. A passing GitHub Actions run is still needed.

## Existing risks and follow-up work

1. **Starter scaffold remains:** the candidate snapshot includes `server/`, `drizzle/`, platform-authentication files, tRPC helpers, database dependencies, and server-oriented package scripts despite the approved public site flow being a static frontend demo. They are not wired into the storefront routes inspected, but their presence conflicts with a clean, minimal frontend-only repository boundary. Review and remove or isolate this scaffold in a separate change after checking platform-preview requirements and confirming the static build does not depend on it.
2. **No browser E2E run yet:** complete the two primary journeys in a browser: Home → Shop → Product → Cart → Simulated Checkout → Fake Confirmation, and Services → Service Detail → Enquiry → Explicit Non-sent Confirmation.
3. **Accessibility/performance remain open:** inspect keyboard-only navigation, focus order, form errors, screen-reader announcements, 320px/mobile layout, contrast, reduced motion, and image loading. Measure performance in a representative environment.
4. **External sample assets:** image URLs point at draft/managed storage locations. Verify availability and replace with approved assets before launch.
5. **Launch remains blocked by business decisions:** real identity, market/currency, catalogue, service terms, fulfilment, payments, contact channels, reviewed policies, operational integrations, and production domain remain unapproved.

## Conclusion

The candidate now has a repeatable lightweight demo guardrail and a clear correction for the mismatch between sample availability and cart behavior. This is a meaningful demo-quality improvement, not production approval. Do not publish live commerce or represent the demo as operating a real business until the outstanding decisions and validations are complete.
