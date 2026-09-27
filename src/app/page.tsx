'use client';

import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useData } from '@/lib/data-context';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import ScentFinderWidget from '@/components/ScentFinderWidget';
import InteractiveOlfactoryPyramid from '@/components/InteractiveOlfactoryPyramid';
import {
  Search,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Droplets,
  Wind,
  Plus,
  Minus,
  CheckCircle2,
  ShieldCheck,
  Package,
  Layers,
  MapPin,
  Compass,
  Flame,
  Check,
  Building2,
  X,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { products, categories } = useData();

  // Hero Search State
  const [heroSearch, setHeroSearch] = useState('');
  const [heroSearchFocused, setHeroSearchFocused] = useState(false);

  // In-page Discovery Filter
  const [discoveryCategory, setDiscoveryCategory] = useState<string>('all');
  const [discoverySearch, setDiscoverySearch] = useState<string>('');

  // Hero parallax scroll ref
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroMainY = useTransform(heroScrollProgress, [0, 1], ['0%', '15%']);
  const heroSecondaryY = useTransform(heroScrollProgress, [0, 1], ['0%', '25%']);
  const heroTertiaryY = useTransform(heroScrollProgress, [0, 1], ['0%', '10%']);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.85], [1, 0]);

  // Manufacturing Step Interactive state
  const [activeMfgStep, setActiveMfgStep] = useState(0);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Selected Featured Products for Showcase (1 large + 2 stacked)
  const featuredLarge = products.find((p) => p.slug === 'luxury-hotel-fragrance-oil-527') || products[0];
  const featuredStacked1 = products.find((p) => p.slug === 'basil-essential-oil-192') || products[1];
  const featuredStacked2 = products.find((p) => p.slug === 'bergamot-fragrance-oil-for-candle-making-563') || products[2];

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

  // Live Homepage Discovery Products
  const discoveryProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = discoveryCategory === 'all' || p.categoryId === discoveryCategory;
        const matchesSearch =
          !discoverySearch.trim() ||
          p.name.toLowerCase().includes(discoverySearch.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(discoverySearch.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .slice(0, 8);
  }, [products, discoveryCategory, discoverySearch]);

  const mfgSteps = [
    {
      num: '01',
      step: 'DEVELOP',
      title: 'Botanical Origin Selection',
      desc: 'Procurement of farm-harvested single botanicals synchronized with optimal phytochemical maturity.',
      image: '/products/images/basil-essential-oil-192-1.jpg',
    },
    {
      num: '02',
      step: 'CREATE',
      title: 'Low-Temperature Distillation',
      desc: 'Temperature-regulated steam extraction in SS 316 distillation retorts to preserve volatile monoterpenes.',
      image: '/products/images/luxury-hotel-fragrance-oil-527-1.jpg',
    },
    {
      num: '03',
      step: 'REFINE',
      title: 'Quality & Optical Inspection',
      desc: 'Testing optical rotation, specific gravity, and purity to guarantee consistent aromatic intensity.',
      image: '/products/images/bergamot-fragrance-oil-for-candle-making-563-1.jpg',
    },
    {
      num: '04',
      step: 'DELIVER',
      title: 'Amber UV Shielding & Dispatch',
      desc: 'Pharmaceutical amber glass with tamper-evident seals and direct pan-India courier dispatch from Coimbatore.',
      image: '/products/images/ultrasonic-aroma-diffuser-dark-brown-126-1.jpg',
    },
  ];

  const faqs = [
    {
      q: 'What types of products does SenseMe India manufacture?',
      a: 'We manufacture steam-distilled essential oils (90+ single botanicals), luxury ambient diffuser blends, concentrated fragrance oils for candles and cold-process soap, natural perfumes, and ultrasonic aroma machines in Coimbatore.',
    },
    {
      q: 'How does ordering work without an online cart?',
      a: 'Browse our digital catalogue, select your desired sizes (15ml bottles to 25kg drums), and click "Buy Now on WhatsApp". Our team immediately provides real-time pricing, stock confirmation, and payment/shipping details.',
    },
    {
      q: 'Are your fragrance oils tested for candle and soap making?',
      a: 'Yes. Our specialized Fragrance Oils feature high flashpoints formulated specifically for cold-process soap saponification (no seizing) and soy/beeswax candle crafting with superior hot and cold scent throw.',
    },
    {
      q: 'Do you offer bulk wholesale supplies and private labeling?',
      a: 'Yes. Operating out of Coimbatore under Mylal Exports, we provide tiered volume wholesale (1kg aluminium bottles to 25kg drums) and full turnkey private-label contract manufacturing for hotels, spas, and retail brands.',
    },
    {
      q: 'How are the oils packaged to ensure zero transit leakage?',
      a: 'All oils are filled into heavy amber glass bottles with UV shielding, tamper-evident seals, and European orifice reducers. Larger orders are packed in UN-certified fluorinated containers and double-boxed for transit.',
    },
  ];

  return (
    <div className="bg-[#FAFAF7] text-[#171717] overflow-hidden">
      {/* ========================================================================= */}
      {/* 01 — HERO: CINEMATIC ECOMMERCE DISCOVERY & INTERACTIVE SEARCH */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col justify-between pt-24 sm:pt-32 pb-10 px-4 sm:px-8 md:px-12 bg-[#FAFAF7] overflow-hidden border-b border-[#E6E2D9]"
      >
        {/* Subtle Radial Light Glow */}
        <div className="absolute top-1/4 right-1/4 w-[42rem] h-[42rem] bg-[#F2F0EA]/80 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Top Eyebrow Strip */}
        <div className="container-editorial flex items-center justify-between z-10 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B89B6A] animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-[#686660] font-bold">
              THE WORLD OF AROMA
            </span>
          </div>
          <span className="font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-[#686660] hidden sm:inline">
            COIMBATORE • 195+ BOTANICAL FORMULATIONS
          </span>
        </div>

        {/* Main Hero Split Layout (48% Text & Search / 52% Visual Composition) */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="container-editorial my-auto py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center z-10"
        >
          {/* Left: Text & Interactive Search Bar */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[4.5rem] font-bold text-[#171717] tracking-tight leading-[0.98] mb-4">
                Crafted for the Way <br />
                <span className="font-editorial italic font-normal text-[#B89B6A]">
                  Scent is
                </span>{' '}
                Experienced.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-sm sm:text-base text-[#686660] font-sans leading-relaxed max-w-lg"
            >
              Single-origin steam-distilled essential oils, ambient diffuser concentrates, and candle fragrances compounded with certified purity in Coimbatore.
            </motion.p>

            {/* Interactive Search Bar on Hero */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="relative max-w-lg"
            >
              <form onSubmit={handleHeroSearchSubmit} className="relative">
                <div className="flex items-center bg-white border border-[#E6E2D9] focus-within:border-[#171717] rounded shadow-sm transition-all overflow-hidden">
                  <Search className="w-4 h-4 text-[#686660] ml-3.5 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search 195+ essential oils, diffuser blends, candle scents..."
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    onFocus={() => setHeroSearchFocused(true)}
                    onBlur={() => setTimeout(() => setHeroSearchFocused(false), 200)}
                    className="w-full py-3 px-3 text-xs sm:text-sm font-sans text-[#171717] placeholder:text-[#686660]/60 outline-none"
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
                    className="bg-[#171717] text-white px-5 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#B89B6A] transition-colors whitespace-nowrap flex-shrink-0"
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
                    className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E6E2D9] rounded shadow-xl z-30 overflow-hidden divide-y divide-[#E6E2D9]"
                  >
                    {heroSuggestions.map((sug) => (
                      <Link
                        key={sug.id}
                        href={`/product/${sug.slug}`}
                        className="flex items-center gap-3 p-3 hover:bg-[#FAFAF7] transition-colors"
                      >
                        <div className="w-10 h-10 rounded bg-[#FAFAF7] border border-[#E6E2D9] relative flex-shrink-0 overflow-hidden">
                          {sug.images && sug.images[0] && (
                            <Image
                              src={sug.images[0]}
                              alt={sug.name}
                              fill
                              sizes="40px"
                              className="object-contain p-0.5"
                            />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-serif font-bold text-sm text-[#171717] truncate">{sug.name}</p>
                          <span className="font-mono text-[9px] text-[#686660] uppercase block">{sug.categoryName}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#B89B6A] ml-auto flex-shrink-0" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Quick Category Jump Pills linking directly to /shop?category=... */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="space-y-2 pt-1"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#686660] font-bold block">
                Popular Categories:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { name: 'Essential Oils', slug: 'essential-oils' },
                  { name: 'Diffuser Blends', slug: 'diffuser-blends' },
                  { name: 'Candle Fragrance', slug: 'candle-making' },
                  { name: 'Soap Fragrance', slug: 'fragrance-oils' },
                  { name: 'Diffusers', slug: 'diffuser-machines' },
                ].map((item) => (
                  <Link
                    key={item.slug}
                    href={`/shop?category=${item.slug}`}
                    className="text-[11px] font-sans font-semibold px-3 py-1.5 rounded-full bg-white border border-[#E6E2D9] text-[#171717] hover:border-[#171717] hover:bg-[#FAFAF7] transition-all shadow-2xs"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Layered Product Composition (100% Clickable & Touch-Optimized) */}
          <div className="lg:col-span-6 relative h-[360px] sm:h-[440px] md:h-[480px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-[var(--radius-xl)] bg-gradient-to-tr from-[#F2F0EA]/70 via-white/80 to-[#FAFAF7] border border-[#E6E2D9] shadow-sm pointer-events-none" />

            {/* Layer 3: Main Large Spotlight Product - 100% Clickable & Touch-Friendly */}
            <motion.div
              style={{ y: heroMainY }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 w-[270px] sm:w-[300px] md:w-[320px] max-w-[92%]"
            >
              <Link
                href="/product/luxury-hotel-fragrance-oil-527"
                className="block rounded-[var(--radius-lg)] bg-white border border-[#E6E2D9] hover:border-[#B89B6A] p-4 sm:p-5 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-bold tracking-widest uppercase bg-[#FAFAF7] text-[#171717] group-hover:bg-[#171717] group-hover:text-white px-2.5 py-0.5 rounded border border-[#E6E2D9] transition-colors">
                    SIGNATURE BLEND
                  </span>
                  <span className="font-mono text-[10px] text-[#686660] font-semibold">SMI-0527</span>
                </div>

                <div className="relative w-full h-[180px] sm:h-[220px] my-2 flex items-center justify-center bg-[#FAFAF7]/60 rounded-[var(--radius-md)] overflow-hidden">
                  <Image
                    src="/products/images/luxury-hotel-fragrance-oil-527-1.jpg"
                    alt="Luxury Hotel Fragrance Oil"
                    fill
                    priority
                    sizes="(max-width: 768px) 280px, 320px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E6E2D9]">
                  <div>
                    <p className="font-serif font-bold text-sm sm:text-base text-[#171717] group-hover:text-[#B89B6A] transition-colors">
                      Luxury Hotel Fragrance Oil
                    </p>
                    <p className="text-[10px] font-mono text-[#686660] tracking-wider uppercase">
                      Ambient Scenting • Cold Mist
                    </p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-[#171717] text-white group-hover:bg-[#B89B6A] flex items-center justify-center transition-colors flex-shrink-0 shadow-xs">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Layer 4: Secondary Product (Offset Left) */}
            <motion.div
              style={{ y: heroSecondaryY }}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1 sm:left-4 -bottom-3 z-10 w-[160px] sm:w-[200px] rounded-[var(--radius-lg)] bg-white/95 backdrop-blur-md border border-[#E6E2D9] hover:border-[#B89B6A] p-3 shadow-lg hidden sm:block group transition-all"
            >
              <Link href="/product/basil-essential-oil-192" className="block">
                <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-[#686660] block mb-1">
                  100% STEAM DISTILLED
                </span>
                <div className="relative w-full h-[130px] my-1">
                  <Image
                    src="/products/images/basil-essential-oil-192-1.jpg"
                    alt="Basil Essential Oil"
                    fill
                    sizes="200px"
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#E6E2D9]/70">
                  <p className="font-serif font-bold text-xs text-[#171717] truncate group-hover:text-[#B89B6A]">Basil Essential Oil</p>
                  <ArrowUpRight className="w-3 h-3 text-[#686660] group-hover:text-[#171717]" />
                </div>
              </Link>
            </motion.div>

            {/* Layer 5: Tertiary Product (Offset Right) */}
            <motion.div
              style={{ y: heroTertiaryY }}
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 0.95 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-1 sm:right-4 -top-3 z-10 w-[160px] sm:w-[200px] rounded-[var(--radius-lg)] bg-white/95 backdrop-blur-md border border-[#E6E2D9] hover:border-[#B89B6A] p-3 shadow-lg hidden sm:block group transition-all"
            >
              <Link href="/product/bergamot-fragrance-oil-for-candle-making-563" className="block">
                <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-[#686660] block mb-1">
                  HIGH FLASHPOINT OIL
                </span>
                <div className="relative w-full h-[130px] my-1">
                  <Image
                    src="/products/images/bergamot-fragrance-oil-for-candle-making-563-1.jpg"
                    alt="Bergamot Candle Fragrance"
                    fill
                    sizes="200px"
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#E6E2D9]/70">
                  <p className="font-serif font-bold text-xs text-[#171717] truncate group-hover:text-[#B89B6A]">Bergamot Candle Oil</p>
                  <ArrowUpRight className="w-3 h-3 text-[#686660] group-hover:text-[#171717]" />
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Assurance Strip */}
        <div className="container-editorial flex items-center justify-between text-xs font-mono text-[#686660] pt-4 border-t border-[#E6E2D9] z-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89B6A]" />
            <span className="font-bold text-[#171717]">195+</span>
            <span className="text-[10px] tracking-wider uppercase">Verified Formulations in Stock</span>
          </div>
          <span className="hidden sm:inline text-[10px] tracking-wider uppercase">
            Mylal Exports • Coimbatore, Tamil Nadu
          </span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 — BRAND INTRODUCTION: "MORE THAN A PRODUCT." */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial space-y-12 sm:space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block">
                02 / PHILOSOPHY & HERITAGE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#171717] tracking-tight leading-tight">
                More Than a Product.
              </h2>
              <p className="text-sm sm:text-base text-[#686660] font-sans leading-relaxed">
                Operating under <strong className="text-[#171717] font-semibold">Mylal Exports</strong> in Coimbatore, Tamil Nadu, SenseMe India develops and compounds pure botanical extracts and high-potency fragrance oils.
              </p>
              <p className="text-xs sm:text-sm text-[#686660] leading-relaxed">
                We supply soap artisans, candle makers, luxury hotels, and private-label wellness brands across India with unadulterated formulations backed by physical inspection and sealed packaging.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717] hover:text-[#B89B6A] flex items-center gap-1.5 transition-colors"
                >
                  Explore Company Heritage <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Large Image Box */}
            <div className="lg:col-span-6">
              <div className="w-full aspect-[16/10] rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] p-6 shadow-sm relative overflow-hidden flex items-center justify-center group">
                <Image
                  src="/products/images/citrus-fragrance-oil-for-soap-making-286-1.png"
                  alt="SenseMe India Botanical Compounding"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 font-mono text-[9px] uppercase tracking-widest text-[#686660] bg-white/95 px-3 py-1 rounded border border-[#E6E2D9]">
                  COIMBATORE LABORATORY
                </div>
              </div>
            </div>
          </div>

          {/* 3 Key Fact Areas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-2">
            <div className="p-6 sm:p-8 rounded-[var(--radius-lg)] bg-[#FAFAF7] border border-[#E6E2D9] shadow-2xs space-y-2.5">
              <span className="font-mono text-xs font-bold text-[#B89B6A]">01 / DEVELOPMENT</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717]">Product Development</h3>
              <p className="text-xs text-[#686660] leading-relaxed">
                Single-origin steam distillation, custom fragrance blending, and formulation testing for candle, soap, and diffuser applications.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-[var(--radius-lg)] bg-[#FAFAF7] border border-[#E6E2D9] shadow-2xs space-y-2.5">
              <span className="font-mono text-xs font-bold text-[#B89B6A]">02 / MANUFACTURING</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717]">Manufacturing Purity</h3>
              <p className="text-xs text-[#686660] leading-relaxed">
                Operating directly out of Coimbatore with multi-point inspection, density verification, and pharmaceutical-grade amber packaging.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-[var(--radius-lg)] bg-[#FAFAF7] border border-[#E6E2D9] shadow-2xs space-y-2.5">
              <span className="font-mono text-xs font-bold text-[#B89B6A]">03 / BUSINESS</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717]">Business Solutions</h3>
              <p className="text-xs text-[#686660] leading-relaxed">
                Volume-tiered wholesale supplies from 1kg aluminium bottles to 25kg drums, and turnkey private-label OEM manufacturing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 — PRODUCT UNIVERSE: "DISCOVER THE COLLECTIONS" -> /shop?category=... */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FAFAF7] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block mb-1">
                03 / THE UNIVERSE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#171717] tracking-tight">
                Discover the Collections
              </h2>
            </div>
            <Link
              href="/shop"
              className="btn-luxury-outline text-xs py-2.5 px-6 self-start md:self-auto flex items-center gap-1.5"
            >
              Browse Full Archive ({products.length}) →
            </Link>
          </div>

          {/* Large Category Panels with Real Imagery — Direct Filter on Click! */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((cat, idx) => {
              const count = products.filter((p) => p.categoryId === cat.id).length;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="group"
                >
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="block bg-white rounded-[var(--radius-xl)] border border-[#E6E2D9] group-hover:border-[#B89B6A] overflow-hidden shadow-xs group-hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
                  >
                    <div className="p-6 sm:p-8 pb-3">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-serif text-3xl font-bold text-[#E6E2D9] group-hover:text-[#B89B6A] transition-colors">
                          0{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded bg-[#FAFAF7] border border-[#E6E2D9] text-[#686660]">
                          {count} PRODUCTS
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] mb-2 group-hover:text-[#B89B6A] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[#686660] font-sans leading-relaxed line-clamp-2 mb-3">
                        {cat.description}
                      </p>
                    </div>

                    <div className="h-40 sm:h-44 w-full bg-[#FAFAF7] relative overflow-hidden border-t border-[#E6E2D9] flex items-center justify-center p-4">
                      {cat.image && (
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-white/95 via-white/60 to-transparent flex items-center justify-between">
                        <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#686660] font-bold">
                          VIEW {cat.name.toUpperCase()}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#171717] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 — FEATURED PRODUCT SHOWCASE: "SELECTED PRODUCTS" */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6 border-b border-[#E6E2D9] pb-6 sm:pb-8">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block mb-1">
                04 / CURATED SPOTLIGHT
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717]">
                Selected Products
              </h2>
            </div>
            <Link href="/shop" className="btn-luxury-outline text-xs py-2.5 px-6 self-start md:self-auto">
              Explore All 195+ Formulations →
            </Link>
          </div>

          {/* Asymmetric Showcase: 1 Large Left + 2 Stacked Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Large Spotlight Product (7 cols) - 100% Clickable */}
            <div className="lg:col-span-7 bg-[#FAFAF7] rounded-[var(--radius-xl)] border border-[#E6E2D9] hover:border-[#B89B6A] p-6 sm:p-10 flex flex-col justify-between group transition-all duration-300 shadow-2xs hover:shadow-md">
              <Link href={`/product/${featuredLarge?.slug}`} className="block">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 bg-white rounded border border-[#E6E2D9] text-[#B89B6A]">
                    FEATURED 01
                  </span>
                  <span className="font-mono text-xs text-[#686660]">{featuredLarge?.sku}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors leading-tight mb-2 sm:mb-3">
                  {featuredLarge?.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#686660] leading-relaxed max-w-xl font-sans mb-4 sm:mb-6">
                  {featuredLarge?.shortDescription || featuredLarge?.description}
                </p>
              </Link>

              <Link
                href={`/product/${featuredLarge?.slug}`}
                className="relative w-full h-[220px] sm:h-[300px] my-4 sm:my-6 flex items-center justify-center bg-white/70 rounded-[var(--radius-lg)] border border-[#E6E2D9]/70 overflow-hidden"
              >
                {featuredLarge?.images && featuredLarge.images[0] && (
                  <Image
                    src={featuredLarge.images[0]}
                    alt={featuredLarge.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-700"
                  />
                )}
              </Link>

              <div className="pt-4 sm:pt-6 border-t border-[#E6E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-mono text-xs text-[#686660]">15ml – 5kg Drums Available</span>
                <Link
                  href={`/product/${featuredLarge?.slug}`}
                  className="btn-luxury-primary text-xs py-3 px-6 text-center flex items-center justify-center gap-1.5"
                >
                  Inspect Specifications <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 2 Stacked Companion Products (5 cols) - 100% Clickable */}
            <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 justify-between">
              {[featuredStacked1, featuredStacked2].map((prod, i) => (
                <Link
                  key={prod?.id || i}
                  href={`/product/${prod?.slug}`}
                  className="bg-[#FAFAF7] rounded-[var(--radius-xl)] border border-[#E6E2D9] hover:border-[#B89B6A] p-5 sm:p-6 flex flex-col justify-between flex-1 group shadow-2xs hover:shadow-md transition-all duration-300 block cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#B89B6A] block mb-1">
                        FEATURED 0{i + 2} • {prod?.categoryName}
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors">
                        {prod?.name}
                      </h4>
                    </div>
                    <span className="p-2 rounded-full bg-white border border-[#E6E2D9] text-[#171717] group-hover:bg-[#171717] group-hover:text-white transition-colors flex-shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="relative w-full h-[130px] sm:h-[150px] my-3 bg-white/60 rounded-[var(--radius-md)] border border-[#E6E2D9]/60 overflow-hidden flex items-center justify-center">
                    {prod?.images && prod.images[0] && (
                      <Image
                        src={prod.images[0]}
                        alt={prod.name}
                        fill
                        sizes="260px"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#E6E2D9] flex items-center justify-between text-xs font-mono text-[#686660]">
                    <span>{prod?.sku}</span>
                    <span className="text-[#171717] font-bold group-hover:text-[#B89B6A] flex items-center gap-1 transition-colors">
                      View Details →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 — LIVE IN-PAGE PRODUCT DISCOVERY GRID */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FAFAF7] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="border-b border-[#E6E2D9] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block mb-1">
                05 / LIVE CATALOGUE EXPLORER
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717]">
                Explore the Botanical Archive
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717] hover:text-[#B89B6A] flex items-center gap-1 transition-colors"
            >
              Open Full Shop Directory ({products.length}) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* In-Page Filter Pills & Quick Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none py-1">
              <button
                onClick={() => setDiscoveryCategory('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider font-sans whitespace-nowrap transition-all ${
                  discoveryCategory === 'all'
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'bg-white text-[#686660] hover:bg-[#F2F0EA] border border-[#E6E2D9]'
                }`}
              >
                All ({products.length})
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setDiscoveryCategory(c.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider font-sans whitespace-nowrap transition-all ${
                    discoveryCategory === c.id
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
                value={discoverySearch}
                onChange={(e) => setDiscoverySearch(e.target.value)}
                className="w-full pl-8 pr-8 py-2 bg-white border border-[#E6E2D9] rounded text-xs text-[#171717] placeholder:text-[#686660]/60 outline-none focus:border-[#171717]"
              />
              {discoverySearch && (
                <button
                  onClick={() => setDiscoverySearch('')}
                  className="absolute right-2.5 top-2.5 text-xs text-[#686660]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Discovery Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {discoveryProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} aspect="tall" />
            ))}
          </div>

          <div className="pt-10 text-center">
            <Link
              href={discoveryCategory === 'all' ? '/shop' : `/shop?category=${categories.find(c => c.id === discoveryCategory)?.slug || 'all'}`}
              className="btn-luxury-primary text-xs py-3.5 px-8"
            >
              View More in This Category →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 — MANUFACTURING STORY: "MADE WITH PURPOSE." */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="border-b border-[#E6E2D9] pb-6 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block mb-1">
                06 / CRAFTSMANSHIP
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717]">
                Made with Purpose.
              </h2>
            </div>
            <Link
              href="/manufacturing"
              className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717] hover:text-[#B89B6A] flex items-center gap-1"
            >
              Detailed Manufacturing Portal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Step Sequence */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            <div className="lg:col-span-6 space-y-3">
              {mfgSteps.map((s, idx) => {
                const isActive = activeMfgStep === idx;
                return (
                  <button
                    key={s.num}
                    onClick={() => setActiveMfgStep(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-[var(--radius-lg)] border transition-all duration-300 relative ${
                      isActive
                        ? 'bg-[#FAFAF7] border-[#171717] shadow-xs ring-1 ring-[#171717]'
                        : 'bg-white border-[#E6E2D9] hover:border-[#B89B6A]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-bold tracking-widest text-[#B89B6A] uppercase">
                        {s.step}
                      </span>
                      <span className="text-xs font-mono text-[#686660]">0{idx + 1} / 04</span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#171717]">{s.title}</h3>
                    {isActive && (
                      <p className="text-xs text-[#686660] font-sans leading-relaxed pt-2 mt-2 border-t border-[#E6E2D9]">
                        {s.desc}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-6">
              <div className="w-full aspect-[4/3] rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] p-6 shadow-sm relative overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMfgStep}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={mfgSteps[activeMfgStep].image}
                      alt={mfgSteps[activeMfgStep].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-contain p-4"
                    />
                    <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-widest text-[#686660] bg-white/90 px-2.5 py-1 rounded border border-[#E6E2D9]">
                      {mfgSteps[activeMfgStep].step}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 — EXPLORE BY APPLICATION: "WHERE AROMA BECOMES EXPERIENCE." */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FAFAF7] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block mb-1">
                07 / APPLICATION DISCOVERY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#171717] tracking-tight">
                Where Aroma Becomes Experience.
              </h2>
            </div>
            <Link href="/applications" className="btn-luxury-outline text-xs py-2.5 px-6 self-start md:self-auto">
              View Application Guides →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Candle Making & Wax Formulation',
                category: 'candle-making',
                desc: 'High flashpoint concentrates engineered for soy, beeswax, and paraffin candle making.',
                img: '/products/images/bergamot-fragrance-oil-for-candle-making-563-1.jpg',
              },
              {
                title: 'Cold-Process Soap Saponification',
                category: 'fragrance-oils',
                desc: 'Alkali-stable botanical essences designed for zero trace seizing in soap crafting.',
                img: '/products/images/citrus-fragrance-oil-for-soap-making-286-1.png',
              },
              {
                title: 'Luxury Hospitality & Ambient Scenting',
                category: 'diffuser-blends',
                desc: 'Harmonious signature blends engineered for cold-mist ultrasonic and HVAC scent dispersion.',
                img: '/products/images/luxury-hotel-fragrance-oil-527-1.jpg',
              },
            ].map((app, i) => (
              <Link
                key={i}
                href={`/shop?category=${app.category}`}
                className="p-6 sm:p-8 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] hover:border-[#B89B6A] shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-[4/3] rounded-[var(--radius-md)] bg-[#FAFAF7] border border-[#E6E2D9] relative overflow-hidden mb-5 flex items-center justify-center p-4">
                    <Image
                      src={app.img}
                      alt={app.title}
                      fill
                      sizes="300px"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors mb-2">
                    {app.title}
                  </h3>
                  <p className="text-xs text-[#686660] leading-relaxed font-sans">{app.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-[#E6E2D9] flex items-center justify-between text-xs font-mono text-[#171717] font-bold">
                  <span>Explore Formulations</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#B89B6A]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08 — INTERACTIVE SCENT FINDER & OLFACTORY PYRAMID */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial space-y-16 sm:space-y-20">
          <ScentFinderWidget />
          <InteractiveOlfactoryPyramid />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09 — QUALITY STORY: "DETAILS MATTER." */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FAFAF7] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="max-w-3xl mb-12 sm:mb-16 space-y-2">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block">
              09 / MANUFACTURING PRINCIPLES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
              Details Matter.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#686660] font-sans leading-relaxed">
              Every botanical batch follows verified standards across physical extraction, UV shielding, batch safety, and verified customer guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                num: '01',
                title: 'Amber UV Shielding',
                desc: 'Housed in heavy amber glass to protect delicate botanical monoterpenes from photolytic breakdown.',
              },
              {
                num: '02',
                title: 'Tamper-Evident Seals',
                desc: 'Secure industrial sealing ensuring zero contamination and leak-free transit across India.',
              },
              {
                num: '03',
                title: 'Application Guidance',
                desc: 'Precise dosage and flashpoint advice for diffusers, soap crafting, and candle wax blending.',
              },
              {
                num: '04',
                title: 'Authentic Provenance',
                desc: 'Distilled and compounded directly at Mylal Exports in Coimbatore, eliminating middleman dilution.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-6 sm:p-8 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#B89B6A] tracking-[0.2em] block mb-2 sm:mb-3">
                    {card.num}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#686660] font-sans leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10 — BUSINESS / WHOLESALE: "BUILT FOR BUSINESS." */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Wholesale */}
            <div className="p-6 sm:p-12 rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] space-y-4 sm:space-y-6 shadow-2xs">
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block">
                10A / B2B SUPPLY
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight">
                Built for Business.
              </h3>
              <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed">
                We supply bulk quantities from 1kg aluminium containers to 25kg drums for soap manufacturers, candle artisans, cosmetic laboratories, and hotel ambient scenting.
              </p>
              <div>
                <Link href="/wholesale" className="btn-luxury-primary text-xs py-3.5 px-7 inline-flex">
                  Start an Enquiry →
                </Link>
              </div>
            </div>

            {/* Rebranding */}
            <div className="p-6 sm:p-12 rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] space-y-4 sm:space-y-6 shadow-2xs">
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block">
                10B / PRIVATE LABEL
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight">
                Your Brand. Our Expertise.
              </h3>
              <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed">
                Launch your own bespoke perfume or diffuser line. We handle custom formulation, regulatory batch blending, bottle packaging, and private-label labeling in Coimbatore.
              </p>
              <div>
                <Link href="/rebranding" className="btn-luxury-outline text-xs py-3.5 px-7 inline-flex">
                  Explore Private Labeling →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11 — EDITORIAL ACCORDION FAQ */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            <div className="lg:col-span-5 space-y-3 sm:space-y-4">
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block">
                11 / QUESTIONS & GUIDANCE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
                Frequently Answered
              </h2>
              <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed">
                Clear answers regarding WhatsApp ordering, bulk MOQs, laboratory distillation, and shipping protocols.
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#E6E2D9] border-t border-b border-[#E6E2D9]">
              {faqs.map((faq, i) => (
                <div key={i} className="py-5 sm:py-6">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="font-serif text-lg sm:text-2xl font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors">
                      {faq.q}
                    </span>
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAFAF7] border border-[#E6E2D9] flex items-center justify-center flex-shrink-0 group-hover:border-[#171717] transition-colors">
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
