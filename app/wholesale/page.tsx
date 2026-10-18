import { WholesaleApplicationForm } from "@/components/wholesale/WholesaleApplicationForm";

const reviewSteps = [
  {
    number: "01",
    title: "Tell us about your business",
    copy: "Share your shop, studio, or trade work so we can understand how you serve your customers.",
  },
  {
    number: "02",
    title: "We review your application",
    copy: "Our team may follow up to learn more or confirm a few details before approving trade access.",
  },
  {
    number: "03",
    title: "Plan the right supply",
    copy: "If it’s a fit, we’ll talk through available pieces, quantities, pricing, and delivery directly with you.",
  },
];

export default function WholesalePage() {
  return (
    <section className="page-shell wholesale-page">
      <header className="wholesale-hero">
        <div className="wholesale-hero-copy">
          <p className="eyebrow">Trade &amp; Professional Buyers</p>
          <h1 className="section-heading">Good materials. A direct relationship.</h1>
          <p className="section-copy">
            We work with independent shops, builders, studios, and established businesses
            that use natural materials in thoughtful ways. Tell us about your work and
            what you’re looking for. We’ll get back to you personally.
          </p>
          <a className="button primary wholesale-hero-button" href="#wholesale-application">
            Apply for Wholesale Access <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <section className="wholesale-review" aria-labelledby="wholesale-review-title">
        <div className="wholesale-section-heading">
          <p className="eyebrow">A straightforward process</p>
          <h2 id="wholesale-review-title">Start with a conversation.</h2>
        </div>
        <div className="wholesale-review-grid">
          {reviewSteps.map((step) => (
            <article className="wholesale-review-card" key={step.number}>
              <span className="wholesale-review-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wholesale-application-section" id="wholesale-application" aria-labelledby="wholesale-application-title">
        <div className="wholesale-application-intro">
          <p className="eyebrow">Trade application</p>
          <h2 id="wholesale-application-title">Let’s get to know your business.</h2>
          <p>
            A website or social profile helps us understand your work, but neither is
            required. A home-based business is welcome—just use the location where you
            operate or receive deliveries.
          </p>
          <div className="wholesale-privacy-note">
            <span aria-hidden="true">◇</span>
            <p>Your details stay private and are used only to review and respond to this application.</p>
          </div>
        </div>
        <WholesaleApplicationForm />
      </section>
    </section>
  );
}
