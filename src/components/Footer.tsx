'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useData } from '@/lib/data-context';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Plus,
  Minus,
} from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const { settings } = useData();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  if (pathname?.startsWith('/admin')) return null;

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const footerGroups = [
    {
      id: 'products',
      title: 'PRODUCTS',
      links: [
        { name: 'All 195+ Formulations', href: '/shop' },
        { name: 'Essential Oils', href: '/shop?category=essential-oils' },
        { name: 'Diffuser Blends', href: '/shop?category=diffuser-blends' },
        { name: 'Fragrance Oils', href: '/shop?category=fragrance-oils' },
        { name: 'Candle Making', href: '/shop?category=candle-making' },
        { name: 'Diffuser Machines', href: '/shop?category=diffuser-machines' },
      ],
    },
    {
      id: 'company',
      title: 'COMPANY',
      links: [
        { name: 'About SenseMe', href: '/about' },
        { name: 'Manufacturing Craft', href: '/manufacturing' },
        { name: 'Applications Guide', href: '/applications' },
        { name: 'Coimbatore Heritage', href: '/about#heritage' },
      ],
    },
    {
      id: 'business',
      title: 'BUSINESS',
      links: [
        { name: 'Wholesale B2B Supply', href: '/wholesale' },
        { name: 'Private Label OEM', href: '/rebranding' },
        { name: 'Bulk Drums (25kg+)', href: '/wholesale' },
        { name: 'Hotel & Spa Scenting', href: '/applications' },
      ],
    },
    {
      id: 'support',
      title: 'SUPPORT',
      links: [
        { name: 'FAQ & Order Process', href: '/faq' },
        { name: 'Shipping & Packaging', href: '/shipping' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ],
    },
  ];

  return (
    <footer className="bg-[#F2F0EA] text-[#171717] border-t border-[#E6E2D9] relative overflow-hidden">
      {/* Pre-footer Discovery Section */}
      <div className="border-b border-[#E6E2D9] py-20 md:py-28 relative bg-[#FAFAF7]">
        <div className="container-editorial relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block">
            EXPLORE • ENQUIRE • FORMULATE
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#171717] leading-[1.02]">
            Discover More.
          </h2>
          <p className="text-sm md:text-base text-[#686660] font-sans leading-relaxed max-w-2xl mx-auto font-normal">
            Explore 195+ single-origin steam-distilled essential oils, ambient diffuser blends, soap & candle fragrances, and custom contract formulations from Coimbatore, India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/shop"
              className="btn-luxury-primary text-xs py-3.5 px-8 font-bold w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Explore Full Catalogue <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-outline text-xs py-3.5 px-8 font-bold w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" /> Consult on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="container-editorial py-16 md:py-24">
        {/* Desktop Multi-Column (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand Column (4 cols) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
                <span className="font-serif text-3xl font-bold text-[#171717] tracking-tight">
                  SenseMe
                </span>
                <span className="font-mono text-xs tracking-[0.2em] text-[#B89B6A] uppercase font-bold border-l border-[#E6E2D9] pl-2.5">
                  INDIA
                </span>
              </Link>
              <p className="text-xs text-[#686660] font-sans leading-relaxed max-w-sm">
                Specialized botanical distillation and fragrance compounding laboratory under Mylal Exports. Supplying 195+ pure extracts and private-label aroma products across India.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#E6E2D9] space-y-2.5 text-xs text-[#686660] font-sans rounded">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B89B6A] mt-0.5 flex-shrink-0" />
                <span>{settings.address || 'Mylal Exports, Coimbatore, Tamil Nadu, India'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B89B6A] flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-[#171717] transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B89B6A] flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#171717] transition-colors">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Columns (8 cols) */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-4 gap-8">
            {footerGroups.map((group) => (
              <div key={group.id}>
                <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#B89B6A] font-bold mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-2.5 text-xs text-[#686660] font-sans">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="hover:text-[#171717] transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Accordion View (Clean, non-cluttered) */}
        <div className="md:hidden space-y-4 mb-12">
          {/* Brand Intro on Mobile */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <span className="font-serif text-2xl font-bold text-[#171717]">SenseMe</span>
              <span className="font-mono text-xs text-[#B89B6A] font-bold tracking-wider uppercase border-l border-[#E6E2D9] pl-2">INDIA</span>
            </Link>
            <p className="text-xs text-[#686660] leading-relaxed">
              Botanical distillation & fragrance compounding laboratory under Mylal Exports, Coimbatore.
            </p>
          </div>

          {/* Accordion Items */}
          {footerGroups.map((group) => {
            const isOpen = openAccordion === group.id;
            return (
              <div key={group.id} className="border-b border-[#E6E2D9] pb-3">
                <button
                  onClick={() => toggleAccordion(group.id)}
                  className="w-full flex items-center justify-between text-left py-2 font-mono text-xs uppercase font-bold tracking-wider text-[#171717]"
                >
                  <span>{group.title}</span>
                  {isOpen ? <Minus className="w-4 h-4 text-[#B89B6A]" /> : <Plus className="w-4 h-4 text-[#686660]" />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <ul className="py-3 space-y-2.5 text-xs text-[#686660] font-sans pl-2">
                        {group.links.map((link) => (
                          <li key={link.name}>
                            <Link href={link.href} className="hover:text-[#171717] transition-colors block py-0.5">
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Contact Details on Mobile */}
          <div className="pt-4 text-xs text-[#686660] space-y-2">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B89B6A]" />
              <span>Coimbatore, Tamil Nadu, India</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#B89B6A]" />
              <a href={`tel:${settings.phone}`} className="hover:text-[#171717]">{settings.phone}</a>
            </p>
          </div>
        </div>

        {/* Bottom Strip: Social, Provenance & Copyright */}
        <div className="border-t border-[#E6E2D9] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#686660]">
          <p>© {new Date().getFullYear()} SenseMe India • Mylal Exports, Coimbatore • All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#171717] transition-colors" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#171717] transition-colors" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#171717] transition-colors" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
