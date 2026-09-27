'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
  aspect?: 'tall' | 'square' | 'wide';
}

export default function ProductCard({
  product,
  index = 0,
  aspect = 'tall',
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.images && product.images.length > 0 ? product.images[0].trim() : null;
  const secondaryImage = product.images && product.images.length > 1 ? product.images[1].trim() : null;

  const hasValidImage = primaryImage && primaryImage.startsWith('/products/images/') && !imageError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/product/${product.slug}`}
        className="block bg-white border border-[#E6E2D9] group-hover:border-[#B89B6A]/80 overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-400 flex flex-col justify-between h-full relative"
      >
        {/* Top Product Image Presentation */}
        <div
          className={`relative overflow-hidden bg-[#FAFAF7] flex items-center justify-center p-6 ${
            aspect === 'tall' ? 'aspect-[4/5]' : aspect === 'wide' ? 'aspect-[16/10]' : 'aspect-square'
          }`}
        >
          {hasValidImage ? (
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
              {/* Primary Image */}
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className={`object-contain p-2 transition-all duration-500 ease-out ${
                  secondaryImage && isHovered ? 'opacity-0 scale-104' : 'opacity-100 group-hover:scale-104'
                }`}
                onError={() => setImageError(true)}
                priority={index < 4}
              />

              {/* Secondary Image for smooth crossfade hover */}
              {secondaryImage && (
                <Image
                  src={secondaryImage}
                  alt={`${product.name} alternate view`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className={`object-contain p-2 transition-all duration-500 ease-out ${
                    isHovered ? 'opacity-100 scale-104' : 'opacity-0 scale-100'
                  }`}
                  onError={() => {}}
                />
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#686660] text-xs font-mono">
              SenseMe Formulation
            </div>
          )}

          {/* Badges / Category Tag */}
          <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-20">
            <span className="text-[9px] font-mono font-bold tracking-widest uppercase bg-white/95 backdrop-blur-md px-2.5 py-1 text-[#171717] border border-[#E6E2D9]">
              {product.categoryName || 'BOTANICAL'}
            </span>
          </div>

          {/* SKU Code */}
          <div className="absolute top-3.5 right-3.5 z-20 font-mono text-[9px] tracking-wider text-[#686660] uppercase bg-white/90 backdrop-blur-sm px-2 py-0.5 border border-[#E6E2D9]">
            {product.sku}
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="p-6 bg-white border-t border-[#E6E2D9] flex flex-col justify-between flex-grow">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors leading-snug">
                {product.name}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-[#686660] group-hover:text-[#171717] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-1" />
            </div>

            <p className="text-xs text-[#686660] line-clamp-2 leading-relaxed mb-4 font-sans">
              {product.shortDescription}
            </p>
          </div>

          <div className="pt-3 border-t border-[#E6E2D9] flex items-center justify-between text-[11px] font-mono text-[#686660]">
            <span className="text-[10px] tracking-wider uppercase font-semibold">
              {product.variants && product.variants.length > 0
                ? `${product.variants.length} Sizes (15ml – 5kg)`
                : '100% Steam Distilled'}
            </span>
            <span className="text-[#171717] font-sans font-bold group-hover:text-[#B89B6A] flex items-center gap-1 transition-colors">
              DISCOVER <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
