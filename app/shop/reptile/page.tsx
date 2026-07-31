import Image from "next/image";
import { SectorPage } from "@/components/portal/sector-page";
import { ReptileSizeStory } from "@/components/portal/reptile-size-story";
import { getSectorBySlug } from "@/lib/mock-inventory";

export default function ReptileShopPage() {
  const sector = getSectorBySlug("reptile");

  if (!sector) {
    return null;
  }

  return (
    <SectorPage sector={sector}>
      <section className="store-section reptile-study glass-panel" aria-label="Reptile display study">
        <Image
          src="/assets/sections/reptile-bioactive/reptile-gecko-driftwood.png"
          alt="Gecko on sculptural driftwood for a bioactive reptile display"
          width={1280}
          height={1024}
          className="reptile-study-image"
          priority
        />
        <div className="reptile-study-copy">
          <p className="eyebrow">Bioactive Study</p>
          <h2 className="section-heading">Wood that feels built into the habitat.</h2>
          <p className="section-copy">
            Reptile pieces should read as structure, shelter, climbing line, and visual
            anchor. The best ones feel like the enclosure formed around them.
          </p>
        </div>
      </section>

      <ReptileSizeStory />

      <section
        className="store-section protocol-band treatment-band"
        aria-labelledby="reptile-treatment-heading"
      >
        <div>
          <p className="eyebrow">Bioactive Treatment</p>
          <h2 id="reptile-treatment-heading" className="section-heading">
            Prepared for living enclosures.
          </h2>
          <a className="button protocol-link" href="/custom-requests">
            Learn More
          </a>
        </div>
        <div className="protocol-steps">
          <div>
            <span>01</span>
            <strong>Power washed</strong>
            <p>River silt and loose material are removed without flattening the patina.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Heat treated</strong>
            <p>Pieces for bioactive use are heated to 275 degrees for 4+ hours.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Cataloged</strong>
            <p>Future records can hold photos, video, treatment notes, and fit data.</p>
          </div>
        </div>
      </section>
    </SectorPage>
  );
}
