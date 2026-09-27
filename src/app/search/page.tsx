'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useData } from '@/lib/data-context';
import ProductCard from '@/components/ProductCard';
import { Search as SearchIcon, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const { searchProducts } = useData();

  const results = query ? searchProducts(query) : [];

  return (
    <div className="pt-20 sm:pt-28 pb-20 sm:pb-32 bg-[#FAFAF7] text-[#171717] min-h-screen">
      <div className="container-editorial">
        {/* Top Header */}
        <div className="border-b border-[#E6E2D9] pb-8 mb-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#686660] hover:text-[#171717] mb-4 transition-colors font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Full Catalogue
          </Link>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#171717]">
            {query ? `Search Results for "${query}"` : 'Catalogue Search'}
          </h1>
          <p className="text-xs md:text-sm text-[#686660] font-sans mt-2">
            {results.length} botanical products matching your query
          </p>
        </div>

        {/* Results Grid */}
        {results.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-[var(--radius-xl)] border border-[#E6E2D9] p-8 max-w-2xl mx-auto shadow-sm">
            <h3 className="font-serif text-3xl font-bold text-[#171717] mb-2">No Matching Products</h3>
            <p className="text-xs text-[#686660] mb-6 font-sans">
              Try searching for common terms like &ldquo;Frankincense&rdquo;, &ldquo;Diffuser&rdquo;, &ldquo;Turmeric&rdquo;, or &ldquo;Lavender&rdquo;.
            </p>
            <Link href="/shop" className="btn-luxury-primary text-xs py-2.5 px-6">
              Explore All Products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAF7] pt-32 text-center text-xs font-mono">Loading results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
