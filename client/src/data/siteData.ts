export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  priceLabel: string;
  image: string;
  imageAlt: string;
  description: string;
  variants: string[];
  defaultVariant: string;
  tag: string;
  demoAvailability: "sample-available" | "sample-unavailable";
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  category: string;
  image?: string;
  imageAlt?: string;
  description: string;
  outcome: string;
  deliverables: string[];
  exclusions: string[];
  process: string[];
  pricing: string;
  timeline: string;
};

export const products: Product[] = [
  {
    id: "daylight-planner",
    slug: "daylight-planner",
    name: "Daylight Planner",
    category: "Desk",
    price: 18,
    priceLabel: "$18*",
    image: "/manus-storage/async-images/45qBo8IdV6gwD9gwnIaBcZ/image-2.webp",
    imageAlt: "Illustrative forest-green hardcover notebook on a light background",
    description: "A sample undated notebook for plans, notes, and ideas still finding their shape.",
    variants: ["Olive", "Cobalt"],
    defaultVariant: "Olive",
    tag: "A little more headspace",
    demoAvailability: "sample-available",
  },
  {
    id: "studio-cup",
    slug: "studio-cup",
    name: "Studio Cup",
    category: "Everyday",
    price: 22,
    priceLabel: "$22*",
    image: "/manus-storage/async-images/45qBo8IdV6gwD9gwnIaBcZ/image-3.webp",
    imageAlt: "Illustrative cobalt-blue ceramic cup on a light background",
    description: "A fictional sample ceramic cup with a sculptural shape and matte glaze.",
    variants: ["Cobalt"],
    defaultVariant: "Cobalt",
    tag: "Made for the pause",
    demoAvailability: "sample-unavailable",
  },
  {
    id: "market-tote",
    slug: "market-tote",
    name: "Market Tote",
    category: "Carry",
    price: 16,
    priceLabel: "$16*",
    image: "/manus-storage/async-images/45qBo8IdV6gwD9gwnIaBcZ/image-4.webp",
    imageAlt: "Illustrative natural canvas tote bag on a light background",
    description: "An unbranded sample canvas tote for everyday errands and the long way home.",
    variants: ["Natural"],
    defaultVariant: "Natural",
    tag: "Room for the good stuff",
    demoAvailability: "sample-available",
  },
  {
    id: "bright-notes",
    slug: "bright-notes",
    name: "Bright Notes Set",
    category: "Paper",
    price: 12,
    priceLabel: "$12*",
    image: "/manus-storage/async-images/45qBo8IdV6gwD9gwnIaBcZ/image-5.webp",
    imageAlt: "Illustrative blank greeting cards in cobalt, lime, coral, and cream",
    description: "A fictional set of blank note cards in a bright, mix-and-match sample palette.",
    variants: ["Colour mix"],
    defaultVariant: "Colour mix",
    tag: "Say it your way",
    demoAvailability: "sample-unavailable",
  },
];

export const services: Service[] = [
  {
    id: "brand-foundations",
    slug: "brand-foundations",
    name: "Brand foundations",
    category: "Strategy & identity",
    image: "/manus-storage/async-images/w0CdbHFKsiS9T5l0p29MwY/image-1.webp",
    imageAlt: "Illustrative creative desk with sample color swatches and paper",
    description: "A sample starting point for clarifying what a brand says, looks like, and needs next.",
    outcome: "A clearer set of brand building blocks to review and put to work.",
    deliverables: ["Positioning and audience workshop outline", "Visual direction and moodboard concept", "A short-use brand guide example"],
    exclusions: ["No guaranteed audience growth or commercial results", "Final scope, rights, and production files must be agreed separately"],
    process: ["Discovery and goals", "Direction and review", "Refinement and handoff"],
    pricing: "Request a quote after scope is confirmed; no live pricing is configured.",
    timeline: "Timing depends on the final scope and availability; it is not set for this demo.",
  },
  {
    id: "social-studio",
    slug: "social-studio",
    name: "Social content studio",
    category: "Content & creative",
    image: "/manus-storage/async-images/w0CdbHFKsiS9T5l0p29MwY/image-2.webp",
    imageAlt: "Illustrative campaign desk with colorful blank creative mockups",
    description: "A sample content-planning service for teams that want a steadier, more considered social presence.",
    outcome: "A practical content direction and sample publishing plan.",
    deliverables: ["Content themes and formats", "Example monthly content map", "Creative direction for selected posts"],
    exclusions: ["No guaranteed followers, reach, sales, or platform rankings", "Posting, moderation, and paid media are not included unless agreed"],
    process: ["Goals and channels", "Content direction", "Review and handoff"],
    pricing: "Request a quote after channels and volume are agreed; no live pricing is configured.",
    timeline: "Timing depends on the final scope and availability; it is not set for this demo.",
  },
  {
    id: "launch-campaign",
    slug: "launch-campaign",
    name: "Launch campaign kit",
    category: "Campaigns & growth",
    description: "A sample campaign-planning engagement to help organize a launch story and its creative pieces.",
    outcome: "A coordinated campaign concept and a draft activation checklist.",
    deliverables: ["Campaign message and creative territory", "Channel and content outline", "Draft launch checklist"],
    exclusions: ["No guaranteed advertising reach, sales, or return on ad spend", "Media budget and external production are not included unless agreed"],
    process: ["Brief and audience", "Concept and channel plan", "Review and next steps"],
    pricing: "Request a quote after the brief is understood; no live pricing is configured.",
    timeline: "Timing depends on the final scope and availability; it is not set for this demo.",
  },
];

export const pageMeta: Record<string, { title: string; description: string; heading: string; eyebrow: string; body: string }> = {
  "/": { title: "TwiYo | Shop good things, grow good ideas", description: "Explore TwiYo’s illustrative sample shop and marketing services. This clearly labeled demo does not take payments or send enquiries.", heading: "Good things to shop. Good ideas to grow.", eyebrow: "A brighter kind of everyday", body: "Meet TwiYo: one home for considered sample finds and practical marketing support. This is a demo, not a live store or service operation." },
  "/shop": { title: "Shop sample finds | TwiYo", description: "Browse TwiYo’s fictional sample catalogue. Prices, availability, currency, delivery, and fulfilment are illustrative and not live.", heading: "Small things. Good energy.", eyebrow: "The sample shop", body: "Explore four illustrative products across desk, everyday, carry, and paper. Sample prices are USD demo estimates; inventory and fulfilment are not configured." },
  "/cart": { title: "Your demo cart | TwiYo", description: "Review, edit, or remove sample items in TwiYo’s in-browser demo cart. Nothing is ordered or saved.", heading: "Your sample picks", eyebrow: "Demo cart", body: "Adjust sample quantities or remove items. Any subtotal is illustrative; taxes, shipping, and fulfilment are not calculated." },
  "/checkout": { title: "Simulated checkout | TwiYo", description: "Try a clearly simulated checkout with fictional details only. No payment fields, real order, or data storage are involved.", heading: "A checkout with no charge", eyebrow: "Simulation only", body: "Use fictional details to test the form. There are no payment fields or payment hand-off; the demo does not save or submit customer information." },
  "/order-confirmation": { title: "Demo confirmation | TwiYo", description: "See a fake TwiYo order reference and simulated status. It is not a real order and no payment was taken.", heading: "A demo confirmation, not an order", eyebrow: "Nothing was purchased", body: "This page demonstrates the shape of a future order confirmation. No payment was taken, and no order or customer record was created." },
  "/services": { title: "Marketing services | TwiYo", description: "Explore illustrative TwiYo marketing service concepts, scopes, deliverables, and quote-based pricing. No outcomes are guaranteed.", heading: "Clear thinking. Creative momentum.", eyebrow: "Marketing services · sample concepts", body: "A preview of possible brand, content, and campaign support. Final services, scope, terms, and pricing still need TwiYo’s approval." },
  "/enquiry": { title: "Marketing enquiry demo | TwiYo", description: "Test a sample service enquiry form with fictional details. The demo does not send, store, or route your message.", heading: "Tell us what you’re building.", eyebrow: "Enquiry form · simulation", body: "Use fictional details to test the required fields. This demo does not transmit or save enquiry information, and no acknowledgement is sent." },
  "/about": { title: "About TwiYo | Shop & marketing services", description: "Learn about the TwiYo demo concept: one brand for sample shopping and practical marketing services, without invented credentials.", heading: "Two paths. One bright idea.", eyebrow: "About the concept", body: "TwiYo’s proposed website brings product discovery and marketing support under one brand. This demo uses placeholder content; no founder story, team, credentials, or business facts have been verified." },
  "/contact": { title: "Contact & support | TwiYo", description: "Find the TwiYo demo contact route and try a sample service enquiry. Real contact channels and response times are not configured.", heading: "A clear next step, not a fake inbox.", eyebrow: "Contact & support", body: "TwiYo’s real contact channels, support owner, and response window are awaiting confirmation. The enquiry form is a browser-only simulation." },
  "/policies/privacy": { title: "Privacy notice draft | TwiYo", description: "A clearly marked placeholder for TwiYo’s future privacy notice. This draft is not legal advice or an approved launch policy.", heading: "Privacy notice — draft only", eyebrow: "Needs business and legal review", body: "This placeholder is not a privacy policy. Applicable markets, operators, data flows, retention, and legal obligations must be confirmed before launch." },
  "/policies/terms": { title: "Terms draft | TwiYo", description: "A clearly marked placeholder for future TwiYo terms. It is not legal advice, an offer, or an approved launch policy.", heading: "Terms — draft only", eyebrow: "Needs business and legal review", body: "This placeholder contains no approved sale or service terms. Operator identity, target markets, products, services, and applicable obligations remain to be confirmed." },
  "/policies/delivery-returns": { title: "Delivery & returns draft | TwiYo", description: "A clearly marked placeholder for future shipping, delivery, returns, refunds, and cancellation information.", heading: "Delivery & returns — draft only", eyebrow: "No fulfilment is configured", body: "This placeholder is not a shipping or returns policy. Product types, delivery areas, methods, lead times, costs, cancellations, and refunds require approval." },
  "/policies/cookies": { title: "Cookies & analytics draft | TwiYo", description: "A clearly marked draft about cookies and analytics. Product analytics are disabled; infrastructure data flows still need review.", heading: "Cookies & analytics — draft only", eyebrow: "No product analytics configured", body: "This draft is not a consent notice. TwiYo’s demo analytics injection is disabled; hosting and delivery infrastructure may still process technical requests. Review vendors, consent, and retention before launch." },
  "/admin-preview": { title: "Admin workspace preview | TwiYo", description: "A fictional visual preview of a possible TwiYo admin workspace. It is not authenticated, secure, connected, or operational.", heading: "A workspace concept, not a control room", eyebrow: "Admin preview · fictional sample data", body: "This visual concept cannot manage products, orders, leads, content, promotions, or reports. It is not authenticated, secure, or connected to business data." },
};

export const routeLinks: Record<string, { label: string; href: string }[]> = {
  "/": [{ label: "Browse the sample shop", href: "/shop" }, { label: "Explore marketing services", href: "/services" }],
  "/shop": [{ label: "View the cart", href: "/cart" }, { label: "See services", href: "/services" }],
  "/cart": [{ label: "Continue shopping", href: "/shop" }, { label: "Try the simulated checkout", href: "/checkout" }],
  "/checkout": [{ label: "Review the sample cart", href: "/cart" }],
  "/order-confirmation": [{ label: "Back to the sample shop", href: "/shop" }, { label: "Contact and support details", href: "/contact" }, { label: "Return to TwiYo home", href: "/" }],
  "/services": [{ label: "Send a demo enquiry", href: "/enquiry" }, { label: "About TwiYo", href: "/about" }],
  "/enquiry": [{ label: "Browse sample services", href: "/services" }, { label: "Contact and support", href: "/contact" }],
  "/about": [{ label: "Explore the sample shop", href: "/shop" }, { label: "View marketing services", href: "/services" }],
  "/contact": [{ label: "Try the sample enquiry form", href: "/enquiry" }, { label: "See the service examples", href: "/services" }],
  "/policies/privacy": [{ label: "Terms draft", href: "/policies/terms" }, { label: "Cookie and analytics draft", href: "/policies/cookies" }],
  "/policies/terms": [{ label: "Privacy notice draft", href: "/policies/privacy" }, { label: "Delivery and returns draft", href: "/policies/delivery-returns" }],
  "/policies/delivery-returns": [{ label: "Sample shop", href: "/shop" }, { label: "Terms draft", href: "/policies/terms" }],
  "/policies/cookies": [{ label: "Privacy notice draft", href: "/policies/privacy" }, { label: "Return home", href: "/" }],
  "/admin-preview": [{ label: "Return to the TwiYo home page", href: "/" }],
};
