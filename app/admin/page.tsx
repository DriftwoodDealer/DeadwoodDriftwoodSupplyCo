import Link from "next/link";
import { inventoryItems } from "@/lib/mock-inventory";

export default function AdminPage() {
  const published = inventoryItems.filter((item) => item.status === "published").length;
  const drafts = inventoryItems.filter((item) => item.status === "draft").length;
  const total = inventoryItems.length;

  return (
    <section className="page-shell admin-shell-root">
      <div className="admin-entry glass-panel">
        <div className="admin-entry-copy">
          <p className="eyebrow">Admin Sign-In</p>
          <h1 className="section-heading">Enter the front-end CMS.</h1>
          <p className="section-copy">
            This is the access hub. The real auth layer will eventually sit in front of this
            route, but the UX path is already set up for admin-first editing on desktop or
            phone.
          </p>
        </div>

        <div className="admin-entry-actions">
          <Link className="button primary" href="/admin/cms">
            Sign in as admin
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
          <h2>Inventory composer</h2>
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
