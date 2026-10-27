import { ArrowDownRight, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { products, services, pageMeta } from "../data/siteData";
import { DemoPill, PageIntro } from "../components/SiteShell";
import PageMeta from "../components/PageMeta";

export default function HomePage() {
  const meta = pageMeta["/"];
  return <>
    <PageMeta title={meta.title} description={meta.description}/>
    <main id="main-content">
      <section className="hero section-wrap">
        <div className="hero__copy">
          <p className="eyebrow"><span className="eyebrow__dash"/> Good things, good ideas</p>
          <h1>Good things<br/>to shop.<br/><span>Good ideas</span><br/>to grow.</h1>
          <p className="hero__summary">A brighter everyday shop, alongside practical marketing services for your next big thing.</p>
          <p className="demo-caption"><strong>Demo preview:</strong> every product and service shown here is illustrative.</p>
          <div className="hero__actions"><Link href="/shop" className="button button--primary">Explore the sample shop <ArrowRight size={17}/></Link><Link href="/services" className="text-link">See marketing services <ArrowUpRight size={16}/></Link></div>
        </div>
        <div className="hero__visual">
          <img src="/manus-storage/async-images/45qBo8IdV6gwD9gwnIaBcZ/image-1.webp" alt="Art-directed sample still life with a green notebook, ceramic cup, canvas tote, and colorful paper" fetchPriority="high"/>
          <div className="hero-sticker"><span>TW</span><small>GOOD<br/>ENERGY<br/>ONLY</small></div>
          <div className="hero-note"><span>01 / 02</span><span>One brand, two good directions</span></div>
        </div>
      </section>

      <section className="split-intro section-wrap" aria-labelledby="two-paths-title">
        <div className="split-intro__lead"><p className="eyebrow"><span className="eyebrow__dash"/> Find your kind of good</p><h2 id="two-paths-title">Two paths.<br/><em>One bright idea.</em></h2></div>
        <p className="split-intro__body">Pick up something considered, or find a creative partner for your next move. TwiYo brings shopping and marketing together—with room for both.</p>
      </section>

      <section className="path-cards section-wrap" aria-label="Choose a path">
        <Link href="/shop" className="path-card path-card--shop"><span className="path-card__index">01 / SHOP</span><span className="path-card__art path-card__art--shop"><img src={products[0].image} alt="" loading="lazy"/><span className="orbit orbit--one"/><span className="orbit orbit--two"/></span><span className="path-card__bottom"><span><strong>Find your next favourite.</strong><small>Sample products · illustrative only</small></span><span className="round-arrow"><ArrowUpRight size={19}/></span></span></Link>
        <Link href="/services" className="path-card path-card--services"><span className="path-card__index">02 / SERVICES</span><span className="path-card__art path-card__art--services"><img src={services[0].image} alt="" loading="lazy"/><span className="service-stamp"><Sparkles size={20}/><small>MAKE<br/>SOME<br/>MOTION</small></span></span><span className="path-card__bottom"><span><strong>Make a little more momentum.</strong><small>Service concepts · sample scope</small></span><span className="round-arrow"><ArrowUpRight size={19}/></span></span></Link>
      </section>

      <section className="featured-section section-wrap" aria-labelledby="featured-title">
        <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow__dash"/> Good finds, for the demo</p><h2 id="featured-title">A few bright<br/><em>little things.</em></h2></div><Link href="/shop" className="text-link">See all sample products <ArrowRight size={16}/></Link></div>
        <div className="product-grid product-grid--home">{products.slice(0, 3).map((product, index) => <Link key={product.id} href={`/products/${product.slug}`} className={`product-card product-card--tone-${index + 1}`}><span className="product-card__tag">{product.tag}</span><span className="product-card__image"><img src={product.image} alt={product.imageAlt} loading="lazy"/><span className="product-card__arrow"><ArrowUpRight size={17}/></span></span><span className="product-card__info"><span><strong>{product.name}</strong><small>{product.category} · sample</small></span><strong>{product.priceLabel}</strong></span><span className="product-card__disclaimer">* Demo estimate · currency not confirmed</span></Link>)}</div>
      </section>

      <section className="home-services section-wrap" aria-labelledby="home-services-title">
        <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow__dash"/> Thoughtful marketing support</p><h2 id="home-services-title">Good ideas,<br/><em>put to work.</em></h2></div><Link href="/services" className="text-link">All sample services <ArrowRight size={16}/></Link></div>
        <div className="home-service-teasers">{services.map((service, index) => <Link key={service.id} href={`/services/${service.slug}`} className={`home-service-teaser home-service-teaser--${index + 1}`}><span>{service.category} · sample</span><strong>{service.name}</strong><small>{service.description}</small><span className="home-service-teaser__link">Explore concept <ArrowUpRight size={16}/></span></Link>)}</div>
      </section>

      <section className="service-band section-wrap" aria-labelledby="service-band-title">
        <div className="service-band__text"><p className="eyebrow"><span className="eyebrow__dash"/> A little help, a lot of clarity</p><h2 id="service-band-title">Make your next<br/><em>move a good one.</em></h2><p>From the first “what if?” to a launch with a point of view, explore sample marketing support built around thoughtful strategy and useful creative.</p><Link href="/services" className="button button--dark">Explore the service concepts <ArrowRight size={17}/></Link><small className="no-guarantees">Sample scope only. No results or performance are promised.</small></div>
        <div className="service-band__image"><img src="/manus-storage/async-images/w0CdbHFKsiS9T5l0p29MwY/image-2.webp" alt="Illustrative marketing campaign desk with colorful blank creative mockups" loading="lazy"/><span className="service-band__caption"><span>IDEAS IN MOTION</span><ArrowDownRight size={18}/></span></div>
      </section>

      <section className="closing-cta section-wrap"><div><DemoPill>Prototype, not a storefront</DemoPill><h2>See it, test it,<br/><em>make it yours.</em></h2><p>This is a visual and interaction demo. Real catalogue, business details, payments, fulfilment, policies, and integrations still need confirmation.</p></div><div className="closing-cta__actions"><Link href="/shop" className="button button--primary">Try the sample shop <ArrowRight size={17}/></Link><Link href="/enquiry" className="button button--outline">Test an enquiry form <ArrowRight size={17}/></Link></div></section>
    </main>
  </>;
}
