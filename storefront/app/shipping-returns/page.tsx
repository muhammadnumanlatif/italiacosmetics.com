import Link from "next/link";
import Image from "next/image";
import StaticHeader from "../../components/StaticHeader";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Shipping & Returns | Italia Cosmetics",
  description: "Information about shipping and returns in Pakistan.",
};

export default function ShippingReturnsPage() {
  return (
    <div className="min-vh-100 bg-[#FAF7F2] d-flex flex-column">
      <StaticHeader />

      <main className="container-xl py-5 flex-grow-1">
        <div className="max-w-3xl mx-auto bg-white rounded-4 shadow-sm border border-zinc-100 p-4 p-md-5">
          <h1 className="font-serif text-3xl md:text-4xl text-zinc-900 mb-5 text-center">Shipping & Returns</h1>
          
          <div className="d-flex flex-column gap-5 text-zinc-700 font-light leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="font-serif text-2xl text-[#C9A84C] mb-3">Delivery Options</h2>
              <p className="mb-3">We proudly offer nationwide delivery across Pakistan. All orders are dispatched from our central warehouse in Lahore.</p>
              <ul className="list-unstyled d-flex flex-column gap-3">
                <li className="d-flex align-items-center gap-3 bg-[#FAF7F2] p-3 rounded-3">
                  <span className="text-2xl">📦</span>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 mb-1">Standard Delivery</h4>
                    <p className="m-0 text-sm">3–5 working days. Free on orders above ₨ 5,000.</p>
                  </div>
                </li>
                <li className="d-flex align-items-center gap-3 bg-[#FAF7F2] p-3 rounded-3">
                  <span className="text-2xl">💸</span>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 mb-1">Cash On Delivery (COD)</h4>
                    <p className="m-0 text-sm">Available for all locations in Pakistan without any hidden fees.</p>
                  </div>
                </li>
              </ul>
            </section>

            <div className="w-100 h-[1px] bg-zinc-100"></div>

            <section>
              <h2 className="font-serif text-2xl text-[#C9A84C] mb-3">Returns & Exchanges</h2>
              <p className="mb-3">Your satisfaction is our priority. If you are not completely satisfied with your purchase, we accept returns within 7 days of delivery.</p>
              <h5 className="font-bold text-zinc-900 text-sm mt-4 mb-2">Conditions for Return:</h5>
              <ul className="ps-4 mb-4">
                <li className="mb-2">Products must be unused, sealed, and in their original packaging.</li>
                <li className="mb-2">The original invoice must be included with the return.</li>
                <li className="mb-2">Promotional or discounted items are non-refundable.</li>
              </ul>
              <div className="bg-[#1A1A1A] text-white p-4 rounded-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
                <p className="m-0 text-sm">Need to initiate a return?</p>
                <Link href="/contact" className="px-5 py-2.5 bg-[#C9A84C] text-white text-[10px] font-bold uppercase tracking-widest rounded-pill hover:bg-white hover:text-[#1A1A1A] transition-colors text-decoration-none shadow-sm">
                  Contact Support
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
