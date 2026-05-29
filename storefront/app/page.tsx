"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { PRODUCTS, Product } from "./products";
import { TESTIMONIALS, Testimonial } from "./testimonials";

// ── PKR currency formatter ──
const formatPKR = (amount: number): string =>
  "₨\u202F" + Math.round(amount).toLocaleString("en-PK");



const HERO_SLIDES = [
  {
    brand: "MAXY LOOK",
    collection: "AURA DI MAXY LOOK",
    title: "Protecting Shampoo",
    italianName: "Shampoo di MAXY LOOK",
    description: "Infused with cold-distilled Sicilian orange blossom and organic Tuscan olive husk oil — reviving dry strands and restoring brilliant shine. Now available in Lahore, Pakistan.",
    price: 7036,
    image: "/images/swatches/max602-protecting-shampoo-300ml.svg",
    tag: "Deep Shine & Protection",
    productId: "max602",
    tagline: "Imported from Italy · 300ml",
    bgGradient: "linear-gradient(135deg, #FAF7F2 0%, #F0EAD6 50%, #E8DFC6 100%)"
  },
  {
    brand: "UNA",
    collection: "UNA ENERGIZING LINE",
    title: "Energizing Shampoo",
    italianName: "Shampoo di UNA",
    description: "Professional Italian energizing shampoo crafted with Calendula officinalis and Tuscan olive husk oil. Awakening the scalp and delivering lasting vitality to every strand.",
    price: 18905,
    image: "/images/swatches/UNA006102-Energizing-shampoo-UNA-FORTIFY-Energizing.svg",
    tag: "Scalp Energizing Ritual",
    productId: "una0061-02",
    tagline: "Imported from Italy · 1000ml",
    bgGradient: "linear-gradient(135deg, #F2F7F4 0%, #D0E9DD 50%, #BCE0D0 100%)"
  },
  {
    brand: "VERSUM",
    collection: "VERSUM SOFTENING LINE",
    title: "Softening Shampoo",
    italianName: "Shampoo di VERSUM 2.0",
    description: "VERSUM 2.0's signature softening formula blends Mediterranean botanicals with premium panthenol complexes — unmatched silkiness now available across Pakistan.",
    price: 24306,
    image: "/images/swatches/VS16011-SOFTENING-SHAMPOO-VERSUM-Soft-Touch.svg",
    tag: "Silky Smooth Luminosity",
    productId: "vs16011",
    tagline: "Imported from Italy · 1000ml",
    bgGradient: "linear-gradient(135deg, #F7F2FA 0%, #E6D6EA 50%, #D4C6DE 100%)"
  },
  {
    brand: "GENUS",
    collection: "GENUS PROFESSIONAL",
    title: "Blue Bleach",
    italianName: "Decolorante Blu",
    description: "Professional Italian blue bleaching powder. Formulated to neutralize warm tones during lightening, delivering precise, even results while preserving hair structure.",
    price: 24875,
    image: "/images/products/blb.svg",
    tag: "Professional Decolorizing",
    productId: "blb",
    tagline: "Imported from Italy · 500g",
    bgGradient: "linear-gradient(135deg, #F2F7FA 0%, #D0E5E9 50%, #BCCDE0 100%)"
  },
  {
    brand: "MAXY LOOK",
    collection: "PROTECTING LINE",
    title: "Protecting Shampoo",
    italianName: "Shampoo Protettivo",
    description: "Professional Italian color-protecting shampoo. Rescues bleached and colored hair facing hard water minerals in Pakistan, forming an anti-fade defensive shield.",
    price: 13688,
    image: "/images/swatches/max601-protecting-shampoo.svg",
    tag: "Color Guard Ritual",
    productId: "max601",
    tagline: "Imported from Italy · 1000ml",
    bgGradient: "linear-gradient(135deg, #F8F5F2 0%, #EADAD0 50%, #D8C2B3 100%)"
  }
];

// ── RITUAL RECOMMENDATION MAPPING FOR PAKISTANI HAIR CONCERNS ──
const RITUAL_MAPPING: Record<
  string,
  Record<
    string,
    { shampooId: string; maskId: string; finisherId: string; description: string }
  >
> = {
  hydration: {
    "dry-damaged": {
      shampooId: "vs16001", // VERSUM Moisturizing Shampoo 1000ml
      maskId: "vs16003",    // VERSUM Moisturizing Mask 1000ml
      finisherId: "vs16021", // VERSUM Multi-Action Leave-In Cream
      description: "Ideal for brittle, bleached, and straw-like hair damaged by heat styling and Lahore's dry smog. This Italian hydration ritual restores moisture levels, injecting deep hyaluronic nourishment into the cortex."
    },
    "oily-fine": {
      shampooId: "vs16024", // VERSUM Normalizing Shampoo
      maskId: "vs16013",    // VERSUM Softening Conditioner
      finisherId: "vs16023", // VERSUM Balance Lotion
      description: "Combats oily roots and flat hair caused by Lahore's humid monsoon and dust. Deeply cleanses and balances the scalp sebum while keeping lengths light, hydrated, and bouncy."
    },
    "colored-treated": {
      shampooId: "vs16011", // VERSUM Softening Shampoo
      maskId: "vs16017",    // VERSUM Softening Mask
      finisherId: "vs16019", // VERSUM Softening Serum
      description: "Revitalizes chemically straightened, rebonded, or dyed hair that feels dry. Blends rich softening agents to seal the cuticle, lock in moisture, and provide a glass-like finish."
    },
    normal: {
      shampooId: "vs16002", // VERSUM Moisturizing Shampoo 250ml
      maskId: "vs16004",    // VERSUM Moisturizing Mask 250ml
      finisherId: "vs16021", // VERSUM Multi-Action Leave-In Cream
      description: "Perfect for hair that gets unruly or frizzy in Pakistan's high humidity. Locks out moisture-induced frizz while delivering a silky, light touch."
    }
  },
  color: {
    "dry-damaged": {
      shampooId: "max601",  // MAXY LOOK Protecting Shampoo 1000ml
      maskId: "max603",     // MAXY LOOK Protecting Mask 1000ml
      finisherId: "max605",  // MAXY LOOK Protecting Dual Phase Spray
      description: "Rescues bleached and colored hair facing hard water minerals in Pakistan. Deeply restores damaged colored fibers and forms an anti-fade defensive shield."
    },
    "oily-fine": {
      shampooId: "max602",  // MAXY LOOK Protecting Shampoo 300ml
      maskId: "max604",     // MAXY LOOK Protecting Mask 300ml
      finisherId: "max605",  // MAXY LOOK Protecting Spray
      description: "Saves color from fading under intense sun exposure and city smog. A lightweight formula that keeps colored fine hair voluminous, radiant, and fresh."
    },
    "colored-treated": {
      shampooId: "max601",  // MAXY LOOK Protecting Shampoo 1000ml
      maskId: "max603",     // MAXY LOOK Protecting Mask 1000ml
      finisherId: "max605",  // MAXY LOOK Protecting Spray
      description: "Specially formulated for high-frequency colored hair in Pakistan. Rebalances pH after professional dyeing, keeping pigments locked for weeks."
    },
    normal: {
      shampooId: "max602",  // MAXY LOOK Protecting Shampoo 300ml
      maskId: "max604",     // MAXY LOOK Protecting Mask 300ml
      finisherId: "max605",  // MAXY LOOK Protecting Spray
      description: "Enriches normal dyed hair with a luminous shine. Guards against UV-induced color fading and environmental impurities."
    }
  },
  restructuring: {
    "dry-damaged": {
      shampooId: "vs16041", // VERSUM Reconstructing Shampoo
      maskId: "vs16043",    // VERSUM Reconstructing Mask
      finisherId: "vs16031", // VERSUM Reinforcing Cream
      description: "The ultimate salvage ritual for severely cracked, broken, or bleached hair following heavy salon processing. Infuses hydrolyzed keratin to rebuild bonds."
    },
    "oily-fine": {
      shampooId: "vs16028", // VERSUM Reinforcing Shampoo
      maskId: "vs16027",    // VERSUM Reinforcing Mask
      finisherId: "vs16031", // VERSUM Reinforcing Cream
      description: "Strengthens weak, thinning, or breakable hair prone to fall in hard water. Boosts scalp strength without weighting down fine strands."
    },
    "colored-treated": {
      shampooId: "vs16041", // VERSUM Reconstructing Shampoo
      maskId: "vs16043",    // VERSUM Reconstructing Mask
      finisherId: "vs16031", // VERSUM Reinforcing Cream
      description: "Restores keratin protein to hair that has undergone chemical straightening or extensive dyeing. Re-establishes structural integrity and softness."
    },
    normal: {
      shampooId: "vs16041", // VERSUM Reconstructing Shampoo 250ml
      maskId: "vs16043",    // VERSUM Reconstructing Mask 250ml
      finisherId: "vs16031", // VERSUM Reinforcing Cream
      description: "A preventive strength ritual for normal hair exposed to heating tools for festive/wedding styling. Retains elasticity and prevents split ends."
    }
  },
  styling: {
    "dry-damaged": {
      shampooId: "vs16032", // VERSUM Performing Shampoo
      maskId: "vs16034",    // VERSUM Performing Mask
      finisherId: "vs26200", // VERSUM Defining Cream
      description: "Provides extreme hold and structure for dry, coarse hair. Perfect for wedding up-dos, curls, or formal styling in Pakistan's wedding season."
    },
    "oily-fine": {
      shampooId: "vs16032", // VERSUM Performing Shampoo
      maskId: "vs16034",    // VERSUM Performing Mask
      finisherId: "vs26200", // VERSUM Defining Cream
      description: "Creates humidity-resistant volume and defining control for fine hair, keeping styling intact during warm Pakistani wedding nights."
    },
    "colored-treated": {
      shampooId: "vs16032", // VERSUM Performing Shampoo
      maskId: "vs16034",    // VERSUM Performing Mask
      finisherId: "vs26200", // VERSUM Defining Cream
      description: "Maintains intense holds and styles for color-treated hair while preserving shine and protecting hair color from styling iron heat."
    },
    normal: {
      shampooId: "vs16032", // VERSUM Performing Shampoo
      maskId: "vs16034",    // VERSUM Performing Mask
      finisherId: "vs26200", // VERSUM Defining Cream
      description: "Versatile high-performance hold and shine for normal hair. Keeps curls, waves, or sleek looks locked in place in hot weather."
    }
  }
};

const BOTANICALS = [
  {
    id: "lavender",
    name: "Wild Tuscan Lavender",
    origin: "Val d'Orcia",
    emoji: "🪻",
    themeClass: "theme-lavender",
    localBadge: "Lahore Smog Rescue",
    localBenefit: "Soothes scalps irritated by sweat, heat, and Lahore's dense urban smog. Restores balance to oily roots while promoting healthy growth.",
    foundIn: "Hydrating Treatment",
    query: "moisturizing"
  },
  {
    id: "orange",
    name: "Sicilian Orange Blossom",
    origin: "Mount Etna Slopes",
    emoji: "🍊",
    themeClass: "theme-orange",
    localBadge: "Hard Water Recovery",
    localBenefit: "Restores brilliant, glassy shine to hair dulled by hard water minerals and dust. Softens cuticles dried out by intense Lahore sun exposure.",
    foundIn: "Protecting Shampoo",
    query: "protecting"
  },
  {
    id: "olive",
    name: "Tuscan Olive Husk Oil",
    origin: "Chianti Hills",
    emoji: "🫒",
    themeClass: "theme-olive",
    localBadge: "Monsoon Frizz Shield",
    localBenefit: "Penetrates deep to tame severe monsoon frizz and lock in essential hydration against dry winter winds.",
    foundIn: "Nourishing Mask",
    query: "moisturizing"
  },
  {
    id: "pomegranate",
    name: "Pomegranate Seed",
    origin: "Sicily",
    emoji: "🍷",
    themeClass: "theme-pomegranate",
    localBadge: "UV & Sun Protection",
    localBenefit: "High-antioxidant defense shields colored hair from UV-induced fading under the scorching Pakistan sun and locks in pigment.",
    foundIn: "Protecting Mask",
    query: "protecting"
  }
];


export default function Home() {
  // ──── STATE MANAGEMENT ────
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Checkout Simulation States
  const [isCheckoutMode, setIsCheckoutMode] = useState<boolean>(false);
  const [shippingName, setShippingName] = useState<string>("");
  const [shippingEmail, setShippingEmail] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [cardDetails, setCardDetails] = useState<string>("");
  const [placedOrder, setPlacedOrder] = useState<{ items: {product: Product; quantity: number}[]; total: number; number: string } | null>(null);

  // Reset pagination on category, search, or brand change
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, searchQuery, selectedBrand]);
  
  // Quiz State
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [recommendedDescription, setRecommendedDescription] = useState<string>("");
  
  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Newsletter State
  const [email, setEmail] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // ── Order Form State ──
  const [isOrderFormOpen, setIsOrderFormOpen] = useState<boolean>(false);
  const [orderStep, setOrderStep] = useState<number>(1);
  const [orderFormSubmitting, setOrderFormSubmitting] = useState<boolean>(false);
  const [orderFormSuccess, setOrderFormSuccess] = useState<boolean>(false);
  const [orderFormError, setOrderFormError] = useState<string>("");
  // Step 1 – Customer Info
  const [ofName, setOfName] = useState<string>("");
  const [ofPhone, setOfPhone] = useState<string>("");
  const [ofWhatsapp, setOfWhatsapp] = useState<string>("");
  const [ofEmail, setOfEmail] = useState<string>("");
  const [ofCity, setOfCity] = useState<string>("");
  const [ofAddress, setOfAddress] = useState<string>("");
  // Step 2 – Product Selection
  const [ofBrandFilter, setOfBrandFilter] = useState<string>("All");
  const [ofCatFilter, setOfCatFilter] = useState<string>("all");
  const [ofSearch, setOfSearch] = useState<string>("");
  const [ofCart, setOfCart] = useState<{product: Product; qty: number}[]>([]);
  // Step 4 – Delivery
  const [ofPayment, setOfPayment] = useState<string>("Bank Transfer");
  const [ofDeliveryNote, setOfDeliveryNote] = useState<string>("");
  const [ofReceipt, setOfReceipt] = useState<string>("");
  const [ofReceiptName, setOfReceiptName] = useState<string>("");
  const [ofReceiptLoading, setOfReceiptLoading] = useState<boolean>(false);

  // Spotlight active ingredient state
  const [activeIngredient, setActiveIngredient] = useState<string | null>(null);

  // Testimonials States
  const [tmSearch, setTmSearch] = useState<string>("");
  const [tmCityFilter, setTmCityFilter] = useState<string>("All");
  const [tmBrandFilter, setTmBrandFilter] = useState<string>("All");
  const [tmVisibleCount, setTmVisibleCount] = useState<number>(6);
  const [tmShowDirectory, setTmShowDirectory] = useState<boolean>(false);

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

  // Hero carousel state
  const [heroSlide, setHeroSlide] = useState<number>(0);
  const heroTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Search input ref
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Auto-advance hero carousel every 5s
  useEffect(() => {
    heroTimerRef.current = setTimeout(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => {
      if (heroTimerRef.current) clearTimeout(heroTimerRef.current);
    };
  }, [heroSlide]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ──── TOAST HELPER ────
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // ──── CART ACTIONS (removed - using direct order form) ────

  // ──── HAIR CARE QUIZ CONTROLS ────
  const handleQuizAnswer = (questionId: string, answer: string) => {
    const updatedAnswers = { ...quizAnswers, [questionId]: answer };
    setQuizAnswers(updatedAnswers);
    
    if (quizStep < 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate 3-step recommendation
      const mapping = RITUAL_MAPPING[updatedAnswers.concern]?.[updatedAnswers.hairType];
      if (mapping) {
        const pShampoo = PRODUCTS.find(p => p.id === mapping.shampooId) || PRODUCTS[0];
        const pMask = PRODUCTS.find(p => p.id === mapping.maskId) || PRODUCTS[0];
        const pFinisher = PRODUCTS.find(p => p.id === mapping.finisherId) || PRODUCTS[0];
        setRecommendedProducts([pShampoo, pMask, pFinisher]);
        setRecommendedDescription(mapping.description);
      } else {
        setRecommendedProducts([PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]]);
        setRecommendedDescription("A premium customized selection of Italian hair care essentials for your hair type.");
      }
      setQuizStep(2);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setRecommendedProducts([]);
    setRecommendedDescription("");
  };

  const startOrderWithProducts = (products: Product[]) => {
    const initialItems = products.map(p => ({ product: p, qty: 1 }));
    setOfCart(initialItems);
    setIsOrderFormOpen(true);
    setOrderStep(1); // Start at Info step
  };

  const filterByBotanical = (query: string, category: string = "all") => {
    setSearchQuery(query);
    setSelectedCategory(category);
    const el = document.getElementById("collection");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };


  // ──── NEWSLETTER SIGNUP ────
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNewsletterSubscribed(true);
    triggerToast("Thank you for subscribing! An exclusive invitation has been sent to your email.");
  };

  // ──── ORDER FORM HELPERS ────
  const ofTotal = ofCart.reduce((s, i) => s + i.product.price * i.qty, 0);

  const ofAddProduct = (product: Product) => {
    setOfCart(prev => {
      const ex = prev.find(i => i.product.id === product.id);
      if (ex) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };

  const ofUpdateQty = (id: string, delta: number) => {
    setOfCart(prev => prev.map(i => i.product.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i).filter(i => i.qty > 0));
  };

  const ofRemove = (id: string) => setOfCart(prev => prev.filter(i => i.product.id !== id));

  const ofFilteredProducts = PRODUCTS.filter(p => {
    const bMatch = ofBrandFilter === "All" || p.brand === ofBrandFilter;
    const cMatch = ofCatFilter === "all" || p.category === ofCatFilter;
    const sMatch = !ofSearch || p.name.toLowerCase().includes(ofSearch.toLowerCase()) || p.brand.toLowerCase().includes(ofSearch.toLowerCase());
    return bMatch && cMatch && sMatch;
  });

  const handleOrderFormSubmit = async () => {
    setOrderFormSubmitting(true);
    setOrderFormError("");
    const orderLines = ofCart.map(i => `${i.product.brand} — ${i.product.name} × ${i.qty} = ${formatPKR(i.product.price * i.qty)}`).join("\n");
    const payload = {
      name: ofName,
      phone: ofPhone,
      whatsapp: ofWhatsapp || ofPhone,
      email: ofEmail,
      city: ofCity,
      address: ofAddress,
      payment_method: ofPayment,
      delivery_note: ofDeliveryNote,
      order_items: orderLines,
      order_total: formatPKR(ofTotal),
      item_count: ofCart.length,
      payment_receipt: ofReceipt || "None",
      payment_receipt_name: ofReceiptName || "None",
    };
    try {
      const res = await fetch("https://formspree.io/f/meedvbjz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setOrderFormSuccess(true);
        setOrderStep(5);
      } else {
        setOrderFormError("Submission failed. Please try WhatsApp or call us directly.");
      }
    } catch {
      setOrderFormError("Network error. Please try again.");
    } finally {
      setOrderFormSubmitting(false);
    }
  };

  const resetOrderForm = () => {
    setIsOrderFormOpen(false);
    setOrderStep(1);
    setOrderFormSuccess(false);
    setOrderFormError("");
    setOfName(""); setOfPhone(""); setOfWhatsapp(""); setOfEmail("");
    setOfCity(""); setOfAddress(""); setOfPayment("Bank Transfer"); setOfDeliveryNote("");
    setOfBrandFilter("All"); setOfCatFilter("all"); setOfSearch(""); setOfCart([]);
    setOfReceipt(""); setOfReceiptName("");
  };

  // ──── SCROLL REVEALS (Intersection Observer + Mutation Observer for dynamic nodes) ────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Stop observing once visible to maintain state
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const observeElements = (root: ParentNode) => {
      const elements = root.querySelectorAll(".reveal, .reveal-left, .reveal-right");
      elements.forEach((el) => observer.observe(el));
      
      if (root instanceof HTMLElement) {
        if (
          root.classList.contains("reveal") ||
          root.classList.contains("reveal-left") ||
          root.classList.contains("reveal-right")
        ) {
          observer.observe(root);
        }
      }
    };

    // Initial check
    observeElements(document);

    // Watch for dynamic DOM changes (e.g. view switching, load-more pagination)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            observeElements(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // Filtered Products
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesBrand = selectedBrand === "all" || product.brand.toUpperCase() === selectedBrand.toUpperCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q) ||
      (product.italianName?.toLowerCase().includes(q) ?? false) ||
      product.category.toLowerCase().includes(q);
    return matchesCategory && matchesBrand && matchesSearch;
  });

  return (
    <div className="position-relative min-vh-100 d-flex flex-column overflow-hidden">
      
      {/* ──── TOAST NOTIFICATION ──── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[1050] glass-card px-6 py-4 shadow-2xl flex items-center gap-3 border-l-4 border-[#C9A84C] animate-fade-up max-w-sm">
          <svg className="w-5 h-5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-800">{toastMessage}</span>
        </div>
      )}

      {/* ──── ANNOUNCEMENT BAR ──── */}
      <div className="navbar-announce-bar" aria-label="Promotions">
        <div className="navbar-announce-track">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="navbar-announce-segment">
              <span className="navbar-announce-dot">✦</span>
              Free Delivery in Pakistan on Orders Above ₨5,000
              <span className="navbar-announce-sep">·</span>
              Authentic Italian Products — Imported to Lahore
              <span className="navbar-announce-sep">·</span>
              3 Complimentary Samples With Every Order
              <span className="navbar-announce-sep">·</span>
              COD Available Across Pakistan
            </span>
          ))}
        </div>
      </div>

      {/* ──── NAVBAR ──── */}
      <header id="main-navbar" className="navbar-shell sticky-top" role="banner">
        <nav className="navbar navbar-expand-lg navbar-shell-inner" aria-label="Main navigation">
          <div className="container-xl navbar-container-row">

            {/* ── MOBILE: Hamburger ── */}
            <button
              id="navbar-hamburger"
              className={`navbar-hamburger d-lg-none${isMobileMenuOpen ? " is-open" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-drawer"
            >
              <span className="hbg-bar hbg-bar-1" />
              <span className="hbg-bar hbg-bar-2" />
              <span className="hbg-bar hbg-bar-3" />
            </button>

            {/* ── LEFT: Desktop Nav Links ── */}
            <div className="navbar-left d-none d-lg-flex align-items-center gap-4 h-100 position-static">
              {[
                { id: "VERSUM 2.0", label: "VERSUM 2.0", color: "#D92E2E", categories: ["shampoos", "conditioners-masks", "styling-finishing", "treatments-serums"] },
                { id: "GENUS", label: "GENUS", color: "#1A1F1C", categories: ["shampoos", "conditioners-masks", "technical-coloring"] },
                { id: "MAXY LOOK", label: "MAXY LOOK", color: "#1A1F1C", categories: ["shampoos", "conditioners-masks", "technical-coloring", "treatments-serums"] },
                { id: "UNA", label: "UNA", color: "#1A1F1C", categories: ["shampoos", "conditioners-masks", "treatments-serums"] }
              ].map(brand => {
                const featuredProduct = PRODUCTS.find(p => p.brand === brand.id && p.price > 12000) || PRODUCTS.find(p => p.brand === brand.id);
                return (
                <div key={brand.id} className="group h-100 d-flex align-items-center py-3">
                  <a
                    href="#collection"
                    onClick={() => {
                      setSelectedBrand(brand.id);
                      setSelectedCategory("all");
                    }}
                    className="nav-link cursor-pointer"
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: brand.color,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '2px'
                    }}
                  >
                    {brand.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:rotate-180 transition-transform duration-300"
                      style={{ marginLeft: '4px' }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </a>

                  {/* Mega Menu Dropdown */}
                  <div className="mega-menu-dropdown text-start cursor-default">
                    <div className="mega-menu-grid">
                      {/* Left: Categories */}
                      <div className="mega-menu-categories">
                        <h4 className="mega-category-title">Explore {brand.label}</h4>
                        <div className="mega-category-links">
                          {brand.categories.map(cat => (
                            <a 
                              key={cat} 
                              href="#collection"
                              className="mega-link cursor-pointer text-decoration-none"
                              onClick={() => {
                                setSelectedBrand(brand.id);
                                setSelectedCategory(cat as any);
                                setIsMobileMenuOpen(false);
                              }}
                            >
                              {cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Right: Featured Product */}
                      {featuredProduct && (
                        <div className="mega-featured-product text-center">
                          <img src={featuredProduct.image} alt={featuredProduct.name} className="mega-featured-img" />
                          <div>
                            <p className="text-[10px] uppercase font-bold text-[#C9A84C] tracking-widest mb-1">{brand.label} TOP PICK</p>
                            <h5 className="font-sans font-bold text-sm text-zinc-900 line-clamp-1">{featuredProduct.name}</h5>
                            <p className="font-serif font-bold text-lg text-zinc-900 mt-1">{formatPKR(featuredProduct.price)}</p>
                          </div>
                          <button
                            onClick={() => startOrderWithProducts([featuredProduct])}
                            className="w-100 py-2.5 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-[#C9A84C] transition-all shadow-sm border-0 d-flex align-items-center justify-content-center gap-2 mt-auto"
                          >
                            <span className="text-base">🛒</span> Place Your Order Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )})}
            </div>

            {/* ── CENTER: Logo ── */}
            <a href="#" className="navbar-brand-center" aria-label="Italia Cosmetics home">
              <Image
                src="/logo.svg"
                alt="Italia Cosmetics"
                width={160}
                height={55}
                className="navbar-logo"
                priority
              />
            </a>

            {/* ── RIGHT: Action Icons ── */}
            <div className="navbar-right d-flex align-items-center gap-2 gap-md-3">



              {/* Shop CTA — Desktop only */}
              <a href="#collection" className="navbar-cta-btn d-none d-lg-inline-flex align-items-center justify-content-center gap-2 border border-[#C9A84C] text-[#8F723D] px-4 py-2 rounded-pill text-[10px] uppercase font-bold tracking-widest hover:bg-[#C9A84C] hover:text-white transition-all shadow-sm">
                Shop Now
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="transition-transform group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </a>
            </div>

          </div>
        </nav>

        {/* ── SEARCH OVERLAY ── */}
        <div className={`navbar-search-panel${isSearchOpen ? " is-open" : ""}`} id="navbar-search-panel" aria-hidden={!isSearchOpen}>
          <div className="container-xl">
            <div className="navbar-search-inner position-relative">
              <svg className="navbar-search-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                id="navbar-search-input"
                ref={searchInputRef}
                type="search"
                placeholder="Search products, brands, categories…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsSearchOpen(false);
                }}
                className="navbar-search-input"
                autoFocus={isSearchOpen}
                aria-label="Search products"
              />
              {searchQuery && (
                <button
                  className="navbar-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ──── MOBILE DRAWER ──── */}
      {/* Backdrop */}
      <div
        id="mobile-backdrop"
        className={`navbar-backdrop${isMobileMenuOpen ? " is-visible" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        id="mobile-drawer"
        className={`navbar-drawer${isMobileMenuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="navbar-drawer-header">
          <Image src="/logo.svg" alt="Italia Cosmetics" width={120} height={42} className="object-contain"/>
          <button
            className="navbar-drawer-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Gold divider */}
        <div className="navbar-drawer-divider"/>

        {/* Nav links */}
        <nav className="navbar-drawer-nav" aria-label="Mobile navigation">
          {[
            { href: "#collection", label: "Collection",     sub: "Shop All Products",        icon: "🛍", onClick: () => { setSelectedBrand("all"); } },
            { href: "#quiz",       label: "Hair Care Quiz", sub: "Find Your Ritual",          icon: "✨" },
            { href: "#ingredients",label: "Ingredients",    sub: "Pure Tuscan Botanicals",    icon: "🌿" },
            { href: "#story",      label: "Our Story",      sub: "Crafted in Italy",          icon: "🇮🇹" },
          ].map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (item.onClick) item.onClick();
              }}
              className="navbar-drawer-link"
              style={{ animationDelay: isMobileMenuOpen ? `${i * 70 + 80}ms` : "0ms" }}
            >
              <span className="navbar-drawer-link-icon">{item.icon}</span>
              <span className="navbar-drawer-link-text">
                <span className="navbar-drawer-link-label">{item.label}</span>
                <span className="navbar-drawer-link-sub">{item.sub}</span>
              </span>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="navbar-drawer-link-arrow">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          ))}

          <div className="navbar-drawer-divider"/>
          <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-semibold px-4 mb-2 mt-3">Explore Brands</p>
          <div className="d-flex flex-column gap-2 px-3 pb-4">
            {[
              { id: "VERSUM 2.0", label: "VERSUM 2.0", color: "#D92E2E", categories: ["shampoos", "conditioners-masks", "styling-finishing", "treatments-serums"] },
              { id: "GENUS", label: "GENUS", color: "#1A1F1C", categories: ["shampoos", "conditioners-masks", "technical-coloring"] },
              { id: "MAXY LOOK", label: "MAXY LOOK", color: "#1A1F1C", categories: ["shampoos", "conditioners-masks", "technical-coloring", "treatments-serums"] },
              { id: "UNA", label: "UNA", color: "#1A1F1C", categories: ["shampoos", "conditioners-masks", "treatments-serums"] }
            ].map(b => {
              const featuredProduct = PRODUCTS.find(p => p.brand === b.id && p.price > 12000) || PRODUCTS.find(p => p.brand === b.id);
              const isOpen = openMobileAccordion === b.id;
              
              return (
                <div key={b.id} className="border border-zinc-100 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenMobileAccordion(isOpen ? null : b.id)}
                    className="w-100 d-flex align-items-center justify-content-between p-3 border-0 bg-transparent text-start"
                  >
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: b.color }}>{b.label}</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                         style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  
                  <div className={`mobile-mega-accordion ${isOpen ? 'is-open' : ''}`}>
                    <div className="p-3 pt-0 border-top border-zinc-50">
                      <div className="d-flex flex-column gap-2 mb-4 mt-2">
                        {b.categories.map(cat => (
                          <a 
                            key={cat} 
                            href="#collection"
                            className="text-[11px] font-medium text-zinc-600 text-decoration-none py-1"
                            onClick={() => {
                              setSelectedBrand(b.id);
                              setSelectedCategory(cat as any);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </a>
                        ))}
                      </div>
                      
                      {featuredProduct && (
                        <div className="bg-[#F8F5F2] rounded-lg p-3 text-center border border-[#C9A84C]/20">
                          <img src={featuredProduct.image} alt={featuredProduct.name} className="w-100 h-24 object-contain mix-blend-multiply mb-2" />
                          <p className="text-[9px] uppercase font-bold text-[#C9A84C] tracking-widest">{b.label} TOP PICK</p>
                          <h5 className="font-sans font-bold text-xs text-zinc-900 mt-1 line-clamp-1">{featuredProduct.name}</h5>
                          <button
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              startOrderWithProducts([featuredProduct]);
                            }}
                            className="w-100 mt-2 py-2 bg-[#1A1A1A] text-white text-[9px] font-bold uppercase tracking-widest rounded hover:bg-[#C9A84C] transition-all border-0"
                          >
                            🛒 Order Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Drawer footer */}
        <div className="navbar-drawer-footer">
          <div className="navbar-drawer-divider"/>
          <a
            href="#collection"
            onClick={() => setIsMobileMenuOpen(false)}
            className="navbar-cta-btn w-100 justify-content-center"
          >
            Shop The Collection
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>

          <p className="navbar-drawer-tagline">L&apos;Arte Della Bellezza</p>
        </div>
      </div>

      {/* ──── HERO CAROUSEL ──── */}

      <section id="hero" className="hero-carousel-section position-relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="hero-bg-texture position-absolute inset-0 pointer-events-none" style={{zIndex:1}} />

        {/* Slides */}
        <div className="hero-slides-wrapper position-relative" style={{minHeight:'100vh'}}>
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.productId}
              className={`hero-slide position-absolute inset-0 d-flex align-items-center${
                idx === heroSlide ? ' hero-slide--active' : ''
              }`}
              style={{zIndex: idx === heroSlide ? 3 : 1}}
              aria-hidden={idx !== heroSlide}
            >
              {/* Full-bleed gradient background per slide */}
              <div
                className="hero-slide-bg position-absolute inset-0"
                style={{ background: slide.bgGradient, zIndex: 0 }}
              />


              {/* Decorative ambient blobs */}
              <div className="hero-blob hero-blob-1 position-absolute" style={{zIndex:1}} />
              <div className="hero-blob hero-blob-2 position-absolute" style={{zIndex:1}} />

              <div className="container-xl position-relative" style={{zIndex:2}}>
                <div className="row gy-4 gy-lg-0 align-items-center" style={{minHeight:'100vh'}}>

                  {/* ── LEFT: Text Content ── */}
                  <div className="col-12 col-lg-6 d-flex flex-column justify-content-center py-5">
                    {/* Brand name + collection badge */}
                    <div className="d-flex flex-column gap-2 mb-4">
                      <span className="hero-brand-name font-sans">{slide.brand}</span>
                      <div className="hero-badge d-inline-flex align-items-center gap-2">
                        <span className="hero-badge-dot" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8B6914]">{slide.collection}</span>
                      </div>
                    </div>

                    {/* Main headline */}
                    <h1 className="hero-title font-serif mb-3">
                      {slide.title}
                    </h1>
                    <p className="hero-italian font-serif italic text-[#C9A84C] mb-4">{slide.italianName}</p>

                    {/* Tag chip */}
                    <div className="hero-tag-chip d-inline-flex align-items-center gap-2 mb-5">
                      <span className="hero-tag-icon">✦</span>
                      <span>{slide.tag}</span>
                    </div>

                    {/* ── MOBILE: Product Imagery ── */}
                    <div className="d-flex d-lg-none justify-content-center align-items-center position-relative py-4 mb-4">
                      {/* Ring decorator */}
                      <div className="hero-ring hero-ring-outer position-absolute" />
                      <div className="hero-ring hero-ring-inner position-absolute" />

                      {/* Product image frame */}
                      <div className="hero-img-frame position-relative">
                        <div className="hero-img-glow position-absolute" />
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          width={440}
                          height={520}
                          className="hero-product-img"
                          priority={idx === 0}
                        />
                      </div>

                      {/* Floating glass badge – top right */}
                      <div className="hero-float-badge hero-float-badge--tr glass-card position-absolute d-flex align-items-center gap-2">
                        <span className="hero-float-icon">🌿</span>
                        <div>
                          <p className="m-0 text-[10px] font-bold uppercase tracking-wider text-[#2D4A3A]">Mediterranean Sun</p>
                          <p className="m-0 text-[9px] text-[#7A7060]">Botanical actives</p>
                        </div>
                      </div>

                      {/* Floating glass badge – bottom left */}
                      <div className="hero-float-badge hero-float-badge--bl glass-card position-absolute d-flex align-items-center gap-2">
                        <div className="hero-float-star text-[#C9A84C]">★★★★★</div>
                        <div>
                          <p className="m-0 text-[10px] font-bold text-[#1A1A1A]">Top Rated</p>
                          <p className="m-0 text-[9px] text-[#7A7060]">2,400+ reviews</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="hero-desc d-none d-lg-block text-[#5A5040] leading-relaxed mb-6">
                      {slide.description}
                    </p>

                    {/* Tagline */}
                    <p className="hero-tagline mb-6">{slide.tagline}</p>

                    {/* Price + CTA */}
                    <div className="d-flex flex-wrap align-items-center gap-3 gap-md-4 mb-5">
                      <div className="hero-price">
                        <span className="hero-price-from">From</span>
                        <span className="hero-price-val font-serif">{formatPKR(slide.price)}</span>
                      </div>
                      <button
                        className="btn-primary hero-cta-btn border-0 outline-none d-flex align-items-center justify-content-center gap-2 px-4 shadow-sm"
                        onClick={() => {
                          const prod = PRODUCTS.find(p => p.id === slide.productId);
                          if (prod) startOrderWithProducts([prod]);
                        }}
                      >
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                        </svg>
                        Buy Now
                      </button>
                      <a href="#collection" className="btn-outline hero-explore-btn d-flex align-items-center justify-content-center gap-2 px-4 shadow-sm group">
                        Shop Now
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="transition-transform group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      </a>
                    </div>

                    {/* Slide metrics bar */}
                    <div className="hero-metrics d-flex flex-wrap justify-content-start gap-3 gap-md-4 pt-4">
                      <div className="hero-metric">
                        <span className="hero-metric-num font-serif">100%</span>
                        <span className="hero-metric-label">Made in Italy</span>
                      </div>
                      <div className="hero-metric-divider" />
                      <div className="hero-metric">
                        <span className="hero-metric-num font-serif">Organic</span>
                        <span className="hero-metric-label">Certified</span>
                      </div>
                      <div className="hero-metric-divider" />
                      <div className="hero-metric">
                        <span className="hero-metric-num font-serif">Vegan</span>
                        <span className="hero-metric-label">Cruelty Free</span>
                      </div>
                    </div>
                  </div>

                  {/* ── RIGHT: Product Imagery (Desktop Only) ── */}
                  <div className="col-12 col-lg-6 d-none d-lg-flex justify-content-center align-items-center position-relative pt-4 pb-5 mb-5 pb-lg-5 mb-lg-0">
                    {/* Ring decorator */}
                    <div className="hero-ring hero-ring-outer position-absolute" />
                    <div className="hero-ring hero-ring-inner position-absolute" />

                    {/* Product image frame */}
                    <div className="hero-img-frame position-relative">
                      <div className="hero-img-glow position-absolute" />
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={440}
                        height={520}
                        className="hero-product-img"
                        priority={idx === 0}
                      />
                    </div>

                    {/* Floating glass badge – top right */}
                    <div className="hero-float-badge hero-float-badge--tr glass-card position-absolute d-flex align-items-center gap-2">
                      <span className="hero-float-icon">🌿</span>
                      <div>
                        <p className="m-0 text-[10px] font-bold uppercase tracking-wider text-[#2D4A3A]">Mediterranean Sun</p>
                        <p className="m-0 text-[9px] text-[#7A7060]">Botanical actives</p>
                      </div>
                    </div>

                    {/* Floating glass badge – bottom left */}
                    <div className="hero-float-badge hero-float-badge--bl glass-card position-absolute d-flex align-items-center gap-2">
                      <div className="hero-float-star text-[#C9A84C]">★★★★★</div>
                      <div>
                        <p className="m-0 text-[10px] font-bold text-[#1A1A1A]">Top Rated</p>
                        <p className="m-0 text-[9px] text-[#7A7060]">2,400+ reviews</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CAROUSEL CONTROLS ── */}
        {/* Dot navigation */}
        <div className="hero-dots position-absolute d-flex gap-2" style={{bottom:'2rem', left:'50%', transform:'translateX(-50%)', zIndex:10}}>
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              className={`hero-dot${idx === heroSlide ? ' hero-dot--active' : ''}`}
              onClick={() => setHeroSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <button
          className="hero-arrow hero-arrow--prev position-absolute d-none d-md-flex align-items-center justify-content-center"
          style={{top:'50%', left:'1.5rem', transform:'translateY(-50%)', zIndex:10}}
          onClick={() => setHeroSlide((heroSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          aria-label="Previous slide"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          className="hero-arrow hero-arrow--next position-absolute d-none d-md-flex align-items-center justify-content-center"
          style={{top:'50%', right:'1.5rem', transform:'translateY(-50%)', zIndex:10}}
          onClick={() => setHeroSlide((heroSlide + 1) % HERO_SLIDES.length)}
          aria-label="Next slide"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        {/* Slide counter */}
        <div className="hero-counter position-absolute d-none d-lg-flex align-items-center gap-2" style={{bottom:'2rem', right:'2rem', zIndex:10}}>
          <span className="font-serif text-[#C9A84C] text-lg">{String(heroSlide + 1).padStart(2,'0')}</span>
          <span className="text-zinc-300 text-xs">/ {String(HERO_SLIDES.length).padStart(2,'0')}</span>
        </div>

        {/* Brand thumbnails strip */}
        <div className="hero-thumbs-strip position-absolute d-none d-xl-flex flex-column gap-3" style={{top:'50%', right:'5rem', transform:'translateY(-50%)', zIndex:10}}>
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.productId}
              className={`hero-thumb${ idx === heroSlide ? ' hero-thumb--active' : ''}`}
              onClick={() => setHeroSlide(idx)}
              title={slide.title}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                width={48}
                height={56}
                className="hero-thumb-img object-contain"
              />
            </button>
          ))}
        </div>

        {/* Auto-play progress bar */}
        <div className="hero-progress-bar position-absolute" style={{bottom:0, left:0, right:0, zIndex:10}}>
          <div key={heroSlide} className="hero-progress-fill" />
        </div>
      </section>

      {/* ──── BRAND PILLARS / PROMISE ──── */}
      <section className="bg-white py-5 border-top border-bottom">
        <div className="container-xl">
          <div className="row g-4 justify-content-center">
            
            <div className="col-4 d-flex flex-column align-items-center text-center px-1 p-md-3 feature-box reveal">
              <div className="feature-icon text-[#C9A84C]">
                <svg className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-serif text-[11px] md:text-xl font-medium text-[#1A1A1A] mt-2 mb-1 md:mb-2 leading-tight">Tuscan Formulation</h3>
              <p className="d-none d-md-block text-xs text-[#7A7060] font-light leading-relaxed max-w-xs mb-0">
                Every formula is curated in Tuscany, blending ancient apothecary secrets with modern molecular science.
              </p>
            </div>
  
            <div className="col-4 d-flex flex-column align-items-center text-center px-1 p-md-3 feature-box reveal">
              <div className="feature-icon text-[#C9A84C]">
                <svg className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="font-serif text-[11px] md:text-xl font-medium text-[#1A1A1A] mt-2 mb-1 md:mb-2 leading-tight">Harvested at Dawn</h3>
              <p className="d-none d-md-block text-xs text-[#7A7060] font-light leading-relaxed max-w-xs mb-0">
                Flowers and herbs are plucked exactly at dawn to capture high peak potency and essential oils.
              </p>
            </div>
  
            <div className="col-4 d-flex flex-column align-items-center text-center px-1 p-md-3 feature-box reveal">
              <div className="feature-icon text-[#C9A84C]">
                <svg className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-[11px] md:text-xl font-medium text-[#1A1A1A] mt-2 mb-1 md:mb-2 leading-tight">Sustainable Elegance</h3>
              <p className="d-none d-md-block text-xs text-[#7A7060] font-light leading-relaxed max-w-xs mb-0">
                Meticulously packaged in premium, endlessly recyclable Italian glass jars and luxury gilded metal details.
              </p>
            </div>
  
          </div>
        </div>
      </section>

      {/* ──── PRODUCT EXPLORER / COLLECTION ──── */}
      <section id="collection" className="py-5 bg-[#FAF7F2]">
        <div className="container-xl">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-5 reveal">
            <span className="section-label">Selected Rituals</span>
            <h2 className="section-title text-4xl sm:text-5xl text-[#1A1A1A] mt-2 mb-4">
              Curated Masterpieces
            </h2>
            <div className="gold-divider my-4"></div>
            <p className="text-sm text-[#7A7060] font-light mb-4">
              Explore our small-batch Italian hair care products, formulated with nourishing natural bioactives.
            </p>
            
            {/* Collection Search Input */}
            <div className="max-w-md mx-auto position-relative d-flex align-items-center">
              <input
                type="text"
                placeholder="Search collection (e.g. shampoo, UNA, MAX801)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-100 bg-white border border-[#C9A84C]/30 focus:border-[#C9A84C] rounded-pill px-4 py-2 text-xs text-[#1A1A1A] outline-none shadow-sm transition-all focus:shadow-md"
              />
              <span className="position-absolute right-5 text-zinc-400 text-sm">
                🔍
              </span>
            </div>
          </div>
 
          {/* Categories and Filters */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5 reveal">
            {[
              { id: "all", label: "All Products" },
              { id: "shampoos", label: "Shampoos" },
              { id: "conditioners-masks", label: "Conditioners & Masks" },
              { id: "styling-finishing", label: "Styling & Finishing" },
              { id: "treatments-serums", label: "Treatments & Serums" },
              { id: "technical-coloring", label: "Technical & Coloring" },
              { id: "other", label: "Other" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-pill text-xs font-semibold uppercase tracking-wider transition-all duration-300 border focus:outline-none ${
                  selectedCategory === cat.id
                    ? "bg-[#C9A84C] text-white border-transparent shadow-lg"
                    : "bg-white text-zinc-700 border-zinc-200 hover:border-[#C9A84C]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
 
          {/* Product Grid */}
          <div className="row row-cols-2 row-cols-lg-4 g-3 g-md-4">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <div key={product.id} className="col">
                <div className="product-card group rounded-4 overflow-hidden border border-zinc-200/50 reveal h-100 d-flex flex-column justify-content-between">
                  {/* Product Image Area */}
                  <div className="product-img position-relative bg-zinc-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={480}
                      className="object-cover"
                    />
                    <div className="position-absolute top-4 left-4">
                      <span className="category-badge shadow-sm">{product.category}</span>
                    </div>
                    
                    {/* Rating Stars Overlay */}
                    <div className="position-absolute top-4 right-4 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-zinc-800 flex items-center gap-1 shadow-sm">
                      <span>★</span>
                      <span>{product.rating}</span>
                    </div>
  
                    {/* Actions overlay visible on hover */}
                    <div className="position-absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="px-6 py-2.5 bg-white text-zinc-900 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg hover:bg-[#C9A84C] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
  
                  {/* Details Footer */}
                  <div className="p-4 bg-white d-flex flex-column justify-content-between flex-grow-1 border-top border-zinc-100">
                    <div>
                      <p className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#C9A84C] mb-1">{product.brand}</p>
                      <h3 className="font-sans text-sm font-semibold text-zinc-900 tracking-wide line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-[#7A7060] font-light mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top border-zinc-100">
                      <span className="text-[9px] font-semibold text-zinc-400 uppercase tracking-widest">PKR</span>
                      <span className="text-sm font-bold text-zinc-900 font-serif">{formatPKR(product.price)}</span>
                    </div>
                    <div className="d-flex flex-column gap-2 mt-3">
                      {/* Quick View Button */}
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="w-100 py-2.5 border-0 rounded-pill text-[10px] font-bold uppercase tracking-widest transition-all duration-200 d-flex align-items-center justify-content-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg, #FDF8EE 0%, #FBF3E0 100%)',
                          color: '#A07830',
                          border: '1.5px solid #C9A84C',
                          boxShadow: '0 1px 4px rgba(201,168,76,0.15)',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #C9A84C 0%, #B8943C 100%)';
                          (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(201,168,76,0.35)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #FDF8EE 0%, #FBF3E0 100%)';
                          (e.currentTarget as HTMLButtonElement).style.color = '#A07830';
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 1px 4px rgba(201,168,76,0.15)';
                        }}
                      >
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        Quick View
                      </button>
                      {/* Buy Now Button */}
                      <button
                        onClick={() => startOrderWithProducts([product])}
                        className="w-100 py-2.5 border-0 rounded-pill text-[10px] font-bold uppercase tracking-widest transition-all duration-200 d-flex align-items-center justify-content-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
                          color: '#ffffff',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #C9A84C 0%, #B8943C 100%)';
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(201,168,76,0.35)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)';
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                        }}
                      >
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                        </svg>
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
 
          {/* Load More Button */}
          {filteredProducts.length > visibleCount && (
            <div className="d-flex justify-content-center mt-5 reveal">
              <button
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="px-8 py-3.5 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#C9A84C] transition-colors shadow-lg focus:outline-none"
              >
                Load More Products
              </button>
            </div>
          )}
 
          {filteredProducts.length === 0 && (
            <div className="text-center py-5 bg-white rounded-5 border border-zinc-200 shadow-sm max-w-md mx-auto mt-4">
              <svg className="w-12 h-12 text-[#C9A84C] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-serif text-zinc-900 mb-2">No products found</h3>
              <p className="text-zinc-500 text-sm mb-4">We couldn't find any products matching your selected filters.</p>
              <button 
                onClick={() => {
                  setOfBrandFilter("All");
                  setOfCatFilter("all");
                  setOfSearch("");
                }}
                className="px-6 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-full text-sm font-medium transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ──── INTERACTIVE INGREDIENTS SPOTLIGHT ──── */}
      <section id="ingredients" className="position-relative py-5 border-top border-bottom overflow-hidden">
        {/* Ambient background glows */}
        <div className="position-absolute top-0 left-10 w-80 h-80 bg-[#C9A84C]/5 rounded-full filter blur-[100px] pointer-events-none"></div>
        <div className="position-absolute bottom-0 right-10 w-96 h-96 bg-[#C9A84C]/3 rounded-full filter blur-[120px] pointer-events-none"></div>
 
        <div className="container-xl">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-5 reveal">
            <span className="section-label">Active Botanicals</span>
            <h2 className="section-title text-4xl sm:text-5xl text-[#1A1A1A] mt-2 mb-4">
              Pure Tuscan Sourcing
            </h2>
            <div className="gold-divider my-4"></div>
            <p className="text-sm text-[#7A7060] font-light">
              Crafted in Italy, perfected for Pakistan. Hover over our active elements to discover how they protect against local climate stressors.
            </p>
          </div>
 
          {/* Interactive Sourcing Spotlight Grid */}
          <div className="row row-cols-2 row-cols-lg-4 g-3 g-md-4">
            {BOTANICALS.map((botanical) => {
              const isActive = activeIngredient === botanical.id;
              return (
                <div key={botanical.id} className="col">
                  <div 
                    onMouseEnter={() => setActiveIngredient(botanical.id)}
                    onMouseLeave={() => setActiveIngredient(null)}
                    onClick={() => setActiveIngredient(isActive ? null : botanical.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveIngredient(isActive ? null : botanical.id);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isActive}
                    aria-label={`Active Botanical: ${botanical.name}`}
                    className={`botanical-card ${botanical.themeClass} ${isActive ? "is-active" : ""}`}
                  >
                    {/* Glowing Accent Bubble */}
                    <div className="botanical-glow-circle"></div>

                    <div className="position-relative z-1">
                      {/* Rotating Outer Dashed Icon Ring & Inner Emoji */}
                      <div className="botanical-icon-wrapper">
                        <div className="botanical-icon-ring"></div>
                        <div className="botanical-icon-inner">
                          {botanical.emoji}
                        </div>
                      </div>

                      {/* Pakistan-Targeted Audience Badges */}
                      <span className="botanical-target-badge">
                        <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24" style={{ width: '10px', height: '10px', marginRight: '4px' }}>
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                        {botanical.localBadge}
                      </span>
                      
                      <h3 className="font-serif text-lg text-zinc-900 mb-1">{botanical.name}</h3>
                      
                      {/* Modern travel stamp for Origin */}
                      <div className="d-flex align-items-center gap-1 mb-3">
                        <svg width="10" height="10" fill="none" stroke="#C9A84C" viewBox="0 0 24 24" style={{ display: 'inline-block' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#C9A84C]">Origin: {botanical.origin}</span>
                      </div>
                      
                      <p className="text-xs text-[#7A7060] font-light leading-relaxed mb-0">
                        {botanical.localBenefit}
                      </p>
                    </div>

                    <div className="position-relative z-1">
                      {/* Found in label - animates on hover/active */}
                      <div className={`mt-3 pt-3 border-top border-zinc-200/50 transition-all duration-300 ${
                        isActive ? "opacity-100" : "opacity-60"
                      }`}>
                        <span className="text-[8px] text-zinc-400 uppercase tracking-wider font-semibold d-block">Found In</span>
                        <span className="text-[10px] text-zinc-800 font-bold uppercase tracking-wide d-block mt-0.5">{botanical.foundIn}</span>
                      </div>

                      {/* Explore Products Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          filterByBotanical(botanical.query);
                        }}
                        className="botanical-cta-btn"
                      >
                        <span>Explore Shop</span>
                        <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
 
        </div>
      </section>

      {/* ──── INTERACTIVE SKINCARE QUIZ ──── */}
      <section id="quiz" className="py-5 bg-[#FAF7F2] position-relative">
        <div className="container-lg">
          
          <div className="glass-card p-4 p-md-5 shadow-2xl border border-white/60 position-relative overflow-hidden">
            
            {/* Background Accent */}
            <div className="position-absolute -top-12 -right-12 w-48 h-48 bg-[#C9A84C]/10 rounded-full filter blur-xl"></div>
            
            <div className="position-relative z-10 row g-4 align-items-center">
              
              {/* Left Column Info */}
              <div className={`col-12 ${quizStep === 2 ? "col-lg-3" : "col-lg-5"} text-start transition-all duration-500`}>
                <span className="section-label">Italian Hair Diagnostics</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-zinc-900 mt-2 mb-4">
                  Find Your Perfect Hair Care Ritual
                </h2>
                <p className="text-xs text-[#7A7060] font-light leading-relaxed mb-6">
                  Take our quick 2-step hair diagnostic tailored for Pakistani climate challenges. Whether fighting intense Lahore summer humidity, hard water minerals, or heat damage from wedding styling, find your bespoke 3-step Italian ritual (Cleanse, Nourish, and Finish) in seconds.
                </p>
                
                {quizStep > 0 && (
                  <button 
                    onClick={resetQuiz}
                    className="text-xs font-semibold text-[#C9A84C] uppercase tracking-wider d-inline-flex align-items-center gap-1.5 focus:outline-none border-0 bg-transparent p-0"
                  >
                    ← Start Over
                  </button>
                )}
              </div>

              {/* Right Column Quiz Interface */}
              <div className={`col-12 ${quizStep === 2 ? "col-lg-9" : "col-lg-7"} bg-white/80 backdrop-blur-md rounded-2xl p-4 p-md-5 border border-zinc-200/50 transition-all duration-500`}>
                
                {/* Quiz Step 0: Main Goal */}
                {quizStep === 0 && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">Step 1 of 2</span>
                      <span className="text-[10px] text-zinc-400 font-medium">Goal</span>
                    </div>
                    <h3 className="font-serif text-lg text-zinc-900 mb-4">What is your primary hair care concern?</h3>
                    <div className="row row-cols-1 row-cols-sm-2 g-3">
                      {[
                        { 
                          id: "hydration", 
                          label: "Monsoon Frizz & Dryness", 
                          subLabel: "Deep Mediterranean hydration to block out high monsoon humidity.",
                          icon: (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v2m-3-1v1m6-1v1" />
                            </svg>
                          )
                        },
                        { 
                          id: "color", 
                          label: "Hard Water & Smog Protection", 
                          subLabel: "Locks color pigment and protects cuticle from Lahore's mineral-rich water.",
                          icon: (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z" />
                            </svg>
                          )
                        },
                        { 
                          id: "restructuring", 
                          label: "Wedding Styling & Heat Repair", 
                          subLabel: "Reconstructs keratin bonds broken by blowouts, dyes, and straighteners.",
                          icon: (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L7.188 15.904L2 15L7.188 14.096L9 9L10.813 14.096L16 15L9.813 15.904Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.071 4.929l-1.061 1.061M12 2.25v1.5M4.929 4.929l1.061 1.061" />
                            </svg>
                          )
                        },
                        { 
                          id: "styling", 
                          label: "Volume & Sweat-Proof Hold", 
                          subLabel: "Ensures lasting volume and holds that resist sweat and hot summer nights.",
                          icon: (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                          )
                        }
                      ].map((option) => (
                        <div key={option.id} className="col">
                          <button
                            onClick={() => handleQuizAnswer("concern", option.id)}
                            className="w-100 h-100 text-start p-3.5 rounded-xl border border-zinc-200 bg-white/40 backdrop-blur-md hover:bg-white hover:border-[#C9A84C] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md d-flex align-items-start gap-3 text-zinc-800 focus:outline-none position-relative overflow-hidden group border-l-4 border-l-transparent hover:border-l-[#C9A84C]"
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#C9A84C]/10 d-flex align-items-center justify-content-center text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-white transition-colors duration-300">
                              {option.icon}
                            </div>
                            <div className="flex-grow-1">
                              <h4 className="font-sans font-bold text-xs uppercase tracking-wider mb-1 text-zinc-900">{option.label}</h4>
                              <p className="text-[10px] text-zinc-500 font-light leading-relaxed mb-0">{option.subLabel}</p>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quiz Step 1: Hair Type */}
                {quizStep === 1 && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">Step 2 of 2</span>
                      <span className="text-[10px] text-zinc-400 font-medium">Hair Type</span>
                    </div>
                    <h3 className="font-serif text-lg text-zinc-900 mb-4">How would you describe your hair type?</h3>
                    <div className="row row-cols-1 row-cols-sm-2 g-3">
                      {[
                        { 
                          id: "dry-damaged", 
                          label: "Brittle & Bleached", 
                          subLabel: "Severely dry or porous hair due to color lifting or highlights.",
                          icon: (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21m-2.222-7.778l-1.06 1.06M6.282 17.718l-1.06 1.06M17.718 17.718l1.06 1.06M6.282 6.282l-1.06-1.06" />
                            </svg>
                          )
                        },
                        { 
                          id: "oily-fine", 
                          label: "Oily Roots & Flat Strands", 
                          subLabel: "Scalp gets greasy quickly in Lahori summer heat, flatting volume.",
                          icon: (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.656 48.656 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3M3 12l-3-3m3 3l3-3" />
                            </svg>
                          )
                        },
                        { 
                          id: "colored-treated", 
                          label: "Chemically Straightened / Dyed", 
                          subLabel: "Keratin, rebonded, or dyed locks needing pH restoration.",
                          icon: (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v1.242c0 .289-.139.56-.378.71L7.75 6.104a.75.75 0 0 1-1.062-.64V4.22a.75.75 0 0 1 .64-.741l2.422-.375z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 3.104v1.242c0 .289.139.56.378.71l1.622 1.048a.75.75 0 0 0 1.062-.64V4.22a.75.75 0 0 0-.64-.741l-2.422-.375z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                            </svg>
                          )
                        },
                        { 
                          id: "normal", 
                          label: "Naturally Frizzy & Unruly", 
                          subLabel: "Healthy hair that reacts instantly to humidity and gets puffy.",
                          icon: (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                            </svg>
                          )
                        }
                      ].map((option) => (
                        <div key={option.id} className="col">
                          <button
                            onClick={() => handleQuizAnswer("hairType", option.id)}
                            className="w-100 h-100 text-start p-3.5 rounded-xl border border-zinc-200 bg-white/40 backdrop-blur-md hover:bg-white hover:border-[#C9A84C] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md d-flex align-items-start gap-3 text-zinc-800 focus:outline-none position-relative overflow-hidden group border-l-4 border-l-transparent hover:border-l-[#C9A84C]"
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#C9A84C]/10 d-flex align-items-center justify-content-center text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-white transition-colors duration-300">
                              {option.icon}
                            </div>
                            <div className="flex-grow-1">
                              <h4 className="font-sans font-bold text-xs uppercase tracking-wider mb-1 text-zinc-900">{option.label}</h4>
                              <p className="text-[10px] text-zinc-500 font-light leading-relaxed mb-0">{option.subLabel}</p>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quiz Step 2: Recommendations */}
                {quizStep === 2 && recommendedProducts.length > 0 && (
                  <div className="animate-fade-up text-start">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">✓ Your Bespoke 3-Step Italian Ritual</span>
                      <button 
                        onClick={resetQuiz}
                        className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-[#C9A84C] border-0 bg-transparent p-0 transition-colors"
                      >
                        Retake Quiz
                      </button>
                    </div>

                    <p className="text-xs text-[#7A7060] font-light leading-relaxed mb-4">
                      {recommendedDescription}
                    </p>

                    {/* 3-Column Product Grid */}
                    <div className="row row-cols-3 g-2 g-md-3 mb-4">
                      {recommendedProducts.map((product, idx) => {
                        const stepNames = ["Step 1: Cleanse", "Step 2: Nourish", "Step 3: Finish"];
                        const stepTypes = ["Shampoo", "Treatment Mask", "Leave-in / Finisher"];
                        return (
                          <div key={product.id} className="col">
                            <div className="h-100 p-3 bg-white/60 backdrop-blur-md rounded-xl border border-zinc-200/50 hover:border-[#C9A84C] transition-all duration-300 d-flex flex-column justify-content-between text-center relative overflow-hidden group">
                              <div>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-[#C9A84C] d-block mb-0.5">{stepNames[idx]}</span>
                                <span className="text-[8px] text-zinc-400 uppercase tracking-widest d-block mb-2">{stepTypes[idx]}</span>
                                <div className="position-relative w-20 h-20 mx-auto mb-3 bg-white rounded-lg overflow-hidden border border-zinc-200/30 group-hover:scale-105 transition-transform duration-300">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-1"
                                  />
                                </div>
                                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest d-block">{product.brand}</span>
                                <h5 className="font-sans text-[10px] font-bold text-zinc-900 mt-1 mb-2 uppercase tracking-wide line-clamp-2 h-7">{product.name}</h5>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-zinc-900 font-serif mb-2.5">{formatPKR(product.price)}</p>
                                <div className="d-flex flex-column gap-1">
                                  <button
                                    onClick={() => startOrderWithProducts([product])}
                                    className="w-100 py-1.5 bg-[#C9A84C] text-white text-[8px] font-bold uppercase tracking-widest rounded hover:bg-[#B5963E] transition-colors border-0 shadow-sm"
                                  >
                                    🛒 Place Your Order Now
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bundle Pricing and Action */}
                    <div className="p-3 bg-[#C9A84C]/5 rounded-xl border border-[#C9A84C]/25 d-flex flex-column sm:flex-row align-items-center justify-content-between gap-3">
                      <div className="text-center text-sm-start">
                        <span className="text-[9px] text-[#7A7060] uppercase tracking-wider font-semibold">Complete 3-Step Ritual Bundle</span>
                        <div className="d-flex align-items-baseline gap-2 mt-1 justify-content-center justify-content-sm-start">
                          <span className="text-base font-serif font-bold text-zinc-900">
                            {formatPKR(recommendedProducts.reduce((sum, p) => sum + p.price, 0))}
                          </span>
                          <span className="text-[8px] text-emerald-600 font-bold uppercase tracking-widest bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">Free Delivery</span>
                        </div>
                      </div>
                      <div className="d-flex flex-column sm:flex-row gap-2 justify-content-center w-100 w-sm-auto">
                        <button
                          onClick={() => startOrderWithProducts(recommendedProducts)}
                          className="px-4 py-2 bg-[#C9A84C] text-white text-[9px] font-bold uppercase tracking-widest rounded-full hover:bg-[#B5963E] transition-all shadow-md hover:shadow-lg border-0 w-100 w-sm-auto"
                          style={{ boxShadow: "0 4px 12px rgba(201, 168, 76, 0.3)" }}
                        >
                          🛒 Order Entire Ritual Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──── BRAND STORY SECTION ──── */}
      <section id="story" className="py-5 bg-white">
        <div className="container-xl">
          <div className="row g-5 align-items-center">
            
            {/* Story Image Left */}
            <div className="col-12 col-lg-6 position-relative d-flex justify-content-center align-items-center reveal-left">
              <div className="position-relative w-100 max-w-lg aspect-square sm:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-200">
                <Image
                  src="/italian-products.png"
                  alt="Premium Italian hair care products displayed on travertine stone with lilies and olive branches"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Story Content Right */}
            <div className="col-12 col-lg-6 text-start ps-lg-5 reveal-right">
              <span className="section-label">Tuscan Roots</span>
              <h2 className="section-title text-4xl sm:text-5xl text-zinc-900 mt-2 mb-4">
                Our Mediterranean Story
              </h2>
              <div className="w-12 bg-[#C9A84C] mb-4" style={{ height: "2px" }}></div>
              
              <p className="text-xs md:text-sm text-[#7A7060] font-light leading-relaxed mb-4">
                Born in the heart of rural Tuscany, Italia Cosmetics was created with a single vision: to restore the historic apothecary traditions of blending botanical flora with clean, active science.
              </p>
              
              <p className="text-xs md:text-sm text-[#7A7060] font-light leading-relaxed mb-6">
                We believe beauty shouldn&apos;t be rushed. That is why our precious flowers and organic base oils are slowly pressed and cold-formulated to maximize their bioactive vitamin content and target aging at a cellular level.
              </p>

              <div className="row row-cols-1 row-cols-sm-2 g-4 mt-4">
                <div className="col reveal">
                  <div className="sourcing-card p-4 h-100 rounded-4 border border-zinc-200/60 bg-[#FAF7F2]/50 hover:bg-[#FAF7F2] transition-all duration-300 shadow-sm hover:shadow-md position-relative overflow-hidden group">
                    {/* Golden corner glow */}
                    <div className="position-absolute top-0 right-0 w-24 h-24 bg-[#C9A84C]/5 rounded-full filter blur-xl group-hover:bg-[#C9A84C]/10 transition-colors duration-300" style={{ transform: 'translate(20%, -20%)' }} />
                    
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="d-flex align-items-center justify-content-center bg-white border border-[#E9DCC0] rounded-circle p-2 shadow-sm flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                        <svg width="20" height="20" fill="none" stroke="#C9A84C" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a6 6 0 01-6-6c0-4 6-11 6-11s6 7 6 11a6 6 0 01-6 6z" />
                        </svg>
                      </div>
                      <h4 className="font-serif text-base text-zinc-900 m-0 font-semibold tracking-wide">Chianti Olive Oil</h4>
                    </div>
                    <p className="text-[11px] text-[#5C5346] font-light leading-relaxed m-0">
                      <strong>Hard Water & Heat Defense:</strong> Formulated to combat Pakistan&apos;s intense sun and hard water dryness. Deeply restores the hair cuticle damaged by wedding season styling, locking in natural moisture and mirror-like shine.
                    </p>
                  </div>
                </div>
                
                <div className="col reveal">
                  <div className="sourcing-card p-4 h-100 rounded-4 border border-zinc-200/60 bg-[#FAF7F2]/50 hover:bg-[#FAF7F2] transition-all duration-300 shadow-sm hover:shadow-md position-relative overflow-hidden group">
                    {/* Golden corner glow */}
                    <div className="position-absolute top-0 right-0 w-24 h-24 bg-[#C9A84C]/5 rounded-full filter blur-xl group-hover:bg-[#C9A84C]/10 transition-colors duration-300" style={{ transform: 'translate(20%, -20%)' }} />
                    
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="d-flex align-items-center justify-content-center bg-white border border-[#E9DCC0] rounded-circle p-2 shadow-sm flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                        <svg width="20" height="20" fill="none" stroke="#C9A84C" strokeWidth="1.8" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a15 15 0 00-9 15c1 1 3.5 2 6 2h6c2.5 0 5-1 6-2a15 15 0 00-9-15zM12 2v17" />
                        </svg>
                      </div>
                      <h4 className="font-serif text-base text-zinc-900 m-0 font-semibold tracking-wide">Florentine Lilies</h4>
                    </div>
                    <p className="text-[11px] text-[#5C5346] font-light leading-relaxed m-0">
                      <strong>Anti-Pollution & Clarifying:</strong> Purifies strands from Lahore&apos;s active smog, dust, and sebum buildup. Gently clarifies the scalp to restore volume, bounce, and absolute freshness in Pakistan&apos;s sweltering humidity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──── REVIEWS / TESTIMONIALS ──── */}
      <section className="py-6 bg-[#FAF7F2] border-top border-zinc-200 position-relative overflow-hidden">
        <div className="container-xl position-relative" style={{ zIndex: 3 }}>
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-5 reveal">
            <span className="section-label">Verified Love</span>
            <h2 className="section-title text-4xl sm:text-5xl text-[#1A1A1A] mt-2 mb-4">
              What Our Clients Say
            </h2>
            <div className="gold-divider my-4"></div>
            <p className="text-xs text-[#7A7060] font-light max-w-lg mx-auto">
              Read how imported Italian hair care has transformed locks all over Pakistan. Real stories from real salons and customers.
            </p>
          </div>

          {/* Toggle View Mode Button */}
          <div className="text-center mb-4">
            <div 
              className="d-inline-flex border border-[#DCD6CD] bg-[#FAF8F5] p-0"
              style={{ borderRadius: '25px', overflow: 'hidden' }}
            >
              <button 
                className="btn px-4 py-2 border-0 text-xs font-semibold"
                onClick={() => { 
                  setTmShowDirectory(false); 
                  setTmSearch(""); 
                  setTmCityFilter("All"); 
                  setTmBrandFilter("All");
                }}
                style={{ 
                  borderRadius: '25px 0 0 25px', 
                  backgroundColor: !tmShowDirectory ? '#EFE7DB' : 'transparent',
                  color: !tmShowDirectory ? '#5C5346' : '#8C8273',
                  transition: 'all 0.3s ease',
                  fontWeight: !tmShowDirectory ? 700 : 500,
                }}
              >
                ✨ Auto-Scroll Marquee
              </button>
              <div style={{ width: '1px', backgroundColor: '#DCD6CD' }} />
              <button 
                className="btn px-4 py-2 border-0 text-xs font-semibold"
                onClick={() => { 
                  setTmShowDirectory(true); 
                }}
                style={{ 
                  borderRadius: '0 25px 25px 0', 
                  backgroundColor: tmShowDirectory ? '#EFE7DB' : 'transparent',
                  color: tmShowDirectory ? '#5C5346' : '#8C8273',
                  transition: 'all 0.3s ease',
                  fontWeight: tmShowDirectory ? 700 : 500,
                }}
              >
                🔍 Search 100+ Reviews Directory
              </button>
            </div>
          </div>

          {/* 1. AUTO-SCROLL MARQUEE VIEW */}
          {!tmShowDirectory && (
            <div className="tm-scroller reveal">
              <div className="tm-marquee-row tm-marquee-row-left">
                {[...TESTIMONIALS.slice(0, 15), ...TESTIMONIALS.slice(0, 15)].map((t, idx) => (
                  <div key={`r1-${t.id}-${idx}`} className="tm-card">
                    <div className="tm-stars">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
                    <p className="tm-text">&ldquo;{t.text}&rdquo;</p>
                    <div className="tm-author-row">
                      <div className="tm-avatar">{t.initials}</div>
                      <div className="tm-meta">
                        <span className="tm-name">{t.name}</span>
                        <span className="tm-sub">{t.city} • {t.brand}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="tm-marquee-row tm-marquee-row-right">
                {[...TESTIMONIALS.slice(15, 30), ...TESTIMONIALS.slice(15, 30)].map((t, idx) => (
                  <div key={`r2-${t.id}-${idx}`} className="tm-card">
                    <div className="tm-stars">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
                    <p className="tm-text">&ldquo;{t.text}&rdquo;</p>
                    <div className="tm-author-row">
                      <div className="tm-avatar">{t.initials}</div>
                      <div className="tm-meta">
                        <span className="tm-name">{t.name}</span>
                        <span className="tm-sub">{t.city} • {t.brand}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. SEARCH DIRECTORY VIEW */}
          {tmShowDirectory && (
            <div className="reveal mt-4">
              
              {/* Filter controls */}
              <div className="row g-3 mb-4 justify-content-center">
                <div className="col-12 col-md-5">
                  <input
                    type="text"
                    className="of-input w-100"
                    placeholder="🔍 Search reviews (name, city, brand or issue)..."
                    value={tmSearch}
                    onChange={(e) => { setTmSearch(e.target.value); setTmShowDirectory(true); }}
                  />
                </div>
                <div className="col-6 col-md-3">
                  <select 
                    className="of-input w-100"
                    value={tmCityFilter}
                    onChange={(e) => { setTmCityFilter(e.target.value); setTmShowDirectory(true); }}
                  >
                    <option value="All">All Cities</option>
                    {["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur", "Sargodha", "Abbottabad"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <select 
                    className="of-input w-100"
                    value={tmBrandFilter}
                    onChange={(e) => { setTmBrandFilter(e.target.value); setTmShowDirectory(true); }}
                  >
                    <option value="All">All Brands</option>
                    {["MAXY LOOK", "UNA", "VERSUM 2.0", "GENUS"].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* City quick badges */}
              <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                {["All", "Lahore", "Karachi", "Islamabad", "Faisalabad", "Rawalpindi", "Peshawar", "Multan"].map(c => (
                  <button
                    key={c}
                    onClick={() => { setTmCityFilter(c); setTmShowDirectory(true); }}
                    className={`btn btn-sm rounded-pill px-3 py-1 text-xs border ${
                      tmCityFilter === c 
                        ? 'btn-dark border-dark' 
                        : 'btn-light border-zinc-300 text-zinc-700'
                    }`}
                  >
                    {c === "All" ? "📍 All Pakistan" : c}
                  </button>
                ))}
              </div>

              {/* Filtered reviews grid */}
              {(() => {
                const sQuery = tmSearch.toLowerCase();
                const filtered = TESTIMONIALS.filter((t) => {
                  const matchesSearch = 
                    t.name.toLowerCase().includes(sQuery) ||
                    t.city.toLowerCase().includes(sQuery) ||
                    t.text.toLowerCase().includes(sQuery) ||
                    t.product.toLowerCase().includes(sQuery);
                  const matchesCity = tmCityFilter === "All" || t.pureCity === tmCityFilter;
                  const matchesBrand = tmBrandFilter === "All" || t.brand === tmBrandFilter;
                  return matchesSearch && matchesCity && matchesBrand;
                });

                const visibleList = filtered.slice(0, tmVisibleCount);

                return (
                  <div>
                    {filtered.length === 0 ? (
                      <p className="text-center text-zinc-500 py-5 text-sm">No reviews found matching your search options.</p>
                    ) : (
                      <>
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                          {visibleList.map((t) => (
                            <div key={`grid-${t.id}`} className="col">
                              <div className="tm-card h-100 w-100">
                                <div className="tm-stars">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
                                <p className="tm-text">&ldquo;{t.text}&rdquo;</p>
                                <div className="tm-author-row">
                                  <div className="tm-avatar">{t.initials}</div>
                                  <div className="tm-meta">
                                    <span className="tm-name">{t.name}</span>
                                    <span className="tm-sub">{t.city} • {t.brand}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {filtered.length > tmVisibleCount && (
                          <div className="text-center mt-5">
                            <button
                              className="of-btn-primary"
                              onClick={() => setTmVisibleCount(prev => prev + 6)}
                            >
                              Show More Reviews ({filtered.length - tmVisibleCount} remaining)
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })()}

            </div>
          )}

        </div>
      </section>

      {/* ──── ORDER SECTION ──── */}
      <section id="order" className="of-section position-relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="of-blob of-blob-1" aria-hidden="true"/>
        <div className="of-blob of-blob-2" aria-hidden="true"/>
        <div className="of-blob of-blob-3" aria-hidden="true"/>

        <div className="container-xl position-relative" style={{zIndex:2}}>

          {/* ── Section header ── */}
          <div className="of-header reveal">
            <span className="of-eyebrow">🇮🇹 Imported from Italy · Available in Pakistan</span>
            <h2 className="of-title">
              Order Professional <br className="d-none d-md-inline" /> <em>Italian Hair Care</em>
            </h2>
            <p className="of-subtitle">
              Authentic Italian professional hair care delivered to your door across Pakistan.
              All prices in PKR. COD available. Free delivery above ₨5,000.
            </p>
          </div>

          {/* ── Animated Feature Cards ── */}
          <div className="of-cards-grid reveal">
            {[
              { icon: "🧴", title: "276+ Products", sub: "MAXY LOOK, UNA, VERSUM 2.0 & GENUS", color: "#C9A84C" },
              { icon: "🇵🇰", title: "Pakistan Delivery", sub: "Lahore, Karachi, Islamabad & all cities", color: "#4CAF82" },
              { icon: "💳", title: "COD Available", sub: "Pay on delivery · Bank Transfer accepted", color: "#6B8ED6" },
              { icon: "✈️", title: "Direct Import", sub: "Genuine Italian products, no middlemen", color: "#E8856A" },
              { icon: "⭐", title: "Salon Quality", sub: "Professional grade — used by top salons", color: "#A855F7" },
              { icon: "📦", title: "Free Delivery", sub: "On orders above ₨5,000 in Lahore", color: "#EC4899" },
            ].map((card, i) => (
              <div key={card.title} className="of-feature-card" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="of-feature-icon" style={{ color: card.color }}>{card.icon}</div>
                <div className="of-feature-body">
                  <h4 className="of-feature-title">{card.title}</h4>
                  <p className="of-feature-sub">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="of-cta-row reveal">
            <button
              onClick={() => { setIsOrderFormOpen(true); setOrderStep(1); }}
              className="of-cta-btn"
            >
              <span className="of-cta-btn-icon">🛒</span>
              Place Your Order Now
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </button>
            <div className="of-cta-trust">
              <span>🔒 Secure</span>
              <span>✓ Genuine Italian</span>
              <span>📞 WhatsApp Support</span>
            </div>
          </div>

        </div>
      </section>

      {/* ──── 5-STEP ORDER FORM MODAL ──── */}
      {isOrderFormOpen && (
        <div className="of-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) resetOrderForm(); }}>
          <div className="of-modal">

            {/* Modal Header */}
            <div className="of-modal-header">
              <div>
                <p className="of-modal-eyebrow">Italia Cosmetics Pakistan</p>
                <h3 className="of-modal-title">Place Your Order</h3>
              </div>
              <button className="of-modal-close" onClick={resetOrderForm} aria-label="Close">✕</button>
            </div>

            {/* Step Progress Bar */}
            {!orderFormSuccess && (
              <div className="of-progress">
                {["Info", "Products", "Cart", "Delivery", "Confirm"].map((label, idx) => (
                  <div key={label} className={`of-progress-step ${orderStep > idx + 1 ? "done" : ""} ${orderStep === idx + 1 ? "active" : ""}`}>
                    <div className="of-progress-dot">
                      {orderStep > idx + 1 ? "✓" : idx + 1}
                    </div>
                    <span className="of-progress-label">{label}</span>
                    {idx < 4 && <div className={`of-progress-line ${orderStep > idx + 1 ? "done" : ""}`}/>}
                  </div>
                ))}
              </div>
            )}

            {/* ── STEP 1: Customer Info ── */}
            {orderStep === 1 && (
              <div className="of-step-body">
                <h4 className="of-step-title">📋 Your Contact Details</h4>
                <p className="of-step-sub">We&apos;ll use this to confirm and deliver your order.</p>

                {ofCart.length > 0 && (
                  <div className="p-3 bg-[#C9A84C]/5 border border-[#C9A84C]/25 rounded-xl mb-4 text-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A84C] d-block mb-2">🛍 Selected Products</span>
                    <div className="space-y-2">
                      {ofCart.map(item => (
                        <div key={item.product.id} className="d-flex justify-content-between align-items-center text-xs">
                          <span className="text-zinc-800 font-medium truncate max-w-[70%]">
                            {item.product.brand} — {item.product.name}
                          </span>
                          <span className="text-zinc-900 font-bold font-serif">
                            {item.qty} × {formatPKR(item.product.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="of-form-grid">
                  <div className="of-field">
                    <label className="of-label">Full Name *</label>
                    <input className="of-input" placeholder="e.g. Ali Hassan" value={ofName} onChange={e => setOfName(e.target.value)} required/>
                  </div>
                  <div className="of-field">
                    <label className="of-label">Phone Number *</label>
                    <input className="of-input" placeholder="03XX-XXXXXXX" value={ofPhone} onChange={e => setOfPhone(e.target.value)} required/>
                  </div>
                  <div className="of-field">
                    <label className="of-label">WhatsApp (optional)</label>
                    <input className="of-input" placeholder="Same as phone if blank" value={ofWhatsapp} onChange={e => setOfWhatsapp(e.target.value)}/>
                  </div>
                  <div className="of-field">
                    <label className="of-label">Email (optional)</label>
                    <input className="of-input" type="email" placeholder="your@email.com" value={ofEmail} onChange={e => setOfEmail(e.target.value)}/>
                  </div>
                  <div className="of-field">
                    <label className="of-label">City *</label>
                    <select className="of-input" value={ofCity} onChange={e => setOfCity(e.target.value)}>
                      <option value="">Select City</option>
                      {["Lahore","Karachi","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Gujranwala","Hyderabad","Bahawalpur","Other"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="of-field of-field-full">
                    <label className="of-label">Delivery Address *</label>
                    <textarea className="of-input" rows={2} placeholder="Street, Area, City, Postal Code" value={ofAddress} onChange={e => setOfAddress(e.target.value)}/>
                  </div>
                </div>
                <div className="of-step-nav">
                  <span/>
                  <button className="of-btn-primary" disabled={!ofName || !ofPhone || !ofCity || !ofAddress} onClick={() => setOrderStep(ofCart.length > 0 ? 3 : 2)}>
                    {ofCart.length > 0 ? "Next: Review Cart →" : "Next: Select Products →"}
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Product Selection ── */}
            {orderStep === 2 && (
              <div className="of-step-body">
                <h4 className="of-step-title">🛍 Select Products</h4>
                <p className="of-step-sub">Browse all 276 authentic Italian products. Tap to add to your order.</p>

                {/* Filters */}
                <div className="of-filter-bar">
                  <input className="of-search-input" placeholder="🔍 Search product name or brand..." value={ofSearch} onChange={e => setOfSearch(e.target.value)}/>
                  <select className="of-input of-select-sm" value={ofBrandFilter} onChange={e => setOfBrandFilter(e.target.value)}>
                    {["All","MAXY LOOK","UNA","VERSUM 2.0","GENUS"].map(b => <option key={b}>{b}</option>)}
                  </select>
                  <select className="of-input of-select-sm" value={ofCatFilter} onChange={e => setOfCatFilter(e.target.value)}>
                    <option value="all">All Categories</option>
                    <option value="shampoos">Shampoos</option>
                    <option value="conditioners-masks">Conditioners &amp; Masks</option>
                    <option value="styling-finishing">Styling &amp; Finishing</option>
                    <option value="technical-coloring">Technical &amp; Coloring</option>
                    <option value="treatments-serums">Treatments &amp; Serums</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Product Grid */}
                <div className="of-product-grid">
                  {ofFilteredProducts.slice(0, 60).map(p => {
                    const inCart = ofCart.find(i => i.product.id === p.id);
                    return (
                      <button key={p.id} className={`of-product-tile ${inCart ? "selected" : ""}`} onClick={() => ofAddProduct(p)}>
                        <span className="of-tile-brand">{p.brand}</span>
                        <span className="of-tile-name">{p.name}</span>
                        <span className="of-tile-price">{formatPKR(p.price)}</span>
                        {inCart && <span className="of-tile-badge">{inCart.qty} ✓</span>}
                      </button>
                    );
                  })}
                  {ofFilteredProducts.length === 0 && (
                    <p className="of-empty-msg">No products match your filters.</p>
                  )}
                  {ofFilteredProducts.length > 60 && (
                    <p className="of-empty-msg">Showing first 60 results. Refine your search for more.</p>
                  )}
                </div>

                <div className="of-step-nav">
                  <button className="of-btn-ghost" onClick={() => setOrderStep(1)}>← Back</button>
                  <button className="of-btn-primary" disabled={ofCart.length === 0} onClick={() => setOrderStep(3)}>
                    Review Cart ({ofCart.length}) →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Cart Review ── */}
            {orderStep === 3 && (
              <div className="of-step-body">
                <h4 className="of-step-title">🧺 Your Order Cart</h4>
                <p className="of-step-sub">Adjust quantities or remove items before confirming.</p>

                <div className="of-cart-list">
                  {ofCart.map(item => (
                    <div key={item.product.id} className="of-cart-row">
                      <div className="of-cart-info">
                        <span className="of-cart-brand">{item.product.brand}</span>
                        <span className="of-cart-name">{item.product.name}</span>
                        <span className="of-cart-unit">{formatPKR(item.product.price)} each</span>
                      </div>
                      <div className="of-cart-controls">
                        <button className="of-qty-btn" onClick={() => ofUpdateQty(item.product.id, -1)}>−</button>
                        <span className="of-qty-val">{item.qty}</span>
                        <button className="of-qty-btn" onClick={() => ofUpdateQty(item.product.id, 1)}>+</button>
                        <button className="of-remove-btn" onClick={() => ofRemove(item.product.id)}>🗑</button>
                      </div>
                      <span className="of-cart-subtotal">{formatPKR(item.product.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                <div className="of-cart-total-row">
                  <span>Order Total</span>
                  <span className="of-cart-grand-total">{formatPKR(ofTotal)}</span>
                </div>
                {ofTotal >= 5000 && <p className="of-free-delivery-badge">🎉 You qualify for free delivery!</p>}

                <div className="of-step-nav">
                  <button className="of-btn-ghost" onClick={() => setOrderStep(2)}>← Add More</button>
                  <button className="of-btn-primary" disabled={ofCart.length === 0} onClick={() => setOrderStep(4)}>
                    Delivery Details →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 4: Delivery & Payment ── */}
            {orderStep === 4 && (
              <div className="of-step-body">
                <h4 className="of-step-title">🚚 Delivery & Payment</h4>
                <p className="of-step-sub">Choose how you&apos;d like to pay and add any notes.</p>

                <div className="of-payment-options">
                  {[
                    { val: "Bank Transfer", label: "Bank Transfer", sub: "100% Prepayment Required", icon: "🏦" },
                  ].map(opt => (
                    <button
                      key={opt.val}
                      className={`of-payment-card ${ofPayment === opt.val ? "selected" : ""}`}
                      onClick={() => setOfPayment(opt.val)}
                      type="button"
                    >
                      <span className="of-pay-icon">{opt.icon}</span>
                      <span className="of-pay-label">{opt.label}</span>
                      <span className="of-pay-sub">{opt.sub}</span>
                    </button>
                  ))}
                </div>

                {ofPayment === "Bank Transfer" && (
                  <div className="mt-4 p-4 bg-[#C9A84C]/5 border border-[#C9A84C]/25 rounded-xl text-start animate-fade-up">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="fs-5">🏦</span>
                      <h5 className="font-sans font-bold text-xs uppercase tracking-wider text-[#C9A84C] mb-0">Bank Account Details (100% Payment)</h5>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="d-flex justify-content-between py-1 border-bottom border-zinc-200/50">
                        <span className="text-zinc-500">Bank Name</span>
                        <strong className="text-zinc-900">HBL</strong>
                      </div>
                      <div className="d-flex justify-content-between py-1 border-bottom border-zinc-200/50">
                        <span className="text-zinc-500">Account Title</span>
                        <strong className="text-zinc-900">M NUMAN LATIF</strong>
                      </div>
                      <div className="d-flex justify-content-between py-1 border-bottom border-zinc-200/50">
                        <span className="text-zinc-500">Account Number</span>
                        <strong className="text-zinc-900 font-serif">23597000424803</strong>
                      </div>
                      <div className="d-flex justify-content-between py-1 border-bottom border-zinc-200/50">
                        <span className="text-zinc-500">IBAN</span>
                        <strong className="text-zinc-900 font-serif">PK04HABB0023597000424803</strong>
                      </div>
                      <div className="d-flex justify-content-between py-1">
                        <span className="text-zinc-500">Branch</span>
                        <strong className="text-zinc-900">CHEN ONE TOWER BRANCH</strong>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-top border-zinc-200/50">
                      <label className="of-label text-[#C9A84C] font-bold d-block mb-1">Upload Payment Receipt *</label>
                      <p className="text-[10px] text-zinc-500 font-light leading-relaxed mb-3">
                        Please pay <strong>{formatPKR(ofTotal)}</strong> via bank app and upload screenshot receipt below.
                      </p>
                      
                      <div className="d-flex align-items-center gap-2">
                        <label className="flex-grow-1 border border-dashed border-[#C9A84C]/50 rounded-lg p-3 text-center cursor-pointer hover:bg-[#C9A84C]/5 transition-colors d-flex flex-column align-items-center justify-content-center">
                          <input 
                            type="file" 
                            accept="image/*,application/pdf" 
                            className="d-none" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setOfReceiptName(file.name);
                                setOfReceiptLoading(true);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setOfReceipt(reader.result as string);
                                  setOfReceiptLoading(false);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <span className="text-lg">📸</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-600 mt-1">
                            {ofReceiptName ? "Change File" : "Choose Image / PDF"}
                          </span>
                        </label>
                      </div>
                      
                      {ofReceiptLoading && <p className="text-[10px] text-[#C9A84C] mt-2 mb-0">Processing receipt...</p>}
                      
                      {ofReceipt && !ofReceiptLoading && (
                        <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg d-flex align-items-center justify-content-between text-[10px]">
                          <span className="text-emerald-700 font-medium truncate max-w-[80%]">✓ {ofReceiptName}</span>
                          <button 
                            type="button" 
                            className="border-0 bg-transparent text-zinc-400 hover:text-zinc-600 p-0 font-bold"
                            onClick={() => { setOfReceipt(""); setOfReceiptName(""); }}
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="of-field mt-4">
                  <label className="of-label">Delivery Note (optional)</label>
                  <textarea className="of-input" rows={2} placeholder="Landmark, gate number, preferred delivery time..." value={ofDeliveryNote} onChange={e => setOfDeliveryNote(e.target.value)}/>
                </div>

                {/* Summary preview */}
                <div className="of-summary-preview">
                  <div><span>Delivering to:</span><strong>{ofName} · {ofCity}</strong></div>
                  <div><span>Items:</span><strong>{ofCart.length} products</strong></div>
                  <div><span>Total:</span><strong>{formatPKR(ofTotal)}</strong></div>
                  <div><span>Payment:</span><strong>{ofPayment}</strong></div>
                </div>

                <div className="of-step-nav">
                  <button className="of-btn-ghost" onClick={() => setOrderStep(3)}>← Back</button>
                  <button 
                    className="of-btn-primary" 
                    disabled={(ofPayment === "Bank Transfer" && !ofReceipt) || ofReceiptLoading} 
                    onClick={() => setOrderStep(5)}
                  >
                    Review & Confirm →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 5: Confirm & Submit ── */}
            {orderStep === 5 && !orderFormSuccess && (
              <div className="of-step-body">
                <h4 className="of-step-title">✅ Confirm Your Order</h4>
                <p className="of-step-sub">Please review everything before submitting.</p>

                <div className="of-confirm-block">
                  <div className="of-confirm-section">
                    <h5 className="of-confirm-heading">Customer Details</h5>
                    <div className="of-confirm-row"><span>Name</span><strong>{ofName}</strong></div>
                    <div className="of-confirm-row"><span>Phone</span><strong>{ofPhone}</strong></div>
                    {ofEmail && <div className="of-confirm-row"><span>Email</span><strong>{ofEmail}</strong></div>}
                    <div className="of-confirm-row"><span>Address</span><strong>{ofAddress}, {ofCity}</strong></div>
                  </div>
                  <div className="of-confirm-section">
                    <h5 className="of-confirm-heading">Order Items</h5>
                    {ofCart.map(item => (
                      <div key={item.product.id} className="of-confirm-row">
                        <span>{item.product.name} ×{item.qty}</span>
                        <strong>{formatPKR(item.product.price * item.qty)}</strong>
                      </div>
                    ))}
                    <div className="of-confirm-row of-confirm-total">
                      <span>Grand Total</span>
                      <strong>{formatPKR(ofTotal)}</strong>
                    </div>
                  </div>
                  <div className="of-confirm-section">
                    <h5 className="of-confirm-heading">Payment Method</h5>
                    <div className="of-confirm-row"><span>Method</span><strong>{ofPayment}</strong></div>
                    {ofPayment === "Bank Transfer" && ofReceiptName && (
                      <div className="of-confirm-row"><span>Receipt Proof</span><strong className="text-emerald-600">✓ {ofReceiptName}</strong></div>
                    )}
                    {ofDeliveryNote && <div className="of-confirm-row"><span>Note</span><strong>{ofDeliveryNote}</strong></div>}
                  </div>
                </div>

                {orderFormError && <p className="of-error-msg">{orderFormError}</p>}

                <div className="of-step-nav">
                  <button className="of-btn-ghost" onClick={() => setOrderStep(4)}>← Edit</button>
                  <button
                    className="of-btn-submit"
                    onClick={handleOrderFormSubmit}
                    disabled={orderFormSubmitting || (ofPayment === "Bank Transfer" && !ofReceipt)}
                  >
                    {orderFormSubmitting ? (
                      <><span className="of-spinner"/>&nbsp;Submitting...</>
                    ) : (
                      <>🚀 Submit Order</>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ── SUCCESS STATE ── */}
            {orderFormSuccess && (
              <div className="of-success-body">
                <div className="of-success-icon">🎉</div>
                <h3 className="of-success-title">Order Placed!</h3>
                <p className="of-success-msg">
                  Thank you, <strong>{ofName}</strong>! Your order has been received.
                  Our team will contact you on <strong>{ofPhone}</strong> to confirm delivery.
                </p>
                <div className="of-success-details">
                  <div><span>Total Amount</span><strong>{formatPKR(ofTotal)}</strong></div>
                  <div><span>Payment</span><strong>{ofPayment}</strong></div>
                  <div><span>City</span><strong>{ofCity}</strong></div>
                </div>
                <button className="of-btn-primary mt-4" onClick={resetOrderForm}>Close</button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ──── FOOTER ──── */}
      <footer className="footer-shell" role="contentinfo">

        {/* ── Top wave divider ── */}
        <div className="footer-wave-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#1A1F1C"/>
          </svg>
        </div>

        <div className="container-xl position-relative" style={{zIndex:2}}>

          {/* ── Main grid ── */}
          <div className="footer-main-grid">

            {/* ─ Brand column ─ */}
            <div className="footer-brand-col">
              <Image
                src="/logo.svg"
                alt="Italia Cosmetics"
                width={150}
                height={48}
                className="footer-logo"
              />
              <p className="footer-brand-desc">
                Timeless Italian beauty formulas crafted with dawn-harvested botanicals and organic science — born in Tuscany, cherished worldwide.
              </p>

              {/* Social icons */}
              <div className="footer-social-row">
                {[
                  { label: "Instagram", href: "https://www.instagram.com/italiacosmeticslahore/", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                  { label: "Facebook", href: "https://www.facebook.com/italiacosmeticsofficial", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                  { label: "TikTok", href: "https://www.tiktok.com/@italiacosmeticsofficial",  path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label={s.label} title={s.label}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d={s.path}/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* ─ Shop Products ─ */}
            <div className="footer-links-col">
              <div className="footer-col-header">
                <span className="footer-col-icon">🛍</span>
                <h4 className="footer-col-title">Shop Products</h4>
              </div>
              <div className="footer-card-links">
                {[
                  { label: "Professional Shampoos", icon: "🧴", cat: "shampoos",            sub: "Cleanse & Restore" },
                  { label: "Masks & Conditioners",  icon: "✨", cat: "conditioners-masks",   sub: "Nourish & Repair" },
                  { label: "Styling & Finishing",   icon: "💎", cat: "styling-finishing",    sub: "Perfect Your Look" },
                  { label: "Technical & Coloring",  icon: "🎨", cat: "technical-coloring",   sub: "Vibrant Colour Science" },
                ].map((item, i) => (
                  <a
                    key={item.cat}
                    href="#collection"
                    className="footer-card-link"
                    style={{ animationDelay: `${i * 80}ms` }}
                    onClick={() => setSelectedCategory(item.cat)}
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
                  <a
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
                  </a>
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


      {/* ──── QUICK VIEW MODAL ──── */}
      {quickViewProduct && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: 'rgba(26,26,26,0.65)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
          onClick={() => setQuickViewProduct(null)}
        >
          {/* Modal Panel — stop click propagation */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#FAF7F2',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
              maxWidth: '820px',
              width: '100%',
              border: '1px solid rgba(201,168,76,0.3)',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              position: 'relative',
              animation: 'fadeUp 0.25s ease',
              maxHeight: '90vh',
            }}
          >
            {/* ── Close Button ── */}
            <button
              onClick={() => setQuickViewProduct(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                background: 'rgba(255,255,255,0.85)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              }}
            >
              <svg width="16" height="16" fill="none" stroke="#333" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            {/* ── Left: Product Image ── */}
            <div style={{ flex: '0 0 45%', minWidth: '280px', position: 'relative', minHeight: '400px', background: '#f0ece5', overflow: 'hidden' }}>
              <Image
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                fill
                className="object-contain"
                style={{ padding: '16px', transition: 'transform 0.6s ease' }}
              />
              {/* Category badge */}
              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(201,168,76,0.4)',
                  borderRadius: '100px',
                  padding: '3px 10px',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#8a6c2c',
                }}
              >
                {quickViewProduct.category}
              </span>
              {/* Brand badge */}
              <span
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '100px',
                  padding: '4px 12px',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                {quickViewProduct.brand}
              </span>
            </div>

            {/* ── Right: Product Info ── */}
            <div style={{ flex: '1 1 300px', padding: '32px 28px', display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: '90vh' }}>
              
              {/* Brand & Name */}
              <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '4px' }}>
                {quickViewProduct.brand}
              </p>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.3, margin: 0 }}>
                {quickViewProduct.name}
              </h3>

              {/* Star Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} width="14" height="14" fill={star <= Math.round(quickViewProduct.rating) ? '#C9A84C' : '#e2e2e2'} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: '10px', color: '#aaa', fontWeight: 600, letterSpacing: '0.06em' }}>
                  {quickViewProduct.rating} / 5
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'linear-gradient(to right, #e5e0d8, transparent)', margin: '16px 0' }}/>

              {/* Description */}
              <p style={{ fontSize: '12px', color: '#5a5045', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                {quickViewProduct.description}
              </p>

              {/* Ingredients */}
              {quickViewProduct.ingredients && (
                <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '12px', padding: '12px' }}>
                  <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: '#C9A84C', textTransform: 'uppercase', marginBottom: '4px' }}>Active Botanical Blend</p>
                  <p style={{ fontSize: '10px', color: '#7A7060', lineHeight: 1.6, margin: 0 }}>{quickViewProduct.ingredients}</p>
                </div>
              )}

              {/* Usage */}
              {quickViewProduct.usage && (
                <div style={{ marginTop: '12px' }}>
                  <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>How To Use</p>
                  <p style={{ fontSize: '10px', color: '#7A7060', lineHeight: 1.6, margin: 0 }}>{quickViewProduct.usage}</p>
                </div>
              )}

              {/* Badges */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
                {quickViewProduct.size && (
                  <span style={{ background: '#fff', border: '1px solid #e2ddd5', borderRadius: '100px', padding: '4px 12px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', color: '#555', textTransform: 'uppercase' }}>
                    📦 {quickViewProduct.size}
                  </span>
                )}
                <span style={{ background: '#fff', border: '1px solid #e2ddd5', borderRadius: '100px', padding: '4px 12px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', color: '#555', textTransform: 'uppercase' }}>
                  🇮🇹 Made in Italy
                </span>
              </div>

              {/* Price + Quantity */}
              <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #e8e2d9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', color: '#bbb', textTransform: 'uppercase', margin: 0 }}>Price</p>
                    <p style={{ fontSize: '22px', fontWeight: 700, color: '#111', fontFamily: 'serif', margin: 0 }}>{formatPKR(quickViewProduct.price)}</p>
                  </div>
                  {/* Quantity Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #ddd', borderRadius: '100px', overflow: 'hidden', background: '#fff' }}>
                    <button
                      onClick={() => {
                        const el = document.getElementById(`qv-qty-${quickViewProduct.id}`) as HTMLInputElement;
                        if (el && parseInt(el.value) > 1) el.value = String(parseInt(el.value) - 1);
                      }}
                      style={{ width: '36px', height: '36px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >−</button>
                    <input
                      id={`qv-qty-${quickViewProduct.id}`}
                      type="number"
                      defaultValue={1}
                      min={1}
                      max={99}
                      style={{ width: '36px', textAlign: 'center', border: 'none', background: 'transparent', fontSize: '13px', fontWeight: 700, color: '#111', outline: 'none' }}
                    />
                    <button
                      onClick={() => {
                        const el = document.getElementById(`qv-qty-${quickViewProduct.id}`) as HTMLInputElement;
                        if (el) el.value = String(parseInt(el.value) + 1);
                      }}
                      style={{ width: '36px', height: '36px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >+</button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

                  <button
                    onClick={() => {
                      startOrderWithProducts([quickViewProduct]);
                      setQuickViewProduct(null);
                    }}
                    style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, #1A1A1A, #2D2D2D)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ──── ORDER SUCCESS RECEIPT OVERLAY ──── */}
      {placedOrder && (
        <div className="fixed inset-0 z-[1050] d-flex items-center justify-center p-4">
          <div 
            onClick={() => setPlacedOrder(null)}
            className="position-absolute inset-0 bg-[#1A1A1A]/70 backdrop-blur-md"
          ></div>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-md w-100 border border-[#C9A84C] position-relative z-10 p-4 p-md-5 text-center animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-500/30 d-flex align-items-center justify-center text-3xl mx-auto mb-6">
              ✓
            </div>
            
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">Order Confirmed</span>
            <h3 className="font-serif text-2xl text-zinc-950 mt-1 mb-2">Grazie Mille, {shippingName}!</h3>
            <p className="text-xs text-[#7A7060] font-light leading-relaxed mb-6">
              Your order has been successfully placed. Our Italian courier concierge is preparing your selection.
            </p>

            {/* Receipt Summary */}
            <div className="bg-[#FAF7F2] border border-zinc-200/60 rounded-2xl p-5 text-left mb-6 space-y-3">
              <div className="d-flex justify-content-between align-items-center text-[10px] border-bottom border-zinc-200/80 pb-2">
                <span className="font-bold text-zinc-400 uppercase tracking-wider">Order Code</span>
                <span className="font-mono font-bold text-zinc-900">{placedOrder.number}</span>
              </div>
              
              <div className="max-h-40 overflow-y-auto space-y-2 py-1">
                {placedOrder.items.map((item) => (
                  <div key={item.product.id} className="d-flex justify-between text-[11px]">
                    <span className="text-zinc-600 font-light truncate max-w-[200px]">
                      {item.product.name} <span className="font-bold text-zinc-400">x{item.quantity}</span>
                    </span>
                    <span className="font-semibold text-zinc-900">{formatPKR(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between align-items-center text-xs border-top border-zinc-200 pt-3 font-bold text-zinc-900 font-serif">
                <span>Total Paid</span>
                <span>{formatPKR(placedOrder.total)}</span>
              </div>
            </div>

            <button
              onClick={() => setPlacedOrder(null)}
              className="w-100 py-3 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#C9A84C] transition-colors border-0"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
