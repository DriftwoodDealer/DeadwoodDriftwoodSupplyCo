import Link from "next/link";

export default function CustomRequestsPage() {
  return (
    <section className="page-shell">
      <div className="shop-hero">
        <div>
          <p className="eyebrow">Field Lookout</p>
          <h1 className="section-heading">Tell us what shape to watch for.</h1>
        </div>
        <p className="section-copy">
          Custom requests are not ordinary orders. They become field notes for future
          scavenging: dimensions, shape, use case, finish expectations, and urgency.
        </p>
      </div>

      <section className="store-section protocol-band" aria-labelledby="request-flow-heading">
        <div>
          <p className="eyebrow">Request Flow</p>
          <h2 id="request-flow-heading" className="section-heading">
            From buyer need to river lookout.
          </h2>
        </div>
        <div className="protocol-steps">
          <div>
            <span>01</span>
            <strong>Describe the piece</strong>
            <p>Length, width, height, silhouette, use case, and reference images.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Classify the hunt</strong>
            <p>Taxidermy, landscape, reptile, gallery, wholesale, or private commission.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Track the lookout</strong>
            <p>Approved requests become an internal list for future river walks.</p>
          </div>
        </div>
      </section>

      <section className="store-section service-grid" aria-label="Custom request types">
        <article className="service-panel glass-panel">
          <p className="eyebrow">Taxidermy</p>
          <h2 className="product-title">Mount-specific staging</h2>
          <p className="section-copy">
            Perch angles, base stability, branch line, mount size, and studio deadlines.
          </p>
        </article>

        <article className="service-panel glass-panel">
          <p className="eyebrow">Landscape</p>
          <h2 className="product-title">Site-specific relics</h2>
          <p className="section-copy">
            Install scale, entry access, weather exposure, focal point, and freight limits.
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
