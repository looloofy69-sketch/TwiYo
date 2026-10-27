import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleHelp, Sparkles } from "lucide-react";
import { Link, useParams } from "wouter";
import { services, pageMeta } from "../data/siteData";
import { DemoPill, PageIntro } from "../components/SiteShell";
import PageMeta from "../components/PageMeta";

export function ServicesPage() {
  const meta = pageMeta["/services"];
  return <>
    <PageMeta title={meta.title} description={meta.description}/>
    <main id="main-content" className="page-container">
      <PageIntro eyebrow="Marketing services · sample concepts" title="Clear thinking. Creative momentum." text="A preview of possible brand, content, and campaign support. Final services, scope, terms, and pricing need TwiYo’s approval."/>
      <div className="service-intro-note"><Sparkles size={22}/><p><strong>Service examples, not live offers.</strong> Deliverables and outcomes below are illustrative; there are no confirmed prices, timelines, or performance guarantees.</p></div>
      <div className="service-list">{services.map((service, index) => <article className={`service-card service-card--${index + 1}`} key={service.id}>
        {service.image ? <Link href={`/services/${service.slug}`} className="service-card__image"><img src={service.image} alt={service.imageAlt ?? "Illustrative creative service"} loading="lazy"/><span className="service-card__index">0{index + 1}</span></Link> : <Link href={`/services/${service.slug}`} className="service-card__illustration" aria-label={`0${index + 1} — See ${service.name}`}><span className="abstract-art"><span/><span/><span/></span><span className="service-card__index">0{index + 1}</span></Link>}
        <div className="service-card__body"><DemoPill>{service.category} · sample</DemoPill><h2><Link href={`/services/${service.slug}`}>{service.name}</Link></h2><p>{service.description}</p><ul className="deliverable-preview">{service.deliverables.slice(0, 2).map((item) => <li key={item}><Check size={15}/>{item}</li>)}</ul><div className="service-card__bottom"><span><small>Pricing approach</small><strong>Quote after scope review</strong></span><Link href={`/services/${service.slug}`} className="round-arrow" aria-label={`Details for ${service.name}`}><ArrowUpRight size={19}/></Link></div></div>
      </article>)}</div>
      <section className="process-strip"><p className="eyebrow"><span className="eyebrow__dash"/> A thoughtful way to start</p><h2>Clear scope, before<br/><em>big promises.</em></h2><div className="process-steps">{["Understand your goals", "Agree a useful scope", "Make, review, refine"].map((step, index) => <div key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div><p className="process-disclaimer">Illustrative engagement process only. No guaranteed rankings, sales, reach, or return on ad spend.</p></section>
      <section className="inline-cta"><div><p className="eyebrow"><span className="eyebrow__dash"/> Your turn</p><h2>Tell us what you’re<br/><em>building next.</em></h2></div><div><p>The form is also a demo. Use fictional details; nothing is sent, saved, or routed.</p><Link href="/enquiry" className="button button--primary">Try the enquiry flow <ArrowRight size={17}/></Link></div></section>
    </main>
  </>;
}

export function ServicePage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <main id="main-content" className="page-container"><PageIntro eyebrow="Service concept" title="That concept isn’t here." text="This service is not part of the illustrative sample."/><Link className="button button--primary" href="/services">Back to sample services</Link></main>;
  return <>
    <PageMeta title={`${service.name} · sample service | TwiYo`} description={`${service.description} Illustrative service concept; no live terms, price, or performance promise.`}/>
    <main id="main-content" className="page-container">
      <Link href="/services" className="back-link"><ArrowLeft size={16}/> All sample services</Link>
      <div className="service-detail-hero"><div><DemoPill>Illustrative service concept</DemoPill><p className="eyebrow"><span className="eyebrow__dash"/> {service.category}</p><h1>{service.name}<br/><em>with a little more clarity.</em></h1><p className="service-detail-hero__lead">{service.description}</p><Link href={`/enquiry?service=${service.slug}`} className="button button--primary">Test an enquiry <ArrowRight size={17}/></Link><p className="form-note">Demo only: the form does not send or save your message.</p></div>{service.image ? <div className="service-detail-hero__image"><img src={service.image} alt={service.imageAlt ?? "Illustrative service concept"}/></div> : <div className="service-detail-hero__art"><span className="abstract-art"><span/><span/><span/></span></div>}</div>
      <div className="service-detail-grid"><section className="detail-panel"><p className="eyebrow"><span className="eyebrow__dash"/> What it could include</p><h2>A useful set of next steps.</h2><p>{service.outcome} This is an example, not a confirmed offer or promised result.</p><ul className="check-list">{service.deliverables.map((item) => <li key={item}><Check size={17}/>{item}</li>)}</ul></section><section className="detail-panel detail-panel--soft"><p className="eyebrow"><span className="eyebrow__dash"/> Boundaries matter</p><h2>What this does not promise.</h2><ul className="bullet-list">{service.exclusions.map((item) => <li key={item}>{item}</li>)}</ul><div className="detail-fact"><strong>Pricing approach</strong><p>{service.pricing}</p></div><div className="detail-fact"><strong>Timing</strong><p>{service.timeline}</p></div></section></div>
      <section className="service-process"><p className="eyebrow"><span className="eyebrow__dash"/> Example process</p><div>{service.process.map((step, index) => <div key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div></section>
      <section className="faq-panel"><p className="eyebrow"><span className="eyebrow__dash"/> A few honest answers</p><h2>Before we make<br/><em>any promises.</em></h2><div className="faq-list"><details><summary><CircleHelp size={17}/> Is this service available to book?</summary><p>No. This is a sample concept. TwiYo has not confirmed its real service catalogue or availability.</p></details><details><summary><CircleHelp size={17}/> Is there a fixed price or delivery date?</summary><p>No live price, timeline, or engagement terms are configured. Those would need to be agreed after scope review.</p></details><details><summary><CircleHelp size={17}/> Can you guarantee a result?</summary><p>No. This demo makes no promise about sales, reach, rankings, or return on ad spend.</p></details></div></section>
    </main>
  </>;
}

export function EnquiryPage() {
  const [submitted, setSubmitted] = useState(false);
  const meta = pageMeta["/enquiry"];
  const requestedService = new URLSearchParams(window.location.search).get("service");
  const initialService = services.some((service) => service.slug === requestedService) ? requestedService ?? "" : "";
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return <>
    <PageMeta title={meta.title} description={meta.description}/>
    <main id="main-content" className="page-container">
      <PageIntro eyebrow="Enquiry form · simulation" title="Tell us what you’re building." text="A little context makes for a better conversation. Here, you can test the form only—your message never leaves this page."/>
      {submitted ? <section className="form-confirmation" role="status" aria-live="polite"><span className="confirmation-icon"><Check size={25}/></span><DemoPill>Interface demo only</DemoPill><h2>Form complete.<br/><em>Nothing was sent.</em></h2><p>Your test entry was not transmitted, saved, routed, or read by TwiYo. No email acknowledgement was sent.</p><button className="button button--outline" onClick={() => setSubmitted(false)}>Try the form again</button></section> : <form className="form-card enquiry-form" onSubmit={submit} autoComplete="off"><div className="form-alert"><strong>Fictional details only, please.</strong><span>This demo validates fields in your browser. It does not transmit or store enquiry information.</span></div><div className="form-grid"><label className="field">Your name <span aria-hidden="true">*</span><input name="name" required maxLength={80} autoComplete="off" placeholder="Alex Sample"/></label><label className="field">Work email <span aria-hidden="true">*</span><input name="email" type="email" required maxLength={120} autoComplete="off" placeholder="alex@example.test"/></label><label className="field">Business / project <span aria-hidden="true">*</span><input name="business" required maxLength={120} autoComplete="off" placeholder="A fictional project name"/></label><label className="field">Service you’re curious about <span aria-hidden="true">*</span><select name="service" required defaultValue={initialService}><option value="" disabled>Select a sample concept</option>{services.map((service) => <option key={service.id} value={service.slug}>{service.name}</option>)}<option value="not-sure">Not sure yet</option></select></label><label className="field field--full">What are you working towards? <span aria-hidden="true">*</span><textarea name="goals" required maxLength={1200} rows={4} placeholder="A few fictional words are enough to test the form."/></label><label className="field">Budget range <span className="optional">optional</span><select name="budget" defaultValue=""><option value="">Choose a sample range</option><option>Not decided</option><option>Under $1,000 (example only)</option><option>$1,000–$5,000 (example only)</option><option>Over $5,000 (example only)</option></select></label><label className="field">Ideal timing <span className="optional">optional</span><select name="timeline" defaultValue=""><option value="">Choose a sample window</option><option>Exploring</option><option>Within 1–3 months</option><option>Later this year</option></select></label><label className="consent-check field--full"><input type="checkbox" name="consent" required/><span>I understand this is a demo. My entry will not be sent, stored, or used to contact me. <span aria-hidden="true">*</span></span></label></div><button type="submit" className="button button--primary">Test the enquiry form <ArrowRight size={17}/></button><p className="form-note">Submitting shows a local confirmation only. No internal recipient or lead workflow is connected.</p></form>}
      <p className="form-footnote">Real service offerings, prices, contact channels, privacy and marketing consent terms still need business and legal review.</p>
    </main>
  </>;
}
