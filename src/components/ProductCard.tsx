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

  const handleCardClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/product/${product.slug}`}
        scroll={true}
        onClick={handleCardClick}
        className="block bg-white rounded-[var(--radius-xl)] border border-[#E6E2D9] group-hover:border-[#B89B6A] overflow-hidden shadow-2xs group-hover:shadow-xl transition-all duration-400 flex flex-col justify-between h-full relative active:scale-[0.985] cursor-pointer"
      >
        {/* Top Product Image Presentation Stage */}
        <div
          className={`relative overflow-hidden bg-gradient-to-b from-[#F7F6F2] via-[#FAF9F5] to-white flex items-center justify-center p-3 sm:p-4 md:p-5 ${
            aspect === 'tall' ? 'aspect-[4/5]' : aspect === 'wide' ? 'aspect-[16/10]' : 'aspect-square'
          }`}
        >
          {hasValidImage ? (
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center drop-shadow-sm group-hover:drop-shadow-md transition-all duration-500">
              {/* Primary Image */}
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`object-contain p-1 sm:p-2 transition-all duration-500 ease-out ${
                  secondaryImage && isHovered ? 'opacity-0 scale-106' : 'opacity-100 group-hover:scale-106'
                }`}
                onError={() => setImageError(true)}
                priority={index < 4}
              />

              {/* Secondary Image for crossfade hover */}
              {secondaryImage && (
                <Image
                  src={secondaryImage}
                  alt={`${product.name} alternate view`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={`object-contain p-1 sm:p-2 transition-all duration-500 ease-out ${
                    isHovered ? 'opacity-100 scale-106' : 'opacity-0 scale-100'
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
          <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 flex flex-wrap gap-1 z-20">
            <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-[0.14em] uppercase bg-white/95 backdrop-blur-md px-2 py-0.5 text-[#171717] group-hover:text-[#B89B6A] border border-[#E6E2D9] rounded transition-colors shadow-2xs">
              {product.categoryName || 'BOTANICAL'}
            </span>
          </div>

          {/* SKU Code (Tablet & Desktop) */}
          <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 font-mono text-[8px] sm:text-[9px] tracking-wider text-[#686660] uppercase bg-white/90 backdrop-blur-sm px-1.5 py-0.5 border border-[#E6E2D9] rounded hidden xs:inline-block">
            {product.sku}
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="p-3 sm:p-4 md:p-5 bg-white border-t border-[#E6E2D9]/80 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="font-serif text-sm sm:text-base md:text-lg font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors leading-snug line-clamp-2 mb-1">
              {product.name}
            </h3>

            {product.shortDescription && (
              <p className="text-[11px] sm:text-xs text-[#686660] line-clamp-1 sm:line-clamp-2 leading-relaxed font-sans mb-2.5">
                {product.shortDescription}
              </p>
            )}
          </div>

          <div className="pt-2.5 border-t border-[#E6E2D9]/70 flex items-center justify-between gap-2">
            <span className="text-[9px] sm:text-[10px] font-mono text-[#686660] tracking-wider uppercase font-medium truncate">
              {product.variants && product.variants.length > 0
                ? `${product.variants.length} Sizes`
                : '100% Pure'}
            </span>

            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAFAF7] group-hover:bg-[#171717] text-[#171717] group-hover:text-white border border-[#E6E2D9] flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-2xs">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
