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
const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
const schema = await readFile("supabase/schema.sql", "utf8");

if (!url || !secret) {
  console.error("Setup failed: missing Supabase URL or SUPABASE_SERVICE_ROLE_KEY in .env.local.");
  process.exit(1);
}

const supabase = createClient(url, secret, { auth: { persistSession: false, autoRefreshToken: false } });
console.log(`Connecting to ${url} with the server-only secret key…`);

const { data: buckets, error: bucketListError } = await supabase.storage.listBuckets();
if (bucketListError) {
  console.error(`Storage inspection failed: ${bucketListError.message}`);
  process.exit(1);
}

for (const bucket of [
  { id: "product-media-public", public: true },
  { id: "product-media-private", public: false }
]) {
  if (buckets?.some((existing) => existing.id === bucket.id)) {
    console.log(`✓ Storage bucket already exists: ${bucket.id}`);
    continue;
  }
  const { error } = await supabase.storage.createBucket(bucket.id, { public: bucket.public });
  if (error && !/already exists/i.test(error.message)) {
    console.error(`✗ Could not create bucket ${bucket.id}: ${error.message}`);
    process.exit(1);
  }
  console.log(`✓ Storage bucket ensured: ${bucket.id}`);
}

const { error: productsError } = await supabase.from("products").select("id").limit(1);
if (!productsError) {
  console.log("✓ Products table: exists");
} else {
  console.warn(`! Products table is not ready: ${productsError.message}`);
  const { error: rpcError } = await supabase.rpc("exec_sql", { sql: schema });
  if (!rpcError) {
    console.log("✓ Schema SQL executed through exec_sql RPC.");
  } else {
    console.warn(`! Schema RPC was not available: ${rpcError.message}`);
    console.warn("  Supabase does not expose arbitrary SQL execution through the client by default.");
    console.warn("  Run supabase/schema.sql once in Dashboard → SQL Editor, then rerun npm run supabase:setup.");
  }
}

console.log("Setup automation complete.");
console.log("Next manual step: Create admin user in Dashboard → Auth → Users, or run npm run supabase:create-admin -- you@email.com yourpassword.");
