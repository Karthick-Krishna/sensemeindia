'use client';

import { useState } from 'react';
import { useData } from '@/lib/data-context';
import AdminShell from '@/components/AdminShell';
import { Product, ProductVariant } from '@/lib/types';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Search,
  X,
  Check,
  Tag,
  Sliders,
} from 'lucide-react';

export default function AdminProductsPage() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    categoryId: 'essential-oils',
    categoryName: 'Essential Oils',
    shortDescription: '',
    description: '',
    application: '',
    usage: '',
    safetyInformation: '',
    tags: '',
    featured: false,
    status: 'published' as 'published' | 'draft' | 'archived',
    topNotes: '',
    middleNotes: '',
    baseNotes: '',
    variants: [
      { name: '15 ml', available: true },
      { name: '100 ml', available: true },
      { name: '1000 ml', available: true },
    ] as ProductVariant[],
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      sku: `SM-${Date.now().toString().slice(-4)}`,
      categoryId: categories[0]?.id || 'essential-oils',
      categoryName: categories[0]?.name || 'Essential Oils',
      shortDescription: '',
      description: '',
      application: 'Aromatherapy, Diffuser, Topical, Formulations',
      usage: 'Add a few drops to diffuser or carrier oil.',
      safetyInformation: 'For external use only. Dilute before topical use.',
      tags: 'pure, natural, premium',
      featured: false,
      status: 'published',
      topNotes: '',
      middleNotes: '',
      baseNotes: '',
      variants: [
        { name: '15 ml', available: true },
        { name: '100 ml', available: true },
        { name: '1000 ml', available: true },
      ],
    });
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      categoryId: p.categoryId,
      categoryName: p.categoryName || '',
      shortDescription: p.shortDescription,
      description: p.description,
      application: p.application || '',
      usage: p.usage || '',
      safetyInformation: p.safetyInformation || '',
      tags: p.tags.join(', '),
      featured: p.featured,
      status: p.status || 'published',
      topNotes: p.aromaProfile?.topNotes?.join(', ') || '',
      middleNotes: p.aromaProfile?.middleNotes?.join(', ') || '',
      baseNotes: p.aromaProfile?.baseNotes?.join(', ') || '',
      variants: p.variants.length > 0 ? p.variants : [{ name: 'Standard', available: true }],
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const category = categories.find((c) => c.id === formData.categoryId);

    const productPayload = {
      name: formData.name,
      slug,
      sku: formData.sku,
      categoryId: formData.categoryId,
      categoryName: category?.name || formData.categoryName,
      shortDescription: formData.shortDescription,
      description: formData.description,
      images: editingProduct?.images || ['/images/products/lavender.jpg'],
      variants: formData.variants,
      application: formData.application,
      aromaProfile: {
        topNotes: formData.topNotes ? formData.topNotes.split(',').map((s) => s.trim()) : undefined,
        middleNotes: formData.middleNotes ? formData.middleNotes.split(',').map((s) => s.trim()) : undefined,
        baseNotes: formData.baseNotes ? formData.baseNotes.split(',').map((s) => s.trim()) : undefined,
      },
      usage: formData.usage,
      safetyInformation: formData.safetyInformation,
      tags: formData.tags.split(',').map((s) => s.trim()).filter(Boolean),
      featured: formData.featured,
      status: formData.status,
      sortOrder: editingProduct?.sortOrder || products.length + 1,
      createdAt: editingProduct?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, productPayload);
    } else {
      await addProduct(productPayload);
    }

    setModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteProduct(id);
    }
  };

  const toggleFeatured = async (p: Product) => {
    await updateProduct(p.id, { featured: !p.featured });
  };

  const toggleStatus = async (p: Product) => {
    const nextStatus = p.status === 'published' ? 'draft' : 'published';
    await updateProduct(p.id, { status: nextStatus });
  };

  // Filtered Products
  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || p.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminShell
      title="Product Catalogue"
      subtitle={`Manage all ${products.length} products across your botanical and aroma collections`}
      actions={
        <button
          onClick={openAddModal}
          className="btn btn-primary text-xs py-2.5 px-4 shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      }
    >
      {/* Search & Filters */}
      <div className="bg-white rounded-[var(--radius-md)] p-4 mb-6 border border-border-light shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by product name, SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-3 text-text-muted hover:text-text-primary"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-medium text-text-muted hidden sm:inline">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 font-medium text-text-primary"
          >
            <option value="all">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-[var(--radius-md)] border border-border-light shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-warm-50 border-b border-border-light">
              <tr>
                <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Product</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Featured</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Variants</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                    No products found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-warm-50/60 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-brand-50 text-brand-700 flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary group-hover:text-brand-800 transition-colors">
                            {p.name}
                          </p>
                          <p className="text-xs text-text-muted font-mono">{p.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      <span className="text-xs px-2.5 py-1 bg-warm-100 rounded-full font-medium">
                        {p.categoryName || p.categoryId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(p)}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-all ${
                          (p.status || 'published') === 'published'
                            ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                        }`}
                        title="Click to toggle status"
                      >
                        {(p.status || 'published') === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {(p.status || 'published').toUpperCase()}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleFeatured(p)}
                        className={`p-1.5 rounded-[var(--radius-sm)] transition-colors ${
                          p.featured
                            ? 'text-amber-500 hover:text-amber-600'
                            : 'text-text-muted hover:text-amber-500'
                        }`}
                        title={p.featured ? 'Unmark featured' : 'Mark as featured'}
                      >
                        <Star className={`w-4 h-4 ${p.featured ? 'fill-amber-400 text-amber-500' : ''}`} />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-xs text-text-secondary">
                      {p.variants.map((v) => v.name).join(', ') || 'Standard'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-text-muted hover:text-brand-700 hover:bg-brand-50 rounded-[var(--radius-sm)] transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-[var(--radius-sm)] transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-[var(--radius-lg)] shadow-elevated w-full max-w-3xl my-8 overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-border-light flex items-center justify-between bg-warm-50/50">
              <div>
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  {editingProduct ? 'Edit Product' : 'Add New Botanical Product'}
                </h3>
                <p className="text-xs text-text-muted">Fill out catalogue details & aromatic specifications</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-[var(--radius-sm)] hover:bg-warm-100 text-text-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
                    placeholder="e.g. Frankincense Essential Oil"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
                    placeholder="e.g. SM-EO-FRK-001"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                    Category *
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => {
                      const cat = categories.find((c) => c.id === e.target.value);
                      setFormData({
                        ...formData,
                        categoryId: e.target.value,
                        categoryName: cat?.name || '',
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as 'published' | 'draft' | 'archived' })
                    }
                    className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500"
                  >
                    <option value="published">Published (Visible in store)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                  Short Hook Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
                  placeholder="A concise 1-2 sentence overview for cards and search..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                  Detailed Botanical Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white font-sans"
                  placeholder="Full extraction, provenance, purity details and formulation qualities..."
                />
              </div>

              {/* Aromatic Profile Notes */}
              <div className="p-4 bg-warm-50/70 rounded-[var(--radius-md)] border border-border-light space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-900">
                  Aromatic Profile Notes (Comma-separated)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-xs text-text-muted block mb-1">Top Notes</span>
                    <input
                      type="text"
                      value={formData.topNotes}
                      onChange={(e) => setFormData({ ...formData, topNotes: e.target.value })}
                      placeholder="e.g. Fresh Citrus, Pine"
                      className="w-full px-3 py-2 bg-white border border-border-light rounded-[var(--radius-sm)] text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted block mb-1">Middle Notes</span>
                    <input
                      type="text"
                      value={formData.middleNotes}
                      onChange={(e) => setFormData({ ...formData, middleNotes: e.target.value })}
                      placeholder="e.g. Resinous, Balsamic"
                      className="w-full px-3 py-2 bg-white border border-border-light rounded-[var(--radius-sm)] text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-text-muted block mb-1">Base Notes</span>
                    <input
                      type="text"
                      value={formData.baseNotes}
                      onChange={(e) => setFormData({ ...formData, baseNotes: e.target.value })}
                      placeholder="e.g. Deep Wood, Earthy"
                      className="w-full px-3 py-2 bg-white border border-border-light rounded-[var(--radius-sm)] text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Applications, Usage & Safety */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                    Recommended Applications
                  </label>
                  <input
                    type="text"
                    value={formData.application}
                    onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500"
                    placeholder="e.g. Aromatherapy, skincare, meditation"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500"
                    placeholder="pure, frankincense, grounding"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-brand-600 rounded border-border-light focus:ring-brand-500"
                />
                <label htmlFor="featured" className="text-sm font-semibold text-text-primary cursor-pointer">
                  Feature on Homepage Showcase
                </label>
              </div>

              <div className="pt-4 border-t border-border-light flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-ghost border border-border-light text-xs py-2.5 px-4"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-xs py-2.5 px-6 shadow-sm">
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
