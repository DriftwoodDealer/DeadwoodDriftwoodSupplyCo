import Link from "next/link";
import { getAdminProducts } from "@/lib/admin-data";

export default async function AdminInventoryPage() {
  const inventoryItems = await getAdminProducts();
  return (
    <section className="page-shell admin-shell-root">
      <div className="inventory-hub cms-panel">
        <div className="split-intro compact">
          <div>
            <p className="eyebrow">Inventory</p>
            <h1 className="section-heading">Listings ready for the composer.</h1>
          </div>
          <p className="section-copy">
            This view stays focused on operations. The actual editing surface lives in the CMS
            workbench, but this page gives you a fast inventory scan.
          </p>
        </div>

        <div className="inventory-hub-actions">
          <Link className="button primary" href="/admin/cms">
            Open composer
          </Link>
          <Link className="button" href="/admin/settings">
            Access settings
          </Link>
        </div>

        <div className="inventory-list">
          {inventoryItems.map((item) => (
            <article key={item.id} className="inventory-row">
              <div>
                <p className="eyebrow">{item.category}</p>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
              <div className="inventory-row-meta">
                <span>{item.sku}</span>
                <span>{item.status}</span>
                <span>${(item.priceCents / 100).toLocaleString()}</span>
                <Link className="button" href="/admin/cms">
                  Edit
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
