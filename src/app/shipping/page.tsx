'use client';

import Link from 'next/link';
import { Truck, Package, Clock, ShieldCheck } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="pt-20 sm:pt-28 pb-20 sm:pb-32 bg-[#FAFAF7] text-[#171717] min-h-screen">
      <div className="container-editorial">
        {/* Header */}
        <div className="border-b border-[#E6E2D9] pb-12 mb-16 max-w-4xl space-y-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
            LOGISTICS & PACKAGING INTEGRITY
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#171717] leading-[0.96]">
            Packaging & <br />
            <span className="font-editorial italic font-normal text-[#B89B6A]">
              Delivery Standards.
            </span>
          </h1>
          <p className="text-base md:text-lg text-[#686660] font-sans leading-relaxed">
            How we protect pure botanical oils and fragile aroma diffusers during transit from Coimbatore across all Indian states.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-5xl">
          <div className="p-8 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#F2F0EA] text-[#171717] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#171717]">Leak-Proof Packaging</h3>
            <p className="text-xs text-[#686660] font-sans leading-relaxed">
              Every bottle is fitted with a secure inner plug and tamper-evident cap. Smaller bottles are boxed individually and wrapped in thick cushioning before outer boxing.
            </p>
          </div>

          <div className="p-8 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#F2F0EA] text-[#171717] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#171717]">Courier Network</h3>
            <p className="text-xs text-[#686660] font-sans leading-relaxed">
              Dispatched primarily via DTDC and trusted surface/air express networks to ensure timely and safe handover at your facility or doorstep.
            </p>
          </div>

          <div className="p-8 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-full bg-[#F2F0EA] text-[#171717] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#171717]">Dispatch Timelines</h3>
            <p className="text-xs text-[#686660] font-sans leading-relaxed">
              Stock items are packed and dispatched within 24–48 hours of order confirmation. Delivery tracking numbers are sent directly via WhatsApp.
            </p>
          </div>
        </div>

        {/* Policy Details */}
        <div className="p-8 md:p-12 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-sm max-w-4xl space-y-6 text-sm font-sans text-[#686660] leading-relaxed">
          <h3 className="font-serif text-3xl font-bold text-[#171717]">Shipping & Delivery Policies</h3>
          <div className="space-y-4 text-xs md:text-sm">
            <p>
              <strong className="text-[#171717]">1. Tracking Updates:</strong> Once your consignment is dispatched from Coimbatore, our team provides your live courier tracking link on WhatsApp.
            </p>
            <p>
              <strong className="text-[#171717]">2. Transit Damage Protocol:</strong> In the rare event of transit damage or package compromise, please notify our team within 48 hours of delivery with photographic evidence on WhatsApp for immediate replacement.
            </p>
            <p>
              <strong className="text-[#171717]">3. Bulk & Industrial Shipping:</strong> Orders of 25kg drums or multiple diffuser machine cartons are shipped with heavy-duty pallet protection via specialized freight carriers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
