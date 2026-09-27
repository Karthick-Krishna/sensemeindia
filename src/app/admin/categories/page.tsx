'use client';

import { useState } from 'react';
import { useData } from '@/lib/data-context';
import AdminShell from '@/components/AdminShell';
import { Category } from '@/lib/types';
import {
  FolderOpen,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Package,
  X,
  Search,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminCategoriesPage() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useData();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    enabled: true,
    sortOrder: 1,
  });

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      enabled: true,
      sortOrder: categories.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      enabled: cat.enabled,
      sortOrder: cat.sortOrder,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const payload = {
      name: formData.name,
      slug,
      description: formData.description,
      enabled: formData.enabled,
      sortOrder: Number(formData.sortOrder),
    };

    if (editingCategory) {
      await updateCategory(editingCategory.id, payload);
    } else {
      await addCategory(payload);
    }

    setModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    const count = products.filter((p) => p.categoryId === id).length;
    if (count > 0) {
      if (!confirm(`This category contains ${count} active product(s). Are you sure you want to delete "${name}"?`)) {
        return;
      }
    } else if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }
    await deleteCategory(id);
  };

  const toggleEnabled = async (cat: Category) => {
    await updateCategory(cat.id, { enabled: !cat.enabled });
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell
      title="Product Categories"
      subtitle="Organise your botanical and fragrance catalogue taxonomy"
      actions={
        <button
          onClick={openAddModal}
          className="btn btn-primary text-xs py-2.5 px-4 shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      }
    >
      {/* Search Header */}
      <div className="bg-white rounded-[var(--radius-md)] p-4 mb-6 border border-border-light shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white transition-colors"
          />
        </div>
        <p className="text-xs text-text-muted">
          Showing {filtered.length} of {categories.length} categories
        </p>
      </div>

      {/* Categories Grid / Table */}
      <div className="bg-white rounded-[var(--radius-md)] border border-border-light shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-warm-50 border-b border-border-light">
              <tr>
                <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Category</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Products</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Order</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filtered.map((cat) => {
                const productCount = products.filter((p) => p.categoryId === cat.id).length;
                return (
                  <tr key={cat.id} className="hover:bg-warm-50/60 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-warm-100 text-warm-800 flex items-center justify-center flex-shrink-0">
                          <FolderOpen className="w-5 h-5 text-brand-700" />
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary group-hover:text-brand-800 transition-colors">
                            {cat.name}
                          </p>
                          <p className="text-xs text-text-muted line-clamp-1 max-w-xs">{cat.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-text-muted">
                      /category/{cat.slug}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/products`}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-brand-50 text-brand-700 font-semibold rounded-full hover:bg-brand-100 transition-colors"
                      >
                        <Package className="w-3 h-3" />
                        {productCount} items
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-text-secondary">
                      #{cat.sortOrder}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleEnabled(cat)}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-all ${
                          cat.enabled
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}
                        title="Click to toggle active status"
                      >
                        {cat.enabled ? (
                          <>
                            <CheckCircle className="w-3 h-3" /> Active
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" /> Disabled
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/category/${cat.slug}`}
                          target="_blank"
                          className="p-1.5 text-text-muted hover:text-brand-700 hover:bg-brand-50 rounded-[var(--radius-sm)] transition-colors"
                          title="View on store"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 text-text-muted hover:text-brand-700 hover:bg-brand-50 rounded-[var(--radius-sm)] transition-colors"
                          title="Edit Category"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-[var(--radius-sm)] transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-[var(--radius-lg)] shadow-elevated w-full max-w-lg overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-border-light flex items-center justify-between bg-warm-50/50">
              <h3 className="font-heading text-lg font-bold text-text-primary">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-[var(--radius-sm)] hover:bg-warm-100 text-text-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
                  placeholder="e.g. Aromatherapy Blends"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                  URL Slug (Optional - auto generated)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white font-mono"
                  placeholder="e.g. aromatherapy-blends"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
                  placeholder="Provide an informative overview for this botanical category..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500"
                  />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="catEnabled"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                    className="w-4 h-4 text-brand-600 rounded border-border-light focus:ring-brand-500"
                  />
                  <label htmlFor="catEnabled" className="text-sm font-semibold text-text-primary cursor-pointer">
                    Enabled in Store
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-border-light flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-ghost border border-border-light text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-xs py-2 px-5 shadow-sm">
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
