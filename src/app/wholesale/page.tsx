'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/data-context';
import { generateWholesaleWhatsAppMessage, generateWhatsAppUrl } from '@/lib/whatsapp';
import {
  Package,
  Layers,
  Building2,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Droplets,
} from 'lucide-react';

export default function WholesalePage() {
  const { settings, trackEnquiry } = useData();

  const [businessName, setBusinessName] = useState('');
  const [productType, setProductType] = useState('Essential Oils in Bulk');
  const [estimatedQuantity, setEstimatedQuantity] = useState('5 kg – 25 kg');
  const [customNotes, setCustomNotes] = useState('');
  const [isOpeningWhatsApp, setIsOpeningWhatsApp] = useState(false);

  const handleWholesaleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpeningWhatsApp(true);

    const message = generateWholesaleWhatsAppMessage({
      businessType: `${businessName || 'Business Client'} (Seeking: ${productType}, Qty: ${estimatedQuantity})`,
      productsOfInterest: productType,
      estimatedVolume: estimatedQuantity,
    });

    const url = generateWhatsAppUrl(settings.whatsappNumber, message);

    trackEnquiry({
      productId: 'wholesale-b2b',
      productName: `Wholesale Lead: ${businessName || 'Anonymous'} (${productType})`,
      variant: estimatedQuantity,
      quantity: 1,
      timestamp: new Date().toISOString(),
      source: 'wholesale',
      status: 'new',
    });

    setTimeout(() => {
      window.open(url, '_blank');
      setIsOpeningWhatsApp(false);
    }, 300);
  };

  return (
    <div className="pt-32 pb-32 bg-[#FAFAF7] text-[#171717] min-h-screen">
      <div className="container-editorial">
        {/* Header */}
        <div className="border-b border-[#E6E2D9] pb-12 mb-16 max-w-4xl space-y-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
            MANUFACTURER SUPPLY & VOLUME PROCUREMENT
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#171717] leading-[0.96]">
            Built for Business. <br />
            <span className="font-editorial italic font-normal text-[#B89B6A]">
              Direct from Coimbatore.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#686660] font-sans leading-relaxed">
            We supply soap manufacturers, candle artisans, cosmetic laboratories, and commercial scent marketing agencies with tiered bulk quantities from 1kg bottles to 25kg drums.
          </p>
        </div>

        {/* 3 Packaging Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-[#B89B6A]">TIER 01 / ARTISAN BATCH</span>
              <h3 className="font-serif text-3xl font-bold text-[#171717]">1kg – 5kg</h3>
              <p className="text-xs text-[#686660] leading-relaxed">
                Packaged in seamless epoxy-lined aluminium containers with tamper-evident caps. Ideal for boutique candle studios and artisan soap makers.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-[#171717] font-medium pt-4 border-t border-[#E6E2D9]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89B6A]" /> Seamless aluminium flacon
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89B6A]" /> Minimum Order: 1kg per SKU
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89B6A]" /> 24-48h dispatch from Coimbatore
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-[#B89B6A]">TIER 02 / COMMERCIAL SCALE</span>
              <h3 className="font-serif text-3xl font-bold text-[#171717]">5kg – 10kg</h3>
              <p className="text-xs text-[#686660] leading-relaxed">
                Supplied in UN-certified fluorinated high-density containers preventing aromatic permeation. For established cosmetic compounding labs.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-[#171717] font-medium pt-4 border-t border-[#E6E2D9]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89B6A]" /> Fluorinated anti-permeation jerrycans
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89B6A]" /> Tiered volume pricing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89B6A]" /> Full GC-MS batch documentation
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-[#B89B6A]">TIER 03 / INDUSTRIAL SUPPLY</span>
              <h3 className="font-serif text-3xl font-bold text-[#171717]">25kg+ Bulk Drums</h3>
              <p className="text-xs text-[#686660] leading-relaxed">
                Epoxy-phenolic coated steel drums for large-scale soap factories, hospitality scent distribution, and industrial agarbatti manufacturers.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-[#171717] font-medium pt-4 border-t border-[#E6E2D9]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89B6A]" /> Heavy gauge coated steel drums
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89B6A]" /> Contract rate schedules
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89B6A]" /> Palletized secure freight
              </li>
            </ul>
          </div>
        </div>

        {/* B2B WhatsApp Form */}
        <div className="max-w-3xl mx-auto p-8 md:p-12 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-sm space-y-8">
          <div>
            <span className="font-mono text-xs text-[#B89B6A] font-bold uppercase tracking-wider block mb-1">
              DIRECT WHOLESALE ENQUIRY
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#171717]">
              Discuss Your Volume Requirements
            </h2>
            <p className="text-sm text-[#686660] mt-1 font-sans">
              Submit your inquiry details below to immediately start a consultation on WhatsApp with our Coimbatore commercial desk.
            </p>
          </div>

          <form onSubmit={handleWholesaleInquiry} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#171717] mb-2">
                  Business / Studio Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Candle Studio"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full p-3.5 bg-[#FAFAF7] border border-[#E6E2D9] rounded text-xs text-[#171717] outline-none focus:border-[#171717]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#171717] mb-2">
                  Formulation Category
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full p-3.5 bg-[#FAFAF7] border border-[#E6E2D9] rounded text-xs text-[#171717] outline-none focus:border-[#171717]"
                >
                  <option>Essential Oils in Bulk</option>
                  <option>Fragrance Oils for Candle Making</option>
                  <option>Fragrance Oils for Soap Crafting</option>
                  <option>Ambient Diffuser Oils for Hotels</option>
                  <option>Ultrasonic Diffuser Units</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#171717] mb-2">
                Estimated Volume Required
              </label>
              <select
                value={estimatedQuantity}
                onChange={(e) => setEstimatedQuantity(e.target.value)}
                className="w-full p-3.5 bg-[#FAFAF7] border border-[#E6E2D9] rounded text-xs text-[#171717] outline-none focus:border-[#171717]"
              >
                <option>1 kg – 5 kg</option>
                <option>5 kg – 25 kg</option>
                <option>25 kg – 100 kg Bulk Drums</option>
                <option>100 kg+ Ongoing Monthly Supply</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isOpeningWhatsApp}
              className="w-full py-4 rounded bg-[#25D366] hover:bg-[#20bd5a] text-[#171717] font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              {isOpeningWhatsApp ? 'Connecting...' : 'SEND WHOLESALE ENQUIRY VIA WHATSAPP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
