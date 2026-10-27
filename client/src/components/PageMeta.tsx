import { useEffect } from "react";

const noindexPaths = new Set([
  "/cart", "/checkout", "/order-confirmation", "/admin-preview",
  "/policies/privacy", "/policies/terms", "/policies/delivery-returns", "/policies/cookies",
]);

export default function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    const setMeta = (selector: string, create: () => HTMLMetaElement, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = create();
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta('meta[name="description"]', () => { const tag = document.createElement("meta"); tag.name = "description"; return tag; }, description);
    setMeta('meta[property="og:site_name"]', () => { const tag = document.createElement("meta"); tag.setAttribute("property", "og:site_name"); return tag; }, "TwiYo");
    setMeta('meta[property="og:type"]', () => { const tag = document.createElement("meta"); tag.setAttribute("property", "og:type"); return tag; }, "website");
    setMeta('meta[property="og:title"]', () => { const tag = document.createElement("meta"); tag.setAttribute("property", "og:title"); return tag; }, title);
    setMeta('meta[property="og:description"]', () => { const tag = document.createElement("meta"); tag.setAttribute("property", "og:description"); return tag; }, description);
    setMeta('meta[name="twitter:card"]', () => { const tag = document.createElement("meta"); tag.name = "twitter:card"; return tag; }, "summary");
    setMeta('meta[name="twitter:title"]', () => { const tag = document.createElement("meta"); tag.name = "twitter:title"; return tag; }, title);
    setMeta('meta[name="twitter:description"]', () => { const tag = document.createElement("meta"); tag.name = "twitter:description"; return tag; }, description);
    const existingRobots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noindexPaths.has(window.location.pathname)) {
      setMeta('meta[name="robots"]', () => { const tag = document.createElement("meta"); tag.name = "robots"; return tag; }, "noindex, nofollow");
    } else if (existingRobots?.content.includes("noindex")) {
      existingRobots.remove();
    }
  }, [title, description]);
  return null;
}
