import { SectorPage } from "@/components/portal/sector-page";
import { getSectorBySlug } from "@/lib/mock-inventory";

export default function LandscapingShopPage() {
  const sector = getSectorBySlug("landscaping");

  if (!sector) {
    return null;
  }

  return (
    <SectorPage sector={sector}>
      <section className="store-section protocol-band" aria-labelledby="landscape-protocol">
        <div>
          <p className="eyebrow">Placement Review</p>
          <h2 id="landscape-protocol" className="section-heading">
            Big pieces need real-world context.
          </h2>
        </div>
        <div className="protocol-steps">
          <div>
            <span>01</span>
            <strong>Measure the site</strong>
            <p>Length, width, height, access, and soil/base conditions matter before quote.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Review freight</strong>
            <p>Heavy forms may need crating, local delivery, or special handling.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Commission hunts</strong>
            <p>Specific shapes can become lookout requests for future river walks.</p>
          </div>
        </div>
      </section>
    </SectorPage>
  );
}
