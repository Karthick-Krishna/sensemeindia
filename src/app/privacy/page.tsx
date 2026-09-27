import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | SenseMe India',
  description: 'Privacy Policy and data protection standards for SenseMe India (Mylal Exports).',
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-32 bg-[#FAFAF7] text-[#171717] min-h-screen">
      <div className="container-editorial max-w-4xl">
        <div className="border-b border-[#E6E2D9] pb-8 mb-12">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block mb-2">
            LEGAL & COMPLIANCE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#686660] font-mono mt-2 tracking-wider">
            LAST UPDATED: {new Date().getFullYear()} • SENSEME INDIA (MYLAL EXPORTS)
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[var(--radius-xl)] border border-[#E6E2D9] shadow-sm space-y-8 text-xs md:text-sm font-sans text-[#686660] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#171717]">1. Information Collection & Usage</h2>
            <p>
              SenseMe India collects contact details (name, email address, phone number, and inquiry messages) submitted voluntarily through our web forms or direct WhatsApp communication to fulfill customer orders, answer product queries, and provide wholesale quotations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#171717]">2. WhatsApp Communication</h2>
            <p>
              When you initiate contact via WhatsApp, your phone number and conversation details are handled strictly for customer service, quotation, and dispatch coordination. We do not sell or share contact numbers with third-party telemarketing agencies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#171717]">3. Data Security & Storage</h2>
            <p>
              We implement industry-standard administrative and technical safeguards to protect all inquiries and order records against unauthorized access, loss, or disclosure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#171717]">4. Contacting Our Data Officer</h2>
            <p>
              If you have any questions regarding your inquiry records, please reach out to <a href="mailto:contact@sensemeindia.com" className="text-[#B89B6A] font-semibold underline">contact@sensemeindia.com</a> or visit our facility in Coimbatore, Tamil Nadu.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
