import Link from "next/link";
import Image from "next/image";
import StaticHeader from "../../components/StaticHeader";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Privacy & Cookie Policy | Italia Cosmetics",
  description: "Learn how we protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-vh-100 bg-[#FAF7F2] d-flex flex-column">
      <StaticHeader />

      <main className="container-xl py-5 flex-grow-1">
        <div className="max-w-3xl mx-auto bg-white rounded-4 shadow-sm border border-zinc-100 p-4 p-md-5">
          <h1 className="font-serif text-3xl md:text-4xl text-zinc-900 mb-2 text-center">Privacy & Cookie Policy</h1>
          <p className="text-center text-[#9A9080] text-xs uppercase tracking-widest font-bold mb-5">Last Updated: May 2026</p>
          
          <div className="d-flex flex-column gap-4 text-zinc-700 font-light leading-relaxed text-sm md:text-base prose prose-zinc max-w-none">
            <p>
              At Italia Cosmetics, we are committed to protecting the privacy and security of our customers and site visitors. This policy explains how we collect, use, and safeguard your personal information when you use our website or purchase our products.
            </p>

            <h3 className="font-serif text-xl text-[#1A1A1A] mt-2 mb-1">1. Information We Collect</h3>
            <p>
              We collect information to deliver our products securely and provide a tailored experience:
            </p>
            <ul className="ps-4">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and delivery address to fulfill your orders.</li>
              <li><strong>Usage Data:</strong> Browsing history, IP address, and interaction with our website to optimize your shopping experience.</li>
            </ul>

            <h3 className="font-serif text-xl text-[#1A1A1A] mt-2 mb-1">2. How We Use Your Data</h3>
            <p>
              We only use your data for essential business operations:
            </p>
            <ul className="ps-4">
              <li>To process and deliver your orders (including sharing address details with logistics partners).</li>
              <li>To communicate order updates via SMS or WhatsApp.</li>
              <li>To improve our website layout, performance, and product offerings.</li>
            </ul>

            <h3 className="font-serif text-xl text-[#1A1A1A] mt-2 mb-1">3. Cookie Policy</h3>
            <p>
              We use strictly necessary cookies to ensure the website functions (such as keeping items in your cart) and analytical cookies to understand site traffic. You can disable cookies in your browser, but this may affect your ability to place orders.
            </p>

            <h3 className="font-serif text-xl text-[#1A1A1A] mt-2 mb-1">4. Data Security</h3>
            <p>
              All data transmitted through our website is encrypted using standard SSL security. We do not store financial or credit card information on our servers, as payments are processed through encrypted gateways or handled physically via Cash on Delivery.
            </p>

            <div className="bg-[#FAF7F2] p-4 rounded-3 border-l-4 border-[#C9A84C] mt-4">
              <h4 className="font-serif text-lg text-zinc-900 mb-2">Questions regarding your privacy?</h4>
              <p className="m-0 text-sm">Please reach out to our support team at <a href="mailto:support@italiacosmetics.com" className="text-[#C9A84C] font-semibold text-decoration-none">support@italiacosmetics.com</a> or call us at <a href="tel:00923379912300" className="text-[#C9A84C] font-semibold text-decoration-none">0092 337 9912300</a>.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
