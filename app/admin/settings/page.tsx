export default function AdminSettingsPage() {
  return (
    <section className="page-shell">
      <div className="detail-panel glass-panel">
        <p className="eyebrow">Phase 1 Settings Placeholder</p>
        <h1 className="section-heading">Admin Settings</h1>
        <p className="section-copy">
          This page reserves the backend settings area for access control, API status,
          store configuration, and future service connections.
        </p>
        <ul className="muted-list">
          <li>Supabase project status</li>
          <li>Cloudinary media connection</li>
          <li>Stripe or inquiry-mode commerce setting</li>
          <li>Role and permission management</li>
        </ul>
      </div>
    </section>
  );
}
