"use client";

import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  async function signOut() {
    const supabase = createClient();
    await supabase?.auth.signOut();
    window.location.assign("/");
  }

  return <button className="admin-sign-out" type="button" onClick={signOut}>Sign out</button>;
}
