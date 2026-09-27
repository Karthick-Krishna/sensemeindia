'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqSections = [
  {
    title: 'Products & Formulations',
    items: [
      {
        q: 'What types of products does SenseMe India manufacture?',
        a: 'SenseMe India manufactures pure essential oils, diffuser oils, fragrance oils for soap and candle making, natural perfumes, and commercial ultrasonic aroma diffuser machines from our facility in Coimbatore, Tamil Nadu.',
      },
      {
        q: 'Are your essential oils 100% pure single-botanical extracts?',
        a: 'Yes. Our essential oils are steam-distilled or cold-pressed single botanical extracts without artificial diluents or synthetic fragrance boosters. Each batch comes packed in UV-blocking amber glass bottles.',
      },
      {
        q: 'What is the difference between Essential Oils and Fragrance Oils?',
        a: 'Essential oils are extracted purely from plant botanicals (leaves, bark, flowers, roots). Fragrance oils are complex aromatic formulations crafted specifically for high flashpoint applications like candle making, soap manufacturing, and cosmetics where long-lasting scent throw is required.',
      },
    ],
  },
  {
    title: 'Ordering & WhatsApp Process',
    items: [
      {
        q: 'Why does the website not have a standard credit card checkout cart?',
        a: 'We operate on a tailored WhatsApp commerce model. Because aromatic and wholesale products involve different packaging sizes, custom volume discounts, and courier arrangements, ordering via WhatsApp allows you to receive instant verified batch availability and custom quotes directly from our product experts.',
      },
      {
        q: 'How do I place an order?',
        a: 'Browse any product in our catalogue, select your desired size/variant, choose your quantity, and click "Buy Now on WhatsApp". A pre-structured message will open in WhatsApp. Our team will immediately provide the exact total and secure payment link.',
      },
    ],
  },
  {
    title: 'Wholesale & Private Label',
    items: [
      {
        q: 'What are your minimum order quantities (MOQs) for wholesale supply?',
        a: 'We accommodate artisan runs starting at 500ml/1kg aluminium canisters, with tiered wholesale volume pricing extending to 5kg, 25kg, and 200kg+ commercial barrels.',
      },
      {
        q: 'Can you formulate custom perfumes or diffuser blends under our brand?',
        a: 'Yes. Under our private label service, we provide custom fragrance formulation, bottle selection, batch mixing, and finished tamper-sealed packaging for retail brands, hotels, and luxury spas.',
      },
    ],
  },
  {
    title: 'Packaging & Courier Dispatch',
    items: [
      {
        q: 'How are the bottles packed to prevent leakage during courier transit?',
        a: 'All liquids are secured with leak-proof plug caps and tamper-evident seals. Orders are cushioned in protective honeycomb/bubble packaging and double-boxed. We dispatch across India via trusted logistics partners including DTDC.',
      },
      {
        q: 'What is the typical shipping timeline?',
        a: 'Orders are dispatched within 24–48 hours of confirmation from Coimbatore. Delivery typically takes 2–5 business days depending on destination location across India.',
      },
    ],
  },
];

export default function FaqPage() {
  const [openItem, setOpenItem] = useState<string | null>('Products & Formulations-0');

  const toggle = (key: string) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <div className="pt-20 sm:pt-28 pb-20 sm:pb-32 bg-[#FAFAF7] text-[#171717] min-h-screen">
      <div className="container-editorial">
        {/* Header */}
        <div className="border-b border-[#E6E2D9] pb-12 mb-16 max-w-4xl space-y-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
            KNOWLEDGE & CLARITY
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#171717] leading-[0.96]">
            Frequently Asked <br />
            <span className="font-editorial italic font-normal text-[#B89B6A]">
              Questions.
            </span>
          </h1>
          <p className="text-base md:text-lg text-[#686660] font-sans leading-relaxed">
            Everything you need to know about our botanical sourcing, WhatsApp ordering process, bulk supply, and packaging safety.
          </p>
        </div>

        {/* FAQ Accordion Sections */}
        <div className="space-y-16 max-w-4xl">
          {faqSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#171717] pb-2 border-b border-[#E6E2D9]">
                {section.title}
              </h2>
              <div className="divide-y divide-[#E6E2D9] border-b border-[#E6E2D9]">
                {section.items.map((item, idx) => {
                  const key = `${section.title}-${idx}`;
                  const isOpen = openItem === key;

                  return (
                    <div key={key} className="py-5">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between text-left gap-4 group"
                      >
                        <span className="font-serif text-xl sm:text-2xl font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors">
                          {item.q}
                        </span>
                        <span className="w-8 h-8 rounded-full bg-white border border-[#E6E2D9] flex items-center justify-center flex-shrink-0 group-hover:border-[#171717] transition-colors">
                          {isOpen ? (
                            <Minus className="w-4 h-4 text-[#171717]" />
                          ) : (
                            <Plus className="w-4 h-4 text-[#686660]" />
                          )}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs sm:text-sm text-[#686660] font-sans leading-relaxed pt-3 max-w-3xl">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Contact Prompt */}
        <div className="mt-24 p-8 md:p-12 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#171717] mb-1">
              Have a custom formulation question?
            </h3>
            <p className="text-xs text-[#686660] font-sans">
              Connect directly with our Coimbatore lab specialists.
            </p>
          </div>
          <Link href="/contact" className="btn-luxury-primary text-xs py-3 px-6 whitespace-nowrap">
            Contact Lab Studio →
          </Link>
        </div>
      </div>
    </div>
  );
}
