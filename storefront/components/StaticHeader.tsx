import Link from "next/link";
import Image from "next/image";

export default function StaticHeader() {
  return (
    <>
      {/* ──── ANNOUNCEMENT BAR ──── */}
      <div className="navbar-announce-bar" aria-label="Promotions">
        <div className="navbar-announce-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="navbar-announce-segment text-uppercase">
              <span className="navbar-announce-dot">✦</span>
              FREE DELIVERY ON ORDERS ABOVE Rs5,000
              <span className="navbar-announce-sep">·</span>
              AUTHENTIC ITALIAN PRODUCTS — IMPORTED TO LAHORE
              <span className="navbar-announce-sep">·</span>
              COD AVAILABLE ACROSS PAKISTAN
            </span>
          ))}
        </div>
      </div>

      {/* ──── NAVBAR ──── */}
      <header className="navbar-shell sticky-top border-bottom border-[#C9A84C]/20 bg-[#FAF7F2]/90 backdrop-blur-md">
        <div className="container-xl py-3 d-flex justify-content-between align-items-center position-relative h-[72px]">

          <Link href="/" className="d-none d-md-flex align-items-center gap-2 text-[#7A7060] hover:text-[#C9A84C] transition-colors text-decoration-none text-sm font-semibold tracking-wider uppercase z-10">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Return to Store
          </Link>

          {/* Absolute Center Logo */}
          <Link href="/" className="position-absolute start-50 top-50 translate-middle">
            <Image src="/logo.svg" alt="Italia Cosmetics" width={160} height={45} priority className="object-contain hover:scale-105 transition-transform" />
          </Link>

          <Link href="/contact" className="d-none d-md-flex align-items-center gap-2 text-[#7A7060] hover:text-[#C9A84C] transition-colors text-decoration-none text-sm font-semibold tracking-wider uppercase z-10">
            Concierge
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </Link>

        </div>
      </header>
    </>
  );
}
