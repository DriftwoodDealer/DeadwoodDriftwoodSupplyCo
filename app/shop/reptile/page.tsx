import { SectorPage } from "@/components/portal/sector-page";
import { ReptileTierCards } from "@/components/portal/reptile-tier-cards";
import { TreatmentProcess } from "@/components/portal/treatment-process";
import { getSectorBySlug } from "@/lib/mock-inventory";

export default function ReptileShopPage() {
  const sector = getSectorBySlug("reptile");
  if (!sector) return null;

  return (
    <SectorPage sector={sector}>
      <section className="store-section reptile-video-divider" aria-label="River-worn driftwood forms">
        <video autoPlay muted loop playsInline preload="metadata" aria-label="River-worn driftwood forms">
          <source src="/assets/dividers/deadwoodReptile.mp4" type="video/mp4" />
        </video>
      </section>
      <ReptileTierCards />
      <TreatmentProcess />
    </SectorPage>
  );
}
