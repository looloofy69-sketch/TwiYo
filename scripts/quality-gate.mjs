import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFile(path.join(root, file), "utf8");
const requiredRoutes = [
  "/",
  "/shop",
  "/products/:slug",
  "/cart",
  "/checkout",
  "/order-confirmation",
  "/services",
  "/services/:slug",
  "/enquiry",
  "/about",
  "/contact",
  "/policies/privacy",
  "/policies/terms",
  "/policies/delivery-returns",
  "/policies/cookies",
  "/admin-preview",
];

const [app, siteData, shop, services, cart, shell, info, robots, indexHtml, packageText, manifestText] = await Promise.all([
  read("client/src/App.tsx"),
  read("client/src/data/siteData.ts"),
  read("client/src/pages/Shop.tsx"),
  read("client/src/pages/Services.tsx"),
  read("client/src/contexts/CartContext.tsx"),
  read("client/src/components/SiteShell.tsx"),
  read("client/src/pages/Info.tsx"),
  read("client/public/robots.txt"),
  read("client/index.html"),
  read("package.json"),
  read("client/public/manus-routes.json"),
]);

const manifest = JSON.parse(manifestText);
const packageJson = JSON.parse(packageText);
const failures = [];
const passed = [];

function check(name, condition, detail) {
  if (condition) {
    passed.push(name);
    return;
  }
  failures.push({ name, detail });
}

const missingRuntimeRoutes = requiredRoutes.filter((route) => !app.includes(`path="${route}"`));
const manifestPaths = new Set((manifest.routes ?? []).map((route) => route.path));
const missingManifestRoutes = requiredRoutes.filter((route) => !manifestPaths.has(route));
check(
  "Runtime route coverage",
  missingRuntimeRoutes.length === 0,
  `Missing routes in App.tsx: ${missingRuntimeRoutes.join(", ") || "none"}`,
);
check(
  "Static route manifest coverage",
  missingManifestRoutes.length === 0,
  `Missing routes in manus-routes.json: ${missingManifestRoutes.join(", ") || "none"}`,
);

const staticRoutes = requiredRoutes.filter((route) => !route.includes(":"));
const missingMetadata = staticRoutes.filter((route) => !siteData.includes(`"${route}": {`));
check(
  "Static route metadata coverage",
  missingMetadata.length === 0,
  `Missing pageMeta entries: ${missingMetadata.join(", ") || "none"}`,
);

check(
  "Unavailable sample products cannot be added",
  shop.includes("disabled={unavailable}") && cart.includes("canAddDemoProduct(product.demoAvailability)"),
  "The product UI and cart domain boundary must both reject sample-unavailable products.",
);
check(
  "Cart quantities are bounded",
  cart.includes("normalizeCartQuantity(quantity)") && cart.includes("mergeCartQuantity(existing.quantity, requestedQuantity)"),
  "Cart add/update paths must validate quantities and cap repeated additions.",
);

const persistenceOrNetwork = /\b(localStorage|sessionStorage|indexedDB|fetch\s*\(|axios\.|navigator\.sendBeacon)/i;
check(
  "Cart is memory-only",
  !persistenceOrNetwork.test(cart),
  "CartContext must not add network submission or browser-storage persistence in the demo.",
);
check(
  "Checkout remains simulated",
  shop.includes("No payment step.") && shop.includes("completeDemoOrder()") && shop.includes("No payment was taken"),
  "Checkout must retain its explicit simulation language and use only the fake-order flow.",
);
check(
  "Checkout exposes no payment credential fields",
  !/name=["'](?:card(?:number)?|card-number|cvv|cvc|iban|bankAccount|paymentToken)["']/i.test(shop),
  "Do not introduce card, bank, verification-code, or payment-token form fields into the demo checkout.",
);
check(
  "Enquiries remain local-only",
  services.includes("setSubmitted(true)") && !persistenceOrNetwork.test(services),
  "Enquiry form should only render local feedback; no storage or network submit is allowed in this demo.",
);
check(
  "Policies are clearly marked as drafts",
  info.includes("Not an approved policy.") && info.includes("Draft policy · requires review"),
  "Policy pages must remain visibly unapproved placeholders until business/legal review.",
);
check(
  "Admin view is non-operational",
  info.includes("not authenticated, secure, connected, or suitable for real operations") && info.includes("Do not enter business, customer, order, or lead data"),
  "The mock admin screen must disclose that it is not access-controlled and must not invite real data.",
);
check(
  "Checkout, admin and draft policies are excluded from indexing",
  ["Disallow: /cart", "Disallow: /checkout", "Disallow: /order-confirmation", "Disallow: /admin-preview", "Disallow: /policies/"].every((rule) => robots.includes(rule)),
  "robots.txt should keep non-public workflows out of crawl discovery.",
);
check(
  "No guessed production canonical URL",
  !/rel=["']canonical["']|property=["']og:url["']/i.test(indexHtml),
  "Do not publish a guessed canonical or social URL before the production domain is approved.",
);
check(
  "Repeatable demo quality command is available",
  packageJson.scripts?.["quality:demo"] === "node scripts/quality-gate.mjs",
  "package.json must expose `pnpm quality:demo`.",
);

for (const name of passed) console.log(`PASS  ${name}`);
for (const failure of failures) console.error(`FAIL  ${failure.name}\n      ${failure.detail}`);
console.log(`\nDemo quality gate: ${passed.length} passed, ${failures.length} failed.`);
if (failures.length) process.exitCode = 1;
