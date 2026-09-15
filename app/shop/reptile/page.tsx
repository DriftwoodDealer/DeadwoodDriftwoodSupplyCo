import { SectorStorefrontPage } from "@/components/sector/SectorStorefrontPage";
import { reptileStorefrontConfig } from "@/lib/sector-storefront-config";
import { getInventoryBySector } from "@/lib/inventory-data";
import { getSectorBySlug } from "@/lib/mock-inventory";

export default async function ReptileShopPage() {
  const sector = getSectorBySlug("reptile");
  if (!sector) return null;

  const items = await getInventoryBySector(sector);

  return (
    <SectorStorefrontPage
      config={reptileStorefrontConfig}
      items={items}
    />
  );
}
