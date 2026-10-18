"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const reviewSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "reviewing", "approved", "declined"]),
});

export async function updateWholesaleApplication(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) return;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") return;

  const parsed = reviewSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) return;

  await supabase
    .from("wholesale_applications")
    .update({ review_status: parsed.data.status, updated_at: new Date().toISOString() })
    .eq("id", parsed.data.id);
  revalidatePath("/admin/wholesale");
}
