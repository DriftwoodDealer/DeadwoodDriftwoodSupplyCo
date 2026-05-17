import Link from "next/link";
import { inventoryItems } from "@/lib/mock-inventory";

export default function AdminPage() {
  const published = inventoryItems.filter((item) => item.status === "published").length;
  const drafts = inventoryItems.filter((item) => item.status === "draft").length;
  const total = inventoryItems.length;

  return (
    <section className="page-shell">
      <div className="split-intro">
        <div>
          <p className="eyebrow">Phase 1 Admin Placeholder</p>
          <h1 className="section-heading">DEADWOOD Admin OS</h1>
        </div>
        <p className="section-copy">
          This shell proves the route structure and admin visual direction. Phase 2 adds
          Supabase auth, protected access, database-backed inventory, and role checks.
        </p>
      </div>

      <div className="admin-shell">
        <aside className="admin-sidebar glass-panel">
          <nav aria-label="Admin navigation">
            <Link href="/admin">Dashboard</Link>
            <Link href="/shop">Inventory Preview</Link>
            <Link href="/admin/settings">Settings</Link>
          </nav>
        </aside>

        <div className="admin-panel glass-panel">
          <p className="eyebrow">Mock Data</p>
          <h2 className="product-title">Operations Snapshot</h2>
          <div className="admin-grid">
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
          <ul className="muted-list">
            <li>Inventory composer arrives in Phase 2.</li>
            <li>Media uploads and field publishing arrive in Phase 3.</li>
            <li>Permissions and API controls arrive in Phase 4.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
