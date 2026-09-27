'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Sparkles, Droplets, ArrowRight, ShieldCheck } from 'lucide-react';

interface NoteLevel {
  id: 'top' | 'heart' | 'base';
  title: string;
  subtitle: string;
  timeframe: string;
  evaporationRate: string;
  botanicals: string[];
  description: string;
  molecules: string;
  sampleImage: string;
}

const NOTE_LEVELS: NoteLevel[] = [
  {
    id: 'top',
    title: 'Top Notes (Head)',
    subtitle: 'The First Impression & Immediate Awakening',
    timeframe: '0 – 20 Minutes',
    evaporationRate: 'High Flashpoint & Light Volatility',
    botanicals: ['Italian Bergamot', 'French Lavender', 'Sweet Orange', 'Peppermint', 'Grapefruit'],
    description: 'Light, vibrant, and immediate. Top notes introduce the olfactory journey, establishing atmosphere and clarity before evaporating gently to reveal the core composition.',
    molecules: 'Monoterpenes, Esters, Aldehydes (Limonene, Linalyl Acetate, Menthol)',
    sampleImage: '/products/images/bergamot-fragrance-oil-for-candle-making-563-1.jpg',
  },
  {
    id: 'heart',
    title: 'Heart Notes (Body)',
    subtitle: 'The Core Botanical Identity & Harmony',
    timeframe: '20 Minutes – 4 Hours',
    evaporationRate: 'Medium Volatility & Full Floral/Herbal Body',
    botanicals: ['Rose Damascena', 'Jasmine Grandiflorum', 'Holy Basil (Tulsi)', 'Ylang Ylang', 'Nutmeg'],
    description: 'The soul of the formulation. Heart notes harmonize top and base layers, creating the true signature character that lingers through social spaces, rooms, and personal application.',
    molecules: 'Sesquiterpenes, Alcohols, Ketones (Geraniol, Eugenol, Citronellol)',
    sampleImage: '/products/images/basil-essential-oil-192-1.jpg',
  },
  {
    id: 'base',
    title: 'Base Notes (Soul)',
    subtitle: 'The Enduring Fixative & Deep Resonance',
    timeframe: '4 Hours – 24+ Hours',
    evaporationRate: 'Low Volatility & Heavy Molecular Weight',
    botanicals: ['Assam Agarwood (Oud)', 'Sandalwood', 'Frankincense Carterii', 'Dark Patchouli', 'Madagascar Vanilla'],
    description: 'Heavy, rich, and fixative. Base notes anchor the formulation, bonding with skin or diffusing steadily into ambient air to leave an unforgettable, comforting foundation.',
    molecules: 'Diterpenes, Heavy Balsams, Resins (Santalo, Patchoulol, Boswellic acids)',
    sampleImage: '/products/images/luxury-hotel-fragrance-oil-527-1.jpg',
  },
];

export default function InteractiveOlfactoryPyramid() {
  const [activeLevel, setActiveLevel] = useState<'top' | 'heart' | 'base'>('heart');

  const current = NOTE_LEVELS.find((l) => l.id === activeLevel) || NOTE_LEVELS[1];

  return (
    <div className="w-full bg-white border border-[#E6E2D9] rounded-[var(--radius-xl)] p-6 md:p-12 shadow-sm overflow-hidden relative">
      {/* Header */}
      <div className="max-w-3xl mb-8 space-y-2">
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block">
          THE SCIENCE OF SCENT ARCHITECTURE
        </span>
        <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#171717]">
          The Olfactory Pyramid & Evaporation Dynamics
        </h3>
        <p className="text-[#686660] text-sm md:text-base leading-relaxed font-sans">
          Every pure essential oil and fragrance concentrate engineered at SenseMe India is calibrated across molecular weights to guarantee a harmonious aromatic experience over time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Visual Pyramid */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {NOTE_LEVELS.map((level, idx) => {
            const isActive = activeLevel === level.id;
            return (
              <motion.button
                key={level.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setActiveLevel(level.id)}
                className={`w-full text-left p-5 rounded-[var(--radius-lg)] border transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? 'bg-[#FAFAF7] text-[#171717] border-[#171717] shadow-sm ring-1 ring-[#171717]'
                    : 'bg-white text-[#171717] border-[#E6E2D9] hover:border-[#B89B6A]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`font-mono text-[10px] tracking-[0.2em] uppercase font-bold px-2 py-0.5 rounded ${
                      isActive ? 'bg-[#171717] text-white' : 'bg-[#F2F0EA] text-[#686660]'
                    }`}
                  >
                    LEVEL 0{idx + 1}
                  </span>
                  <span className={`text-xs font-mono font-medium ${isActive ? 'text-[#B89B6A]' : 'text-[#686660]'}`}>
                    {level.timeframe}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-xl font-bold">{level.title}</h4>
                    <p className="text-xs mt-0.5 line-clamp-1 text-[#686660] font-sans">
                      {level.subtitle}
                    </p>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                      isActive ? 'bg-[#171717] text-white rotate-90' : 'bg-[#F2F0EA] text-[#686660]'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activePyramidBar"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#B89B6A]"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right: Rich Interactive Detail Card */}
        <div className="lg:col-span-7 bg-[#FAFAF7] rounded-[var(--radius-xl)] border border-[#E6E2D9] p-6 md:p-8 shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E6E2D9] pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B89B6A] animate-ping" />
                    <span className="font-mono text-xs text-[#B89B6A] font-bold uppercase tracking-wider">
                      ACTIVE OLFACTORY FOCUS
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl md:text-3xl font-bold text-[#171717] mt-1">
                    {current.title}
                  </h4>
                  <p className="text-sm text-[#686660] italic font-serif">{current.subtitle}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#686660] uppercase block">PERSISTENCE</span>
                  <span className="text-sm font-mono font-bold text-[#171717]">{current.timeframe}</span>
                </div>
              </div>

              <p className="text-sm md:text-base text-[#686660] leading-relaxed font-sans">
                {current.description}
              </p>

              <div>
                <span className="text-xs font-mono uppercase text-[#686660] font-semibold block mb-2">
                  Representative SenseMe Formulations:
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.botanicals.map((bot) => (
                    <span
                      key={bot}
                      className="text-xs font-serif font-semibold px-3 py-1.5 rounded-full bg-white border border-[#E6E2D9] text-[#171717] flex items-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-3 h-3 text-[#B89B6A]" />
                      {bot}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-[var(--radius-md)] border border-[#E6E2D9] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="font-mono text-[10px] text-[#686660] uppercase font-bold block">
                    EVAPORATION PROFILE
                  </span>
                  <p className="font-semibold text-[#171717] mt-0.5">{current.evaporationRate}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-[#686660] uppercase font-bold block">
                    PRIMARY PHYTOCHEMICALS
                  </span>
                  <p className="font-semibold text-[#171717] mt-0.5">{current.molecules}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
