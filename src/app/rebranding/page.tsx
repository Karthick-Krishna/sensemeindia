'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/lib/data-context';
import { generateWhatsAppUrl } from '@/lib/whatsapp';
import {
  Sparkles,
  Layers,
  FlaskConical,
  PackageCheck,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function RebrandingPage() {
  const { settings, trackEnquiry } = useData();
  const [brandName, setBrandName] = useState('');
  const [productFocus, setProductFocus] = useState('Luxury Perfume Line');
  const [isOpeningWhatsApp, setIsOpeningWhatsApp] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpeningWhatsApp(true);

    const message = `Hello SenseMe India, I am interested in Private Label / Rebranding services for my brand "${brandName || 'New Brand'}". Product category focus: ${productFocus}. Please share details on sample prototyping and formulation MOQs.`;
    const url = generateWhatsAppUrl(settings.whatsappNumber, message);

    trackEnquiry({
      productId: 'rebranding-lead',
      productName: `Private Label Lead: ${brandName || 'Unnamed Brand'} (${productFocus})`,
      variant: 'Custom Formulation',
      quantity: 1,
      timestamp: new Date().toISOString(),
      source: 'rebranding',
      status: 'new',
    });

    setTimeout(() => {
      window.open(url, '_blank');
      setIsOpeningWhatsApp(false);
    }, 400);
  };

  const steps = [
    {
      step: '01',
      title: 'Olfactory Concept & Formulation',
      desc: 'Work with our Coimbatore fragrance lab to define top, heart, and base notes or select from our verified master botanical libraries.',
      icon: FlaskConical,
    },
    {
      step: '02',
      title: 'Packaging & Bottle Selection',
      desc: 'Choose from amber glass droppers, luxury perfume flacons, diffuser carafes, or provide your proprietary custom packaging.',
      icon: Layers,
    },
    {
      step: '03',
      title: 'Batch Blending & Quality Testing',
      desc: 'We execute batch blending with strict physical quality checks, evaporation consistency testing, and tamper-sealed bottling.',
      icon: ShieldCheck,
    },
    {
      step: '04',
      title: 'Private Label Finished Dispatch',
      desc: 'Finished, packaged, and labeled products delivered ready for direct retail distribution or hotel luxury scenting.',
      icon: PackageCheck,
    },
  ];

  return (
    <div className="pt-20 sm:pt-28 pb-20 sm:pb-32 bg-[#FAFAF7] text-[#171717] min-h-screen">
      <div className="container-editorial">
        {/* Header */}
        <div className="border-b border-[#E6E2D9] pb-12 mb-16 max-w-4xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E6E2D9] p-1 flex items-center justify-center shadow-2xs">
              <Image
                src="/logo-transparent.png"
                alt="SenseMe OEM Hallmark"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold">
              PRIVATE LABEL & BESPOKE CONTRACT MANUFACTURING
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#171717] leading-[0.96]">
            Your Brand. <br />
            <span className="font-editorial italic font-normal text-[#B89B6A]">
              Your Direction.
            </span>
          </h1>
          <p className="text-base md:text-lg text-[#686660] font-sans leading-relaxed">
            From single-origin essential oil lines to custom hotel scenting and signature natural perfumes, we provide end-to-end white-label manufacturing from Coimbatore, Tamil Nadu.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="mb-24">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block mb-8">
            THE PRIVATE LABEL PROCESS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div
                key={s.step}
                className="p-8 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] hover:border-[#B89B6A] shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#B89B6A] tracking-[0.2em] block mb-4">
                    PHASE {s.step}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#F2F0EA] text-[#171717] flex items-center justify-center mb-4">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#171717] mb-3 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#686660] font-sans leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Private Label Inquiry Card (100% Light Luxury) */}
        <div className="bg-white text-[#171717] rounded-[var(--radius-xl)] p-8 md:p-14 border border-[#E6E2D9] shadow-sm max-w-3xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
              BESPOKE BRANDING INQUIRY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
              Start Your Brand Discussion
            </h2>
            <p className="text-xs sm:text-sm text-[#686660] font-sans">
              Share your brand concept below to connect with our fragrance formulation director on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleInquiry} className="space-y-5">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#171717] mb-2 block font-semibold">
                Your Brand / Startup Name
              </label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Solace Botanical Perfumes"
                className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E6E2D9] rounded text-sm text-[#171717] placeholder:text-[#686660]/50 outline-none focus:border-[#171717]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#171717] mb-2 block font-semibold">
                Product Line Focus
              </label>
              <select
                value={productFocus}
                onChange={(e) => setProductFocus(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAFAF7] border border-[#E6E2D9] rounded text-sm text-[#171717] outline-none focus:border-[#171717] font-sans"
              >
                <option value="Luxury Perfume Line (Fine Fragrance)">Luxury Perfume Line</option>
                <option value="Signature Diffuser Blends for Hotels/Spas">Hotel / Spa Diffuser Blends</option>
                <option value="Bottled Essential Oil Range">Bottled Essential Oil Range</option>
                <option value="Aromatherapy Candles & Room Sprays">Candles & Room Sprays</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isOpeningWhatsApp}
              className="w-full py-4 rounded bg-[#25D366] hover:bg-[#20bd5a] text-[#171717] font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              {isOpeningWhatsApp ? 'OPENING WHATSAPP...' : 'DISCUSS REBRANDING WITH LAB VIA WHATSAPP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
