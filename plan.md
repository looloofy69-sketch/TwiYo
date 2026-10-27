# TwiYo MVP/Demo — implementation and design plan

## Approved scope

Build a client-side React/Vite demonstration website for TwiYo, a single brand combining an online shop and marketing services. The implementation is strictly a demo: no backend, database, payment provider, persistent customer/order/lead data, real payment collection, lead storage/routing, email notifications, analytics, or publication before Preview review. Every product, price, service, transaction, and policy is explicitly labeled sample/demo/draft. The site must make it impossible to mistake a simulated checkout or sample content for live business operations.

## Implementation approach

Use the initialized React 19 + Vite + TypeScript starter and Wouter routing. Keep the UI and interactions in the frontend; use React state for cart changes, checkout validation and fake order confirmation, and enquiry validation/confirmation. Do not save customer or lead fields to localStorage, storage APIs, analytics, or a server. Cart data may stay in memory for the active browser session only. The checkout contains no payment fields and never hands off to a payment service. Confirmation references and payment/fulfilment states are visibly simulated.

Build the following routes: `/` (Home), `/shop`, `/products/:slug` for each named sample product, `/cart`, `/checkout`, `/order-confirmation`, `/services`, `/services/:slug` for each sample service, `/enquiry`, `/about`, `/contact`, `/policies/privacy`, `/policies/terms`, `/policies/delivery-returns`, `/policies/cookies`, and `/admin-preview`. The admin preview, if included, is a non-secure, non-operational visual mock using fictional data, marked clearly as such; it must not offer real admin access or imply that business records are protected or persisted. Unknown routes receive the starter’s proper NotFound page.

Support product discovery with sample categories, search, sort and availability/filter controls appropriate to the small sample catalogue. Detail pages expose sample information and add-to-cart controls. The cart permits quantity updates and removal and calculates a sample-only subtotal. The simulated checkout accepts only contact/fulfilment fields needed to demonstrate validation; it must not collect card, bank, or other payment credentials. Completing it produces a fake reference and demo status, not a real order. Service details explain sample scope, deliverables, exclusions, process, indicative quote approach and FAQs without unsupported outcome claims. Enquiry validates fields and displays a confirmation that states it was not sent or saved. Policy pages are non-legal draft placeholders with conspicuous review warnings.

Create and maintain `public/manus-routes.json` for the route set. Add static prerendered route documents during the static build, with useful crawlable sample page content and route-specific titles/descriptions. Do not invent an absolute canonical or social URL while the production domain is unknown. Include basic sitemap/robots handling only where it can be truthful; do not emit fabricated production origins. Preserve the existing static build and preview commands and add no dependencies unless a concrete implementation need requires them.

## Project structure

- `client/src/App.tsx`: page route registration, global layout, demo-status treatment, and fallback.
- `client/src/pages/`: route-level Home, Shop, Product, Cart, Checkout, Confirmation, Services, Service Detail, Enquiry, About, Contact, Policies, Admin Preview, and NotFound views.
- `client/src/components/`: responsive header/footer, accessible navigation, product/service cards, demo badge, cart affordances, and reusable form controls.
- `client/src/data/`: illustrative sample catalogue/services, route metadata and draft policy copy.
- `client/src/lib/`: cart/session interaction helpers and formatting/validation utilities with no PII persistence.
- `client/public/`: route manifest, favicon, and project-managed image URLs served as public assets.
- `client/public/manus-routes.json`: the route manifest served at `/manus-routes.json`.
- `scripts/prerender.mjs`: static route HTML generation for crawler-readable public content/metadata without guessed canonical origins.
- `plan.md` and `TODO.md`: approved decisions, design system and progress.

## Design direction

- **Design movement:** contemporary editorial commerce with Swiss-modernist restraint and playful color-blocking.
- **Core principles:** (1) Shop and Services have equal visual weight and distinct entry points; (2) a calm, minimal structure gives vivid product/category moments room to stand out; (3) interactions and statuses are explicit about demo state; (4) mobile layouts stay legible, tap-friendly and low-friction.
- **Color philosophy:** warm paper/off-white and deep ink anchor trust and readability; an ownable electric-lime accent and cobalt/coral supporting notes create contemporary energy without making the service side feel frivolous.
- **Layout paradigm:** editorial split hero and asymmetric alternating sections, with left-aligned content bands and compact product rows rather than a generic centered dashboard/grid. Small screens reflow into a single clear column.
- **Signature elements:** (1) compact TwiYo monogram/loop mark; (2) vivid pill-shaped demo labels and category chips; (3) numbered/underlined editorial section cues.
- **Interaction philosophy:** visible focus, full keyboard support, predictable forms, obvious feedback and no deceptive simulated success. Every simulated transaction and enquiry confirmation says it is a demo.
- **Animation:** restrained 140–220ms color/opacity/translate transitions; honor `prefers-reduced-motion`; no essential content depends on motion.
- **Typography system:** use a distinctive display face for large editorial headlines paired with a highly legible modern sans for body, controls and product metadata; use system fallbacks and limit loaded font weights for speed.
- **Brand essence:** a bright, practical brand that makes buying good things and finding marketing help feel equally straightforward; personality: energetic, capable, clear.
- **Brand voice:** direct, human, optimistic and specific; sample headline “Good things to shop. Good ideas to grow.” and service CTA “Tell us what you’re building.” Avoid guarantees about sales, reach, rankings or ad returns.
- **Wordmark & logo:** a clean custom-drawn loop/spark monogram paired with a carefully styled TwiYo wordmark; do not rely on generated text in imagery.
- **Signature brand color:** vivid electric lime, grounded by deep ink and warm white.

## Material limits and operating behavior

No launch country, language/currency, real catalogue, shipping/fulfilment process, payment provider, approved legal policies, integrations, team/admin roles, or production domain has been confirmed. Show these as remaining launch decisions rather than making business/legal claims. Analytics stays disabled. Preview is for review only; do not publish before the user reviews it.
