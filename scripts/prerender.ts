import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pageMeta, products, services, routeLinks } from "../client/src/data/siteData";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist", "public");
const template = await readFile(path.join(output, "index.html"), "utf8");
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);

const pages = new Map(Object.entries(pageMeta).map(([route, meta]) => [route, { ...meta, noindex: ["/cart", "/checkout", "/order-confirmation", "/admin-preview", "/policies/privacy", "/policies/terms", "/policies/delivery-returns", "/policies/cookies"].includes(route) }]));
for (const product of products) pages.set(`/products/${product.slug}`, {
  title: `${product.name} · sample product | TwiYo`,
  description: `${product.description} Fictional sample product; price, currency, stock, and fulfilment are not live.`,
  heading: product.name,
  eyebrow: `${product.category} · sample product`,
  body: `${product.description} Illustrative price ${product.priceLabel}; sample USD only, not a live offer. Availability, variants, delivery, returns, and fulfilment are not configured.`,
  noindex: false,
});
for (const service of services) pages.set(`/services/${service.slug}`, {
  title: `${service.name} · sample service | TwiYo`,
  description: `${service.description} Illustrative service concept; no live terms, price, or performance promise.`,
  heading: service.name,
  eyebrow: `${service.category} · illustrative concept`,
  body: `${service.description} Sample deliverables: ${service.deliverables.join("; ")}. Quote, timeline and terms are not set. No sales, reach, ranking or advertising return is guaranteed.`,
  noindex: false,
});

function replaceMeta(html: string, title: string, description: string, noindex: boolean) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  let result = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);
  result = result.replace(/<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${safeDescription}" />`);
  result = result.replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${safeTitle}" />`);
  result = result.replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${safeDescription}" />`);
  result = result.replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/i, `<meta name="twitter:title" content="${safeTitle}" />`);
  result = result.replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/i, `<meta name="twitter:description" content="${safeDescription}" />`);
  if (noindex) result = result.replace("</head>", "    <meta name=\"robots\" content=\"noindex, nofollow\" />\n  </head>");
  return result;
}

for (const [route, page] of pages) {
  const links = routeLinks[route] ?? [{ label: "Return to TwiYo home", href: "/" }, { label: "Browse sample services", href: "/services" }];
  const linkMarkup = links.map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`).join(" <span aria-hidden=\"true\">·</span> ");
  const article = `<main id="main-content" class="static-seo-fallback"><p class="static-seo-fallback__eyebrow">${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.body)}</p><p class="static-seo-fallback__notice"><strong>Demo site:</strong> sample content only; no live business operations are connected.</p><nav aria-label="Related pages">${linkMarkup}</nav></main>`;
  const html = replaceMeta(template, page.title, page.description, page.noindex).replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${article}</div>`);
  const target = route === "/" ? path.join(output, "index.html") : path.join(output, route.slice(1), "index.html");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
}

console.log(`Prerendered ${pages.size} TwiYo routes with crawlable content and route-specific metadata.`);
