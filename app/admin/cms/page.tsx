import { AdminWorkbench } from "@/components/portal/admin-workbench";
import { getAdminProducts } from "@/lib/admin-data";

export default async function AdminCmsPage() {
  const products = await getAdminProducts();
  return (
    <section className="page-shell admin-shell-root">
      <AdminWorkbench products={products} />
    </section>
  );
}
