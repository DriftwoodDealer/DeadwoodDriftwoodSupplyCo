import { notFound } from "next/navigation";
import { getInventoryBySlug, getPublishedInventory } from "@/lib/inventory-data";
import { ProductDetail } from "@/components/portal/product-detail";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return (await getPublishedInventory()).map((item) => ({
    slug: item.slug
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const item = await getInventoryBySlug(slug);

  if (!item || item.status !== "published") {
    console.warn(`[shop] Published product not found for slug: ${slug}`);
    notFound();
  }

  return <ProductDetail item={item} />;
}
