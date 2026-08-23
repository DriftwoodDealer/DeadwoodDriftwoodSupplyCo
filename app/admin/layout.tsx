import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();

  if (!supabase) {
    redirect("/login?next=/admin");
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login?next=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    redirect("/?error=admin_required");
  }

  return (
    <div className="admin-layout">
      <header className="admin-toolbar">
        <div>
          <p className="eyebrow">Private Archive</p>
          <strong>{profile.full_name || user.email || "Admin"}</strong>
        </div>
        <nav aria-label="Admin navigation">
          <Link href="/admin">Overview</Link>
          <Link href="/admin/inventory">Inventory</Link>
          <Link href="/admin/cms">Composer</Link>
          <Link href="/admin/settings">Settings</Link>
          <SignOutButton />
        </nav>
      </header>
      {children}
    </div>
  );
}
