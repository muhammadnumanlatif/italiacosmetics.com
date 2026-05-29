import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-shell">
      <div className="container-xl">
        <div className="row g-5 pb-5">
          {/* ─ Brand Column ─ */}
          <div className="footer-brand-col col-12 col-lg-4">
            <div className="footer-logo">
              <span className="footer-logo-icon">✨</span>
              <h3 className="footer-logo-text">Italia Cosmetics</h3>
            </div>
            <p className="footer-brand-desc">
              Pioneering the renaissance of professional Italian hair care across Pakistan. Experience the authentic touch of Milanese luxury in every drop.
            </p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/italiacosmeticslahore/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/italiacosmeticsofficial" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@italiacosmeticsofficial" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="TikTok">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.48-5.56-.03-2.11 1.13-4.2 3.05-5.26 1.25-.69 2.71-.9 4.1-.73v4.06c-.66-.17-1.36-.18-2.02.04-.66.21-1.21.69-1.54 1.28-.42.75-.43 1.72-.05 2.48.33.68.96 1.18 1.7 1.35.81.18 1.68.04 2.37-.41.67-.44 1.12-1.14 1.23-1.93.06-.44.05-.88.05-1.32.02-6.52.01-13.04.01-19.56H12.53z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ─ Brand Pillars ─ */}
          <div className="footer-links-col">
            <div className="footer-col-header">
              <span className="footer-col-icon">✨</span>
              <h4 className="footer-col-title">The Collections</h4>
            </div>
            <div className="footer-card-links">
              {[
                { label: "VERSUM 2.0", icon: "💧", href: "#", sub: "Premium Softening & Radiance" },
                { label: "GENUS",      icon: "💎", href: "#", sub: "Advanced Technical Care" },
                { label: "MAXY LOOK",  icon: "🎨", href: "#", sub: "Color Brilliance & Defense" },
                { label: "UNA",        icon: "🌿", href: "#", sub: "Energizing Botanical Balance" },
              ].map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="footer-card-link"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="footer-card-link-icon">{item.icon}</span>
                  <span className="footer-card-link-body">
                    <span className="footer-card-link-label">{item.label}</span>
                    <span className="footer-card-link-sub">{item.sub}</span>
                  </span>
                  <svg className="footer-card-link-arrow" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ─ About the Brand ─ */}
          <div className="footer-links-col">
            <div className="footer-col-header">
              <span className="footer-col-icon">🌿</span>
              <h4 className="footer-col-title">About the Brand</h4>
            </div>
            <div className="footer-card-links">
              {[
                { label: "Our Sourcing Heritage",       icon: "🇮🇹", href: "#story",       sub: "Tuscan Roots" },
                { label: "Botanical Ingredients",       icon: "🌾", href: "#ingredients", sub: "Pure Active Botanicals" },
                { label: "Hair Care Analysis Quiz",     icon: "🔬", href: "#quiz",        sub: "Find Your Ritual" },
                { label: "Sustainability Guarantee",    icon: "♻️", href: "#",            sub: "Zero-waste Ethos" },
              ].map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="footer-card-link"
                  style={{ animationDelay: `${i * 80 + 40}ms` }}
                >
                  <span className="footer-card-link-icon">{item.icon}</span>
                  <span className="footer-card-link-body">
                    <span className="footer-card-link-label">{item.label}</span>
                    <span className="footer-card-link-sub">{item.sub}</span>
                  </span>
                  <svg className="footer-card-link-arrow" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ─ Customer Care ─ */}
          <div className="footer-links-col">
            <div className="footer-col-header">
              <span className="footer-col-icon">💬</span>
              <h4 className="footer-col-title">Customer Care</h4>
            </div>
            <div className="footer-card-links">
              {[
                { label: "Contact Our Concierge",       icon: "📞", href: "/contact", sub: "Mon–Sat 9am–7pm CET" },
                { label: "Shipping & Returns",           icon: "📦", href: "/shipping-returns", sub: "Free above ₨5,000" },
                { label: "Frequently Asked Questions",   icon: "❓", href: "/faq", sub: "Quick Answers" },
                { label: "Privacy & Cookie Policy",      icon: "🔒", href: "/privacy-policy", sub: "Your Data, Protected" },
              ].map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="footer-card-link"
                  style={{ animationDelay: `${i * 80 + 80}ms` }}
                >
                  <span className="footer-card-link-icon">{item.icon}</span>
                  <span className="footer-card-link-body">
                    <span className="footer-card-link-label">{item.label}</span>
                    <span className="footer-card-link-sub">{item.sub}</span>
                  </span>
                  <svg className="footer-card-link-arrow" width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* ── Gold divider ── */}
        <div className="footer-gold-divider" aria-hidden="true"/>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom-bar">
          {/* Trust badges */}
          <div className="footer-trust-badges">
            {[
              { icon: "🛡", label: "Secure Checkout" },
              { icon: "🌱", label: "100% Organic" },
              { icon: "🐰", label: "Cruelty Free" },
              { icon: "🇮🇹", label: "Made in Italy" },
            ].map(b => (
              <div key={b.label} className="footer-trust-badge">
                <span className="footer-trust-badge-icon">{b.icon}</span>
                <span>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <p className="footer-copyright">
            © {new Date().getFullYear()} Italia Cosmetics S.r.l. · <em>L&apos;Arte Della Bellezza</em>
          </p>
        </div>

      </div>
    </footer>
  );
}
