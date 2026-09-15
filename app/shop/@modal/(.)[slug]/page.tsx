import { getInventoryBySlug } from "@/lib/inventory-data";
import { ProductDetail } from "@/components/portal/product-detail";

export default async function ProductModal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (["reptile", "landscaping", "taxidermy", "sculptural-relics"].includes(slug)) {
    return null;
  }

  const item = await getInventoryBySlug(slug);
  if (!item || item.status !== "published") {
    return null;
  }

  return (
    <div className="product-modal-backdrop">
      <ProductDetail item={item} modal />
    </div>
  );
}
