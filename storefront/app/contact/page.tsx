import Link from "next/link";
import Image from "next/image";
import StaticHeader from "../../components/StaticHeader";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Contact Our Concierge | Italia Cosmetics",
  description: "Get in touch with Italia Cosmetics for premium support.",
};

export default function ContactPage() {
  return (
    <div className="min-vh-100 bg-[#FAF7F2] d-flex flex-column">
      <StaticHeader />

      <main className="container-xl py-5 flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="max-w-4xl w-100 mx-auto bg-white rounded-5 shadow-sm border border-zinc-100 overflow-hidden d-flex flex-column flex-md-row">
          
          {/* Left Info Panel */}
          <div className="col-12 col-md-5 bg-[#1A1A1A] text-white p-5 d-flex flex-column justify-content-between position-relative overflow-hidden">
            <div className="position-absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] z-0" />
            <div className="position-relative z-10">
              <h1 className="font-serif text-3xl mb-2 text-[#C9A84C]">Contact Us</h1>
              <p className="text-zinc-400 text-sm font-light mb-5 leading-relaxed">Our beauty concierges are available to assist you with product recommendations, order tracking, and general inquiries.</p>
              
              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-start gap-3">
                  <span className="text-[#C9A84C] mt-1">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </span>
                  <div>
                    <h3 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1">Phone / WhatsApp</h3>
                    <a href="tel:00923379912300" className="text-lg font-serif text-white text-decoration-none hover:text-[#C9A84C] transition-colors">0092 337 9912300</a>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <span className="text-[#C9A84C] mt-1">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </span>
                  <div>
                    <h3 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1">Email</h3>
                    <a href="mailto:support@italiacosmetics.com" className="text-base text-white text-decoration-none hover:text-[#C9A84C] transition-colors">support@italiacosmetics.com</a>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <span className="text-[#C9A84C] mt-1">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </span>
                  <div>
                    <h3 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-1">Hours of Operation</h3>
                    <p className="text-base text-zinc-300 m-0">Mon – Sat, 9:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="col-12 col-md-7 p-5 bg-white">
            <h2 className="font-serif text-2xl text-zinc-900 mb-4">Send us a Message</h2>
            <form className="d-flex flex-column gap-4" action="#">
              <div className="row g-4">
                <div className="col-12 col-sm-6">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">First Name</label>
                  <input type="text" className="w-100 bg-[#FAF7F2] border-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 text-sm text-zinc-800" placeholder="Jane" required />
                </div>
                <div className="col-12 col-sm-6">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Last Name</label>
                  <input type="text" className="w-100 bg-[#FAF7F2] border-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 text-sm text-zinc-800" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
                <input type="email" className="w-100 bg-[#FAF7F2] border-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 text-sm text-zinc-800" placeholder="jane@example.com" required />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Message</label>
                <textarea rows={4} className="w-100 bg-[#FAF7F2] border-0 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 text-sm text-zinc-800" placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className="mt-2 w-100 py-3.5 bg-gradient-to-r from-[#8B6914] via-[#C9A84C] to-[#E5CC82] text-white text-[11px] font-bold uppercase tracking-widest rounded-pill hover:shadow-lg transition-shadow border-0">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
