'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { useData } from '@/lib/data-context';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const { settings } = useData();

  if (pathname?.startsWith('/admin')) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {tooltipVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full right-0 mb-3 bg-white text-[#171717] rounded-[var(--radius-xl)] shadow-xl p-5 min-w-[250px] border border-[#E6E2D9] backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#B89B6A] uppercase font-bold">
                DIRECT AROMA EXPERT
              </p>
            </div>
            <p className="text-xs text-[#686660] mb-4 leading-relaxed font-sans">
              Inquire about current batch pricing, custom sizes, or botanical formulation advice.
            </p>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=Hello%20SenseMe%20India%2C%20I%20would%20like%20to%20consult%20with%20an%20aroma%20expert.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded bg-[#25D366] hover:bg-[#20bd5a] text-[#171717] text-xs font-bold uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" /> Consult on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Animated pulsing ripple ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />

        <button
          onClick={() => setTooltipVisible(!tooltipVisible)}
          onMouseEnter={() => setTooltipVisible(true)}
          className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          aria-label="Contact SenseMe India on WhatsApp"
        >
          {tooltipVisible ? (
            <X className="w-5 h-5 text-[#171717] stroke-[2.5]" />
          ) : (
            <MessageCircle className="w-6 h-6 text-[#171717] fill-current group-hover:rotate-12 transition-transform duration-300" />
          )}
        </button>
      </div>
    </div>
  );
}
