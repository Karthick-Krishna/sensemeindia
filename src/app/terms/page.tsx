import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | SenseMe India',
  description: 'Terms of Service, ordering protocols, and usage guidelines for SenseMe India.',
};

export default function TermsPage() {
  return (
    <div className="pt-20 sm:pt-28 pb-20 sm:pb-32 bg-[#FAFAF7] text-[#171717] min-h-screen">
      <div className="container-editorial max-w-4xl">
        <div className="border-b border-[#E6E2D9] pb-8 mb-12">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block mb-2">
            LEGAL & COMPLIANCE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#686660] font-mono mt-2 tracking-wider">
            EFFECTIVE: {new Date().getFullYear()} • SENSEME INDIA (MYLAL EXPORTS, COIMBATORE)
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[var(--radius-xl)] border border-[#E6E2D9] shadow-sm space-y-8 text-xs md:text-sm font-sans text-[#686660] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#171717]">1. Catalogue Presentation & Ordering</h2>
            <p>
              SenseMe India provides a curated digital product catalogue. Pricing, batch volumes, and dispatch dates are finalized directly via official WhatsApp communication or written purchase orders. No online payment is processed without verified mutual confirmation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#171717]">2. Botanical Product Usage & Safety</h2>
            <p>
              All essential oils, diffuser blends, and fragrance concentrates supplied by SenseMe India are intended strictly for external, diffuser, soap crafting, candle making, and cosmetic manufacturing purposes. They are not intended to diagnose, treat, cure, or prevent any medical condition.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#171717]">3. Wholesale & Private Label Orders</h2>
            <p>
              Bulk wholesale consignments and custom private-label formulations are subject to agreed-upon minimum order quantities (MOQs) and standard manufacturing lead times confirmed at the time of deposit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#171717]">4. Jurisdiction</h2>
            <p>
              Any disputes arising out of trade agreements with SenseMe India (Mylal Exports) shall be subject to the exclusive jurisdiction of the competent courts in Coimbatore, Tamil Nadu, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
