'use client';

import { useState } from 'react';
import { useData } from '@/lib/data-context';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { generateWhatsAppUrl } from '@/lib/whatsapp';

export default function ContactPage() {
  const { settings, submitContact } = useData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enquiryType, setEnquiryType] = useState<'product' | 'wholesale' | 'rebranding' | 'general' | 'other'>('product');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await submitContact({
      name,
      email,
      phone,
      enquiryType,
      message,
    });

    setLoading(false);
    setSubmitted(true);
  };

  const handleDirectWhatsApp = () => {
    const text = `Hello SenseMe India, I would like to make an inquiry regarding ${enquiryType}. My name is ${name || 'Customer'}.`;
    const url = generateWhatsAppUrl(settings.whatsappNumber, text);
    window.open(url, '_blank');
  };

  return (
    <div className="pt-32 pb-32 bg-[#FAFAF7] text-[#171717] min-h-screen">
      <div className="container-editorial">
        {/* Header */}
        <div className="border-b border-[#E6E2D9] pb-12 mb-16 max-w-4xl space-y-4">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
            DIRECT STUDIO & TRADE INQUIRIES
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#171717] leading-[0.96]">
            Get in Touch with <br />
            <span className="font-editorial italic font-normal text-[#B89B6A]">
              SenseMe India.
            </span>
          </h1>
          <p className="text-base md:text-lg text-[#686660] font-sans leading-relaxed">
            Reach out directly to our formulation and supply team in Coimbatore for retail inquiries, bulk trade pricing, or custom contract blending.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-sm space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#171717]">
                Coimbatore Supply Desk
              </h3>

              <div className="space-y-4 text-xs md:text-sm font-sans text-[#686660]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B89B6A] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171717] block font-semibold">Operating Facility</strong>
                    <span>{settings.address || 'Mylal Exports, Coimbatore, Tamil Nadu, India'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B89B6A] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171717] block font-semibold">Direct Telephone</strong>
                    <a href={`tel:${settings.phone}`} className="hover:text-[#171717] transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#B89B6A] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171717] block font-semibold">Official Inquiries</strong>
                    <a href={`mailto:${settings.email}`} className="hover:text-[#171717] transition-colors">
                      {settings.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6E2D9]">
                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full py-3.5 rounded bg-[#25D366] hover:bg-[#20bd5a] text-[#171717] font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" /> Direct WhatsApp Chat
                </button>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[var(--radius-xl)] border border-[#E6E2D9] shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#FAFAF7] text-[#B89B6A] flex items-center justify-center mx-auto mb-2 border border-[#E6E2D9]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#171717]">Message Transmitted</h3>
                <p className="text-xs md:text-sm text-[#686660] max-w-md mx-auto font-sans leading-relaxed">
                  Thank you, {name}. Your inquiry has been routed to our Coimbatore trade desk. We typically respond within 1 business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-luxury-outline text-xs py-2.5 px-6 mt-4"
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#171717] mb-2 block font-semibold">
                    Inquiry Classification
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'product', label: 'Product Inquiry' },
                      { id: 'wholesale', label: 'Wholesale B2B' },
                      { id: 'rebranding', label: 'Private Label' },
                      { id: 'general', label: 'General' },
                    ].map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setEnquiryType(t.id as any)}
                        className={`py-2.5 px-3 rounded text-xs font-sans font-medium transition-all ${
                          enquiryType === t.id
                            ? 'bg-[#171717] text-white shadow-xs'
                            : 'bg-[#FAFAF7] text-[#686660] hover:bg-[#F2F0EA] border border-[#E6E2D9]'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[#171717] mb-1.5 block font-semibold">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand Kumar"
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF7] border border-[#E6E2D9] rounded text-sm text-[#171717] outline-none focus:border-[#171717] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-[#171717] mb-1.5 block font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anand@company.in"
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF7] border border-[#E6E2D9] rounded text-sm text-[#171717] outline-none focus:border-[#171717] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#171717] mb-1.5 block font-semibold">
                    Contact Phone Number (For WhatsApp Followup)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98450 12345"
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF7] border border-[#E6E2D9] rounded text-sm text-[#171717] outline-none focus:border-[#171717] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#171717] mb-1.5 block font-semibold">
                    Message / Specifications *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about the botanical products, volumes, or formulation questions you have..."
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF7] border border-[#E6E2D9] rounded text-sm text-[#171717] outline-none focus:border-[#171717] focus:bg-white leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-luxury-primary w-full py-3.5 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Transmitting Message...' : 'Transmit Inquiries to Studio'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
