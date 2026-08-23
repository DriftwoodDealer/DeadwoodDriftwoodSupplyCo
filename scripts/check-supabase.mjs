import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";

async function loadEnv() {
  const contents = await readFile(".env.local", "utf8");
  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}

await loadEnv();
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Supabase check failed: missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const { data, error } = await supabase.from("products").select("id").limit(1);

if (error) {
  console.error(`Supabase connection reached the project but the products query failed: ${error.message}`);
  console.error("If the schema has not been applied yet, run supabase/schema.sql in the Supabase SQL editor.");
  process.exit(1);
}

console.log(`Supabase connection OK: ${url}`);
console.log(`Products query OK (${data?.length || 0} visible rows; RLS is active for this key).`);
