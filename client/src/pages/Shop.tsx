import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, Search, ShoppingBag, Trash2 } from "lucide-react";
import { Link, useLocation, useParams } from "wouter";
import { products, pageMeta } from "../data/siteData";
import { cartKey, useCart } from "../contexts/CartContext";
import { DemoPill, PageIntro } from "../components/SiteShell";
import PageMeta from "../components/PageMeta";

const amount = (value: number) => `$${value.toFixed(2)}*`;

function ProductCard({ product, index }: { product: (typeof products)[number]; index: number }) {
  return <Link href={`/products/${product.slug}`} className={`product-card product-card--tone-${(index % 3) + 1} product-card--${product.slug}`}>
    <span className="product-card__tag">{product.tag}</span>
    <span className="product-card__image"><img src={product.image} alt={product.imageAlt} loading="lazy"/><span className="product-card__arrow" aria-hidden="true"><ArrowRight size={17}/></span></span>
    <span className="product-card__info"><span><strong>{product.name}</strong><small>{product.category} · sample item</small><small className={`availability-tag availability-tag--${product.demoAvailability}`}>{product.demoAvailability === "sample-available" ? "Shown available · sample" : "Shown unavailable · sample"}</small></span><strong>{product.priceLabel}</strong></span>
    <span className="product-card__disclaimer">* Demo estimate · currency not confirmed</span>
  </Link>;
}

export function ShopPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All sample categories");
  const [availability, setAvailability] = useState("all");
  const [sort, setSort] = useState("featured");
  const meta = pageMeta["/shop"];
  const categories = ["All sample categories", ...Array.from(new Set(products.map((product) => product.category)))];
  const visible = useMemo(() => {
    const filtered = products.filter((product) => (category === "All sample categories" || product.category === category) && (availability === "all" || product.demoAvailability === availability) && `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query.toLowerCase()));
    if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [availability, category, query, sort]);
  return <>
    <PageMeta title={meta.title} description={meta.description}/>
    <main id="main-content" className="page-container">
      <PageIntro eyebrow="The sample shop" title="Small things. Good energy." text="A little collection of fictional TwiYo sample goods. Browse, add to your demo bag, and try a checkout that never takes payment."/>
      <div className="sample-callout"><strong>Sample catalogue — not available to buy.</strong><span>Prices are illustrative USD estimates only. Stock, delivery, returns, and fulfilment are not configured.</span></div>
      <div className="shop-toolbar" aria-label="Filter and sort sample products">
        <label className="search-box"><Search size={17} aria-hidden="true"/><span className="sr-only">Search sample products</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sample finds"/></label>
        <label className="select-control"><span className="sr-only">Filter by sample category</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="select-control"><span className="sr-only">Filter by fictional sample availability</span><select value={availability} onChange={(event) => setAvailability(event.target.value)}><option value="all">All demo availability</option><option value="sample-available">Shown available · sample</option><option value="sample-unavailable">Shown unavailable · sample</option></select></label>
        <label className="select-control"><span className="sr-only">Sort sample products</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Sort: featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
        <span className="result-count" aria-live="polite">{visible.length} sample {visible.length === 1 ? "item" : "items"}</span>
      </div>
      {visible.length ? <div className="product-grid">{visible.map((product, index) => <ProductCard key={product.id} product={product} index={index}/>)}</div> : <div className="empty-state"><Search size={28}/><h2>No sample finds match.</h2><p>Try another name or category.</p><button className="text-button" onClick={() => { setQuery(""); setCategory("All sample categories"); setAvailability("all"); }}>Clear filters</button></div>}
      <div className="store-footnote"><span>01 — ILLUSTRATIVE</span><p>Availability labels, variants, and sample prices demonstrate a future catalogue layout; they do not describe real stock or offers.</p></div>
    </main>
  </>;
}

export function ProductPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const product = products.find((item) => item.slug === slug);
  const [variant, setVariant] = useState(product?.defaultVariant ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  if (!product) return <main id="main-content" className="page-container"><PageIntro eyebrow="Sample product" title="That sample find isn’t here." text="This product is not part of the illustrative catalogue."/><Link className="button button--primary" href="/shop">Return to the sample shop</Link></main>;
  const unavailable = product.demoAvailability !== "sample-available";
  return <>
    <PageMeta title={`${product.name} · sample product | TwiYo`} description={`${product.description} Fictional sample product; price, currency, stock, and fulfilment are not live.`}/>
    <main id="main-content" className="page-container">
      <Link href="/shop" className="back-link"><ArrowLeft size={16}/> Back to sample shop</Link>
      <div className="product-detail">
        <div className={`product-detail__image product-detail__image--${product.slug}`}><img src={product.image} alt={product.imageAlt}/><DemoPill>Sample item · not for sale</DemoPill></div>
        <div className="product-detail__copy"><p className="eyebrow"><span className="eyebrow__dash"/> {product.category} · sample</p><h1>{product.name}</h1><p className="product-detail__tag">{product.tag}</p><p className="product-detail__description">{product.description}</p><div className="sample-price"><strong>{product.priceLabel}</strong><span>Illustrative USD estimate · not an offer</span></div>
          {product.variants.length > 1 && <fieldset className="variant-picker"><legend>Sample finish</legend><div>{product.variants.map((item) => <label className={variant === item ? "variant-option is-selected" : "variant-option"} key={item}><input type="radio" name="variant" value={item} checked={variant === item} onChange={() => setVariant(item)}/><span>{item}</span></label>)}</div></fieldset>}
          <p className="availability-line"><span className="availability-dot"/> {product.demoAvailability === "sample-available" ? "Shown available in this fictional demo" : "Shown unavailable in this fictional demo"} · not real inventory</p>
          <div className="product-quantity"><span>Sample quantity</span><div className="quantity-control" role="group" aria-label="Sample product quantity"><button aria-label="Decrease sample quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={15}/></button><span aria-live="polite">{quantity}</span><button aria-label="Increase sample quantity" onClick={() => setQuantity((value) => Math.min(99, value + 1))}><Plus size={15}/></button></div></div>
          <button className="button button--primary button--wide" disabled={unavailable} onClick={() => { addItem(product, variant || product.defaultVariant, quantity); setAdded(true); }}>{unavailable ? "Unavailable in this demo" : added ? <><Check size={18}/> Added to demo bag</> : <><ShoppingBag size={18}/> Add sample to demo bag</>}</button>
          <p className="form-note" role="status">{unavailable ? "This sample is marked unavailable; the demo cart will not accept it." : added ? "Added in this browser session only; nothing was ordered or saved." : "Delivery, returns, taxes, and fulfilment are not configured."}</p>
          <div className="detail-disclosure"><strong>What this means</strong><p>This is an illustrative item to test product discovery. It is not a real listing and cannot be purchased.</p></div>
        </div>
      </div>
    </main>
  </>;
}

export function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const meta = pageMeta["/cart"];
  return <>
    <PageMeta title={meta.title} description={meta.description}/>
    <main id="main-content" className="page-container">
      <PageIntro eyebrow="Demo cart" title="Your sample picks." text="Your bag exists only in this page session. No order is created or stored."/>
      {items.length === 0 ? <div className="empty-state"><ShoppingBag size={30}/><h2>Your demo bag is empty.</h2><p>Pick a sample item to try the cart interaction.</p><Link href="/shop" className="button button--primary">Browse sample products <ArrowRight size={17}/></Link></div> : <div className="cart-layout"><div className="cart-list">{items.map((item) => {
        const key = cartKey(item);
        return <article className="cart-row" key={key}><Link href={`/products/${item.product.slug}`} className="cart-row__image"><img src={item.product.image} alt=""/></Link><div className="cart-row__body"><div><Link href={`/products/${item.product.slug}`} className="cart-row__name">{item.product.name}</Link><p>{item.variant} · sample item</p><span className="cart-row__price">{amount(item.product.price)} each</span></div><div className="quantity-control" aria-label={`Quantity for ${item.product.name}`}><button aria-label={`Remove one ${item.product.name}`} onClick={() => item.quantity === 1 ? removeItem(key) : updateQuantity(key, item.quantity - 1)}><Minus size={15}/></button><span aria-live="polite">{item.quantity}</span><button aria-label={`Add one ${item.product.name}`} onClick={() => updateQuantity(key, item.quantity + 1)}><Plus size={15}/></button></div><button className="remove-button" onClick={() => removeItem(key)}><Trash2 size={15}/> Remove</button></div><strong className="cart-row__total">{amount(item.product.price * item.quantity)}</strong></article>;
      })}</div><aside className="summary-card"><p className="eyebrow"><span className="eyebrow__dash"/> Sample summary</p><h2>Not a real order.</h2><div className="summary-line"><span>Illustrative subtotal</span><strong>{amount(subtotal)}</strong></div><div className="summary-line"><span>Shipping & taxes</span><strong>Not calculated</strong></div><p className="summary-caption">* USD is only an example. Currency, tax, stock, shipping, and fulfilment remain unconfirmed.</p><Link href="/checkout" className="button button--primary button--wide">Try simulated checkout <ArrowRight size={17}/></Link><Link href="/shop" className="summary-back">Keep browsing sample items</Link></aside></div>}
    </main>
  </>;
}

export function CheckoutPage() {
  const { items, subtotal, completeDemoOrder } = useCart();
  const [, setLocation] = useLocation();
  const meta = pageMeta["/checkout"];
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) return;
    completeDemoOrder();
    setLocation("/order-confirmation");
  };
  return <>
    <PageMeta title={meta.title} description={meta.description}/>
    <main id="main-content" className="page-container">
      <PageIntro eyebrow="Simulation only" title="A checkout with no charge." text="Use fictional details only. This demo sends nothing, saves nothing, and has no payment step."/>
      {items.length === 0 ? <div className="empty-state"><h2>No sample items to check out.</h2><p>Add a fictional item first to try this flow.</p><Link href="/shop" className="button button--primary">Browse the sample shop <ArrowRight size={17}/></Link></div> : <div className="checkout-layout"><form className="form-card" onSubmit={submit} autoComplete="off"><div className="form-alert"><strong>Demo form — please use fictional details.</strong><span>Fields are used only to demonstrate validation. They are not transmitted, stored, emailed, or associated with an account.</span></div><h2>Contact & delivery details</h2><div className="form-grid"><label className="field field--full">Name <span aria-hidden="true">*</span><input name="name" required maxLength={80} autoComplete="off" placeholder="Example: Alex Sample"/></label><label className="field field--full">Email <span aria-hidden="true">*</span><input name="email" type="email" required maxLength={120} autoComplete="off" placeholder="alex@example.test"/></label><label className="field field--full">Delivery address <span aria-hidden="true">*</span><input name="address" required maxLength={120} autoComplete="off" placeholder="Fictional address"/></label><label className="field">Town / city <span aria-hidden="true">*</span><input name="city" required maxLength={80} autoComplete="off" placeholder="Sample town"/></label><label className="field">Postcode / ZIP <span aria-hidden="true">*</span><input name="postcode" required maxLength={24} autoComplete="off" placeholder="00000"/></label></div><fieldset className="fulfilment-choice"><legend>Sample fulfilment method</legend><label><input type="radio" name="fulfilment" value="demo-delivery" defaultChecked/> Demo delivery (not available)</label><p>No shipping option, carrier, fee, or delivery date is configured.</p></fieldset><div className="payment-notice"><span className="payment-notice__icon"><Check size={17}/></span><span><strong>No payment step.</strong><small>There are no card or bank fields and no payment provider connection.</small></span></div><button className="button button--primary button--wide" type="submit">Simulate checkout <ArrowRight size={17}/></button><p className="form-note">Continuing creates only a fake reference in this browser session—not a purchase or customer record.</p></form><aside className="summary-card"><p className="eyebrow"><span className="eyebrow__dash"/> Demo summary</p><h2>Your sample bag</h2>{items.map((item) => <div className="summary-line" key={cartKey(item)}><span>{item.quantity} × {item.product.name}</span><strong>{amount(item.quantity * item.product.price)}</strong></div>)}<div className="summary-line summary-line--total"><span>Illustrative subtotal</span><strong>{amount(subtotal)}</strong></div><p className="summary-caption">* Example USD amounts only. Tax, shipping, payment, and fulfilment are not calculated.</p><Link href="/cart" className="summary-back">Edit sample bag</Link></aside></div>}
    </main>
  </>;
}

export function ConfirmationPage() {
  const { lastOrder } = useCart();
  const meta = pageMeta["/order-confirmation"];
  return <>
    <PageMeta title={meta.title} description={meta.description}/>
    <main id="main-content" className="page-container"><section className="confirmation-card"><span className="confirmation-icon" aria-hidden="true"><Check size={26}/></span><DemoPill>Simulated only · no purchase</DemoPill><h1>This is a demo,<br/><em>not an order.</em></h1><p>Thanks for trying the flow. No payment was taken, no order was placed, and no customer details were sent or saved.</p><div className="demo-statuses"><div><span>Payment status</span><strong>Not processed · no payment</strong></div><div><span>Fulfilment status</span><strong>Not started · no delivery</strong></div></div>{lastOrder && <div className="confirmation-reference"><span>FAKE REFERENCE</span><strong>{lastOrder.reference}</strong><small>Browser session only · clears when the page reloads</small><div className="summary-line"><span>Sample item count</span><strong>{lastOrder.items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div><div className="summary-line"><span>Illustrative subtotal</span><strong>{amount(lastOrder.subtotal)}</strong></div></div>}<p className="confirmation-next-step">Next step: return to the sample shop or view contact details. No real support contact is configured.</p><div className="confirmation-actions"><Link href="/shop" className="button button--primary">Back to sample shop <ArrowRight size={17}/></Link><Link href="/contact" className="text-link">Contact & support details</Link></div></section></main>
  </>;
}
