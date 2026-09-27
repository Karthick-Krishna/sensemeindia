'use client';

import React from 'react';

// Generates luxury editorial amber glass compositions with depth and reflections
export function BotanicalProductArt({
  name,
  category,
  theme = 'amber',
  className = '',
  multiBottle = false,
}: {
  name: string;
  category?: string;
  theme?: 'amber' | 'stone' | 'champagne' | 'porcelain' | 'charcoal';
  className?: string;
  multiBottle?: boolean;
}) {
  const getInitials = (str: string) => {
    return str
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  };

  const getThemePalette = () => {
    switch (theme) {
      case 'champagne':
        return {
          bg: 'from-[#FAF6ED] via-[#F4EDE0] to-[#E9DEC8]',
          accent: '#9E7D3B',
          glass: '#8A5A2B',
          liquid: '#4D2F14',
          shadow: 'rgba(77, 47, 20, 0.18)',
        };
      case 'charcoal':
        return {
          bg: 'from-[#222222] via-[#1A1A1A] to-[#111111]',
          accent: '#D8C4A0',
          glass: '#3D332A',
          liquid: '#181410',
          shadow: 'rgba(0, 0, 0, 0.4)',
        };
      case 'porcelain':
        return {
          bg: 'from-[#FFFFFF] via-[#F8F7F3] to-[#EFECE6]',
          accent: '#8C7456',
          glass: '#7A4D26',
          liquid: '#45280E',
          shadow: 'rgba(37, 37, 37, 0.12)',
        };
      case 'stone':
        return {
          bg: 'from-[#F6F4F0] via-[#ECE7E1] to-[#DFD8CE]',
          accent: '#8C7456',
          glass: '#6E4522',
          liquid: '#3D240C',
          shadow: 'rgba(37, 37, 37, 0.14)',
        };
      case 'amber':
      default:
        return {
          bg: 'from-[#F7F4EE] via-[#EFE9DD] to-[#E5DBCB]',
          accent: '#8C7456',
          glass: '#7D4F27',
          liquid: '#44260D',
          shadow: 'rgba(68, 38, 13, 0.18)',
        };
    }
  };

  const palette = getThemePalette();

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br ${palette.bg} ${className}`}
    >
      {/* Studio lighting radial glimmers */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-black/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#252525_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      {/* Composition Container */}
      <div className="relative flex items-center justify-center p-8 z-10 w-full h-full">
        {/* Background Blurred Bottle (Depth Layer 1) */}
        {multiBottle && (
          <div className="absolute left-8 top-12 scale-75 opacity-40 blur-[2px] transition-transform duration-1000">
            <div className="w-16 h-28 rounded-b-lg bg-[#553315] shadow-lg flex flex-col items-center">
              <div className="w-4 h-5 rounded-t bg-[#111111]" />
              <div className="w-6 h-2 bg-[#D8C4A0]" />
            </div>
          </div>
        )}

        {/* Foreground Main Amber Bottle (Depth Layer 2) */}
        <div className="relative flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
          {/* Ambient Floor Shadow */}
          <div
            className="absolute -bottom-6 w-36 h-7 rounded-full blur-md"
            style={{ backgroundColor: palette.shadow }}
          />

          {/* Dropper Pipette Bulb */}
          <div className="w-7 h-9 rounded-t-md bg-[#111111] shadow-inner border-t border-white/20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/30" />
          </div>

          {/* Precision Champagne Metallic Collar */}
          <div className="w-9 h-3.5 bg-[#D8C4A0] shadow-sm relative overflow-hidden border-y border-[#B39868]">
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-black/25" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/50" />
          </div>

          {/* Heavyweight Amber Glass Body */}
          <div
            className="w-24 sm:w-26 h-36 sm:h-40 rounded-b-xl rounded-t-xs relative overflow-hidden shadow-2xl flex items-center justify-center border border-black/25"
            style={{
              background: `linear-gradient(135deg, ${palette.glass} 0%, ${palette.liquid} 65%, ${palette.glass} 100%)`,
            }}
          >
            {/* Glass Highlights & Reflections */}
            <div className="absolute left-2.5 top-0 bottom-0 w-3.5 bg-gradient-to-r from-white/35 to-transparent blur-[1px]" />
            <div className="absolute right-3.5 top-0 bottom-0 w-1 bg-white/25 blur-[0.5px]" />
            <div className="absolute inset-x-0 bottom-1 h-3 bg-white/10 blur-[1px]" />

            {/* Minimalist Editorial Label */}
            <div className="w-[78%] h-[68%] bg-[#FAF9F6] p-2.5 flex flex-col justify-between shadow-sm border border-[#E8E4DD] text-center relative z-10">
              <div className="space-y-0.5">
                <span className="text-[7px] font-mono tracking-[0.2em] text-[#777777] uppercase font-bold block">
                  SENSEME
                </span>
                <div className="w-3 h-[1px] bg-[#D8C4A0] mx-auto my-0.5" />
                <span className="text-[9px] font-serif font-bold text-[#111111] tracking-tight leading-tight block line-clamp-2">
                  {name}
                </span>
              </div>

              <div className="pt-1 border-t border-black/5">
                <span className="text-[6px] font-mono tracking-[0.16em] text-[#888888] uppercase block">
                  {category || 'BOTANICAL FORMULATION'}
                </span>
                <span className="text-[7px] font-mono text-[#252525] block mt-0.5 font-bold">
                  COIMBATORE, TN
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Botanical Watermark */}
        <div className="absolute bottom-4 right-4 font-mono text-[9px] tracking-widest text-black/25 uppercase font-bold select-none">
          {getInitials(name)} • N°{Math.abs(name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 99) + 1}
        </div>
      </div>
    </div>
  );
}

// Category Hero Banner
export function CategoryVisualBanner({
  categorySlug,
  title,
  subtitle,
}: {
  categorySlug: string;
  title: string;
  subtitle: string;
}) {
  const getTheme = () => {
    switch (categorySlug) {
      case 'essential-oils':
        return {
          gradient: 'from-[#FAF6ED] via-[#F3ECE0] to-[#E8DDCA]',
          tag: 'SINGLE ORIGIN DISTILLATION',
          num: '01',
        };
      case 'diffuser-oils':
        return {
          gradient: 'from-[#F6F4F0] via-[#EDE7DF] to-[#E2D8CC]',
          tag: 'ATMOSPHERIC BLENDS',
          num: '02',
        };
      case 'fragrance-oils':
        return {
          gradient: 'from-[#F8F5EE] via-[#EFE8DC] to-[#E4D9C8]',
          tag: 'CANDLE & SOAP CONCENTRATES',
          num: '03',
        };
      case 'natural-perfumes':
        return {
          gradient: 'from-[#F5F2EC] via-[#ECE6DC] to-[#DFD6C8]',
          tag: 'ARTISANAL PERFUMERY',
          num: '04',
        };
      case 'diffuser-machines':
      default:
        return {
          gradient: 'from-[#F0ECE6] via-[#E6E0D6] to-[#D8D0C2]',
          tag: 'ULTRASONIC DIFFUSION UNITS',
          num: '05',
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      className={`relative w-full rounded-none overflow-hidden bg-gradient-to-br ${theme.gradient} p-8 md:p-14 border border-black/8 shadow-subtle`}
    >
      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#8C7456]">
            DISCIPLINE {theme.num}
          </span>
          <span className="w-8 h-[1px] bg-black/20" />
          <span className="font-mono text-[10px] tracking-[0.16em] text-black/50 uppercase font-semibold">
            {theme.tag}
          </span>
        </div>
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-charcoal-900 tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-sm md:text-base text-charcoal-600 leading-relaxed font-sans font-normal">
          {subtitle}
        </p>
      </div>

      <div className="absolute -right-6 -bottom-6 font-serif text-8xl md:text-9xl font-bold text-black/[0.04] select-none pointer-events-none">
        {theme.num}
      </div>
    </div>
  );
}
