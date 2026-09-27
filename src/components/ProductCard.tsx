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
          className={`relative overflow-hidden bg-[#FAFAF7] flex items-center justify-center p-2.5 sm:p-4 md:p-6 ${
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
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`object-contain p-1 sm:p-2 transition-all duration-500 ease-out ${
                  secondaryImage && isHovered ? 'opacity-0 scale-105' : 'opacity-100 group-hover:scale-105'
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
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={`object-contain p-1 sm:p-2 transition-all duration-500 ease-out ${
                    isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                  }`}
                  onError={() => {}}
                />
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#686660] text-[10px] font-mono">
              SenseMe Formulation
            </div>
          )}

          {/* Badges / Category Tag */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1 z-20">
            <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-wider uppercase bg-white/95 backdrop-blur-md px-1.5 sm:px-2 py-0.5 text-[#171717] border border-[#E6E2D9] rounded-2xs">
              {product.categoryName || 'BOTANICAL'}
            </span>
          </div>

          {/* SKU Code (Desktop / Tablet) */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 font-mono text-[8px] sm:text-[9px] tracking-wider text-[#686660] uppercase bg-white/90 backdrop-blur-sm px-1.5 py-0.5 border border-[#E6E2D9] rounded-2xs hidden sm:block">
            {product.sku}
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="p-3 sm:p-4 md:p-5 bg-white border-t border-[#E6E2D9] flex flex-col justify-between flex-grow">
          <div>
            <div className="flex items-start justify-between gap-1.5 mb-1 sm:mb-1.5">
              <h3 className="font-serif text-sm sm:text-base md:text-lg font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors leading-snug line-clamp-2">
                {product.name}
              </h3>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#686660] group-hover:text-[#171717] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5 hidden xs:block" />
            </div>

            {product.shortDescription && (
              <p className="text-[11px] sm:text-xs text-[#686660] line-clamp-2 leading-relaxed mb-2 sm:mb-3 font-sans hidden sm:block">
                {product.shortDescription}
              </p>
            )}
          </div>

          <div className="pt-2 sm:pt-3 border-t border-[#E6E2D9] flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#686660]">
            <span className="tracking-wider uppercase font-medium truncate max-w-[90px] sm:max-w-none">
              {product.variants && product.variants.length > 0
                ? `${product.variants.length} Sizes`
                : '100% Pure'}
            </span>
            <span className="text-[#171717] font-sans text-[10px] sm:text-xs font-bold group-hover:text-[#B89B6A] flex items-center gap-0.5 sm:gap-1 transition-colors flex-shrink-0">
              EXPLORE <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
