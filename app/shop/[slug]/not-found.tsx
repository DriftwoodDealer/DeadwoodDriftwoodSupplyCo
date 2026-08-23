import Link from "next/link";

export default function ProductNotFound() {
  return <section className="page-shell not-found"><div className="detail-panel glass-panel"><p className="eyebrow">Not Found</p><h1 className="section-heading">This piece is not public.</h1><p className="section-copy">It may still be a draft, sold, archived, or private gallery inventory.</p><div className="button-row" style={{ justifyContent: "center" }}><Link className="button primary" href="/shop">Back to Shop</Link></div></div></section>;
}
