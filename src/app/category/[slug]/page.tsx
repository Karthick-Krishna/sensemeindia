'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useData } from '@/lib/data-context';
import ProductCard from '@/components/ProductCard';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { categories, getProductsByCategory, getCategory } = useData();

  const category = getCategory(slug);
  const categoryProducts = category ? getProductsByCategory(category.id) : [];

  if (!category) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-[#FAFAF7]">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-3xl font-bold text-[#171717]">Category Not Found</h1>
          <p className="text-xs text-[#686660]">The requested botanical collection could not be located.</p>
          <Link href="/shop" className="btn-luxury-primary text-xs py-2.5 px-6">
            Explore All Formulations
          </Link>
        </div>
      </div>
    );
  }

  const otherCategories = categories.filter((c) => c.id !== category.id);

  return (
    <div className="pt-20 sm:pt-28 pb-20 sm:pb-32 bg-[#FAFAF7] min-h-screen text-[#171717]">
      <div className="container-editorial">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#686660] mb-6 sm:mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-[#171717] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-[#171717] transition-colors">
            Catalogue
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#171717] font-bold">{category.name}</span>
        </div>

        {/* Category Hero Banner (100% Light Luxury) */}
        <div className="mb-16 p-8 md:p-14 rounded-[var(--radius-xl)] bg-white border border-[#E6E2D9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold block">
              COLLECTION ARCHIVE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#171717] tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm md:text-base text-[#686660] font-sans leading-relaxed">
              {category.description}
            </p>
          </div>

          {category.image && (
            <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-[var(--radius-lg)] bg-[#FAFAF7] border border-[#E6E2D9] relative overflow-hidden flex items-center justify-center p-3 flex-shrink-0">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="192px"
                className="object-contain p-2"
              />
            </div>
          )}
        </div>

        {/* Product Grid Section */}
        <div className="mb-24">
          <div className="flex items-center justify-between pb-6 border-b border-[#E6E2D9] mb-8">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#B89B6A] font-bold">
              {categoryProducts.length} FORMULATIONS AVAILABLE
            </span>
            <span className="font-mono text-xs text-[#686660]">
              Coimbatore Extraction
            </span>
          </div>

          {categoryProducts.length === 0 ? (
            <div className="py-16 text-center text-[#686660] font-serif text-xl bg-white rounded-[var(--radius-lg)] border border-[#E6E2D9]">
              No products found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          )}
        </div>

        {/* Other Categories Explorer */}
        <div className="pt-16 border-t border-[#E6E2D9]">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#B89B6A] font-bold block mb-6">
            EXPLORE OTHER DISCIPLINES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCategories.map((other) => (
              <Link
                key={other.id}
                href={`/category/${other.slug}`}
                className="p-6 rounded-[var(--radius-lg)] bg-white border border-[#E6E2D9] hover:border-[#B89B6A] transition-all group shadow-xs hover:shadow-sm"
              >
                <h4 className="font-serif text-xl font-bold text-[#171717] group-hover:text-[#B89B6A] transition-colors flex items-center justify-between">
                  {other.name}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#171717]" />
                </h4>
                <p className="text-xs text-[#686660] line-clamp-2 mt-2 font-sans">
                  {other.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
