import Link from "next/link";
import Image from "next/image";
import StaticHeader from "../../components/StaticHeader";
import Footer from "../../components/Footer";

export const metadata = {
  title: "FAQ | Italia Cosmetics",
  description: "Frequently Asked Questions about our premium Italian cosmetics.",
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Are your products truly imported from Italy?",
      a: "Yes. All our brands (VERSUM 2.0, GENUS, MAXY LOOK, UNA) are authentically formulated, manufactured, and packaged in Italy. We import them directly to our central facility in Lahore to distribute across Pakistan."
    },
    {
      q: "Do you offer Cash on Delivery (COD)?",
      a: "Absolutely. We offer Cash on Delivery across all major cities and towns in Pakistan. You can pay securely in cash when the courier delivers your package."
    },
    {
      q: "How much is delivery?",
      a: "Delivery is completely free on all orders exceeding ₨ 5,000. For orders below this amount, a standard flat shipping rate applies."
    },
    {
      q: "Are the products cruelty-free?",
      a: "The majority of our premium Italian formulations are cruelty-free and heavily rely on natural botanical extracts. Please check individual product descriptions for specific certifications."
    },
    {
      q: "Can I get product recommendations for my hair type?",
      a: "Of course! Our beauty concierge is available to provide tailored advice. Please reach out to us via WhatsApp at 0092 337 9912300 or email us at support@italiacosmetics.com."
    }
  ];

  return (
    <div className="min-vh-100 bg-[#FAF7F2] d-flex flex-column">
      <StaticHeader />

      <main className="container-xl py-5 flex-grow-1">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-5">
            <h1 className="font-serif text-3xl md:text-4xl text-zinc-900 mb-3">Frequently Asked Questions</h1>
            <p className="text-zinc-500 font-light max-w-lg mx-auto">Everything you need to know about our products, sourcing, and delivery.</p>
          </div>
          
          <div className="d-flex flex-column gap-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-4 shadow-sm border border-zinc-100 p-4 p-md-5 hover:border-[#C9A84C]/30 transition-colors">
                <h3 className="font-serif text-xl text-[#1A1A1A] mb-3 d-flex align-items-start gap-3">
                  <span className="text-[#C9A84C] text-2xl line-height-1">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-zinc-600 font-light leading-relaxed ms-5 m-0 text-sm md:text-base">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <p className="text-zinc-500 text-sm mb-3">Still have questions?</p>
            <Link href="/contact" className="px-6 py-3 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest rounded-pill hover:bg-[#C9A84C] transition-colors text-decoration-none shadow-sm d-inline-block">
              Contact Our Team
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
