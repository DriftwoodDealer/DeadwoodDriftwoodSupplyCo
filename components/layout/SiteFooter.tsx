import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="home-footer" aria-label="Site footer">
      <Link
        className="home-footer-home"
        href="/"
        aria-label="DEADWOOD — Back to homepage"
      />
      <div className="home-footer-content">
        <div className="home-footer-brand">DEADWOOD: DRIFTWOOD SUPPLY CO. LLC</div>
        <a
          className="home-footer-email"
          href="mailto:deadwooddriftwood@gmail.com"
          aria-label="Email Deadwood Driftwood Supply Co."
        >
          Email us
        </a>
        <nav className="home-footer-links" aria-label="Footer navigation">
          <Link href="/terms">Terms</Link>
          <span aria-hidden="true">|</span>
          <Link href="/privacy">Privacy</Link>
          <span aria-hidden="true">|</span>
          <Link href="/shipping">Shipping</Link>
          <span aria-hidden="true">|</span>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="home-footer-rights">
          © {new Date().getFullYear()} DEADWOOD. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
