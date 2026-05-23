import { SectorPage } from "@/components/portal/sector-page";
import { getSectorBySlug, getVaultInventory } from "@/lib/mock-inventory";

export default function SculpturalRelicsPage() {
  const sector = getSectorBySlug("sculptural-relics");
  const vaultItems = getVaultInventory();

  if (!sector) {
    return null;
  }

  return (
    <SectorPage sector={sector}>
      <section className="store-section" aria-labelledby="vault-page-heading">
        <div className="split-intro compact">
          <div>
            <p className="eyebrow">The Vault</p>
            <h2 id="vault-page-heading" className="section-heading">
              Where the rare forms get held back.
            </h2>
          </div>
          <p className="section-copy">
            These pieces get treated like collectible natural sculpture: tighter curation,
            richer media, provenance notes, and inquiry-first placement. Select works can
            include engraved latitude, longitude, collection notes, or a discreet origin mark.
          </p>
        </div>

        <div className="vault-grid">
          {vaultItems.map((item) => (
            <article key={item.id} className="featured-piece glass-panel">
              <p className="product-kicker">{item.sizeClass}</p>
              <h3>{item.title}</h3>
              <p>{item.bestFor}</p>
              <a className="button primary" href={`/shop/${item.slug}`}>
                Request Quote
              </a>
            </article>
          ))}
        </div>
      </section>
    </SectorPage>
  );
}
