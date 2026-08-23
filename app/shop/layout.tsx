export default function ShopLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return <>{children}{modal}</>;
}
