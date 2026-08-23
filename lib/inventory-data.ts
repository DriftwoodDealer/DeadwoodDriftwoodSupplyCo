import type { InventoryItem, Sector } from "@/lib/mock-inventory";
import { inventoryItems, getSectorBySlug as getMockSectorBySlug, sectors as mockSectors } from "@/lib/mock-inventory";
import { createClient as createPublicSupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/config";

type ProductRow = {
  id: string;
  sku: string;
  title: string;
  slug: string;
  category: "REPTILE" | "LANDSCAPING" | "TAXIDERMY" | "SCULPTURAL_RELICS" | "NANO_RANDOM";
  story: string | null;
  description: string;
  dimensions: Record<string, string | number>;
  wood_type: string | null;
  treatment_details: string | null;
  price_cents: number;
  inventory_status: InventoryItem["status"] | "ready_for_review" | "reserved";
  is_featured_global: boolean;
  hero_image_url: string | null;
  size?: string | null;
  product_media?: Array<{ type: "image" | "video"; url: string; is_private: boolean; sort_order?: number }>;
};

const categoryToSector: Record<ProductRow["category"], InventoryItem["sector"]> = {
  REPTILE: "Reptile",
  LANDSCAPING: "Landscaping",
  TAXIDERMY: "Taxidermy",
  SCULPTURAL_RELICS: "Sculptural Relics",
  NANO_RANDOM: "Reptile"
};

function getPublicClient() {
  const env = getSupabaseEnv();
  return env ? createPublicSupabaseClient(env.url, env.anonKey, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
}

function fromProduct(row: ProductRow): InventoryItem {
  const dimensions = row.dimensions || {};
  const sector = categoryToSector[row.category];
  const imageMedia = (row.product_media || []).filter((media) => media.type === "image" && !media.is_private).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  const videoMedia = (row.product_media || []).find((media) => media.type === "video" && !media.is_private);
  const media = imageMedia.map((item) => item.url);
  const image = row.hero_image_url || media[0] || "/assets/images/deadwood-hero.png";

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    sector,
    sectors: [sector],
    sizeClass: (typeof dimensions.size === "string" ? dimensions.size : typeof dimensions.sizeClass === "string" ? dimensions.sizeClass : undefined) as InventoryItem["sizeClass"],
    price: Math.round(row.price_cents / 100),
    status: row.inventory_status === "ready_for_review" || row.inventory_status === "reserved"
      ? "draft"
      : row.inventory_status,
    availability: row.inventory_status === "published" ? "Available" : row.inventory_status,
    dimensions: [dimensions.length, dimensions.width, dimensions.height].filter(Boolean).join(" x "),
    weight: dimensions.weight ? String(dimensions.weight) : "",
    image,
    featured: row.is_featured_global,
    vault: row.category === "SCULPTURAL_RELICS",
    hasVideo: Boolean(videoMedia),
    gpsAvailable: false,
    description: row.description,
    provenance: row.story || "",
    bioSanctity: row.treatment_details || "",
    bestFor: "",
    media,
    videoUrl: videoMedia?.url
  };
}

export async function getPublishedInventory() {
  const supabase = getPublicClient();
  if (!supabase) {
    return inventoryItems.filter((item) => item.status === "published");
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("inventory_status", "published")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  const products = data as ProductRow[];
  const media = await getPublicMedia(products.map((product) => product.id));
  return products.map((product) => fromProduct({ ...product, product_media: media.filter((item) => item.product_id === product.id) }));
}

export async function getFeaturedInventory() {
  return (await getPublishedInventory()).filter((item) => item.featured).slice(0, 3);
}

export async function getVaultInventory() {
  return (await getPublishedInventory()).filter((item) => item.vault);
}

export async function getInventoryBySector(sector: Sector) {
  return (await getPublishedInventory()).filter((item) =>
    item.sectors.some((itemSector) => sector.aliases.includes(itemSector))
  );
}

export async function getInventoryBySlug(slug: string) {
  const supabase = getPublicClient();
  if (!supabase) {
    return inventoryItems.find((item) => item.slug === slug);
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("inventory_status", "published")
    .maybeSingle();

  if (error || !data) {
    return undefined;
  }

  const media = await getPublicMedia([(data as ProductRow).id]);
  return fromProduct({ ...(data as ProductRow), product_media: media });
}

async function getPublicMedia(productIds: string[]) {
  const supabase = getPublicClient();
  if (!supabase || productIds.length === 0) return [];
  const { data } = await supabase.from("product_media").select("product_id, type, url, is_private, sort_order").in("product_id", productIds).eq("is_private", false).order("sort_order", { ascending: true });
  return (data || []) as Array<{ product_id: string; type: "image" | "video"; url: string; is_private: boolean; sort_order?: number }>;
}

export function getSectorBySlug(slug: string) {
  return getMockSectorBySlug(slug);
}

export const sectors = mockSectors;
