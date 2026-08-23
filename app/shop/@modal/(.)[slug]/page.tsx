import { notFound } from "next/navigation";
import { getInventoryBySlug } from "@/lib/inventory-data";
import { ProductDetail } from "@/components/portal/product-detail";

export default async function ProductModal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getInventoryBySlug(slug);

  if (!item) notFound();

  return <div className="product-modal-backdrop"><ProductDetail item={item} modal /></div>;
}
