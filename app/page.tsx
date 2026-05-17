import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero-stage">
      <div className="hero-image-band">
        <Image
          src="/assets/images/deadwood-hero.png"
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
          Sourcing masterpiece driftwood for bioactive reptile spaces, taxidermy staging,
          aquariums, and sculptural hardscape work.
        </p>

        <div className="pill-row" aria-label="Primary sectors">
          <span className="pill">Reptile</span>
          <span className="pill">Taxidermy</span>
          <span className="pill">Aquariums</span>
          <span className="pill">Landscape</span>
        </div>

        <div className="button-row" style={{ justifyContent: "center" }}>
          <Link className="button primary" href="/shop">
            View Test Shop
          </Link>
          <Link className="button" href="/admin">
            Admin Preview
          </Link>
        </div>
      </div>
    </section>
  );
}
