import Image from "next/image";
import Link from "next/link";
import type { InventoryItem } from "@/lib/mock-inventory";
import { StatusPill } from "@/components/ui/status-pill";

type ProductCardProps = {
  item: InventoryItem;
};

export function ProductCard({ item }: ProductCardProps) {
  return (
    <Link className="product-card glass-panel" href={`/shop/${item.slug}`}>
      <div className="product-media">
        <Image src={item.image} alt={item.title} width={900} height={675} />
      </div>
      <div className="product-body">
        <span className="product-kicker">{item.sector}</span>
        <h2 className="product-title">{item.title}</h2>
        <p className="product-description">{item.description}</p>
        <div className="product-meta">
          <StatusPill status={item.sizeClass} />
          <StatusPill status={item.availability} />
          <StatusPill status={item.dimensions} />
        </div>
        <p className="product-description">{item.bestFor}</p>
        <strong className="price">${item.price.toLocaleString()}</strong>
      </div>
    </Link>
  );
}
