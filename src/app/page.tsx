'use client';

import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useData } from '@/lib/data-context';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  Droplets,
  Truck,
  Leaf,
  Headphones,
  ShieldCheck,
  Package,
  Layers,
  MapPin,
  Building2,
  X,
  MessageCircle,
  Plus,
  Minus,
  CheckCircle2,
  Flame,
  Clock,
  Award,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { products, categories, settings } = useData();

  // Hero Search State
  const [heroSearch, setHeroSearch] = useState('');
  const [heroSearchFocused, setHeroSearchFocused] = useState(false);

  // In-page Featured Products Filter
  const [featuredCategory, setFeaturedCategory] = useState<string>('all');
  const [featuredSearch, setFeaturedSearch] = useState<string>('');

  // Hero parallax scroll ref
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(heroScrollProgress, [0, 0.85], [1, 0]);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive Master Spotlight Showcase (3 Switchable Signature Formulations)
  const [activeSpotlightIdx, setActiveSpotlightIdx] = useState(0);

  const spotlightList = useMemo(() => {
    const p1 = products.find((p) => p.slug === 'luxury-hotel-fragrance-oil' || p.id === 'sm-527') || products[0];
    const p2 = products.find((p) => p.slug === 'basil-essential-oil' || p.id === 'sm-192') || products[1];
    const p3 = products.find((p) => p.slug === 'bergamot-fragrance-oil-for-candle-making' || p.id === 'sm-563') || products[2];

    return [
      {
        product: p1,
        tabTitle: 'Hotel Fragrance (SMI-0527)',
        badge: 'BESTSELLER • SIGNATURE BLEND',
        sku: p1?.sku || 'SMI-0527',
        categoryLabel: 'Ambient Scenting • Cold Mist',
        notes: ['Bergamot & Fig', 'White Tea & Lily', 'Amber & Cedar'],
        purity: 'High-Concentrate Diffusion Essence',
      },
      {
        product: p2,
        tabTitle: 'Pure Basil Oil (SMI-0192)',
        badge: '100% PURE BOTANICAL',
        sku: p2?.sku || 'SMI-0192',
        categoryLabel: 'Single-Origin Steam Distilled',
        notes: ['Sweet Herbaceous', 'Camphorous Linalool', 'Spicy Warmth'],
        purity: 'Zero Solvents • 99.9% Purity GC-MS',
      },
      {
        product: p3,
        tabTitle: 'Bergamot Candle (SMI-0563)',
        badge: 'CANDLE & SOAP ESSENCE',
        sku: p3?.sku || 'SMI-0563',
        categoryLabel: 'High Flashpoint • Soy & Beeswax',
        notes: ['Calabrian Bergamot', 'Earl Grey Accord', 'Warm Woody Musk'],
        purity: 'Maximum Cold & Hot Scent Throw',
      },
    ];
  }, [products]);

  // Live Hero Search Suggestions (max 5)
  const heroSuggestions = useMemo(() => {
    if (!heroSearch.trim()) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(heroSearch.toLowerCase()) ||
          (p.categoryName ? p.categoryName.toLowerCase().includes(heroSearch.toLowerCase()) : false) ||
          (p.sku ? p.sku.toLowerCase().includes(heroSearch.toLowerCase()) : false)
      )
      .slice(0, 5);
  }, [products, heroSearch]);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/shop?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      router.push('/shop');
    }
  };

  // Curated Featured Products
  const featuredProductsList = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = featuredCategory === 'all' || p.categoryId === featuredCategory;
        const matchesSearch =
          !featuredSearch.trim() ||
          p.name.toLowerCase().includes(featuredSearch.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(featuredSearch.toLowerCase()) ||
          (p.sku && p.sku.toLowerCase().includes(featuredSearch.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .slice(0, 8);
  }, [products, featuredCategory, featuredSearch]);

  const promotionalFaqs = [
    {
      q: 'How do I avail Free Shipping across India?',
      a: 'We offer complimentary, fully covered shipping across India on all online and trade inquiries. All orders are packed with heavy-duty cushioning and dispatched directly from our Coimbatore facility via express air/surface couriers.',
    },
    {
      q: 'Are all SenseMe oils 100% natural and cruelty-free?',
      a: 'Yes. Our botanical essential oils are 100% steam-distilled and cold-pressed with zero synthetic carriers, zero solvent residues, and absolutely zero animal testing. Full Certificates of Analysis (COA) and GC-MS test reports are provided on request.',
    },
    {
      q: 'How does WhatsApp Online Support & Ordering work?',
      a: 'Simply browse any product or click "Chat on WhatsApp". Our expert formulation team in Coimbatore assists you in real-time with volume availability, batch pricing, GST billing, and immediate dispatch scheduling.',
    },
    {
      q: 'Do you offer bulk wholesale supplies for manufacturers?',
      a: 'Yes. Operating under Mylal Exports in Coimbatore, we supply tiered commercial quantities ranging from 1kg aluminium bottles to 25kg UN-certified drums for soap makers, candle crafters, cosmetic labs, and hotel aroma installations.',
    },
    {
      q: 'Can SenseMe handle custom OEM branding & private labeling?',
      a: 'Absolutely. We provide end-to-end turnkey contract compounding, custom fragrance formulation, amber bottle filling, and private labeling with your custom brand identity.',
    },
  ];

  return (
    <div className="bg-[#FAFAF7] text-[#171717] overflow-hidden">
      {/* ========================================================================= */}
      {/* 01 — HERO: CINEMATIC LUXURY DISCOVERY & INTERACTIVE FORMULATION SHOWCASE */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col justify-between pt-24 sm:pt-32 pb-8 px-4 sm:px-8 md:px-12 bg-[#FAFAF7] overflow-hidden border-b border-[#E6E2D9]"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/4 right-1/4 w-[42rem] h-[42rem] bg-[#F2F0EA]/80 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#E6E2D9]/30 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Top Heritage & Origin Bar */}
        <div className="container-editorial flex flex-wrap items-center justify-between gap-3 z-10 mb-4 sm:mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white border border-[#E6E2D9] p-1 flex items-center justify-center shadow-2xs">
              <Image
                src="/logo-transparent.png"
                alt="SenseMe Official Seal"
                width={22}
                height={22}
                className="object-contain"
              />
            </div>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.24em] uppercase text-[#171717] font-bold">
              SENSEME INDIA • BOTANICAL DISTILLERY
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#686660]">
            <span className="flex items-center gap-1.5 font-semibold text-[#B89B6A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              EST. COIMBATORE, TAMIL NADU
            </span>
            <span className="hidden md:inline border-l border-[#E6E2D9] pl-3">
              195+ PURE BOTANICAL FORMULATIONS
            </span>
          </div>
        </div>

        {/* Main Hero Split Layout */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="container-editorial my-auto py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center z-10"
        >
          {/* Left: Headline, Description, Search, and Category Pills */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6E2D9] text-[#B89B6A] shadow-2xs font-mono text-[10px] sm:text-[11px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#B89B6A]" />
                DIRECT BOTANICAL DISTILLATION & COMPOUNDING
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.3rem] font-bold text-[#171717] tracking-tight leading-[1.0] text-balance">
                Crafted for the Way <br />
                <span className="font-editorial italic font-normal text-[#B89B6A]">
                  Scent is
                </span>{' '}
                Experienced.
              </h1>

              <p className="text-xs sm:text-base text-[#686660] font-sans leading-relaxed max-w-lg">
                Single-origin steam-distilled essential oils, luxury ambient diffuser blends, and candle fragrances compounded with certified purity under Mylal Exports, Coimbatore.
              </p>
            </motion.div>

            {/* Interactive Search Bar on Hero */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="relative max-w-lg"
            >
              <form onSubmit={handleHeroSearchSubmit} className="relative">
                <div className="flex items-center bg-white border border-[#E6E2D9] focus-within:border-[#B89B6A] focus-within:ring-2 focus-within:ring-[#B89B6A]/10 rounded-xl shadow-xs transition-all overflow-hidden p-1">
                  <Search className="w-4 h-4 text-[#686660] ml-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search 195+ essential oils, diffuser blends, candle scents..."
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    onFocus={() => setHeroSearchFocused(true)}
                    onBlur={() => setTimeout(() => setHeroSearchFocused(false), 200)}
                    className="w-full py-2.5 sm:py-3 px-3 text-xs sm:text-sm font-sans text-[#171717] placeholder:text-[#686660]/60 outline-none bg-transparent"
                  />
                  {heroSearch && (
                    <button
                      type="button"
                      onClick={() => setHeroSearch('')}
                      className="p-2 text-xs text-[#686660] hover:text-[#171717]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-[#171717] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#B89B6A] transition-colors whitespace-nowrap flex-shrink-0 shadow-2xs"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Instant Search Suggestions Dropdown */}
              <AnimatePresence>
                {heroSearchFocused && heroSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#E6E2D9] rounded-xl shadow-xl z-40 overflow-hidden divide-y divide-[#E6E2D9]"
                  >
                    {heroSuggestions.map((sug) => (
                      <Link
                        key={sug.id}
                        href={`/product/${sug.slug}`}
                        className="flex items-center gap-3 p-3.5 hover:bg-[#FAFAF7] transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#FAFAF7] border border-[#E6E2D9] relative flex-shrink-0 overflow-hidden">
                          {sug.images && sug.images[0] && (
                            <Image
                              src={sug.images[0]}
                              alt={sug.name}
                              fill
                              sizes="40px"
                              className="object-contain p-0.5 group-hover:scale-105 transition-transform"
                            />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-serif font-bold text-sm text-[#171717] group-hover:text-[#B89B6A] transition-colors truncate">
                            {sug.name}
                          </p>
                          <span className="font-mono text-[9px] text-[#686660] uppercase block">
                            {sug.categoryName} • {sug.sku}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#B89B6A] ml-auto flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Quick Category Jump Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="space-y-2.5 pt-1"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#686660] font-bold block">
                Popular Collections:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { name: 'Essential Oils', slug: 'essential-oils', icon: '🌿' },
                  { name: 'Diffuser Blends', slug: 'diffuser-blends', icon: '☁️' },
                  { name: 'Candle Fragrance', slug: 'candle-making', icon: '🕯️' },
                  { name: 'Soap Essences', slug: 'fragrance-oils', icon: '🧼' },
                  { name: 'Diffusers', slug: 'diffuser-machines', icon: '⚡' },
                ].map((item) => (
                  <Link
                    key={item.slug}
                    href={`/shop?category=${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans font-semibold px-3 py-1.5 rounded-full bg-white border border-[#E6E2D9] text-[#171717] hover:border-[#B89B6A] hover:bg-[#FAFAF7] transition-all shadow-2xs hover:scale-102"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Master Interactive Spotlight Hero Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Spotlight Formulation Switcher Tabs */}
            <div className="w-full max-w-md flex items-center justify-between gap-1 p-1 bg-white border border-[#E6E2D9] rounded-xl mb-3 shadow-2xs">
              {spotlightList.map((item, idx) => {
                const isActive = activeSpotlightIdx === idx;
                return (
                  <button
                    key={item.sku}
                    onClick={() => setActiveSpotlightIdx(idx)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-300 text-center truncate ${
                      isActive
                        ? 'bg-[#171717] text-white shadow-xs'
                        : 'text-[#686660] hover:text-[#171717] hover:bg-[#FAFAF7]'
                    }`}
                  >
                    {item.sku}
                  </button>
                );
              })}
            </div>

            {/* Interactive Spotlight Podium Card */}
            <div className="w-full max-w-md relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={spotlightList[activeSpotlightIdx].sku}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] hover:border-[#B89B6A] p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3 border-b border-[#E6E2D9] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B89B6A] animate-pulse" />
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-[#FAFAF7] text-[#171717] px-2.5 py-0.5 rounded border border-[#E6E2D9]">
                        {spotlightList[activeSpotlightIdx].badge}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#686660] font-bold">
                      {spotlightList[activeSpotlightIdx].sku}
                    </span>
                  </div>

                  {/* Podium Image Stage */}
                  <Link
                    href={`/product/${spotlightList[activeSpotlightIdx].product?.slug || 'luxury-hotel-fragrance-oil'}`}
                    scroll={true}
                    className="block cursor-pointer"
                  >
                    <div className="relative w-full h-[200px] sm:h-[230px] my-2 flex items-center justify-center bg-gradient-to-b from-[#F7F6F2] via-[#FAF9F5] to-white rounded-[var(--radius-lg)] border border-[#E6E2D9]/70 overflow-hidden group-hover:border-[#B89B6A]/50 transition-colors">
                      <Image
                        src={
                          spotlightList[activeSpotlightIdx].product?.images?.[0] ||
                          '/products/images/luxury-hotel-fragrance-oil-527-1.jpg'
                        }
                        alt={spotlightList[activeSpotlightIdx].product?.name || 'Formulation'}
                        fill
                        priority
                        sizes="(max-width: 768px) 320px, 400px"
                        className="object-contain p-3 drop-shadow-md group-hover:scale-106 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  {/* Product Title & Category */}
                  <div className="pt-2">
                    <Link
                      href={`/product/${spotlightList[activeSpotlightIdx].product?.slug || 'luxury-hotel-fragrance-oil'}`}
                      scroll={true}
                      className="block group-hover:text-[#B89B6A] transition-colors"
                    >
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#171717] leading-snug">
                        {spotlightList[activeSpotlightIdx].product?.name}
                      </h3>
                      <p className="text-xs font-mono text-[#686660] tracking-wider uppercase mt-0.5">
                        {spotlightList[activeSpotlightIdx].categoryLabel}
                      </p>
                    </Link>

                    {/* Olfactory Notes Micro-Pills */}
                    <div className="flex flex-wrap gap-1.5 my-3 pt-3 border-t border-[#E6E2D9]/70">
                      {spotlightList[activeSpotlightIdx].notes.map((note) => (
                        <span
                          key={note}
                          className="text-[9px] font-sans font-medium px-2 py-0.5 rounded bg-[#FAFAF7] border border-[#E6E2D9] text-[#686660]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons Row */}
                    <div className="pt-2 flex items-center justify-between gap-3">
                      <Link
                        href={`/product/${spotlightList[activeSpotlightIdx].product?.slug || 'luxury-hotel-fragrance-oil'}`}
                        scroll={true}
                        className="btn-luxury-primary text-center py-2.5 px-4 text-xs font-bold flex-1 flex items-center justify-center gap-1.5"
                      >
                        Explore Details <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                          `Hello SenseMe India, I would like to inquire about ${spotlightList[activeSpotlightIdx].product?.name} (${spotlightList[activeSpotlightIdx].sku}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-luxury-outline py-2.5 px-3.5 text-xs font-bold flex items-center justify-center gap-1.5"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-current" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* 4-Pillar Luxury Trust & Quality Bar */}
        <div className="container-editorial pt-6 pb-2 border-t border-[#E6E2D9] z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs font-mono">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E6E2D9] shadow-2xs">
              <span className="w-8 h-8 rounded-md bg-[#FAFAF7] border border-[#E6E2D9] flex items-center justify-center text-sm font-bold text-[#B89B6A] flex-shrink-0">
                195+
              </span>
              <div>
                <span className="font-bold text-[#171717] block">Verified Formulations</span>
                <span className="text-[10px] text-[#686660] uppercase">In Stock & Ready</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E6E2D9] shadow-2xs">
              <Droplets className="w-5 h-5 text-[#B89B6A] flex-shrink-0 ml-1" />
              <div>
                <span className="font-bold text-[#171717] block">100% Steam Distilled</span>
                <span className="text-[10px] text-[#686660] uppercase">Zero Synthetic Dilution</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E6E2D9] shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-[#B89B6A] flex-shrink-0 ml-1" />
              <div>
                <span className="font-bold text-[#171717] block">Pharmaceutical UV Glass</span>
                <span className="text-[10px] text-[#686660] uppercase">15ml to 25kg UN Drums</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E6E2D9] shadow-2xs">
              <Package className="w-5 h-5 text-[#B89B6A] flex-shrink-0 ml-1" />
              <div>
                <span className="font-bold text-[#171717] block">Pan-India Express</span>
                <span className="text-[10px] text-[#686660] uppercase">Direct from Coimbatore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 — PROMOTIONAL VALUE PILLARS (FREE SHIPPING, 100% NATURAL, ONLINE CHAT) */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Free Delivery */}
            <div className="p-6 sm:p-7 rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] hover:border-[#B89B6A] transition-all group shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E6E2D9] p-2.5 flex items-center justify-center text-[#B89B6A] group-hover:bg-[#171717] group-hover:text-white transition-colors mb-4 shadow-2xs">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#171717] mb-1.5">
                Free Delivery
              </h3>
              <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed">
                Free shipping within India as we have covered it for you on retail & volume consignments.
              </p>
            </div>

            {/* 100% Natural */}
            <div className="p-6 sm:p-7 rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] hover:border-[#B89B6A] transition-all group shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E6E2D9] p-2.5 flex items-center justify-center text-[#25D366] group-hover:bg-[#171717] group-hover:text-[#25D366] transition-colors mb-4 shadow-2xs">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#171717] mb-1.5">
                100% Natural
              </h3>
              <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed">
                100% natural botanical distillations. Zero synthetic solvents and zero animal testing.
              </p>
            </div>

            {/* Online Support */}
            <div className="p-6 sm:p-7 rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] hover:border-[#B89B6A] transition-all group shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E6E2D9] p-2.5 flex items-center justify-center text-[#171717] group-hover:bg-[#25D366] group-hover:text-white transition-colors mb-4 shadow-2xs">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#171717] mb-1.5">
                Online Support
              </h3>
              <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed">
                Direct live chat on WhatsApp for real-time stock confirmation, custom blending & GST billing.
              </p>
            </div>

            {/* Direct Manufacturer */}
            <div className="p-6 sm:p-7 rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] hover:border-[#B89B6A] transition-all group shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E6E2D9] p-2.5 flex items-center justify-center text-[#B89B6A] group-hover:bg-[#171717] group-hover:text-[#B89B6A] transition-colors mb-4 shadow-2xs">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#171717] mb-1.5">
                Direct Lab Supply
              </h3>
              <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed">
                Direct laboratory pricing from Coimbatore under Mylal Exports with verified volume savings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 — FEATURED PRODUCTS (CURATED BESTSELLERS & PRIMARY SHOWCASE) */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FAFAF7] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="border-b border-[#E6E2D9] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white border border-[#E6E2D9] text-[#B89B6A] font-mono text-[10px] font-bold tracking-widest uppercase mb-2">
                <Sparkles className="w-3 h-3 text-[#B89B6A]" /> BEST-SELLING FORMULATIONS
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717]">
                Featured Products
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717] hover:text-[#B89B6A] flex items-center gap-1 transition-colors self-start md:self-auto"
            >
              View Full Shop Directory ({products.length}) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* In-Page Filter Pills & Live Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none py-1">
              <button
                onClick={() => setFeaturedCategory('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans whitespace-nowrap transition-all ${
                  featuredCategory === 'all'
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'bg-white text-[#686660] hover:bg-[#F2F0EA] border border-[#E6E2D9]'
                }`}
              >
                All Featured ({products.length})
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFeaturedCategory(c.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans whitespace-nowrap transition-all ${
                    featuredCategory === c.id
                      ? 'bg-[#171717] text-white shadow-xs'
                      : 'bg-white text-[#686660] hover:bg-[#F2F0EA] border border-[#E6E2D9]'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#686660] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Filter by scent or name..."
                value={featuredSearch}
                onChange={(e) => setFeaturedSearch(e.target.value)}
                className="w-full pl-8 pr-8 py-2 bg-white border border-[#E6E2D9] rounded text-xs text-[#171717] placeholder:text-[#686660]/60 outline-none focus:border-[#171717]"
              />
              {featuredSearch && (
                <button
                  onClick={() => setFeaturedSearch('')}
                  className="absolute right-2.5 top-2.5 text-xs text-[#686660]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Featured Product Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {featuredProductsList.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} aspect="tall" />
            ))}
          </div>

          <div className="pt-10 text-center">
            <Link
              href={featuredCategory === 'all' ? '/shop' : `/shop?category=${categories.find(c => c.id === featuredCategory)?.slug || 'all'}`}
              className="btn-luxury-primary text-xs py-3.5 px-8 inline-flex items-center gap-2"
            >
              Explore Complete 195+ Formulations <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 — CURATED COLLECTIONS: THE 4 ESSENTIAL BOTANICAL PILLARS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block mb-1">
                04 / BOTANICAL DISCIPLINES
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
                Curated Collections
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717] hover:text-[#B89B6A] flex items-center gap-1 transition-colors self-start md:self-auto"
            >
              Explore Full Catalogue <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Distinct Core Collection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                num: '01',
                title: 'Pure Essential Oils',
                categorySlug: 'essential-oils',
                desc: 'Single-origin steam-distilled botanicals with verified therapeutic purity.',
                count: '90+ Oils',
                img: '/products/images/basil-essential-oil-192-1.jpg',
              },
              {
                num: '02',
                title: 'Diffuser Blends',
                categorySlug: 'diffuser-blends',
                desc: 'Atmospheric cold-mist scent concentrates for hotel lobbies, spas & luxury spaces.',
                count: '45+ Blends',
                img: '/products/images/luxury-hotel-fragrance-oil-527-1.jpg',
              },
              {
                num: '03',
                title: 'Candle Fragrances',
                categorySlug: 'candle-making',
                desc: 'High flashpoint aromatic formulations designed for clean burn in soy & beeswax.',
                count: '35+ Scents',
                img: '/products/images/bergamot-fragrance-oil-for-candle-making-563-1.jpg',
              },
              {
                num: '04',
                title: 'Soap Essences',
                categorySlug: 'fragrance-oils',
                desc: 'Alkali-stable botanical compounds with zero seizing in cold-process soapmaking.',
                count: '25+ Formulations',
                img: '/products/images/citrus-fragrance-oil-for-soap-making-286-1.png',
              },
            ].map((col) => (
              <Link
                key={col.num}
                href={`/shop?category=${col.categorySlug}`}
                className="group bg-[#FAFAF7] rounded-[var(--radius-xl)] border border-[#E6E2D9] hover:border-[#B89B6A] p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-2xl font-bold text-[#B89B6A]/70 group-hover:text-[#B89B6A] transition-colors">
                      {col.num}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-[#E6E2D9] text-[#686660]">
                      {col.count}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors mb-1.5">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#686660] font-sans leading-relaxed line-clamp-2 mb-4">
                    {col.desc}
                  </p>
                </div>

                <div>
                  <div className="w-full aspect-[4/3] rounded-[var(--radius-md)] bg-white border border-[#E6E2D9]/80 relative overflow-hidden mb-3 flex items-center justify-center p-3">
                    <Image
                      src={col.img}
                      alt={col.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 260px"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E6E2D9] text-[11px] font-mono text-[#171717] font-bold">
                    <span>Explore Collection</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B89B6A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 — BUSINESS SOLUTIONS: WHOLESALE & PRIVATE LABEL OEM */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FAFAF7] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch">
            {/* Wholesale */}
            <div className="p-6 sm:p-10 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] space-y-4 sm:space-y-5 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block">
                  05A / B2B BULK PROCUREMENT
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#171717] tracking-tight">
                  Built for Manufacturing & Hospitality.
                </h3>
                <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed">
                  Direct supply from 1kg aluminium bottles to 25kg UN drums for soap artisans, candle crafters, cosmetic laboratories, and luxury hotel ambient scenting.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px] text-[#686660] uppercase">
                  <span className="px-2.5 py-1 bg-[#FAFAF7] rounded border border-[#E6E2D9]">✓ 1kg to 25kg Drums</span>
                  <span className="px-2.5 py-1 bg-[#FAFAF7] rounded border border-[#E6E2D9]">✓ GST Billing</span>
                  <span className="px-2.5 py-1 bg-[#FAFAF7] rounded border border-[#E6E2D9]">✓ Fast Courier Dispatch</span>
                </div>
              </div>
              <div className="pt-2">
                <Link href="/wholesale" className="btn-luxury-primary text-xs py-3.5 px-7 inline-flex items-center gap-2">
                  Start Wholesale Enquiry <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Rebranding */}
            <div className="p-6 sm:p-10 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] space-y-4 sm:space-y-5 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block">
                  05B / PRIVATE LABEL OEM
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#171717] tracking-tight">
                  Your Signature Brand. Our Formulation.
                </h3>
                <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed">
                  Launch bespoke perfume, room spray, or diffuser lines. We manage custom compounding, batch safety, bottle packaging, and OEM private labeling from Coimbatore.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px] text-[#686660] uppercase">
                  <span className="px-2.5 py-1 bg-[#FAFAF7] rounded border border-[#E6E2D9]">✓ Custom Perfume Flacons</span>
                  <span className="px-2.5 py-1 bg-[#FAFAF7] rounded border border-[#E6E2D9]">✓ Batch Sample Kits</span>
                  <span className="px-2.5 py-1 bg-[#FAFAF7] rounded border border-[#E6E2D9]">✓ Turnkey OEM Packaging</span>
                </div>
              </div>
              <div className="pt-2">
                <Link href="/rebranding" className="btn-luxury-outline text-xs py-3.5 px-7 inline-flex items-center gap-2">
                  Explore Private Labeling <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 — 3-STEP WHATSAPP ORDERING CONCIERGE */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block">
              06 / SEAMLESS PROCUREMENT
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
              Simple 3-Step WhatsApp Commerce
            </h2>
            <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed">
              Order individual bottles or bulk manufacturing consignments directly with real-time stock confirmation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-7 rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] space-y-3 relative">
              <span className="font-serif text-3xl font-bold text-[#B89B6A]">01</span>
              <h3 className="font-serif text-xl font-bold text-[#171717]">Select Formulations</h3>
              <p className="text-xs sm:text-sm text-[#686660] leading-relaxed font-sans">
                Browse our 195+ catalog of single botanicals, ambient diffuser blends, or candle making fragrances.
              </p>
            </div>

            <div className="p-7 rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] space-y-3 relative">
              <span className="font-serif text-3xl font-bold text-[#25D366]">02</span>
              <h3 className="font-serif text-xl font-bold text-[#171717]">Chat on WhatsApp</h3>
              <p className="text-xs sm:text-sm text-[#686660] leading-relaxed font-sans">
                Click &quot;Buy Now on WhatsApp&quot; to connect directly with our Coimbatore lab for instant quote & GST billing.
              </p>
            </div>

            <div className="p-7 rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] space-y-3 relative">
              <span className="font-serif text-3xl font-bold text-[#171717]">03</span>
              <h3 className="font-serif text-xl font-bold text-[#171717]">Insured Pan-India Dispatch</h3>
              <p className="text-xs sm:text-sm text-[#686660] leading-relaxed font-sans">
                Zero-leakage amber glass bottles or UN drums dispatched within 24–48 hours with free tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 — PROMOTIONAL FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FAFAF7] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block">
                07 / QUESTIONS & GUIDANCE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
                Frequently Answered
              </h2>
              <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed">
                Clear answers regarding free shipping, bulk volumes, GC-MS testing, and WhatsApp ordering protocols.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-outline text-xs py-3 px-6 inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" /> Have a Specific Question?
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#E6E2D9] border-t border-b border-[#E6E2D9]">
              {promotionalFaqs.map((faq, i) => (
                <div key={i} className="py-4 sm:py-5">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="font-serif text-base sm:text-xl font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors">
                      {faq.q}
                    </span>
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#E6E2D9] flex items-center justify-center flex-shrink-0 group-hover:border-[#171717] transition-colors">
                      {openFaq === i ? (
                        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#171717]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#686660]" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed pt-3 sm:pt-4 max-w-xl">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
