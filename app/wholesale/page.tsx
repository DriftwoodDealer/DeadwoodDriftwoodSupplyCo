import Link from "next/link";

export default function WholesalePage() {
  return (
    <section className="page-shell">
      <div className="shop-hero">
        <div>
          <p className="eyebrow">Verified Trade</p>
          <h1 className="section-heading">Wholesale access is gated on purpose.</h1>
        </div>
        <p className="section-copy">
          Private pricing, recurring shipments, and contract discounts should only unlock
          after a serious verification process. This prevents bulk resellers from stripping
          the best material out of public inventory.
        </p>
      </div>

      <section className="store-section protocol-band" aria-labelledby="verification-heading">
        <div>
          <p className="eyebrow">Verification</p>
          <h2 id="verification-heading" className="section-heading">
            Business proof before private pricing.
          </h2>
        </div>
        <div className="protocol-steps">
          <div>
            <span>01</span>
            <strong>Business identity</strong>
            <p>Legal business name, website/social presence, resale/tax info, and contact details.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Use-case review</strong>
            <p>Shop, studio, installer, taxidermist, or contractor status must be clear.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Contract tier</strong>
            <p>Recurring shipment terms can scale discounts only after approval.</p>
          </div>
        </div>
      </section>

      <section className="store-section service-grid" aria-label="Wholesale paths">
        <article className="service-panel glass-panel">
          <p className="eyebrow">Recurring Supply</p>
          <h2 className="product-title">Shipment contracts</h2>
          <p className="section-copy">
            Future tiers can support monthly, quarterly, or seasonal supply agreements with
            stronger discounts for longer commitments.
          </p>
        </article>

        <article className="service-panel glass-panel">
          <p className="eyebrow">Not Open Market</p>
          <h2 className="product-title">No anonymous bulk buying</h2>
          <p className="section-copy">
            Wholesale should protect the brand, the best pieces, and the public customer
            experience. Access stays permissioned.
          </p>
        </article>
      </section>

      <div className="button-row">
        <Link className="button primary" href="/shop">
          Shop Overview
        </Link>
      </div>
    </section>
  );
}
