import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInventoryBySlug, getPublishedInventory } from "@/lib/mock-inventory";
import { StatusPill } from "@/components/ui/status-pill";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPublishedInventory().map((item) => ({
    slug: item.slug
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const item = getInventoryBySlug(slug);

  if (!item || item.status !== "published") {
    notFound();
  }

  return (
    <section className="page-shell">
      <div className="detail-layout">
        <div className="detail-image glass-panel">
          <Image src={item.image} alt={item.title} width={1200} height={900} priority />
        </div>

        <article className="detail-panel glass-panel">
          <p className="eyebrow">{item.sector}</p>
          <h1 className="section-heading">{item.title}</h1>
          <p className="section-copy">{item.description}</p>

          <div className="pill-row" style={{ justifyContent: "flex-start" }}>
            {item.sectors.map((sector) => (
              <StatusPill key={sector} status={sector} />
            ))}
          </div>

          <div className="spec-list">
            <div className="spec-row">
              <span>Price</span>
              <strong>${item.price.toLocaleString()}</strong>
            </div>
            <div className="spec-row">
              <span>Availability</span>
              <strong>{item.availability}</strong>
            </div>
            <div className="spec-row">
              <span>Dimensions</span>
              <strong>{item.dimensions}</strong>
            </div>
            <div className="spec-row">
              <span>Size class</span>
              <strong>{item.sizeClass}</strong>
            </div>
            <div className="spec-row">
              <span>Weight</span>
              <strong>{item.weight}</strong>
            </div>
            <div className="spec-row">
              <span>Video</span>
              <strong>{item.hasVideo ? "Available" : "Not posted yet"}</strong>
            </div>
            <div className="spec-row">
              <span>GPS</span>
              <strong>{item.gpsAvailable ? "Available for Vault record" : "Not listed"}</strong>
            </div>
          </div>

          <h2 className="product-title">Best Fit</h2>
          <p className="section-copy">{item.bestFor}</p>

          <h2 className="product-title">Visual Provenance</h2>
          <p className="section-copy">{item.provenance}</p>

          <h2 className="product-title">Bio-Sanctity</h2>
          <p className="section-copy">{item.bioSanctity}</p>

          <div className="button-row">
            <Link className="button primary" href="/shop">
              Request Quote
            </Link>
            <Link className="button" href="/admin">
              Try In Tank Later
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
