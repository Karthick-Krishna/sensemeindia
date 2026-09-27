'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useData } from '@/lib/data-context';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { categories, products, searchProducts, settings } = useData();

  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) return null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 120);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [searchOpen]);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileNavOpen]);

  useEffect(() => {
    setMegaMenuOpen(false);
    setSearchOpen(false);
    setMobileNavOpen(false);
  }, [pathname]);

  const searchResults = searchQuery.trim().length > 1 ? searchProducts(searchQuery).slice(0, 6) : [];

  return (
    <>
      {/* Pinned Top Navigation Wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {/* Top Announcement Bar (Desktop & Tablet) */}
        <div className="hidden sm:block bg-[#F2F0EA] text-[#171717] py-1.5 px-4 text-center text-[11px] font-mono uppercase tracking-[0.18em] font-semibold border-b border-[#E6E2D9]">
          <div className="container-editorial flex items-center justify-between">
            <span className="text-[#686660]">EST. COIMBATORE, TAMIL NADU</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89B6A] animate-pulse" />
              DIRECT BOTANICAL MANUFACTURER • 195+ PURE EXTRACTS • PAN-INDIA DISPATCH
            </span>
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#B89B6A] hover:text-[#171717] transition-colors font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" /> Expert Hotline
            </a>
          </div>
        </div>

        {/* Main Sticky Navigation Bar */}
        <header
          className={`w-full transition-all duration-300 ${
            scrolled
              ? 'bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#E6E2D9] py-3.5 sm:py-4 shadow-sm'
              : 'bg-[#FAFAF7]/90 backdrop-blur-sm py-4 sm:py-5 border-b border-[#E6E2D9]/70'
          }`}
        >
          <div className="container-editorial flex items-center justify-between">
            {/* Left: SenseMe Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#171717] group-hover:text-[#B89B6A] transition-colors">
                SenseMe
              </span>
              <span className="font-mono text-[9px] tracking-[0.24em] uppercase text-[#686660] border-l border-[#E6E2D9] pl-2.5 pt-0.5 font-bold">
                INDIA
              </span>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-7 text-[13px] font-semibold tracking-[0.08em] font-sans text-[#171717]">
              <Link
                href="/"
                className={`nav-link-animated py-1 transition-colors ${
                  pathname === '/' ? 'active text-[#171717]' : 'text-[#686660] hover:text-[#171717]'
                }`}
              >
                Home
              </Link>

              <Link
                href="/shop"
                className={`nav-link-animated py-1 transition-colors ${
                  pathname === '/shop' ? 'active text-[#171717]' : 'text-[#686660] hover:text-[#171717]'
                }`}
              >
                Shop All
              </Link>

              {/* Collections Mega Menu */}
              <div
                className="relative py-1"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <button
                  onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                  className={`nav-link-animated flex items-center gap-1.5 py-1 transition-colors ${
                    megaMenuOpen || pathname.startsWith('/category')
                      ? 'active text-[#171717]'
                      : 'text-[#686660] hover:text-[#171717]'
                  }`}
                >
                  Collections
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      megaMenuOpen ? 'rotate-180 text-[#171717]' : 'text-[#686660]'
                    }`}
                  />
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {megaMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="fixed left-0 right-0 top-full bg-[#FFFFFF] border-b border-[#E6E2D9] shadow-xl z-50 py-10"
                    >
                      <div className="container-editorial grid grid-cols-12 gap-8">
                        {/* Left: 6 Discipline Collections linking to /shop?category=... */}
                        <div className="col-span-8 grid grid-cols-2 gap-4 border-r border-[#E6E2D9] pr-8">
                          {categories.map((cat, idx) => (
                            <Link
                              key={cat.id}
                              href={`/shop?category=${cat.slug}`}
                              className="group/cat flex items-start gap-4 p-3.5 hover:bg-[#FAFAF7] transition-colors rounded"
                            >
                              <span className="font-serif text-lg font-bold text-[#B89B6A] group-hover/cat:text-[#171717] transition-colors">
                                0{idx + 1}
                              </span>
                              <div>
                                <h4 className="font-serif text-lg font-bold text-[#171717] group-hover/cat:text-[#B89B6A] transition-colors flex items-center gap-1.5">
                                  {cat.name}
                                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/cat:opacity-100 -translate-x-1 group-hover/cat:translate-x-0 transition-all text-[#B89B6A]" />
                                </h4>
                                <p className="text-xs text-[#686660] font-sans line-clamp-1 mt-0.5 font-normal">
                                  {cat.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Right: Curated Highlight */}
                        <div className="col-span-4 pl-4 flex flex-col justify-between">
                          <div>
                            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#B89B6A] font-bold block mb-2">
                              BOTANICAL CATALOGUE
                            </span>
                            <h4 className="font-serif text-2xl font-bold text-[#171717] mb-2">
                              195+ Verified Formulations
                            </h4>
                            <p className="text-xs text-[#686660] leading-relaxed font-sans mb-6">
                              Steam-distilled single origins, ambient diffuser blends, and candle/soap essences formulated in Coimbatore.
                            </p>
                          </div>

                          <Link
                            href="/shop"
                            className="btn-luxury-primary text-center py-2.5 text-xs w-full"
                          >
                            Explore Full Catalogue →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/manufacturing"
                className={`nav-link-animated py-1 transition-colors ${
                  pathname === '/manufacturing' ? 'active text-[#171717]' : 'text-[#686660] hover:text-[#171717]'
                }`}
              >
                Manufacturing
              </Link>

              <Link
                href="/applications"
                className={`nav-link-animated py-1 transition-colors ${
                  pathname === '/applications' ? 'active text-[#171717]' : 'text-[#686660] hover:text-[#171717]'
                }`}
              >
                Applications
              </Link>

              <Link
                href="/about"
                className={`nav-link-animated py-1 transition-colors ${
                  pathname === '/about' ? 'active text-[#171717]' : 'text-[#686660] hover:text-[#171717]'
                }`}
              >
                About
              </Link>

              <Link
                href="/wholesale"
                className={`nav-link-animated py-1 transition-colors ${
                  pathname === '/wholesale' ? 'active text-[#171717]' : 'text-[#686660] hover:text-[#171717]'
                }`}
              >
                Business
              </Link>
            </nav>

            {/* Right: Search & Contact Actions */}
            <div className="flex items-center gap-3.5">
              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded hover:bg-[#F2F0EA] text-[#171717] transition-colors flex items-center gap-2"
                aria-label="Search catalogue"
              >
                <Search className="w-4 h-4 text-[#171717]" />
                <span className="hidden sm:inline font-mono text-[11px] text-[#686660] uppercase tracking-wider font-semibold">
                  Search
                </span>
              </button>

              {/* Contact Button */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center justify-center text-xs font-mono font-bold uppercase tracking-wider py-2 px-4 bg-white border border-[#E6E2D9] text-[#171717] hover:bg-[#171717] hover:text-white transition-colors"
              >
                Contact Us
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileNavOpen(true)}
                className="xl:hidden p-2 rounded hover:bg-[#F2F0EA] text-[#171717] transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Full-Screen Light Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#FAFAF7]/98 backdrop-blur-2xl flex flex-col justify-start p-6 md:p-12 overflow-y-auto"
          >
            <div className="max-w-4xl w-full mx-auto space-y-8">
              {/* Search Header */}
              <div className="flex items-center justify-between border-b border-[#E6E2D9] pb-4">
                <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold">
                  CATALOGUE SEARCH • 195+ PRODUCTS
                </span>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2.5 rounded-full bg-[#F2F0EA] text-[#171717] hover:bg-[#E6E2D9] transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Big Search Input */}
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Type product name, botanical note, SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-[#E6E2D9] focus:border-[#B89B6A] py-4 text-2xl md:text-4xl font-serif text-[#171717] placeholder:text-[#686660]/40 outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-0 top-5 text-xs font-mono text-[#686660] hover:text-[#171717] uppercase font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Instant Results */}
              {searchQuery.trim().length > 1 && (
                <div className="space-y-4 pt-4">
                  <span className="font-mono text-xs text-[#686660] uppercase tracking-wider block">
                    Found {searchResults.length} Formulations:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {searchResults.map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/product/${prod.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="p-4 rounded bg-white border border-[#E6E2D9] hover:border-[#B89B6A] transition-all flex items-center gap-3.5 group shadow-xs hover:shadow-sm"
                      >
                        <div className="w-14 h-14 rounded bg-[#FAFAF7] border border-[#E6E2D9] relative overflow-hidden flex-shrink-0">
                          {prod.images && prod.images[0] && (
                            <Image
                              src={prod.images[0]}
                              alt={prod.name}
                              fill
                              sizes="56px"
                              className="object-contain p-1 group-hover:scale-105 transition-transform"
                            />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-serif text-base font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors truncate">
                            {prod.name}
                          </p>
                          <span className="font-mono text-[10px] text-[#686660] uppercase block">
                            {prod.categoryName}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#B89B6A] ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Light Dedicated Mobile Menu */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#FAFAF7] text-[#171717] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
          >
            {/* Mobile Header Top */}
            <div className="flex items-center justify-between border-b border-[#E6E2D9] pb-5">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold text-[#171717]">
                  SenseMe
                </span>
                <span className="text-[#B89B6A] text-[10px] font-mono font-bold tracking-widest uppercase border-l border-[#E6E2D9] pl-2">
                  INDIA
                </span>
              </div>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-2.5 rounded-full bg-[#F2F0EA] text-[#171717] hover:bg-[#E6E2D9] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Dedicated Navigation Links */}
            <div className="my-auto py-6 space-y-3 font-serif">
              {/* Home Link */}
              <div className="border-b border-[#E6E2D9]/70 pb-3">
                <Link
                  href="/"
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center justify-between text-2xl sm:text-3xl font-bold transition-colors py-1 ${
                    pathname === '/' ? 'text-[#B89B6A]' : 'text-[#171717] hover:text-[#B89B6A]'
                  }`}
                >
                  <span>Home</span>
                  <ArrowUpRight className="w-5 h-5 text-[#B89B6A]" />
                </Link>
              </div>

              {/* Explore Products Dropdown Accordion */}
              <div className="border-b border-[#E6E2D9]/70 pb-3">
                <button
                  onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
                  className="w-full flex items-center justify-between text-2xl sm:text-3xl font-bold text-[#171717] hover:text-[#B89B6A] transition-colors py-1 text-left"
                >
                  <span>Explore Products</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#B89B6A] transition-transform duration-300 ${
                      mobileExploreOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {mobileExploreOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden pl-3 pt-3 space-y-2 font-sans"
                    >
                      {[
                        { name: 'Shop All', href: '/shop' },
                        { name: 'Essential Oils', href: '/shop?category=essential-oils' },
                        { name: 'Diffuser Blends', href: '/shop?category=diffuser-blends' },
                        { name: 'Fragrance Oils', href: '/shop?category=fragrance-oils' },
                        { name: 'Candle Making', href: '/shop?category=candle-making' },
                      ].map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileNavOpen(false)}
                          className="flex items-center justify-between py-2 text-sm sm:text-base font-semibold text-[#686660] hover:text-[#171717] hover:translate-x-1 transition-all border-b border-[#E6E2D9]/40 last:border-b-0"
                        >
                          <span>{sub.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#B89B6A]" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Core Institutional & Business Navigation Links */}
              {[
                { name: 'Manufacturing', href: '/manufacturing' },
                { name: 'Applications', href: '/applications' },
                { name: 'About SenseMe', href: '/about' },
                { name: 'Business B2B', href: '/wholesale' },
                { name: 'Contact Us', href: '/contact' },
              ].map((item) => (
                <div key={item.name} className="border-b border-[#E6E2D9]/70 pb-3">
                  <Link
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="flex items-center justify-between text-2xl sm:text-3xl font-bold text-[#171717] hover:text-[#B89B6A] transition-colors py-1"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#B89B6A]" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile Footer Action */}
            <div className="pt-6 border-t border-[#E6E2D9] space-y-3">
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded bg-[#25D366] hover:bg-[#20bd5a] text-[#171717] font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Instant WhatsApp Desk
              </a>
              <p className="text-center font-mono text-[10px] text-[#686660] uppercase">
                Mylal Exports • Coimbatore, Tamil Nadu
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
