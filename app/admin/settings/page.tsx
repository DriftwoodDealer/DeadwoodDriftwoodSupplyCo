import Link from "next/link";
import { inventoryStatusOptions } from "@/lib/cms-spec";

const accessCards = [
  {
    title: "Supabase",
    detail: "Project URL, auth, row-level security, and inventory tables."
  },
  {
    title: "Cloudinary",
    detail: "Optional media layer for heavier upload and delivery workflows."
  },
  {
    title: "Commerce mode",
    detail: "Inquiry-first now, payments later if the business model needs it."
  },
  {
    title: "Permissions",
    detail: "Owner, admin, editor, media, and read-only access buckets."
  }
];

export default function AdminSettingsPage() {
  return (
    <section className="page-shell admin-shell-root">
      <div className="settings-shell">
        <div className="settings-hero cms-panel">
          <div>
            <p className="eyebrow">Admin Settings</p>
            <h1 className="section-heading">Access, API, and publishing controls.</h1>
            <p className="section-copy">
              This is where the front-end CMS will eventually connect to Supabase, media
              storage, and role-based access.
            </p>
          </div>
          <Link className="button primary" href="/admin/cms">
            Back to CMS
          </Link>
        </div>

        <div className="settings-grid">
          {accessCards.map((card) => (
            <article key={card.title} className="settings-card cms-panel">
              <p className="eyebrow">{card.title}</p>
              <p>{card.detail}</p>
            </article>
          ))}
        </div>

        <div className="settings-panel cms-panel">
          <div className="section-bar">
            <div>
              <p className="eyebrow">Publishing States</p>
              <h2 className="product-title">The current FE model already expects these.</h2>
            </div>
          </div>
          <div className="chip-group">
            {inventoryStatusOptions.map((option) => (
              <span key={option.value} className="chip">
                {option.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
