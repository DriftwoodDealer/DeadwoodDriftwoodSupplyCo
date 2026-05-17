import { SectorPage } from "@/components/portal/sector-page";
import { getSectorBySlug } from "@/lib/mock-inventory";

export default function TaxidermyShopPage() {
  const sector = getSectorBySlug("taxidermy");

  if (!sector) {
    return null;
  }

  return (
    <SectorPage sector={sector}>
      <section className="store-section protocol-band" aria-labelledby="taxidermy-fit">
        <div>
          <p className="eyebrow">Mount Fit</p>
          <h2 id="taxidermy-fit" className="section-heading">
            Selected for staging, balance, and silhouette.
          </h2>
        </div>
        <div className="protocol-steps">
          <div>
            <span>01</span>
            <strong>Stable base</strong>
            <p>Pieces are evaluated for usable contact points and display orientation.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Natural line</strong>
            <p>Branches and roots should support the mount without stealing the show.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Custom lookout</strong>
            <p>Studios can request dimensions and shapes for upcoming mount work.</p>
          </div>
        </div>
      </section>
    </SectorPage>
  );
}
