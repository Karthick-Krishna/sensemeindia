'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Droplets, Sparkles, MapPin, Phone, Mail, ArrowRight, Package } from 'lucide-react';
import { useData } from '@/lib/data-context';

export default function AboutPage() {
  const { settings } = useData();

  return (
    <div className="pt-32 pb-32 bg-[#FAFAF7] text-[#171717] min-h-screen">
      <div className="container-editorial">
        {/* Top Header */}
        <div className="border-b border-[#E6E2D9] pb-12 mb-16 max-w-4xl space-y-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
            ESTABLISHED IN COIMBATORE, TAMIL NADU
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#171717] leading-[0.96]">
            More Than a Product. <br />
            <span className="font-editorial italic font-normal text-[#B89B6A]">
              A Craft of Nature.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#686660] font-sans leading-relaxed">
            SenseMe India operates as the specialized botanical distillation and fragrance compounding arm of Mylal Exports, delivering 195+ pure extracts and bespoke aroma formulations.
          </p>
        </div>

        {/* Story Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-6 space-y-6 text-sm md:text-base font-sans text-[#686660] leading-relaxed">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#171717]">
              Coimbatore Provenance & Pure Extraction
            </h2>
            <p>
              Headquartered in Coimbatore, Tamil Nadu, SenseMe India was founded with a clear mandate: produce unadulterated botanical distillations without artificial carriers or synthetic dilution.
            </p>
            <p>
              From raw steam-distilled single botanicals to high flashpoint candle fragrances and luxury hotel diffuser blends, every formulation is tested for optical purity and filled into pharmaceutical-grade amber glass.
            </p>
            <div className="pt-2">
              <Link href="/shop" className="btn-luxury-primary text-xs py-3.5 px-8">
                Explore Full Catalogue <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-8 md:p-12 rounded-[var(--radius-xl)] border border-[#E6E2D9] shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#171717]">
              Verified Manufacturing Facts
            </h3>
            <div className="space-y-4 text-xs md:text-sm font-sans">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#B89B6A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171717] block font-semibold">Corporate Lineage</strong>
                  <span className="text-[#686660]">Mylal Exports, Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Droplets className="w-5 h-5 text-[#B89B6A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171717] block font-semibold">Distillation Methods</strong>
                  <span className="text-[#686660]">Low-Temperature Steam Distillation, Hydraulic Cold-Pressing & Fractional Compounding</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-[#B89B6A] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171717] block font-semibold">Packaging Standards</strong>
                  <span className="text-[#686660]">Pharmaceutical Amber UV Glass (15ml–100ml), Aluminium Bottles (500ml–1kg), and UN-Certified Drums (5kg–25kg)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E6E2D9]">
          <div className="p-8 rounded-[var(--radius-lg)] bg-white border border-[#E6E2D9] space-y-2">
            <span className="font-mono text-xs font-bold text-[#B89B6A]">01 / INTEGRITY</span>
            <h4 className="font-serif text-2xl font-bold text-[#171717]">100% Purity</h4>
            <p className="text-xs text-[#686660] leading-relaxed">
              No chemical solvent residues, no synthetic carrier dilution. Uncut botanical integrity in every drop.
            </p>
          </div>
          <div className="p-8 rounded-[var(--radius-lg)] bg-white border border-[#E6E2D9] space-y-2">
            <span className="font-mono text-xs font-bold text-[#B89B6A]">02 / LABORATORY</span>
            <h4 className="font-serif text-2xl font-bold text-[#171717]">Batch Consistency</h4>
            <p className="text-xs text-[#686660] leading-relaxed">
              Tested for refractive index, optical rotation, and olfactory profile consistency across batches.
            </p>
          </div>
          <div className="p-8 rounded-[var(--radius-lg)] bg-white border border-[#E6E2D9] space-y-2">
            <span className="font-mono text-xs font-bold text-[#B89B6A]">03 / REACH</span>
            <h4 className="font-serif text-2xl font-bold text-[#171717]">Pan-India Logistics</h4>
            <p className="text-xs text-[#686660] leading-relaxed">
              Direct dispatch from Coimbatore to artisans, manufacturers, and hospitality venues across India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
