'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'product' | 'link' | 'explore'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch or mobile
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const productCard = target.closest('[data-cursor="product"]');
      const exploreCard = target.closest('[data-cursor="explore"]');
      const interactiveLink = target.closest('a, button, [role="button"]');

      if (productCard) {
        setCursorVariant('product');
        setCursorText('VIEW →');
      } else if (exploreCard) {
        setCursorVariant('explore');
        setCursorText('EXPLORE');
      } else if (interactiveLink) {
        setCursorVariant('link');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const mouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseleave', mouseLeave);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseleave', mouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer follow circle */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none transition-colors duration-200 ${
          cursorVariant === 'product' || cursorVariant === 'explore'
            ? 'bg-sage-900 text-white font-mono text-[9px] tracking-widest uppercase font-bold shadow-xl border border-white/20'
            : cursorVariant === 'link'
            ? 'w-10 h-10 -ml-5 -mt-5 border border-gold-500/60 bg-gold-400/10 backdrop-blur-[1px]'
            : 'w-4 h-4 -ml-2 -mt-2 border border-black/30 bg-black/5'
        }`}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: cursorVariant === 'product' || cursorVariant === 'explore' ? 68 : cursorVariant === 'link' ? 44 : 16,
          height: cursorVariant === 'product' || cursorVariant === 'explore' ? 68 : cursorVariant === 'link' ? 44 : 16,
          marginLeft: cursorVariant === 'product' || cursorVariant === 'explore' ? -34 : cursorVariant === 'link' ? -22 : -8,
          marginTop: cursorVariant === 'product' || cursorVariant === 'explore' ? -34 : cursorVariant === 'link' ? -22 : -8,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 300,
          mass: 0.5,
        }}
      >
        {cursorText && <span>{cursorText}</span>}
      </motion.div>

      {/* Tiny center point */}
      {cursorVariant === 'default' && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-sage-900 rounded-full pointer-events-none"
          animate={{ x: mousePosition.x, y: mousePosition.y }}
          transition={{ duration: 0 }}
        />
      )}
    </div>
  );
}
