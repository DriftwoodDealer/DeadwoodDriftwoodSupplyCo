"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const productSchema = z.object({
  id: z.string().uuid().optional().or(z.literal("")), sku: z.string().trim().min(1), title: z.string().trim().min(1), slug: z.string().trim().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), category: z.enum(["REPTILE", "LANDSCAPING", "TAXIDERMY", "SCULPTURAL_RELICS", "NANO_RANDOM"]), story: z.string().trim().optional(), description: z.string().trim().min(1), length: z.string().trim().optional(), width: z.string().trim().optional(), height: z.string().trim().optional(), weight: z.string().trim().optional(), size: z.string().trim().optional(), woodType: z.string().trim().optional(), treatmentDetails: z.string().trim().optional(), price: z.coerce.number().min(0), inventoryStatus: z.enum(["draft", "ready_for_review", "published", "reserved", "sold", "archived"]), isFeaturedGlobal: z.string().optional(), isFeaturedCategory: z.string().optional(), featuredCategoryTarget: z.string().optional()
});

async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  return profile?.role === "admin" ? { supabase, user } : null;
}

export async function saveProduct(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth) return { error: "Admin authentication is required." };
  const parsed = productSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message || "Check the listing fields." };
  const values = parsed.data;
  const productId = values.id || undefined;
  const { data: product, error } = await auth.supabase.from("products").upsert({ ...(productId ? { id: productId } : {}), sku: values.sku, title: values.title, slug: values.slug, category: values.category, story: values.story || null, description: values.description, dimensions: { length: values.length, width: values.width, height: values.height, weight: values.weight, size: values.size || null }, wood_type: values.woodType || null, treatment_details: values.treatmentDetails || null, price_cents: Math.round(values.price * 100), inventory_status: values.inventoryStatus, is_featured_global: values.isFeaturedGlobal === "on", is_featured_category: values.isFeaturedCategory === "on", featured_category_target: values.featuredCategoryTarget || null, published_at: values.inventoryStatus === "published" ? new Date().toISOString() : null, updated_by: auth.user.id, ...(productId ? {} : { created_by: auth.user.id }) }, { onConflict: "id" }).select("id").single();
  if (error || !product) return { error: error?.message || "Could not save the listing." };

  const images = formData.getAll("images").filter((file): file is File => file instanceof File && file.size > 0);
  const video = formData.get("video");
  const mediaFiles = [...images, ...(video instanceof File && video.size > 0 ? [video] : [])];
  if (mediaFiles.length > 0) {
    const bucket = values.inventoryStatus === "published" ? "product-media-public" : "product-media-private";
    let heroImageUrl: string | null = null;
    for (const [index, media] of mediaFiles.entries()) {
      const safeName = media.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const storagePath = `products/${product.id}/${String(index + 1).padStart(2, "0")}-${safeName}`;
      const upload = await auth.supabase.storage.from(bucket).upload(storagePath, media, { upsert: true, contentType: media.type });
      if (upload.error) return { error: upload.error.message };
      const publicUrl = bucket === "product-media-public" ? auth.supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl : null;
      if (index === 0 && media.type.startsWith("image/")) heroImageUrl = publicUrl;
      await auth.supabase.from("product_media").insert({ product_id: product.id, type: media.type.startsWith("video/") ? "video" : "image", url: publicUrl || storagePath, storage_path: storagePath, sort_order: index, is_private: bucket === "product-media-private", alt_text: values.title });
    }
    await auth.supabase.from("products").update({ hero_image_url: heroImageUrl, updated_by: auth.user.id }).eq("id", product.id);
  }
  revalidatePath("/shop"); revalidatePath(`/shop/${values.slug}`); revalidatePath("/admin");
  return { success: true, id: product.id };
}

export async function deleteProduct(id: string) {
  const auth = await requireAdmin();
  if (!auth) return { error: "Admin authentication is required." };
  const parsed = z.string().uuid().safeParse(id);
  if (!parsed.success) return { error: "Invalid product id." };
  const { error } = await auth.supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/shop"); revalidatePath("/admin");
  return { success: true };
}
