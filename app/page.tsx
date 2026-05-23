import Image from "next/image";
import Link from "next/link";
import { getFeaturedInventory, sectors } from "@/lib/mock-inventory";
import { ProductCard } from "@/components/portal/product-card";

export default function HomePage() {
  const featuredItems = getFeaturedInventory();

  return (
    <>
      <section className="hero-stage">
        <div className="hero-image-band">
          <Image
            src="/assets/images/alternate-deadwood-design.png"
            alt="DEADWOOD driftwood supply visual mark"
            width={1600}
            height={900}
            priority
          />
        </div>

        <div className="hero-card glass-panel">
          <p className="eyebrow">Missouri River Relics</p>
          <h1 className="hero-title">Deadwood</h1>
          <p className="hero-copy">
            Field-sourced driftwood for bioactive reptile spaces, taxidermy staging,
            estate hardscape, and sculptural interiors.
          </p>

          <div className="hero-sector-strip" aria-label="Primary sectors">
            <span>Reptile</span>
            <span>Taxidermy</span>
            <span>Landscaping</span>
            <span>Sculptural Relics</span>
          </div>
        </div>

      </section>

      <section className="page-shell home-entry">
        <div className="split-intro compact">
          <div>
            <p className="eyebrow">Choose The Terrain</p>
            <h2 className="section-heading">Four ways into the river archive.</h2>
          </div>
          <p className="section-copy">
            The same wood can serve different worlds. The catalog is organized by how the
            piece will live after it leaves the river.
          </p>
        </div>

        <div className="home-sector-grid">
          {sectors.map((sector) => (
            <Link key={sector.slug} className="home-sector-card glass-panel" href={`/shop/${sector.slug}`}>
              <span>{sector.eyebrow}</span>
              <h3>{sector.name}</h3>
              <p>{sector.description}</p>
            </Link>
          ))}
        </div>

        <div className="home-service-row">
          <Link className="service-panel glass-panel" href="/wholesale">
            <p className="eyebrow">Verified Trade</p>
            <h3 className="product-title">Wholesale access is gated.</h3>
            <p className="section-copy">
              Private pricing and recurring shipment contracts require business verification.
            </p>
          </Link>

          <Link className="service-panel glass-panel" href="/custom-requests">
            <p className="eyebrow">Custom Sourcing</p>
            <h3 className="product-title">Tell us what you need.</h3>
            <p className="section-copy">
              Tell us what you need, and we will watch the river for it.
            </p>
          </Link>
        </div>

        <section className="store-section" aria-labelledby="home-river-archive">
          <div className="section-bar">
            <div>
              <p className="eyebrow">From The River Archive</p>
              <h2 id="home-river-archive" className="product-title">
                A few pieces worth crossing the room for.
              </h2>
            </div>
            <Link className="button" href="/shop">
              Shop
            </Link>
          </div>

          <div className="grid">
            {featuredItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </section>

      <footer className="home-footer" aria-label="Site footer">
        <div className="home-footer-brand">DEADWOOD: DRIFTWOOD SUPPLY CO. LLC</div>
        <div className="home-footer-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Shipping</a>
          <a href="#">Contact</a>
        </div>
        <div className="home-footer-contact">
          <a href="mailto:contact@deadwooddriftwood.com">contact@deadwooddriftwood.com</a>
          <a href="tel:+15735550198">(573) 555-0198</a>
          <span>© 2026 DEADWOOD. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
