import { SectorPage } from "@/components/portal/sector-page";
import { getSectorBySlug, sizeClasses } from "@/lib/mock-inventory";

export default function ReptileShopPage() {
  const sector = getSectorBySlug("reptile");

  if (!sector) {
    return null;
  }

  return (
    <SectorPage sector={sector}>
      <section className="store-section" aria-labelledby="reptile-scale-heading">
        <div className="split-intro compact">
          <div>
            <p className="eyebrow">Scale Classes</p>
            <h2 id="reptile-scale-heading" className="section-heading">
              Built around enclosure presence.
            </h2>
          </div>
          <p className="section-copy">
            Size classes keep reptile and bioactive builds from becoming guesswork. The
            future tank tool can use this same model to warn when a piece is too much.
          </p>
        </div>

        <div className="size-grid">
          {sizeClasses.map((sizeClass) => (
            <article key={sizeClass.name} className="size-card">
              <span>{sizeClass.scale}</span>
              <h3>{sizeClass.name}</h3>
              <p>{sizeClass.description}</p>
              <strong>{sizeClass.bestFor}</strong>
            </article>
          ))}
        </div>
      </section>
    </SectorPage>
  );
}
