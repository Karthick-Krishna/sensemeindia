'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-32 pb-32 min-h-screen flex items-center justify-center bg-[#F8F7F3] text-[#111111] px-6">
      <div className="max-w-xl text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 mx-auto rounded-full bg-white border border-[#E0DAD0] flex items-center justify-center shadow-subtle text-[#8C7456]"
        >
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '30s' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-3"
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#8C7456] font-bold block">
            404 • SENSORY DETOUR
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#111111] leading-tight">
            This Scent Has Drifted Elsewhere.
          </h1>
          <p className="text-sm md:text-base text-[#55504A] font-sans leading-relaxed max-w-md mx-auto">
            The formulation or page you are seeking could not be found within our current botanical catalogue.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Link href="/" className="btn-luxury-primary text-xs py-3.5 px-8 flex items-center gap-2">
            Return to SenseMe <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/shop" className="btn-luxury-outline text-xs py-3.5 px-8">
            Explore 195+ Products
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
