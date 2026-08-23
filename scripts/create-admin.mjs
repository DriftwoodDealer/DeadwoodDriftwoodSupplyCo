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
const [email, password] = process.argv.slice(2);
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!email || !password || !url || !secret) {
  console.error("Usage: node scripts/create-admin.mjs you@email.com yourpassword");
  process.exit(1);
}

const supabase = createClient(url, secret, { auth: { persistSession: false, autoRefreshToken: false } });
let user;
const created = await supabase.auth.admin.createUser({ email, password, email_confirm: true });

if (created.data.user) {
  user = created.data.user;
  console.log(`✓ Created confirmed Auth user: ${email}`);
} else if (/already registered|already exists/i.test(created.error?.message || "")) {
  const listed = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  user = listed.data.users.find((candidate) => candidate.email?.toLowerCase() === email.toLowerCase());
  if (!user) {
    console.error(`Auth user exists but could not be found in the first 1000 users: ${email}`);
    process.exit(1);
  }
  console.log(`✓ Existing Auth user found: ${email}`);
} else {
  console.error(`Could not create Auth user: ${created.error?.message || "unknown error"}`);
  process.exit(1);
}

const { error } = await supabase.from("profiles").upsert({ id: user.id, email, role: "admin" }, { onConflict: "id" });
if (error) {
  console.error(`Auth user exists, but the admin profile could not be created: ${error.message}`);
  console.error("Run supabase/schema.sql first if the profiles table does not exist.");
  process.exit(1);
}

console.log(`✓ Admin profile ensured for ${email}`);
