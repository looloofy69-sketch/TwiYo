import { useEffect, useState, type ReactNode } from "react";
import { ArrowDownRight, ArrowRight, Menu, ShoppingBag, X } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "../contexts/CartContext";

export function DemoNotice() {
  return <div className="demo-ribbon" role="status"><span className="demo-ribbon__dot" aria-hidden="true" />DEMO SITE <span className="demo-ribbon__divider">·</span> Sample content only. No payments, orders, enquiries or analytics are live.</div>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="TwiYo home" onClick={close}>
          <span className="brand__mark" aria-hidden="true"><span /></span><span className="brand__word">twi<span>yo</span></span>
        </Link>
        <button className="mobile-nav-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="primary-navigation" className={`primary-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          <Link href="/shop" onClick={close}>Shop <span className="nav-note">demo</span></Link>
          <Link href="/services" onClick={close}>Services</Link>
          <Link href="/about" onClick={close}>About</Link>
          <Link href="/contact" onClick={close}>Contact</Link>
          <Link href="/cart" className="nav-cart" onClick={close} aria-label={`Cart, ${count} sample items`}><ShoppingBag size={17} strokeWidth={1.8} /> <span>Bag</span><span className="cart-count">{count}</span></Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div>
          <Link href="/" className="brand brand--footer"><span className="brand__mark" aria-hidden="true"><span /></span><span className="brand__word">twi<span>yo</span></span></Link>
          <p className="footer-copy">Good things to shop.<br />Good ideas to grow.</p>
          <span className="footer-demo-label">Illustrative demo · not a live business</span>
        </div>
        <div className="footer-links-group"><h2>Explore</h2><Link href="/shop">Sample shop</Link><Link href="/services">Services</Link><Link href="/about">About the concept</Link><Link href="/contact">Contact & support</Link></div>
        <div className="footer-links-group"><h2>Draft policies</h2><Link href="/policies/privacy">Privacy notice</Link><Link href="/policies/terms">Terms</Link><Link href="/policies/delivery-returns">Delivery & returns</Link><Link href="/policies/cookies">Cookies & analytics</Link></div>
        <div className="footer-note"><ArrowDownRight size={23} aria-hidden="true"/><p>Real products, policies, fulfilment, and contact details still need approval.</p><Link href="/admin-preview" className="subtle-link">Admin workspace concept <ArrowRight size={14}/></Link></div>
      </div>
      <div className="site-footer__bottom"><span>© {new Date().getFullYear()} TwiYo · concept demo</span><span>Fictional sample content. No real operations are connected.</span></div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const hideFailedArtwork = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLImageElement && target.src.includes("/manus-storage/async-images/")) {
        target.style.opacity = "0";
      }
    };
    window.addEventListener("error", hideFailedArtwork, true);
    return () => window.removeEventListener("error", hideFailedArtwork, true);
  }, []);
  return <><DemoNotice/><Header/>{children}<Footer/></>;
}

export function PageIntro({ eyebrow, title, text, align = "left" }: { eyebrow: string; title: string; text: string; align?: "left" | "center" }) {
  return <div className={`page-intro page-intro--${align}`}><p className="eyebrow"><span className="eyebrow__dash"/> {eyebrow}</p><h1>{title}</h1><p className="page-intro__text">{text}</p></div>;
}

export function DemoPill({ children = "Sample concept" }: { children?: ReactNode }) {
  return <span className="demo-pill"><span aria-hidden="true"/> {children}</span>;
}
