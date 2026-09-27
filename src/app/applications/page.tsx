'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/lib/data-context';
import ProductCard from '@/components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Droplets,
  Sparkles,
  Wind,
  Building2,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';

interface ApplicationCategory {
  id: string;
  name: string;
  subtitle: string;
  icon: any;
  categoryFilter: string;
  description: string;
  recommendedOils: string[];
  specs: {
    recommendedDosage: string;
    temperatureSafety: string;
    curingTime: string;
  };
}

const APPLICATIONS: ApplicationCategory[] = [
  {
    id: 'candle-making',
    name: 'Candle Making & Wax Formulation',
    subtitle: 'High Flashpoint & Optimal Scent Throw in Soy, Beeswax & Paraffin',
    icon: Flame,
    categoryFilter: 'candle-making',
    description: 'Specialized concentrated fragrance oils calibrated to blend seamlessly with soy, paraffin, and coconut wax blends without curdling or flashpoint vaporization.',
    recommendedOils: ['Bergamot Candle Oil', 'Chocolate Fragrance Oil', 'Dragon Blood Oil', 'Sandalwood Candle Fragrance'],
    specs: {
      recommendedDosage: '6% – 10% of total wax weight',
      temperatureSafety: 'Add at 65°C – 70°C before pouring',
      curingTime: '48 hours for soy; 24 hours for paraffin',
    },
  },
  {
    id: 'soap-making',
    name: 'Cold-Process & Melt-and-Pour Soap Crafting',
    subtitle: 'Alkali Stability & Zero Saponification Seizing',
    icon: Droplets,
    categoryFilter: 'fragrance-oils',
    description: 'High-purity botanical fragrance oils engineered to resist discoloration, trace acceleration, and ricing during lye saponification in traditional and modern soap making.',
    recommendedOils: ['Aavaram Poo Soap Oil', 'Basil Essential Oil for Soap', 'Citrus Fragrance Oil', 'Almond Oil'],
    specs: {
      recommendedDosage: '3% – 5% of oil weight in CP soap',
      temperatureSafety: 'Blend at room temperature (35°C – 40°C)',
      curingTime: 'Standard 4–6 week bar cure',
    },
  },
  {
    id: 'hospitality-diffusers',
    name: 'Luxury Hospitality & Ambient Scenting',
    subtitle: 'Hotel Lobbies, Spas, Corporate Headquarters & Ultrasonic Units',
    icon: Building2,
    categoryFilter: 'diffuser-blends',
    description: 'Harmonious multi-layered diffuser blends engineered for continuous, non-clogging cold-mist dispersion in HVAC scent systems and residential ultrasonic diffusers.',
    recommendedOils: ['Luxury Hotel Fragrance Oil', 'Signature Customised Diffuser Oil', 'SenseMe Sleep & Calm', 'Ultrasonic Diffusers'],
    specs: {
      recommendedDosage: '5–10 drops per 200ml water tank',
      temperatureSafety: 'Cold ultrasonic atomization',
      curingTime: 'Instant atmospheric diffusion',
    },
  },
  {
    id: 'aromatherapy-wellness',
    name: 'Aromatherapy & Pure Botanical Formulations',
    subtitle: '100% Steam-Distilled Single Origins for Wellness & Meditation',
    icon: Wind,
    categoryFilter: 'essential-oils',
    description: 'Single-origin steam-distilled and cold-pressed botanical extracts for meditation spaces, yoga sanctuaries, holistic practitioners, and natural personal formulations.',
    recommendedOils: ['Frankincense Oil', 'Lavender Essential Oil', 'Rosemary Oil', 'Tea Tree Essential Oil'],
    specs: {
      recommendedDosage: '1% – 2% in carrier oil for topical use',
      temperatureSafety: 'Store below 25°C away from direct sunlight',
      curingTime: 'Immediate topical / diffuser application',
    },
  },
  {
    id: 'natural-perfumery',
    name: 'Bespoke Perfumery & Fine Fragrance',
    subtitle: 'Concentrated Attars, Extrait de Parfum & Private Label Blends',
    icon: Sparkles,
    categoryFilter: 'natural-perfumes',
    description: 'Expressive botanical perfumery oils and pure concentrates crafted with rich base fixatives for high longevity, complex sillage, and private-label flacon packaging.',
    recommendedOils: ['Kestrels Amora Perfume', 'Agarwood Fragrance', 'French Vanilla Perfume Extract'],
    specs: {
      recommendedDosage: '15% – 25% EDP concentration in perfumer alcohol',
      temperatureSafety: 'Macerate at 15°C – 18°C',
      curingTime: '3–6 weeks maceration recommended',
    },
  },
];

export default function ApplicationsPage() {
  const { products } = useData();
  const [selectedApp, setSelectedApp] = useState<string>('candle-making');

  const currentApp = APPLICATIONS.find((a) => a.id === selectedApp) || APPLICATIONS[0];

  const matchedProducts = products.filter((p) => {
    if (currentApp.categoryFilter === 'all') return true;
    return p.categoryId === currentApp.categoryFilter;
  });

  return (
    <div className="pt-32 pb-32 bg-[#FAFAF7] text-[#171717] min-h-screen">
      {/* 01 — HERO */}
      <section className="container-editorial mb-16">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
            HOW SENSEME BOTANICALS ARE APPLIED
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#171717] leading-[0.98]">
            Where Aroma <br />
            <span className="font-editorial italic font-normal text-[#B89B6A]">
              Becomes Experience.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#686660] font-sans leading-relaxed">
            From industrial candle making and cold-process soap manufacturing to luxury hotel scenting, discover how SenseMe botanical extracts are formulated for professional results.
          </p>
        </div>

        {/* Application Selector Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 mt-12 scrollbar-none">
          {APPLICATIONS.map((app) => {
            const Icon = app.icon;
            const isSelected = selectedApp === app.id;
            return (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app.id)}
                className={`px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider font-sans whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'bg-white text-[#686660] hover:bg-[#F2F0EA] border border-[#E6E2D9]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{app.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 02 — ACTIVE APPLICATION PROFILE */}
      <section className="container-editorial mb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentApp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="p-8 md:p-12 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-sm space-y-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-[#E6E2D9] pb-8">
              <div className="space-y-2 max-w-2xl">
                <span className="font-mono text-xs text-[#B89B6A] font-bold uppercase tracking-wider">
                  DISCIPLINE OVERVIEW
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
                  {currentApp.name}
                </h2>
                <p className="text-xs sm:text-sm font-mono text-[#686660] italic">
                  {currentApp.subtitle}
                </p>
                <p className="text-sm md:text-base text-[#686660] font-sans leading-relaxed pt-2">
                  {currentApp.description}
                </p>
              </div>

              {/* Technical formulation specs */}
              <div className="p-6 rounded-[var(--radius-lg)] bg-[#FAFAF7] border border-[#E6E2D9] space-y-3 min-w-[280px]">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#B89B6A] font-bold block">
                  TECHNICAL DOSAGE GUIDE
                </span>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[#686660] block text-[10px] uppercase font-mono">Dosage Ratio</span>
                    <span className="font-semibold text-[#171717]">{currentApp.specs.recommendedDosage}</span>
                  </div>
                  <div>
                    <span className="text-[#686660] block text-[10px] uppercase font-mono">Temperature Protocol</span>
                    <span className="font-semibold text-[#171717]">{currentApp.specs.temperatureSafety}</span>
                  </div>
                  <div>
                    <span className="text-[#686660] block text-[10px] uppercase font-mono">Curing / Settling</span>
                    <span className="font-semibold text-[#171717]">{currentApp.specs.curingTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Matched Products Grid */}
            <div>
              <div className="flex items-center justify-between pb-4 mb-6">
                <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold">
                  RECOMMENDED SENSEME FORMULATIONS ({matchedProducts.length})
                </span>
                <Link
                  href={`/category/${currentApp.categoryFilter}`}
                  className="text-xs font-mono font-bold text-[#171717] hover:text-[#B89B6A] uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  View Category Portal <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {matchedProducts.slice(0, 8).map((p, idx) => (
                  <ProductCard key={p.id} product={p} index={idx} />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 03 — B2B & CONSULTATION CTA */}
      <section className="container-editorial text-center max-w-2xl mx-auto space-y-6">
        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
          Need Custom Formulation Advice for Your Application?
        </h3>
        <p className="text-sm text-[#686660] leading-relaxed">
          Our technical distillation and perfumery team in Coimbatore advises candle makers, soap artisans, and hotel operators on exact fragrance flashpoints, solubility, and scent throw.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact" className="btn-luxury-primary text-xs py-3.5 px-8">
            Consult Our Technical Lab <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/wholesale" className="btn-luxury-outline text-xs py-3.5 px-8">
            Explore Wholesale Tiers
          </Link>
        </div>
      </section>
    </div>
  );
}
