'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '@/lib/data-context';
import { generateWhatsAppMessage, generateWhatsAppUrl } from '@/lib/whatsapp';
import { Sparkles, ArrowRight, RotateCcw, MessageCircle, Check, Compass, ShieldCheck } from 'lucide-react';

interface QuestionOption {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
}

const MOODS: QuestionOption[] = [
  { id: 'calm', label: 'Deep Serenity & Sleep', sublabel: 'Lavender, Chamomile, Sandalwood', icon: '🌙' },
  { id: 'luxury', label: 'Luxury Hotel & Ambience', sublabel: 'White Tea, Oud, Bergamot, Amber', icon: '✨' },
  { id: 'energy', label: 'Focus, Clarity & Energy', sublabel: 'Peppermint, Rosemary, Lemongrass', icon: '⚡' },
  { id: 'spiritual', label: 'Grounding & Spiritual', sublabel: 'Frankincense, Myrrh, Patchouli, Holy Basil', icon: '🌿' },
  { id: 'sensual', label: 'Exotic & Floral Elegance', sublabel: 'Rose, Jasmine, Ylang Ylang, Vanilla', icon: '🌸' },
];

const SPACES: QuestionOption[] = [
  { id: 'home', label: 'Master Bedroom & Sanctuary', sublabel: 'Soft, restorative, subtle scent throw', icon: '🛏️' },
  { id: 'hotel', label: 'Commercial & Hotel Lobby', sublabel: 'High-impact signature olfactory branding', icon: '🏛️' },
  { id: 'wellness', label: 'Yoga, Spa & Wellness Studio', sublabel: 'Pure therapeutic botanical dispersion', icon: '🧘' },
  { id: 'craft', label: 'Candle & Soap Making Lab', sublabel: 'High flashpoint & stable hot scent throw', icon: '🧪' },
];

const FAMILIES: QuestionOption[] = [
  { id: 'woody', label: 'Woody, Balsamic & Earthy', sublabel: 'Cedarwood, Sandalwood, Agarwood, Vetiver', icon: '🌲' },
  { id: 'citrus', label: 'Citrus, Crisp & Sparkling', sublabel: 'Bergamot, Sweet Orange, Grapefruit, Lime', icon: '🍋' },
  { id: 'floral', label: 'Rich Florals & Botanical Petals', sublabel: 'Rose Damascena, Jasmine Sambac, Neroli', icon: '🌺' },
  { id: 'herbal', label: 'Fresh Herbal & Camphorous', sublabel: 'Eucalyptus, Basil, Tea Tree, Peppermint', icon: '🌱' },
];

export default function ScentFinderWidget() {
  const { products, settings } = useData();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedMood, setSelectedMood] = useState<string>('luxury');
  const [selectedSpace, setSelectedSpace] = useState<string>('hotel');
  const [selectedFamily, setSelectedFamily] = useState<string>('woody');

  const getMatchedProducts = () => {
    let matches = products.filter((p) => {
      const nameAndDesc = (p.name + ' ' + (p.description || '') + ' ' + (p.tags?.join(' ') || '')).toLowerCase();
      let score = 0;
      if (selectedMood === 'calm' && (nameAndDesc.includes('lavender') || nameAndDesc.includes('sleep') || nameAndDesc.includes('calm') || nameAndDesc.includes('chamomile') || nameAndDesc.includes('relaxing'))) score += 3;
      if (selectedMood === 'luxury' && (nameAndDesc.includes('luxury') || nameAndDesc.includes('hotel') || nameAndDesc.includes('oud') || nameAndDesc.includes('amber') || nameAndDesc.includes('agarwood') || nameAndDesc.includes('vanilla'))) score += 3;
      if (selectedMood === 'energy' && (nameAndDesc.includes('peppermint') || nameAndDesc.includes('rosemary') || nameAndDesc.includes('lemon') || nameAndDesc.includes('citrus') || nameAndDesc.includes('orange'))) score += 3;
      if (selectedMood === 'spiritual' && (nameAndDesc.includes('frankincense') || nameAndDesc.includes('basil') || nameAndDesc.includes('patchouli') || nameAndDesc.includes('sandalwood') || nameAndDesc.includes('myrrh'))) score += 3;
      if (selectedMood === 'sensual' && (nameAndDesc.includes('rose') || nameAndDesc.includes('jasmine') || nameAndDesc.includes('vanilla') || nameAndDesc.includes('perfume') || nameAndDesc.includes('ylang'))) score += 3;

      if (selectedFamily === 'woody' && (nameAndDesc.includes('wood') || nameAndDesc.includes('sandal') || nameAndDesc.includes('cedar') || nameAndDesc.includes('oud') || nameAndDesc.includes('agarwood') || nameAndDesc.includes('vetiver'))) score += 2;
      if (selectedFamily === 'citrus' && (nameAndDesc.includes('citrus') || nameAndDesc.includes('orange') || nameAndDesc.includes('bergamot') || nameAndDesc.includes('lemon') || nameAndDesc.includes('grapefruit'))) score += 2;
      if (selectedFamily === 'floral' && (nameAndDesc.includes('rose') || nameAndDesc.includes('jasmine') || nameAndDesc.includes('floral') || nameAndDesc.includes('poo') || nameAndDesc.includes('blossom'))) score += 2;
      if (selectedFamily === 'herbal' && (nameAndDesc.includes('basil') || nameAndDesc.includes('tea tree') || nameAndDesc.includes('eucalyptus') || nameAndDesc.includes('peppermint') || nameAndDesc.includes('herbal'))) score += 2;

      if (selectedSpace === 'craft' && (p.categoryId === 'candle-making' || p.categoryId === 'fragrance-oils')) score += 3;
      if (selectedSpace === 'hotel' && (p.categoryId === 'diffuser-blends' || p.categoryId === 'diffuser-machines')) score += 3;

      return score > 0;
    });

    if (matches.length < 3) matches = products.slice(0, 3);
    return matches.slice(0, 3);
  };

  const matchedProducts = getMatchedProducts();

  const resetQuiz = () => {
    setStep(1);
    setSelectedMood('luxury');
    setSelectedSpace('hotel');
    setSelectedFamily('woody');
  };

  return (
    <div className="w-full bg-[#FFFFFF] text-[#171717] rounded-[var(--radius-xl)] border border-[#E6E2D9] shadow-sm overflow-hidden relative">
      {/* Top Header Bar */}
      <div className="p-6 md:p-8 border-b border-[#E6E2D9] bg-[#FAFAF7] flex flex-wrap items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white border border-[#E6E2D9] flex items-center justify-center text-[#B89B6A] shadow-sm">
            <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '24s' }} />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#B89B6A] uppercase font-bold block">
              INTERACTIVE OLFACTORY ADVISOR
            </span>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#171717]">
              Find Your Signature Botanical Formulation
            </h3>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                step === s
                  ? 'w-8 bg-[#171717]'
                  : step > s
                  ? 'w-4 bg-[#B89B6A]'
                  : 'w-4 bg-[#E6E2D9]'
              }`}
            />
          ))}
          {step === 4 && (
            <button
              onClick={resetQuiz}
              className="ml-3 text-xs font-mono text-[#686660] hover:text-[#171717] flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Restart
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Body */}
      <div className="p-6 md:p-10 relative z-10 min-h-[400px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {/* STEP 1: MOOD */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-xs text-[#B89B6A] font-bold uppercase tracking-wider block mb-1">
                  STAGE 01 OF 03
                </span>
                <h4 className="font-serif text-2xl md:text-3xl text-[#171717] font-bold">
                  What sensory atmosphere do you wish to manifest?
                </h4>
                <p className="text-sm text-[#686660] mt-1 font-sans">
                  Select the primary emotional or physiological atmosphere for your space or formulation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
                {MOODS.map((m) => {
                  const isSelected = selectedMood === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMood(m.id)}
                      className={`text-left p-5 rounded-[var(--radius-lg)] border transition-all duration-300 relative group ${
                        isSelected
                          ? 'bg-[#FAFAF7] border-[#171717] shadow-sm ring-1 ring-[#171717]'
                          : 'bg-white border-[#E6E2D9] hover:border-[#B89B6A] hover:bg-[#FAFAF7]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl">{m.icon}</span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#171717] text-white flex items-center justify-center text-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <p className="font-serif font-bold text-lg text-[#171717] group-hover:text-[#B89B6A] transition-colors">
                        {m.label}
                      </p>
                      <p className="text-xs text-[#686660] mt-1 font-sans">{m.sublabel}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="btn-luxury-primary text-xs py-3.5 px-8"
                >
                  Continue to Space <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SPACE */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-xs text-[#B89B6A] font-bold uppercase tracking-wider block mb-1">
                  STAGE 02 OF 03
                </span>
                <h4 className="font-serif text-2xl md:text-3xl text-[#171717] font-bold">
                  Where will this botanical aroma be experienced?
                </h4>
                <p className="text-sm text-[#686660] mt-1 font-sans">
                  Environment determines the optimal concentration and evaporation profile.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {SPACES.map((s) => {
                  const isSelected = selectedSpace === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSpace(s.id)}
                      className={`text-left p-5 rounded-[var(--radius-lg)] border transition-all duration-300 relative group ${
                        isSelected
                          ? 'bg-[#FAFAF7] border-[#171717] shadow-sm ring-1 ring-[#171717]'
                          : 'bg-white border-[#E6E2D9] hover:border-[#B89B6A] hover:bg-[#FAFAF7]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl">{s.icon}</span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#171717] text-white flex items-center justify-center text-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <p className="font-serif font-bold text-lg text-[#171717] group-hover:text-[#B89B6A] transition-colors">
                        {s.label}
                      </p>
                      <p className="text-xs text-[#686660] mt-1 font-sans">{s.sublabel}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-mono text-[#686660] hover:text-[#171717] uppercase tracking-wider"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-luxury-primary text-xs py-3.5 px-8"
                >
                  Continue to Notes <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: FAMILY */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div>
                <span className="font-mono text-xs text-[#B89B6A] font-bold uppercase tracking-wider block mb-1">
                  STAGE 03 OF 03
                </span>
                <h4 className="font-serif text-2xl md:text-3xl text-[#171717] font-bold">
                  Choose your preferred olfactory family
                </h4>
                <p className="text-sm text-[#686660] mt-1 font-sans">
                  Harmonize notes suited to your individual aromatic palate.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {FAMILIES.map((f) => {
                  const isSelected = selectedFamily === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFamily(f.id)}
                      className={`text-left p-5 rounded-[var(--radius-lg)] border transition-all duration-300 relative group ${
                        isSelected
                          ? 'bg-[#FAFAF7] border-[#171717] shadow-sm ring-1 ring-[#171717]'
                          : 'bg-white border-[#E6E2D9] hover:border-[#B89B6A] hover:bg-[#FAFAF7]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl">{f.icon}</span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#171717] text-white flex items-center justify-center text-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <p className="font-serif font-bold text-lg text-[#171717] group-hover:text-[#B89B6A] transition-colors">
                        {f.label}
                      </p>
                      <p className="text-xs text-[#686660] mt-1 font-sans">{f.sublabel}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-mono text-[#686660] hover:text-[#171717] uppercase tracking-wider"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="btn-luxury-primary text-xs py-3.5 px-8"
                >
                  Generate Recommendations <Sparkles className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: RECOMMENDATIONS */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E6E2D9] pb-4">
                <div>
                  <span className="font-mono text-xs text-[#B89B6A] font-bold uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" /> CURATED FORMULATIONS FOR YOUR PROFILE
                  </span>
                  <h4 className="font-serif text-2xl md:text-3xl text-[#171717] font-bold mt-1">
                    Top Recommended Botanical Extracts
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#686660] bg-[#FAFAF7] px-3 py-1.5 rounded border border-[#E6E2D9]">
                  <span>Profile:</span>
                  <span className="text-[#171717] font-bold capitalize">{selectedMood}</span> •
                  <span className="text-[#171717] font-bold capitalize">{selectedSpace}</span> •
                  <span className="text-[#171717] font-bold capitalize">{selectedFamily}</span>
                </div>
              </div>

              {/* Matched Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {matchedProducts.map((p, idx) => {
                  const firstImg = p.images && p.images[0] ? p.images[0] : '/products/images/default.jpg';
                  const message = generateWhatsAppMessage({
                    productName: p.name,
                    category: p.categoryName,
                    variant: '100ml',
                    quantity: 1,
                    productUrl: `https://sensemeindia.com/product/${p.slug}`,
                    sku: p.sku,
                  });
                  const whatsappUrl = generateWhatsAppUrl(settings.whatsappNumber, message);

                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.08 }}
                      className="bg-[#FAFAF7] border border-[#E6E2D9] hover:border-[#B89B6A] rounded-[var(--radius-lg)] p-4 flex flex-col justify-between transition-all duration-300 group"
                    >
                      <div>
                        {/* Image Preview */}
                        <div className="w-full aspect-[4/3] rounded-[var(--radius-md)] bg-white relative overflow-hidden mb-3 border border-[#E6E2D9] flex items-center justify-center p-2">
                          <Image
                            src={firstImg}
                            alt={p.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2 left-2 text-[9px] font-mono tracking-widest uppercase bg-white/95 text-[#171717] font-bold px-2 py-0.5 rounded border border-[#E6E2D9]">
                            {p.categoryName}
                          </span>
                        </div>

                        <h5 className="font-serif text-lg font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors line-clamp-1">
                          {p.name}
                        </h5>
                        <p className="text-xs text-[#686660] line-clamp-2 mt-1 leading-relaxed font-sans">
                          {p.shortDescription || p.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-3 border-t border-[#E6E2D9] flex items-center gap-2">
                        <Link
                          href={`/product/${p.slug}`}
                          className="flex-1 text-center py-2.5 px-3 rounded-[var(--radius-sm)] bg-white border border-[#E6E2D9] hover:bg-[#171717] hover:text-white text-[#171717] text-xs font-mono font-semibold transition-colors"
                        >
                          Details
                        </Link>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3.5 rounded-[var(--radius-sm)] bg-[#25D366] hover:bg-[#20bd5a] text-[#171717] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                          title="Inquire via WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" /> Order
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer Assistance */}
              <div className="pt-4 border-t border-[#E6E2D9] flex flex-wrap items-center justify-between gap-4 text-xs text-[#686660]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B89B6A]" />
                  <span>Custom formulation and bulk drums available for all selections.</span>
                </div>
                <Link
                  href="/shop"
                  className="text-[#171717] hover:text-[#B89B6A] font-mono uppercase tracking-wider flex items-center gap-1 transition-colors font-bold"
                >
                  Browse Full 195+ Catalogue <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
