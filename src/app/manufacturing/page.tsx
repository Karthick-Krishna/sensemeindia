'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Droplets,
  Wind,
  ShieldCheck,
  CheckCircle2,
  Package,
  Layers,
  ArrowRight,
  FlaskConical,
  Flame,
  Check,
} from 'lucide-react';

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Botanical Sourcing & Harvest Selection',
    subtitle: 'Direct Farm Provenance & Harvest Calibration',
    desc: 'Botanical raw materials are selected based on optimal harvest timing, soil characteristics, and active phytochemical maturity.',
    image: '/products/images/basil-essential-oil-192-1.jpg',
    points: ['Direct grower partnerships', 'Seasonal harvest synchronization', 'Physical visual & moisture inspection'],
  },
  {
    num: '02',
    title: 'Low-Temperature Steam Distillation',
    subtitle: 'Preserving Fragile Volatile Monoterpenes',
    desc: 'Botanical biomass is subjected to temperature-regulated steam distillation inside stainless steel distillation retorts.',
    image: '/products/images/luxury-hotel-fragrance-oil-527-1.jpg',
    points: ['Food-grade SS 316 distillation chambers', 'Controlled steam pressure to avoid thermal burning', 'Pure condensate collection with zero synthetic solvents'],
  },
  {
    num: '03',
    title: 'Cold-Pressing & Gentle Extraction',
    subtitle: 'Mechanical Yield for Citrus Rinds & Carrier Seeds',
    desc: 'Citrus rinds and high-lipid seeds undergo hydraulic cold-pressing to preserve unadulterated cold aroma profiles.',
    image: '/products/images/citrus-fragrance-oil-for-soap-making-286-1.png',
    points: ['Zero chemical extraction solvents', 'Unheated physical expelling', 'Retention of natural bio-pigments and aromas'],
  },
  {
    num: '04',
    title: 'Multi-Point Quality Control & GC-MS Screening',
    subtitle: 'Purity Verification & Consistency Matching',
    desc: 'Each distillation batch is tested for optical rotation, specific gravity, refractive index, and gas chromatography purity.',
    image: '/products/images/bergamot-fragrance-oil-for-candle-making-563-1.jpg',
    points: ['Refractive index & density testing', 'Batch-to-batch olfactory comparison', 'Strict zero adulteration guarantee'],
  },
  {
    num: '05',
    title: 'Amber UV Bottling & Tamper Sealing',
    subtitle: 'Photolytic Defense & Transit Integrity',
    desc: 'Liquid extracts are filled into heavy pharmaceutical-grade amber glass or UN-certified bulk containers with tamper-evident seals.',
    image: '/products/images/ultrasonic-aroma-diffuser-dark-brown-126-1.jpg',
    points: ['99% UV radiation blocking amber glass', 'Leak-proof European orifice reducers', 'Tamper-evident shrink bands'],
  },
  {
    num: '06',
    title: 'Coimbatore Dispatch & Logistics',
    subtitle: 'Direct Manufacturer Supply Across India',
    desc: 'Orders are packed with double-walled protective cushioning and dispatched directly from our Coimbatore facility via DTDC and air cargo.',
    image: '/products/images/kestrels-amora-perfume-458-1.png',
    points: ['Pan-India express courier delivery', 'Secure bulk palletization for drums', 'Real-time consignment tracking'],
  },
];

export default function ManufacturingPage() {
  return (
    <div className="pt-20 sm:pt-28 pb-20 sm:pb-32 bg-[#FAFAF7] text-[#171717] min-h-screen">
      {/* 01 — HERO */}
      <section className="container-editorial mb-20">
        <div className="max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E6E2D9] p-1 flex items-center justify-center shadow-2xs">
              <Image
                src="/logo-transparent.png"
                alt="SenseMe Precision Hallmark"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold">
              PRECISION • PURITY • COIMBATORE LABORATORY
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#171717] leading-[0.96]"
          >
            Made with Purpose. <br />
            <span className="font-editorial italic font-normal text-[#B89B6A]">
              Botanical Engineering.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-[#686660] font-sans leading-relaxed max-w-2xl"
          >
            SenseMe India operates a specialized botanical distillation and fragrance blending facility under Mylal Exports in Coimbatore, Tamil Nadu, producing 195+ pure extracts and bespoke aroma formulations.
          </motion.p>
        </div>
      </section>

      {/* 02 — THE 6-STEP PROCESS JOURNEY */}
      <section className="container-editorial mb-28">
        <div className="border-b border-[#E6E2D9] pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block mb-1">
              THE MANUFACTURING SEQUENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
              6 Stages of Botanical Formulation
            </h2>
          </div>
          <span className="text-xs font-mono text-[#686660]">
            Mylal Exports Distillation Base • Coimbatore
          </span>
        </div>

        <div className="space-y-16">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center p-8 md:p-12 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-xs ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text side */}
              <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#B89B6A] px-3 py-1 bg-[#FAFAF7] border border-[#E6E2D9] rounded">
                    STAGE {step.num}
                  </span>
                  <span className="font-mono text-xs text-[#686660] uppercase tracking-wider">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717] leading-tight">
                  {step.title}
                </h3>

                <p className="text-sm md:text-base text-[#686660] font-sans leading-relaxed">
                  {step.desc}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-[#E6E2D9]">
                  {step.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-[#171717]">
                      <Check className="w-4 h-4 text-[#B89B6A] flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image side */}
              <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="w-full aspect-[4/3] rounded-[var(--radius-lg)] bg-[#FAFAF7] border border-[#E6E2D9] overflow-hidden relative flex items-center justify-center p-6 group">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-widest text-[#686660] bg-white/90 px-2 py-0.5 rounded border border-[#E6E2D9]">
                    STAGE {step.num}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 03 — TECHNICAL SPECIFICATIONS & PACKAGING TIERS (100% Light Luxury Card) */}
      <section className="container-editorial mb-28">
        <div className="p-8 md:p-14 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] text-[#171717] shadow-sm space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
              PACKAGING INTEGRITY & VOLUMES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
              Industrial Packaging from 15ml to 25kg Drums
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                size: '15ml – 100ml',
                type: 'Amber Dropper Bottles',
                desc: 'Pharmaceutical-grade amber glass with European orifice reducers for boutique retail and studio blending.',
              },
              {
                size: '500ml – 1000ml',
                type: 'Aluminium Flacons',
                desc: 'Epoxy-lined seamless aluminium containers with tamper-evident caps for commercial soap and candle makers.',
              },
              {
                size: '5kg – 10kg',
                type: 'Fluorinated Jerrycans',
                desc: 'UN-certified high-density fluorinated containers preventing aromatic permeation and chemical stress cracking.',
              },
              {
                size: '25kg+',
                type: 'Industrial Steel Drums',
                desc: 'Epoxy-phenolic coated internal steel drums for industrial fragrance compounding and cosmetic manufacturers.',
              },
            ].map((box, i) => (
              <div key={i} className="p-6 rounded-[var(--radius-lg)] bg-[#FAFAF7] border border-[#E6E2D9] space-y-3">
                <span className="font-mono text-xs font-bold text-[#B89B6A] block">{box.size}</span>
                <h4 className="font-serif text-xl font-bold text-[#171717]">{box.type}</h4>
                <p className="text-xs text-[#686660] leading-relaxed font-sans">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — CTA FOOTER STRIP */}
      <section className="container-editorial text-center max-w-2xl mx-auto space-y-6">
        <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#171717]">
          Explore the Full 195+ Product Catalogue
        </h3>
        <p className="text-sm text-[#686660]">
          Review single-origin extracts, diffuser oils, soap concentrates, and machines with direct WhatsApp inquiry.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link href="/shop" className="btn-luxury-primary text-xs py-3.5 px-8">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/wholesale" className="btn-luxury-outline text-xs py-3.5 px-8">
            B2B Wholesale Tiers
          </Link>
        </div>
      </section>
    </div>
  );
}
