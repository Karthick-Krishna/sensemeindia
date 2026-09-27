'use client';

import { useState, useMemo } from 'react';
import { useData } from '@/lib/data-context';
import ProductCard from '@/components/ProductCard';
import { Search, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ShopPage() {
  const { products, categories } = useData();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'variants'>('featured');

  // Extract all unique tags
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

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedTag('all');
    setSortBy('featured');
  };

  return (
    <div className="pt-32 pb-32 bg-[#FAFAF7] min-h-screen text-[#171717]">
      <div className="container-editorial">
        {/* Editorial Top Heading */}
        <div className="border-b border-[#E6E2D9] pb-12 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block mb-3">
                COMPLETE BOTANICAL CATALOGUE • {products.length} FORMULATIONS
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#171717]">
                Explore the Archive.
              </h1>
            </div>
            <p className="text-sm text-[#686660] font-sans max-w-md leading-relaxed">
              Explore pure steam-distilled essential oils, diffuser blends, soap & candle fragrances, and machines. Inquire on WhatsApp for current batch details.
            </p>
          </div>

          {/* Category Horizontal Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-8 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#171717] text-white shadow-xs'
                  : 'bg-white text-[#686660] hover:bg-[#F2F0EA] border border-[#E6E2D9]'
              }`}
            >
              All Formulations ({products.length})
            </button>
            {categories.map((c) => {
              const count = products.filter((p) => p.categoryId === c.id).length;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans whitespace-nowrap transition-all ${
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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E6E2D9]">
          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-[#686660] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by name, SKU or note..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E6E2D9] rounded-[var(--radius-sm)] text-xs font-sans text-[#171717] placeholder:text-[#686660]/60 outline-none focus:border-[#171717] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-[#686660] hover:text-[#171717]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tags & Sorting */}
          <div className="flex flex-wrap items-center gap-3">
            {allTags.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-lg">
                <span className="text-[11px] font-mono text-[#686660] uppercase mr-1">Tags:</span>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                    className={`px-3 py-1 rounded text-[11px] font-mono uppercase tracking-wider transition-colors ${
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
              <span className="text-[11px] font-mono text-[#686660] uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3.5 py-2 bg-white border border-[#E6E2D9] rounded-[var(--radius-sm)] text-xs font-medium text-[#171717] outline-none focus:border-[#171717]"
              >
                <option value="featured">Featured First</option>
                <option value="name">Alphabetical (A-Z)</option>
                <option value="variants">Most Size Options</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Gallery Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[var(--radius-lg)] border border-[#E6E2D9] p-8">
            <h3 className="font-serif text-3xl font-bold text-[#171717] mb-2">No Products Found</h3>
            <p className="text-xs text-[#686660] max-w-sm mx-auto mb-6">
              We couldn&apos;t find any formulations matching your current filters.
            </p>
            <button onClick={resetFilters} className="btn-luxury-primary text-xs py-2.5 px-6">
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
