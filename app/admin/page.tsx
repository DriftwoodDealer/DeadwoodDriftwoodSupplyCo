import Link from "next/link";
import { getAdminProducts } from "@/lib/admin-data";

export default async function AdminPage() {
  const products = await getAdminProducts();
  const published = products.filter((item) => item.status === "published").length;
  const drafts = products.filter((item) => ["draft", "ready_for_review"].includes(item.status)).length;
  const total = products.length;

  return (
    <section className="page-shell admin-shell-root">
      <div className="admin-entry glass-panel">
        <div className="admin-entry-copy">
          <p className="eyebrow">Admin Sign-In</p>
          <h1 className="section-heading">Enter Deadwood CMS.</h1>
          <p className="section-copy">
            This is the access hub for the protected workspace. Published inventory remains
            separate from private drafts.
          </p>
        </div>

        <div className="admin-entry-actions">
          <Link className="button primary" href="/admin/cms">
            Open Deadwood CMS
          </Link>
          <Link className="button" href="/admin/cms">
            Go to CMS
          </Link>
        </div>

        <div className="admin-entry-metrics">
          <div className="metric-card">
            <span>Total items</span>
            <strong>{total}</strong>
          </div>
          <div className="metric-card">
            <span>Published</span>
            <strong>{published}</strong>
          </div>
          <div className="metric-card">
            <span>Drafts</span>
            <strong>{drafts}</strong>
          </div>
        </div>
      </div>

      <div className="admin-link-grid">
        <Link className="admin-launch glass-panel" href="/admin/cms">
          <p className="eyebrow">CMS</p>
          <h2>Deadwood Listings</h2>
          <p>Create and edit listings, media, provenance, and publishing states.</p>
        </Link>
        <Link className="admin-launch glass-panel" href="/admin/settings">
          <p className="eyebrow">Settings</p>
          <h2>Access and APIs</h2>
          <p>Map roles, permissions, connection status, and future backend services.</p>
        </Link>
        <Link className="admin-launch glass-panel" href="/shop">
          <p className="eyebrow">Storefront</p>
          <h2>Preview public inventory</h2>
          <p>Jump back to the public shop without leaving the front-end flow.</p>
        </Link>
      </div>
    </section>
  );
}
