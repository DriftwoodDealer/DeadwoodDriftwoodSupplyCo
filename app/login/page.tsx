import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <section className="page-shell auth-shell">
      <div className="auth-card glass-panel">
        <p className="eyebrow">Deadwood Admin</p>
        <h1 className="section-heading">Enter the private archive.</h1>
        <p className="section-copy">
          Admin access is restricted to approved accounts. Storefront visitors never need to
          sign in to browse published pieces.
        </p>
        <Suspense fallback={<p className="section-copy">Loading sign-in…</p>}><LoginForm /></Suspense>
      </div>
    </section>
  );
}
