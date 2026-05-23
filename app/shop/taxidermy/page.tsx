import Image from "next/image";
import { SectorPage } from "@/components/portal/sector-page";
import { getSectorBySlug } from "@/lib/mock-inventory";

export default function TaxidermyShopPage() {
  const sector = getSectorBySlug("taxidermy");

  if (!sector) {
    return null;
  }

  return (
    <SectorPage sector={sector}>
      <section className="store-section section-feature" aria-label="Taxidermy display study">
        <div className="section-feature-media glass-panel">
          <Image
            src="/assets/sections/taxidermy/taxidermy-bass-driftwood.png"
            alt="Bass taxidermy mount staged on driftwood"
            width={1536}
            height={1024}
          />
        </div>
        <div className="section-feature-copy">
          <p className="eyebrow">Display Study</p>
          <h2 className="section-heading">A mount needs a stage, not a prop.</h2>
          <p className="section-copy">
            Taxidermy pieces should support the animal, shape the silhouette, and look
            like they belong to the same waterline, bank, or field story.
          </p>
        </div>
      </section>

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
