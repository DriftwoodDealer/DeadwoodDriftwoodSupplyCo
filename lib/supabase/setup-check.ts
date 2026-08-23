import { createClient } from "@supabase/supabase-js";

export async function checkSupabaseConnection(): Promise<{ connected: boolean; error?: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return { connected: false, error: "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing." };
  }

  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await supabase.from("products").select("id").limit(1);

  return error ? { connected: false, error: error.message } : { connected: true };
}
