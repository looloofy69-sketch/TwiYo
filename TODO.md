# TwiYo MVP/Demo — delivery backlog

## Public storefront and service discovery — Implemented
- One TwiYo brand must keep its product-commerce and marketing-services paths distinct in navigation, calls to action, analytics events, and confirmation messages without making the overall brand feel fragmented. Analytics is disabled in this demo.
- Home must include a clear value proposition, separate Shop and Services entry points, featured sample products/services, trust signals, key policy links, and primary calls to action.
- Shop/catalogue must provide product cards, category navigation, search, relevant filters, sort options, availability indication, and pagination or progressive loading appropriate to the illustrative sample catalogue.
- Product details must show name, images, description, clearly illustrative price/currency, relevant variants, availability, delivery/return summary, quantity control, and add-to-cart.
- Services overview must show sample service categories, target customers, responsibly framed outcomes, process, and an engagement CTA.
- Service details must show scope, deliverables, exclusions, process, timeline assumptions, pricing model/request-a-quote explanation, FAQs, and an enquiry CTA. Do not promise specific rankings, sales, reach, or return on ad spend.
- About/trust content must not invent credentials or unverifiable claims. Contact/support must provide a support route without claiming an unsupported response window.

## Demo cart and simulated checkout — Implemented
- Cart must show items and variants, quantities, sample-only subtotal, transparent fees only where calculable, edit/remove actions, and a checkout entry.
- Simulated checkout must show the needed demo contact/fulfilment fields, selected fulfilment method, order summary, validation, and error recovery, but must collect no payment information, make no payment hand-off, and create no real order.
- Order confirmation must show a fake order reference, sample items/amount, explicitly simulated payment and fulfilment statuses, next steps, and a support route; it must not expose sensitive payment data or imply a real order exists.
- Repeated actions must remain safe: the demo must not charge, create duplicate real orders, or persist customer or order records.

## Enquiry and policy demo — Implemented
- Enquiry form must accept contact details, business context, service interest, goals, optional budget/timeline, and a consent notice; validate required fields and show a clear confirmation.
- Enquiry confirmation must state that the enquiry was not sent, stored, routed, or acknowledged by TwiYo; do not store lead fields or send email.
- Privacy, terms, delivery/returns, and cookies/analytics policy views must be visibly marked as drafts requiring business/legal review for applicable markets; do not represent them as approved legal advice or launch policies.
- Real catalogue, service terms/prices, market/currency, fulfilment, payment provider, launch-specific policies, integrations and operational workflows remain unconfigured and visible as decisions.

## Admin-preview boundary — Implemented
- If an admin view is included, it is a non-secure, non-operational visual mock with fictional/sample data and a clear warning; it provides no real role-protected access or actual product/order/lead/content/promotion/report management. No customer/business records are stored.
- Do not present the website as production-ready or publish it before the user has reviewed Preview.

## Responsive, accessible and maintainable UI — Implemented; audit gaps remain
- Support current major mobile and desktop browsers with no horizontal overflow in primary journeys at common viewport widths.
- Target WCAG 2.2 AA: keyboard operation, visible focus, semantic structure, labeled fields, contrast, error identification, and accessible status messages.
- Aim for Core Web Vitals good thresholds at the 75th percentile on representative traffic: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1; real-user measurements remain a post-launch task.
- Use unique page titles/descriptions, crawlable page content, accurate canonical/social metadata only when the real domain is known, route manifest, and robots/sitemap behavior that does not invent origins.
- Keep the demo client-side only with no backend/database and analytics disabled. Provide documented conventions and reproducible static build steps.

## Completion, preview, and handover — Open
- Complete demo must be navigable and testable end-to-end: Home → browse → product detail → cart → simulated checkout → fake confirmation; Services → service detail → enquiry → explicit non-sent confirmation.
- It must be impossible to mistake simulated transactions or sample content for live business operations through persistent, clear demo labels and truthful confirmation copy.
- Run available TypeScript and static build checks, verify the static route manifest and Preview startup, then present Preview for user review. No publication before user review.
- Walk the user through updating the sample text/catalogue/services/policies, swapping images, and adjusting the design in the React source files.


## Demo quality-gate progress — 2026-10-27
- Added `pnpm quality:demo`, a Node.js-only guardrail for route/metadata coverage, simulated checkout and local-only enquiry boundaries, memory-only cart behavior, policy/admin warnings, robots directives, and production URL handling.
- Fixed a contradictory sample-catalogue state: products marked unavailable can no longer be added from the product detail page or through the cart domain boundary.
- Centralized cart quantity validation and bounded repeated additions to a maximum of 99; added unit tests for those rules.
- Added a GitHub Actions workflow to run the demo guardrail, type-check, unit tests, and static build.
- **Verified in the initial imported-source GitHub Actions run:** demo quality gate, TypeScript, unit tests, and static build passed. The audit branch adds a product-route state guard, invalid cart-merge tests, and a production dependency advisory scan; see the current PR checks for final results.
- **Not verified locally:** TypeScript, Vitest, and static build. Installing the pinned package manager failed because this environment could not resolve/reach the npm registry. The initial import pull-request workflow supplied the dependency-backed result; the current hardening branch reruns those checks and adds dependency advisory scanning.
- **Still open:** browser E2E walkthrough at mobile/desktop sizes, keyboard/screen-reader review, image-host reliability review, and final production-domain SEO review.
