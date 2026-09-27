'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/lib/data-context';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import ScentFinderWidget from '@/components/ScentFinderWidget';
import InteractiveOlfactoryPyramid from '@/components/InteractiveOlfactoryPyramid';
import {
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
} from 'lucide-react';

export default function HomePage() {
  const { products, categories, reviews } = useData();

  // Hero parallax scroll ref
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroMainY = useTransform(heroScrollProgress, [0, 1], ['0%', '16%']);
  const heroSecondaryY = useTransform(heroScrollProgress, [0, 1], ['0%', '28%']);
  const heroTertiaryY = useTransform(heroScrollProgress, [0, 1], ['0%', '10%']);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.85], [1, 0]);

  // Manufacturing Step Interactive state
  const [activeMfgStep, setActiveMfgStep] = useState(0);

  // Testimonials Carousel state
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeReview = reviews[activeReviewIdx] || reviews[0];

  // Selected Featured Products for Showcase (1 large + 2 stacked)
  const featuredLarge = products.find((p) => p.slug === 'luxury-hotel-fragrance-oil-527') || products[0];
  const featuredStacked1 = products.find((p) => p.slug === 'basil-essential-oil-192') || products[1];
  const featuredStacked2 = products.find((p) => p.slug === 'bergamot-fragrance-oil-for-candle-making-563') || products[2];

  const mfgSteps = [
    {
      num: '01',
      step: 'DEVELOP',
      title: 'Botanical Origin Selection',
      desc: 'Selective procurement of wildcrafted and farm-grown botanicals synchronized with seasonal phytochemical peaks.',
      image: '/products/images/basil-essential-oil-192-1.jpg',
    },
    {
      num: '02',
      step: 'CREATE',
      title: 'Low-Temperature Distillation',
      desc: 'Temperature-regulated steam extraction inside SS 316 distillation retorts to preserve delicate monoterpenes.',
      image: '/products/images/luxury-hotel-fragrance-oil-527-1.jpg',
    },
    {
      num: '03',
      step: 'REFINE',
      title: 'Quality & GC-MS Screening',
      desc: 'Multi-parameter physical and analytical testing to verify optical rotation, density, and 100% purity.',
      image: '/products/images/bergamot-fragrance-oil-for-candle-making-563-1.jpg',
    },
    {
      num: '04',
      step: 'DELIVER',
      title: 'Amber UV Shielding & Supply',
      desc: 'Aseptic filling into pharmaceutical amber glass or fluorinated drums and direct dispatch across India.',
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
      {/* 01 — HERO: "CRAFTED FOR THE WAY SCENT IS EXPERIENCED." */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-32 pb-12 px-6 md:px-12 bg-[#FAFAF7] overflow-hidden border-b border-[#E6E2D9]"
      >
        {/* Subtle Radial Light Glow */}
        <div className="absolute top-1/3 right-1/4 w-[40rem] h-[40rem] bg-[#F2F0EA] rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Top Eyebrow Strip */}
        <div className="container-editorial flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B89B6A] animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#686660] font-bold">
              THE WORLD OF AROMA
            </span>
          </div>
          <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#686660] hidden sm:inline">
            COIMBATORE • 195+ BOTANICAL FORMULATIONS
          </span>
        </div>

        {/* Main Hero Split Layout (45% Text / 55% Visual Composition) */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="container-editorial my-auto py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10"
        >
          {/* Left: 45% Text */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-bold text-[#171717] tracking-tight leading-[0.96] mb-5">
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
              className="text-base sm:text-lg text-[#686660] font-sans leading-relaxed max-w-lg"
            >
              Single-origin steam-distilled essential oils, ambient diffuser concentrates, and high-potency fragrance oils formulated with certified botanical purity in Coimbatore, India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link href="/shop" className="btn-luxury-primary text-xs py-3.5 px-8 flex items-center gap-2">
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="btn-luxury-outline text-xs py-3.5 px-8">
                Discover SenseMe
              </Link>
            </motion.div>
          </div>

          {/* Right: 55% Sophisticated Layered Product Composition */}
          <div className="lg:col-span-7 relative h-[460px] sm:h-[520px] flex items-center justify-center">
            {/* Layer 1 & 2: Surface & Light Frame */}
            <div className="absolute inset-0 rounded-[var(--radius-xl)] bg-gradient-to-tr from-[#F2F0EA]/60 via-white/80 to-[#FAFAF7] border border-[#E6E2D9] shadow-sm" />

            {/* Layer 3: Main Large Product (Center Stage with Shadow) */}
            <motion.div
              style={{ y: heroMainY }}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-20 w-[240px] sm:w-[300px] h-[320px] sm:h-[380px] rounded-[var(--radius-lg)] bg-white border border-[#E6E2D9] p-4 shadow-xl flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase bg-[#FAFAF7] text-[#171717] px-2.5 py-1 rounded border border-[#E6E2D9]">
                  SIGNATURE BLEND
                </span>
                <span className="font-mono text-[9px] text-[#686660]">SMI-0527</span>
              </div>

              <div className="relative w-full h-[220px] my-auto flex items-center justify-center">
                <Image
                  src="/products/images/luxury-hotel-fragrance-oil-527-1.jpg"
                  alt="Luxury Hotel Fragrance Oil"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E6E2D9]">
                <div>
                  <p className="font-serif font-bold text-sm text-[#171717]">Luxury Hotel Fragrance</p>
                  <p className="text-[10px] font-mono text-[#686660]">Ambient Scenting</p>
                </div>
                <Link
                  href="/product/luxury-hotel-fragrance-oil-527"
                  className="p-2 rounded-full bg-[#171717] text-white hover:bg-[#B89B6A] transition-colors"
                  aria-label="View Product"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Layer 4: Secondary Product (Offset Left with Parallax) */}
            <motion.div
              style={{ y: heroSecondaryY }}
              initial={{ opacity: 0, x: -40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 0.95 }}
              transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-2 sm:left-6 -bottom-4 z-10 w-[180px] sm:w-[220px] h-[240px] sm:h-[280px] rounded-[var(--radius-lg)] bg-white/95 backdrop-blur-md border border-[#E6E2D9] p-3 shadow-lg hidden sm:flex flex-col justify-between"
            >
              <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-[#686660]">
                100% PURE STEAM DISTILLED
              </span>
              <div className="relative w-full h-[160px] my-auto">
                <Image
                  src="/products/images/basil-essential-oil-192-1.jpg"
                  alt="Basil Essential Oil"
                  fill
                  sizes="220px"
                  className="object-contain p-1"
                />
              </div>
              <p className="font-serif font-bold text-xs text-[#171717] truncate">Basil Essential Oil</p>
            </motion.div>

            {/* Layer 5: Tertiary Product (Offset Right with Parallax) */}
            <motion.div
              style={{ y: heroTertiaryY }}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 0.95 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-2 sm:right-6 -top-4 z-10 w-[180px] sm:w-[220px] h-[240px] sm:h-[280px] rounded-[var(--radius-lg)] bg-white/95 backdrop-blur-md border border-[#E6E2D9] p-3 shadow-lg hidden sm:flex flex-col justify-between"
            >
              <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-[#686660]">
                HIGH FLASHPOINT FORMULATION
              </span>
              <div className="relative w-full h-[160px] my-auto">
                <Image
                  src="/products/images/bergamot-fragrance-oil-for-candle-making-563-1.jpg"
                  alt="Bergamot Candle Fragrance"
                  fill
                  sizes="220px"
                  className="object-contain p-1"
                />
              </div>
              <p className="font-serif font-bold text-xs text-[#171717] truncate">Bergamot Candle Oil</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator Strip */}
        <div className="container-editorial flex items-center justify-between text-xs font-mono text-[#686660] pt-6 border-t border-[#E6E2D9] z-10">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#171717]">01</span>
            <span className="w-12 h-[2px] bg-[#171717]/20 relative overflow-hidden">
              <span className="absolute inset-0 bg-[#171717] animate-marquee" style={{ width: '50%' }} />
            </span>
            <span className="tracking-[0.2em] uppercase text-[10px] font-semibold">SCROLL TO EXPLORE</span>
          </div>
          <span className="hidden sm:inline tracking-[0.2em] uppercase text-[10px]">
            TAMPER-SEALED • PAN-INDIA DISPATCH • 195+ FORMULATIONS
          </span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 — BRAND INTRODUCTION: "MORE THAN A PRODUCT." */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
                02 / PHILOSOPHY & HERITAGE
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#171717] tracking-tight leading-tight">
                More Than a Product.
              </h2>
              <p className="text-base sm:text-lg text-[#686660] font-sans leading-relaxed">
                Operating under <strong className="text-[#171717] font-semibold">Mylal Exports</strong> in Coimbatore, Tamil Nadu, SenseMe India develops and compounds single-origin botanical extracts and high-potency fragrance oils.
              </p>
              <p className="text-sm text-[#686660] leading-relaxed">
                We supply soap artisans, candle makers, luxury hotels, and private-label wellness brands across India with unadulterated formulations backed by rigorous inspection and sealed packaging.
              </p>
              <div className="pt-2">
                <Link href="/about" className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717] hover:text-[#B89B6A] flex items-center gap-1.5 transition-colors">
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
                <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-widest text-[#686660] bg-white/95 px-3 py-1 rounded border border-[#E6E2D9]">
                  COIMBATORE LABORATORY
                </div>
              </div>
            </div>
          </div>

          {/* 3 Key Fact Areas Below */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-8 rounded-[var(--radius-lg)] bg-[#FAFAF7] border border-[#E6E2D9] shadow-xs space-y-3">
              <span className="font-mono text-xs font-bold text-[#B89B6A]">01 / DEVELOPMENT</span>
              <h3 className="font-serif text-2xl font-bold text-[#171717]">Product Development</h3>
              <p className="text-xs text-[#686660] leading-relaxed">
                Single-origin steam distillation, custom fragrance blending, and formulation testing for candle, soap, and diffuser applications.
              </p>
            </div>

            <div className="p-8 rounded-[var(--radius-lg)] bg-[#FAFAF7] border border-[#E6E2D9] shadow-xs space-y-3">
              <span className="font-mono text-xs font-bold text-[#B89B6A]">02 / MANUFACTURING</span>
              <h3 className="font-serif text-2xl font-bold text-[#171717]">Manufacturing Purity</h3>
              <p className="text-xs text-[#686660] leading-relaxed">
                Operating directly out of Coimbatore with multi-point inspection, density verification, and pharmaceutical-grade amber packaging.
              </p>
            </div>

            <div className="p-8 rounded-[var(--radius-lg)] bg-[#FAFAF7] border border-[#E6E2D9] shadow-xs space-y-3">
              <span className="font-mono text-xs font-bold text-[#B89B6A]">03 / BUSINESS</span>
              <h3 className="font-serif text-2xl font-bold text-[#171717]">Business Solutions</h3>
              <p className="text-xs text-[#686660] leading-relaxed">
                Volume-tiered wholesale supplies from 1kg aluminium bottles to 25kg drums, and turnkey private-label OEM manufacturing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 — PRODUCT UNIVERSE: "DISCOVER THE COLLECTIONS" */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 bg-[#FAFAF7] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block mb-2">
                03 / THE UNIVERSE
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#171717] tracking-tight">
                Discover the Collections
              </h2>
            </div>
            <Link href="/shop" className="btn-luxury-outline text-xs py-2.5 px-6 self-start md:self-auto">
              View All 195+ Formulations →
            </Link>
          </div>

          {/* Large Category Panels with Real Imagery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => {
              const count = products.filter((p) => p.categoryId === cat.id).length;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group"
                >
                  <Link
                    href={`/category/${cat.slug}`}
                    className="block bg-white rounded-[var(--radius-xl)] border border-[#E6E2D9] group-hover:border-[#B89B6A] overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-400 flex flex-col justify-between h-full"
                  >
                    <div className="p-8 pb-4">
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-serif text-3xl font-bold text-[#E6E2D9] group-hover:text-[#B89B6A] transition-colors">
                          0{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded bg-[#FAFAF7] border border-[#E6E2D9] text-[#686660]">
                          {count} FORMULATIONS
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#171717] mb-2.5 group-hover:text-[#B89B6A] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-[#686660] font-sans leading-relaxed line-clamp-2 mb-4">
                        {cat.description}
                      </p>
                    </div>

                    <div className="h-44 w-full bg-[#FAFAF7] relative overflow-hidden border-t border-[#E6E2D9] flex items-center justify-center p-4">
                      {cat.image && (
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white/95 via-white/60 to-transparent flex items-center justify-between">
                        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#686660] font-bold">
                          DISCOVER FORMULATIONS
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
      <section className="py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#E6E2D9] pb-8">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block mb-1">
                04 / CURATED SPOTLIGHT
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#171717]">
                Selected Products
              </h2>
            </div>
            <Link href="/shop" className="btn-luxury-outline text-xs py-2.5 px-6 self-start md:self-auto">
              Explore All 195+ Items →
            </Link>
          </div>

          {/* Asymmetric Showcase: 1 Large Left + 2 Stacked Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Large Product (7 cols) */}
            <div className="lg:col-span-7 bg-[#FAFAF7] rounded-[var(--radius-xl)] border border-[#E6E2D9] p-8 md:p-12 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 bg-white rounded border border-[#E6E2D9] text-[#B89B6A]">
                    FEATURED 01
                  </span>
                  <span className="font-mono text-xs text-[#686660]">{featuredLarge?.sku}</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors leading-tight mb-3">
                  {featuredLarge?.name}
                </h3>
                <p className="text-sm text-[#686660] leading-relaxed max-w-xl font-sans mb-6">
                  {featuredLarge?.shortDescription || featuredLarge?.description}
                </p>
              </div>

              <div className="relative w-full h-[300px] my-6 flex items-center justify-center">
                {featuredLarge?.images && featuredLarge.images[0] && (
                  <Image
                    src={featuredLarge.images[0]}
                    alt={featuredLarge.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  />
                )}
              </div>

              <div className="pt-6 border-t border-[#E6E2D9] flex items-center justify-between">
                <span className="font-mono text-xs text-[#686660]">15ml – 5kg Drums Available</span>
                <Link
                  href={`/product/${featuredLarge?.slug}`}
                  className="btn-luxury-primary text-xs py-3 px-6"
                >
                  Inspect Specifications →
                </Link>
              </div>
            </div>

            {/* 2 Stacked Products (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
              {[featuredStacked1, featuredStacked2].map((prod, i) => (
                <div
                  key={prod?.id || i}
                  className="bg-[#FAFAF7] rounded-[var(--radius-xl)] border border-[#E6E2D9] p-6 flex flex-col justify-between flex-1 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#B89B6A] block mb-1">
                        FEATURED 0{i + 2} • {prod?.categoryName}
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors">
                        {prod?.name}
                      </h4>
                    </div>
                    <Link
                      href={`/product/${prod?.slug}`}
                      className="p-2 rounded-full bg-white border border-[#E6E2D9] text-[#171717] group-hover:bg-[#171717] group-hover:text-white transition-colors flex-shrink-0"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="relative w-full h-[150px] my-3">
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
                    <Link href={`/product/${prod?.slug}`} className="text-[#171717] font-bold hover:underline">
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 — MANUFACTURING STORY: "MADE WITH PURPOSE." */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 bg-[#FAFAF7] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="border-b border-[#E6E2D9] pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block mb-1">
                05 / CRAFTSMANSHIP
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#171717]">
                Made with Purpose.
              </h2>
            </div>
            <Link href="/manufacturing" className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717] hover:text-[#B89B6A] flex items-center gap-1">
              Detailed Manufacturing Portal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Step Sequence */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-3">
              {mfgSteps.map((s, idx) => {
                const isActive = activeMfgStep === idx;
                return (
                  <button
                    key={s.num}
                    onClick={() => setActiveMfgStep(idx)}
                    className={`w-full text-left p-5 rounded-[var(--radius-lg)] border transition-all duration-300 relative ${
                      isActive
                        ? 'bg-white border-[#171717] shadow-sm ring-1 ring-[#171717]'
                        : 'bg-[#FAFAF7] border-[#E6E2D9] hover:border-[#B89B6A]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] font-bold tracking-widest text-[#B89B6A] uppercase">
                        {s.step}
                      </span>
                      <span className="text-xs font-mono text-[#686660]">0{idx + 1} / 04</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#171717]">{s.title}</h3>
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
              <div className="w-full aspect-[4/3] rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] p-6 shadow-sm relative overflow-hidden flex items-center justify-center">
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
                    <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-[#686660] bg-white/90 px-2.5 py-1 rounded border border-[#E6E2D9]">
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
      {/* 06 — EXPLORE BY APPLICATION: "WHERE AROMA BECOMES EXPERIENCE." */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block mb-2">
                06 / APPLICATION DISCOVERY
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#171717] tracking-tight">
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
                href={`/category/${app.category}`}
                className="p-8 rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] hover:border-[#B89B6A] shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-[4/3] rounded-[var(--radius-md)] bg-white border border-[#E6E2D9] relative overflow-hidden mb-6 flex items-center justify-center p-4">
                    <Image
                      src={app.img}
                      alt={app.title}
                      fill
                      sizes="300px"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors mb-2">
                    {app.title}
                  </h3>
                  <p className="text-xs text-[#686660] leading-relaxed font-sans">{app.desc}</p>
                </div>
                <div className="pt-6 mt-4 border-t border-[#E6E2D9] flex items-center justify-between text-xs font-mono text-[#171717] font-bold">
                  <span>Explore Formulations</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07 — INTERACTIVE SCENT FINDER & OLFACTORY PYRAMID */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#FAFAF7] border-b border-[#E6E2D9]">
        <div className="container-editorial space-y-20">
          <ScentFinderWidget />
          <InteractiveOlfactoryPyramid />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08 — PRODUCT DISCOVERY GRID: "EXPLORE THE ARCHIVE" */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block mb-2">
                08 / COMPLETE ARCHIVE
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#171717] tracking-tight">
                Explore the Archive
              </h2>
            </div>
            <Link href="/shop" className="btn-luxury-outline text-xs py-2.5 px-6 self-start md:self-auto">
              Browse Complete Catalogue ({products.length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                aspect={idx === 0 || idx === 7 ? 'tall' : 'square'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 09 — QUALITY STORY: "DETAILS MATTER." */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 bg-[#FAFAF7] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="max-w-3xl mb-16 space-y-2">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
              09 / MANUFACTURING PRINCIPLES
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#171717] tracking-tight">
              Details Matter.
            </h2>
            <p className="text-sm md:text-base text-[#686660] font-sans leading-relaxed">
              Every botanical batch follows verified standards across physical extraction, UV shielding, batch safety, and verified customer guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className="p-8 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#B89B6A] tracking-[0.2em] block mb-3">
                    {card.num}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#171717] mb-2.5">
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
      <section className="py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Wholesale */}
            <div className="p-8 md:p-12 rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] space-y-6">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
                10A / B2B SUPPLY
              </span>
              <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
                Built for Business.
              </h3>
              <p className="text-xs md:text-sm text-[#686660] font-sans leading-relaxed">
                We supply bulk quantities from 1kg aluminium containers to 25kg drums for soap manufacturers, candle artisans, cosmetic laboratories, and hotel ambient scenting.
              </p>
              <div>
                <Link href="/wholesale" className="btn-luxury-primary text-xs py-3.5 px-7 inline-flex">
                  Start an Enquiry →
                </Link>
              </div>
            </div>

            {/* Rebranding */}
            <div className="p-8 md:p-12 rounded-[var(--radius-xl)] bg-[#FAFAF7] border border-[#E6E2D9] space-y-6">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
                10B / PRIVATE LABEL
              </span>
              <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
                Your Brand. Our Expertise.
              </h3>
              <p className="text-xs md:text-sm text-[#686660] font-sans leading-relaxed">
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
      {/* 11 — CUSTOMER EXPERIENCE: AUTHENTIC TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 bg-[#FAFAF7] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="flex items-center justify-between pb-8 border-b border-[#E6E2D9] mb-12">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block mb-1">
                11 / VERIFIED CLIENTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] tracking-tight">
                Heard from People Who Discovered SenseMe
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#686660]">
                0{activeReviewIdx + 1} / 0{reviews.length}
              </span>
              <button
                onClick={() =>
                  setActiveReviewIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))
                }
                className="p-2.5 rounded-full border border-[#E6E2D9] bg-white hover:bg-[#FAFAF7] text-[#171717] transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setActiveReviewIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
                }
                className="p-2.5 rounded-full border border-[#E6E2D9] bg-white hover:bg-[#FAFAF7] text-[#171717] transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {activeReview && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto text-center space-y-6 py-6"
              >
                <p className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#171717] leading-tight italic">
                  &ldquo;{activeReview.content}&rdquo;
                </p>

                <div className="pt-2">
                  <span className="font-sans font-bold text-base text-[#171717] block">
                    {activeReview.customerName}
                  </span>
                  <span className="font-mono text-xs text-[#B89B6A] tracking-[0.2em] uppercase">
                    Verified Customer • SenseMe India
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12 — EDITORIAL ACCORDION FAQ */}
      {/* ========================================================================= */}
      <section className="py-24 md:py-32 bg-[#FFFFFF] border-b border-[#E6E2D9]">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
                12 / QUESTIONS & GUIDANCE
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#171717] tracking-tight">
                Frequently Answered
              </h2>
              <p className="text-sm text-[#686660] font-sans leading-relaxed">
                Clear answers regarding WhatsApp ordering, bulk MOQs, laboratory distillation, and shipping protocols.
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#E6E2D9] border-t border-b border-[#E6E2D9]">
              {faqs.map((faq, i) => (
                <div key={i} className="py-6">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors">
                      {faq.q}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#FAFAF7] border border-[#E6E2D9] flex items-center justify-center flex-shrink-0 group-hover:border-[#171717] transition-colors">
                      {openFaq === i ? (
                        <Minus className="w-4 h-4 text-[#171717]" />
                      ) : (
                        <Plus className="w-4 h-4 text-[#686660]" />
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
                        <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed pt-4 max-w-xl">
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
