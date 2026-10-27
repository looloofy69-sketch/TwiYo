# TwiYo demo quality gate

## Purpose

The demo quality gate protects the current scope: a client-side storefront and marketing-services prototype with sample content, a memory-only cart, a simulated checkout, and local-only enquiry feedback. It is not a production-readiness certification.

## Commands

Run the following from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm quality:demo
pnpm check
pnpm test
pnpm build:static
```

`pnpm quality:demo` is a dependency-light static guardrail for route/metadata coverage, simulated-only checkout and enquiry boundaries, cart behavior, draft-policy warnings, admin-preview warnings, robots directives, and canonical URL handling. Unit tests cover pure cart rules. `pnpm test:e2e` runs Playwright journeys across desktop Chromium and a mobile viewport plus axe checks for home, shop, product, services, enquiry, cart and checkout. The axe CI gate blocks serious/critical tagged findings; lower-impact findings are logged for triage. TypeScript, unit tests, browser tests, the dependency audit and static build are complementary checks, not a production security certification or full WCAG conformance review.

## Quality-gate scope

The static guardrail is designed to fail when a change removes required routes, publishes a live-looking checkout/enquiry path, adds browser persistence or network submission to the demo cart or enquiry flow, makes unavailable sample items addable, removes bounded quantity rules, weakens draft/admin warnings, or adds a guessed canonical/social URL.

The gate is intentionally not a source-code security scanner. Passing it does not prove absence of vulnerabilities, test all responsive states, verify external image availability, or approve launch policies.

## Current known limitations

- All catalogue products, service details, prices, availability labels, and product artwork are illustrative.
- The checkout creates a fake reference in in-memory state only. It does not create an order or payment.
- Enquiry submission displays local feedback only and does not create or transmit a lead.
- Draft policy copy requires market-specific business and legal review.
- The admin page is a public, non-operational visual mockup; it is not authentication or an authorization boundary.
- Automated browser journeys and axe smoke checks are part of CI. Manual keyboard-only/screen-reader review, full WCAG 2.2 AA evaluation, image-host reliability, cross-browser testing, and production-domain SEO review remain launch tasks.


## CI policy

The GitHub Actions workflow runs on pull requests and pushes to `main`. It installs the exact lockfile, runs this guardrail, audits production dependency advisories at high severity or above, type-checks application and browser specs, runs unit and Playwright tests, installs Chromium, and builds the static preview. A passing static guardrail is not a security certification; the dependency audit also does not replace a source review or browser-based tests.
