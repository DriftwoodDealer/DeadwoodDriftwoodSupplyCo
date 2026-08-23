import { inventoryItems } from "@/lib/mock-inventory";
import { createClient } from "@/lib/supabase/server";

export type AdminProduct = {
  id: string;
  sku: string;
  title: string;
  slug: string;
  category: string;
  story: string;
  description: string;
  priceCents: number;
  status: string;
  heroImageUrl: string;
};

export async function getAdminProducts(): Promise<AdminProduct[]> {
  const supabase = await createClient();
  if (!supabase) {
    return inventoryItems.map((item) => ({ id: item.id, sku: item.id, title: item.title, slug: item.slug, category: item.sector.toUpperCase(), story: item.provenance, description: item.description, priceCents: item.price * 100, status: item.status, heroImageUrl: item.image }));
  }

  const { data } = await supabase.from("products").select("id, sku, title, slug, category, story, description, price_cents, inventory_status, hero_image_url").order("updated_at", { ascending: false });
  return (data || []).map((product) => ({ id: product.id, sku: product.sku, title: product.title, slug: product.slug, category: product.category, story: product.story || "", description: product.description, priceCents: product.price_cents, status: product.inventory_status, heroImageUrl: product.hero_image_url || "" }));
}
