'use client';

import { useState } from 'react';
import { useData } from '@/lib/data-context';
import AdminShell from '@/components/AdminShell';
import { Review } from '@/lib/types';
import {
  Star,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  X,
  MessageSquareQuote,
  Clock,
} from 'lucide-react';

export default function AdminReviewsPage() {
  const { reviews, products, addReview, updateReview, deleteReview } = useData();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const [formData, setFormData] = useState({
    customerName: '',
    content: '',
    productId: '',
    productName: '',
    published: true,
  });

  const openAddModal = () => {
    setEditingReview(null);
    setFormData({
      customerName: '',
      content: '',
      productId: '',
      productName: '',
      published: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (r: Review) => {
    setEditingReview(r);
    setFormData({
      customerName: r.customerName,
      content: r.content,
      productId: r.productId || '',
      productName: r.productName || '',
      published: r.published,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find((p) => p.id === formData.productId);

    const payload = {
      customerName: formData.customerName,
      content: formData.content,
      productId: formData.productId || undefined,
      productName: product?.name || formData.productName || undefined,
      published: formData.published,
    };

    if (editingReview) {
      await updateReview(editingReview.id, payload);
    } else {
      await addReview(payload);
    }

    setModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove the review by "${name}"?`)) {
      await deleteReview(id);
    }
  };

  const togglePublished = async (r: Review) => {
    await updateReview(r.id, { published: !r.published });
  };

  const filtered = reviews.filter(
    (r) =>
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell
      title="Customer Testimonials & Reviews"
      subtitle="Manage authentic buyer feedback and corporate client endorsements"
      actions={
        <button
          onClick={openAddModal}
          className="btn btn-primary text-xs py-2.5 px-4 shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Review
        </button>
      }
    >
      {/* Search Header */}
      <div className="bg-white rounded-[var(--radius-md)] p-4 mb-6 border border-border-light shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search reviews by client or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white transition-colors"
          />
        </div>
        <div className="flex items-center gap-4 text-xs text-text-muted">
          <span>{reviews.filter((r) => r.published).length} Published</span>
          <span>•</span>
          <span>{reviews.filter((r) => !r.published).length} Hidden</span>
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-[var(--radius-md)] border border-border-light shadow-subtle p-6 flex flex-col justify-between hover:shadow-elevated transition-shadow"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold font-heading">
                    {rev.customerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm">{rev.customerName}</h4>
                    {rev.productName ? (
                      <p className="text-xs text-brand-700 font-medium">{rev.productName}</p>
                    ) : (
                      <p className="text-xs text-text-muted">Verified Client</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => togglePublished(rev)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                    rev.published
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}
                  title="Click to toggle publish status"
                >
                  {rev.published ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  {rev.published ? 'Live' : 'Hidden'}
                </button>
              </div>

              <div className="flex items-center gap-1 mb-3 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>

              <p className="text-sm text-text-secondary leading-relaxed italic bg-warm-50/60 p-3.5 rounded-[var(--radius-sm)] border border-border-light/60">
                &ldquo;{rev.content}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-border-light text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(rev.createdAt).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(rev)}
                  className="p-1.5 hover:bg-brand-50 hover:text-brand-700 text-text-muted rounded-[var(--radius-sm)] transition-colors"
                  title="Edit Review"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(rev.id, rev.customerName)}
                  className="p-1.5 hover:bg-red-50 hover:text-red-600 text-text-muted rounded-[var(--radius-sm)] transition-colors"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-[var(--radius-lg)] shadow-elevated w-full max-w-lg overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-border-light flex items-center justify-between bg-warm-50/50">
              <h3 className="font-heading text-lg font-bold text-text-primary">
                {editingReview ? 'Edit Review' : 'Add Customer Review'}
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
                  Customer / Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
                  placeholder="e.g. Saravana Kumar or Focus Industries"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                  Associated Product (Optional)
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => {
                    const prod = products.find((p) => p.id === e.target.value);
                    setFormData({
                      ...formData,
                      productId: e.target.value,
                      productName: prod?.name || '',
                    });
                  }}
                  className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500"
                >
                  <option value="">General / Corporate Endorsement</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                  Testimonial / Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white leading-relaxed"
                  placeholder="Paste or write the customer feedback here..."
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="revPublished"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-brand-600 rounded border-border-light focus:ring-brand-500"
                />
                <label htmlFor="revPublished" className="text-sm font-semibold text-text-primary cursor-pointer">
                  Display on Public Website
                </label>
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
                  {editingReview ? 'Save Changes' : 'Post Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
