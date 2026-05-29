"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CITIES = ["Lahore", "Karachi", "Islamabad", "Faisalabad", "Rawalpindi", "Multan"];
const PRODUCTS = [
  "MAXY LOOK Protecting Shampoo",
  "UNA Energizing Shampoo",
  "VERSUM Softening Mask",
  "GENUS Blue Bleach",
  "MAXY LOOK Hydrating Kit",
  "VERSUM Moisturizing Conditioner",
  "UNA Daily Shampoo",
  "GENUS Color Natural"
];

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [fomoData, setFomoData] = useState({ city: "Lahore", product: "MAXY LOOK Protecting Shampoo", time: "just now" });
  const [fomoVisible, setFomoVisible] = useState(true);
  
  // Order Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    product: ""
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFomoVisible(false);
      setTimeout(() => {
        const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
        const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
        const times = ["just now", "2 mins ago", "5 mins ago", "1 min ago", "just now"];
        const randomTime = times[Math.floor(Math.random() * times.length)];
        setFomoData({ city: randomCity, product: randomProduct, time: randomTime });
        setFomoVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, city, address, product } = formData;
    const message = `*NEW ORDER*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*City:* ${city}\n*Address:* ${address}\n*Product:* ${product || "Need help choosing"}\n\nPlease confirm my order.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923379912300?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Scroll To Top (Floating Left) */}
      <button 
        onClick={scrollToTop}
        className={`shadow-lg transition-all duration-300 border border-zinc-700/50 hover:bg-black`} 
        style={{ 
          position: 'fixed', zIndex: 9999, bottom: '24px', left: '24px',
          width: '48px', height: '48px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#1A1A1A', color: 'white', borderRadius: '50%',
          opacity: showScrollTop ? 1 : 0, transform: showScrollTop ? 'scale(1)' : 'scale(0.75)',
          pointerEvents: showScrollTop ? 'auto' : 'none'
        }}
        aria-label="Scroll to top"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
      </button>

      {/* FOMO Popup (Bottom Left stack) - Positioned safely above the scroll-to-top button */}
      <div 
        className={`shadow-lg transition-all duration-500`}
        style={{ 
          position: 'fixed', zIndex: 9998, bottom: '90px', left: '24px',
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)', borderRadius: '999px',
          border: '1px solid rgba(201,168,76,0.3)',
          width: 'fit-content', maxWidth: '85vw',
          transform: `translateY(${fomoVisible ? '0' : '20px'})`,
          opacity: fomoVisible ? 1 : 0,
          pointerEvents: fomoVisible ? 'auto' : 'none'
        }}
      >
        <div className="position-relative d-flex align-items-center justify-content-center" style={{ width: '8px', height: '8px', flexShrink: 0 }}>
          <span className="position-absolute w-100 h-100 bg-green-500 rounded-circle animate-ping opacity-75"></span>
          <span className="position-relative w-100 h-100 bg-green-600 rounded-circle"></span>
        </div>
        <div className="text-[11px] md:text-xs font-medium text-zinc-800 text-nowrap text-truncate">
          Someone in <span className="fw-bold">{fomoData.city}</span> purchased{" "}
          <span className="text-[#C9A84C] fw-bold d-none d-sm-inline">{fomoData.product}</span>
          <span className="text-zinc-400 ms-2">{fomoData.time}</span>
        </div>
      </div>

      {/* Buy Now (Floating Right) */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="shadow-lg transition-all hover:scale-105 border-0"
        style={{ 
          position: 'fixed', zIndex: 9999, bottom: '24px', right: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#C9A84C', color: 'white', borderRadius: '999px',
          padding: '0 24px', height: '48px',
          fontWeight: '700', letterSpacing: '1px', fontSize: '12px',
          width: 'fit-content', whiteSpace: 'nowrap'
        }}
      >
        BUY NOW
      </button>

      {/* Quick Order Modal Overlay */}
      {isModalOpen && (
        <div className="position-fixed inset-0 z-[1050] d-flex align-items-center justify-content-center bg-black/60 backdrop-blur-sm p-3">
          <div className="bg-white rounded-4 shadow-xl w-100" style={{ maxWidth: '400px' }}>
            
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold text-zinc-900" style={{ fontFamily: 'var(--font-montserrat)' }}>Quick Order (WhatsApp)</h5>
              <button onClick={() => setIsModalOpen(false)} className="btn-close" aria-label="Close"></button>
            </div>

            <form onSubmit={handleOrderSubmit} className="p-4">
              <div className="mb-3">
                <label className="form-label text-xs fw-semibold text-zinc-600 uppercase tracking-wider">Full Name</label>
                <input required type="text" className="form-control form-control-lg text-sm" placeholder="e.g. Ayesha Khan" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="mb-3">
                <label className="form-label text-xs fw-semibold text-zinc-600 uppercase tracking-wider">Mobile Number</label>
                <input required type="tel" className="form-control form-control-lg text-sm" placeholder="0300 1234567" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>

              <div className="mb-3">
                <label className="form-label text-xs fw-semibold text-zinc-600 uppercase tracking-wider">City</label>
                <input required type="text" className="form-control form-control-lg text-sm" placeholder="Lahore" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
              </div>

              <div className="mb-3">
                <label className="form-label text-xs fw-semibold text-zinc-600 uppercase tracking-wider">Delivery Address</label>
                <textarea required className="form-control form-control-lg text-sm" rows={2} placeholder="House 1, Street 2, Gulberg" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
              </div>

              <div className="mb-4">
                <label className="form-label text-xs fw-semibold text-zinc-600 uppercase tracking-wider">Product(s) Needed</label>
                <input type="text" className="form-control form-control-lg text-sm" placeholder="e.g. MAXY LOOK Shampoo (or leave blank)" value={formData.product} onChange={(e) => setFormData({...formData, product: e.target.value})} />
              </div>

              <button type="submit" className="btn btn-success w-100 py-3 rounded-pill fw-bold tracking-wider d-flex align-items-center justify-content-center gap-2" style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm3.93-8.5c-.18-.09-1.07-.53-1.24-.59-.17-.06-.29-.09-.42.1-.13.2-.48.59-.59.72-.11.13-.22.15-.4.06-.18-.09-.76-.28-1.45-.9-.54-.48-.91-1.08-1.02-1.26-.11-.18-.01-.28.08-.37.08-.08.18-.21.27-.32.09-.11.12-.18.18-.3.06-.12.03-.22-.01-.31-.05-.09-.42-1.02-.58-1.4-.15-.37-.3-.32-.42-.32h-.35c-.13 0-.34.05-.52.24-.18.2-1.24.96-1.24 2.34s1.27 2.72 1.45 2.96c.18.24 2.02 3.08 4.89 4.31.68.29 1.21.46 1.63.59.68.22 1.3.19 1.79.11.55-.09 1.07-.44 1.22-.86.15-.42.15-.78.11-.86-.04-.08-.13-.13-.31-.22z"/></svg>
                ORDER ON WHATSAPP
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
}
