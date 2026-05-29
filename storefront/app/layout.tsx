import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  // ── Primary SEO ──
  title: {
    default: "Italia Cosmetics Pakistan | Professional Italian Hair Care in Lahore",
    template: "%s | Italia Cosmetics Pakistan",
  },
  description:
    "Buy authentic professional Italian hair care products in Lahore, Pakistan. MAXY LOOK, UNA, VERSUM 2.0, and GENUS brands — shampoos, hair masks, coloring, treatments. Imported from Italy. Free delivery in Lahore above ₨5,000.",
  keywords: [
    "italian cosmetics pakistan",
    "professional hair care lahore",
    "MAXY LOOK pakistan",
    "una hair products lahore",
    "VERSUM 2.0 shampoo pakistan",
    "italian shampoo lahore",
    "best hair salon products pakistan",
    "professional hair color lahore",
    "hair mask pakistan",
    "italian hair products karachi",
    "imported hair care pakistan",
    "genus pakistan",
    "GENUS hair bleach pakistan",
    "best shampoo lahore",
    "hair treatment lahore",
  ],

  // ── Locale / Language ──
  alternates: {
    canonical: "https://italiacosmetics.com",
    languages: {
      "en-PK": "https://italiacosmetics.com",
    },
  },

  // ── Open Graph ──
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://italiacosmetics.com",
    siteName: "Italia Cosmetics Pakistan",
    title: "Italia Cosmetics Pakistan | Professional Italian Hair Care in Lahore",
    description:
      "Authentic Italian professional hair care imported to Lahore, Pakistan. Shop MAXY LOOK, UNA, VERSUM 2.0, GENUS. Shampoos, masks, coloring & treatments in PKR.",
    images: [
      {
        url: "https://italiacosmetics.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Italia Cosmetics Pakistan — Professional Italian Hair Care",
      },
    ],
  },

  // ── Twitter Card ──
  twitter: {
    card: "summary_large_image",
    site: "@ItaliaCosPak",
    creator: "@ItaliaCosPak",
    title: "Italia Cosmetics Pakistan | Italian Hair Care in Lahore",
    description:
      "Professional Italian hair products imported to Lahore, Pakistan. MAXY LOOK, UNA, VERSUM 2.0, and GENUS. Shop in PKR.",
    images: ["https://italiacosmetics.com/og-image.jpg"],
  },

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification ──
  verification: {
    google: "your-google-site-verification-token",
  },

  // ── App ──
  applicationName: "Italia Cosmetics Pakistan",
  authors: [{ name: "Italia Cosmetics Pakistan", url: "https://italiacosmetics.com" }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "beauty",
};

// ── JSON-LD Structured Data ──
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": "https://italiacosmetics.com/#store",
  name: "Italia Cosmetics Pakistan",
  description:
    "Professional Italian hair care products imported and distributed in Lahore, Pakistan. Authorised distributor of MAXY LOOK, UNA, VERSUM 2.0, and GENUS brands.",
  url: "https://italiacosmetics.com",
  telephone: "+92-300-0000000",
  email: "info@italiacosmetics.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gulberg III",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    postalCode: "54660",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.5204,
    longitude: 74.3587,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "11:00",
      closes: "18:00",
    },
  ],
  currenciesAccepted: "PKR",
  priceRange: "₨₨₨",
  areaServed: [
    { "@type": "City", name: "Lahore" },
    { "@type": "City", name: "Karachi" },
    { "@type": "City", name: "Islamabad" },
    { "@type": "Country", name: "Pakistan" },
  ],
  hasMap: "https://maps.google.com/?q=Gulberg+III,+Lahore",
  image: "https://italiacosmetics.com/logo.svg",
  logo: "https://italiacosmetics.com/logo.svg",
  sameAs: [
    "https://www.tiktok.com/@italiacosmeticsofficial",
    "https://www.facebook.com/italiacosmeticsofficial",
    "https://www.instagram.com/italiacosmeticslahore/",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where can I buy Italian hair products in Lahore Pakistan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Italia Cosmetics Pakistan is the authorised distributor of professional Italian hair care brands including MAXY LOOK, UNA, VERSUM 2.0, and GENUS in Lahore. You can shop online at italiacosmetics.com with delivery across Pakistan.",
      },
    },
    {
      "@type": "Question",
      name: "Are Italia Cosmetics products available in PKR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all Italia Cosmetics products are priced in Pakistani Rupees (PKR). Prices range from ₨6,000 to ₨104,000 depending on the product and brand.",
      },
    },
    {
      "@type": "Question",
      name: "Is there free delivery for Italian cosmetics in Lahore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Italia Cosmetics Pakistan offers free delivery within Lahore on orders above ₨5,000. Nationwide delivery is also available.",
      },
    },
    {
      "@type": "Question",
      name: "Which Italian hair care brands are available in Pakistan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Italia Cosmetics Pakistan stocks MAXY LOOK, UNA, VERSUM 2.0, and GENUS — professional Italian salon brands covering shampoos, conditioners, masks, coloring, styling, and treatments.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best professional shampoo available in Lahore?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Italia Cosmetics Pakistan offers several professional Italian shampoos in Lahore, including MAXY LOOK Protecting Shampoo, UNA Energizing Shampoo, VERSUM 2.0 Softening Shampoo, and VERSUM 2.0 Reconstructing Shampoo — all imported from Italy.",
      },
    },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://italiacosmetics.com/#organization",
  name: "Italia Cosmetics Pakistan",
  url: "https://italiacosmetics.com",
  logo: "https://italiacosmetics.com/logo.svg",
  foundingLocation: { "@type": "Place", name: "Lahore, Pakistan" },
  areaServed: "PK",
  description:
    "Lahore-based authorised importer and distributor of professional Italian cosmetics and hair care products across Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-PK"
      className={`${montserrat.variable} ${cormorant.variable} h-100`}
      suppressHydrationWarning
    >
      <head>
        {/* ── Pakistan GEO Meta ── */}
        <meta name="geo.region" content="PK-PB" />
        <meta name="geo.placename" content="Lahore, Punjab, Pakistan" />
        <meta name="geo.position" content="31.5204;74.3587" />
        <meta name="ICBM" content="31.5204, 74.3587" />

        {/* ── Currency ── */}
        <meta name="currency" content="PKR" />

        {/* ── Structured Data: LocalBusiness ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {/* ── Structured Data: FAQ (AEO) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        {/* ── Structured Data: Organization ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-vh-100 d-flex flex-column">{children}</body>
    </html>
  );
}
