import Image from "next/image";
import Link from "next/link";
import { sectors } from "@/lib/mock-inventory";

export default function HomePage() {

  return (
    <>
      <section className="hero-stage home-hero">
        <div className="hero-image-band">
          <Image
            src="/assets/images/DEADWOODdark.webp"
            alt="Deadwood driftwood hero artwork"
            width={3344}
            height={1882}
            priority
          />
        </div>
      </section>

      <section className="page-shell home-entry">
        <div className="split-intro compact">
          <div>
            <p className="eyebrow">Choose The Terrain</p>
            <h2 className="section-heading">Four ways into the river archive.</h2>
          </div>
          <p className="section-copy">
            Choose your section to browse wood selected and prepared for that use.
            Each section has its own inventory.
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
            <p className="eyebrow">For Professional Buyers</p>
            <h3 className="product-title">A better way to source for your business.</h3>
            <p className="section-copy">
              Tell us about your shop or studio. We’ll learn what you need and talk through trade options.
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
      </section>

      <section className="home-feature-video" aria-label="Deadwood river archive film">
        <video
          className="home-feature-video-media"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Deadwood river archive film"
        >
          <source src="/assets/videos/vid.mp4" type="video/mp4" />
        </video>
      </section>

      <section className="page-shell store-section" aria-labelledby="home-river-archive">
        <div className="section-bar">
          <div>
            <p className="eyebrow">From The River Archive</p>
            <h2 id="home-river-archive" className="product-title">
              Find the right section for your next piece.
            </h2>
          </div>
          <Link className="button" href="/shop">
            Shop all
          </Link>
        </div>

      </section>

    </>
  );
}
