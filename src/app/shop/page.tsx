'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useData } from '@/lib/data-context';
import ProductCard from '@/components/ProductCard';
import { Search, X, SlidersHorizontal, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products, categories } = useData();

  const urlCategory = searchParams?.get('category') || 'all';
  const urlQuery = searchParams?.get('q') || searchParams?.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'variants'>('featured');

  // Sync category from URL parameter (supports both category ID and slug)
  useEffect(() => {
    if (urlCategory && urlCategory !== 'all') {
      const foundCat = categories.find(
        (c) => c.id.toLowerCase() === urlCategory.toLowerCase() || c.slug.toLowerCase() === urlCategory.toLowerCase()
      );
      if (foundCat) {
        setSelectedCategory(foundCat.id);
      } else {
        setSelectedCategory(urlCategory);
      }
    } else {
      setSelectedCategory('all');
    }
  }, [urlCategory, categories]);

  // Sync search query from URL parameter
  useEffect(() => {
    if (urlQuery) {
      setSearchQuery(urlQuery);
    }
  }, [urlQuery]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const cat = categories.find((c) => c.id === catId);
    if (catId === 'all') {
      router.replace('/shop', { scroll: false });
    } else if (cat) {
      router.replace(`/shop?category=${cat.slug}`, { scroll: false });
    }
  };

  // Extract top tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    products.forEach((p) => (p.tags || []).forEach((t) => tags.add(t)));
    return Array.from(tags).slice(0, 8);
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'all' || p.categoryId === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === '' ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesTag = selectedTag === 'all' || (p.tags || []).includes(selectedTag);

        return matchesCategory && matchesSearch && matchesTag;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'variants') return (b.variants?.length || 0) - (a.variants?.length || 0);
        if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return 0;
      });
  }, [products, selectedCategory, searchQuery, selectedTag, sortBy]);

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedTag('all');
    setSortBy('featured');
    router.replace('/shop', { scroll: false });
  };

  return (
    <div className="pt-20 sm:pt-28 pb-24 sm:pb-32 bg-[#FAFAF7] min-h-screen text-[#171717]">
      <div className="container-editorial">
        {/* Editorial Top Heading */}
        <div className="border-b border-[#E6E2D9] pb-8 sm:pb-12 mb-8 sm:mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div>
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block mb-2 sm:mb-3">
                COMPLETE BOTANICAL CATALOGUE • {products.length} VERIFIED FORMULATIONS
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#171717]">
                {activeCategoryObj ? activeCategoryObj.name : 'Explore the Archive.'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#686660] font-sans max-w-md leading-relaxed">
              {activeCategoryObj
                ? activeCategoryObj.description
                : 'Explore pure steam-distilled single botanicals, luxury diffuser concentrates, and candle/soap essences formulated in Coimbatore. Enquire on WhatsApp for batch availability.'}
            </p>
          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-6 sm:mt-8 scrollbar-none py-1">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'bg-white text-[#686660] hover:bg-[#F2F0EA] border border-[#E6E2D9]'
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.map((c) => {
              const count = products.filter((p) => p.categoryId === c.id).length;
              return (
                <button
                  key={c.id}
                  onClick={() => handleCategoryChange(c.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans whitespace-nowrap transition-all ${
                    selectedCategory === c.id
                      ? 'bg-[#171717] text-white shadow-xs'
                      : 'bg-white text-[#686660] hover:bg-[#F2F0EA] border border-[#E6E2D9]'
                  }`}
                >
                  {c.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filter & Search Strip */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-[#E6E2D9]">
          {/* Live Search Input */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-[#686660] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by name, botanical note, SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#E6E2D9] rounded text-xs font-sans text-[#171717] placeholder:text-[#686660]/60 outline-none focus:border-[#171717] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-[#686660] hover:text-[#171717]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tags & Sorting */}
          <div className="flex flex-wrap items-center gap-3">
            {allTags.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-lg scrollbar-none">
                <span className="text-[10px] font-mono text-[#686660] uppercase mr-1">Tags:</span>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-colors ${
                      selectedTag === tag
                        ? 'bg-[#171717] text-white font-bold'
                        : 'bg-white text-[#686660] border border-[#E6E2D9] hover:bg-[#F2F0EA]'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[10px] font-mono text-[#686660] uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 bg-white border border-[#E6E2D9] rounded text-xs font-medium text-[#171717] outline-none focus:border-[#171717]"
              >
                <option value="featured">Featured First</option>
                <option value="name">Alphabetical (A-Z)</option>
                <option value="variants">Most Size Options</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count & Filter Reset Bar */}
        {(selectedCategory !== 'all' || searchQuery || selectedTag !== 'all') && (
          <div className="flex items-center justify-between bg-white border border-[#E6E2D9] px-4 py-2.5 rounded mb-8 text-xs font-mono text-[#686660]">
            <span>
              Showing <strong className="text-[#171717]">{filteredProducts.length}</strong> of {products.length} Formulations
            </span>
            <button
              onClick={resetFilters}
              className="text-[#B89B6A] hover:text-[#171717] font-bold flex items-center gap-1 uppercase tracking-wider transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          </div>
        )}

        {/* Product Cards Gallery Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[var(--radius-xl)] border border-[#E6E2D9] p-8 max-w-md mx-auto shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#171717] mb-2">No Formulations Found</h3>
            <p className="text-xs text-[#686660] mb-6">
              We couldn&apos;t find any products matching your current search or filters.
            </p>
            <button onClick={resetFilters} className="btn-luxury-primary text-xs py-2.5 px-6">
              View All 195+ Formulations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} aspect="tall" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF7] pt-32 text-center text-xs font-mono text-[#686660]">Loading Catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
