'use client';

import Link from 'next/link';
import { useData } from '@/lib/data-context';
import AdminShell from '@/components/AdminShell';
import {
  Package,
  FolderOpen,
  Star,
  MessageSquare,
  Settings,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Mail,
  Phone,
} from 'lucide-react';

export default function AdminDashboard() {
  const { products, categories, reviews, enquiries, contacts, updateEnquiryStatus } = useData();

  const publishedProducts = products.filter((p) => p.status === 'published').length;
  const featuredProducts = products.filter((p) => p.featured).length;
  const newEnquiries = enquiries.filter((e) => e.status === 'new').length;
  const newContacts = contacts.filter((c) => c.status === 'new').length;

  return (
    <AdminShell
      title="Dashboard Overview"
      subtitle="Real-time catalogue overview, customer enquiries & store management"
      actions={
        <div className="flex items-center gap-2">
          <Link href="/admin/products" className="btn btn-primary text-xs py-2 px-3.5">
            <Package className="w-3.5 h-3.5" /> Manage Products
          </Link>
          <Link href="/" target="_blank" className="btn btn-ghost border border-border-light text-xs py-2 px-3.5">
            <ExternalLink className="w-3.5 h-3.5" /> View Live Site
          </Link>
        </div>
      }
    >
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <Link
          href="/admin/products"
          className="bg-white rounded-[var(--radius-md)] p-6 border border-border-light shadow-subtle hover:shadow-elevated transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-brand-50 text-brand-700 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded font-medium">
              {publishedProducts} active
            </span>
          </div>
          <p className="font-heading text-3xl font-bold text-text-primary mb-1">{products.length}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Total Products</p>
            <span className="text-xs text-text-tertiary flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold-500" /> {featuredProducts} featured
            </span>
          </div>
        </Link>

        <Link
          href="/admin/categories"
          className="bg-white rounded-[var(--radius-md)] p-6 border border-border-light shadow-subtle hover:shadow-elevated transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-warm-100 text-warm-800 flex items-center justify-center">
              <FolderOpen className="w-5 h-5" />
            </div>
            <span className="text-xs text-text-secondary bg-warm-50 px-2 py-0.5 rounded font-medium">
              Categorised
            </span>
          </div>
          <p className="font-heading text-3xl font-bold text-text-primary mb-1">{categories.length}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Product Categories</p>
            <span className="text-xs text-brand-600 group-hover:translate-x-0.5 transition-transform flex items-center">
              View all <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </Link>

        <Link
          href="/admin/enquiries"
          className="bg-white rounded-[var(--radius-md)] p-6 border border-border-light shadow-subtle hover:shadow-elevated transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-green-50 text-green-700 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            {newEnquiries + newContacts > 0 ? (
              <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-semibold animate-pulse">
                {newEnquiries + newContacts} new
              </span>
            ) : (
              <span className="text-xs text-text-muted">Up to date</span>
            )}
          </div>
          <p className="font-heading text-3xl font-bold text-text-primary mb-1">
            {enquiries.length + contacts.length}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">WhatsApp & Web Leads</p>
            <span className="text-xs text-brand-600 group-hover:translate-x-0.5 transition-transform flex items-center">
              Manage <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </Link>

        <Link
          href="/admin/reviews"
          className="bg-white rounded-[var(--radius-md)] p-6 border border-border-light shadow-subtle hover:shadow-elevated transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-amber-50 text-amber-700 flex items-center justify-center">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            </div>
            <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
              Verified
            </span>
          </div>
          <p className="font-heading text-3xl font-bold text-text-primary mb-1">{reviews.length}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">Customer Reviews</p>
            <span className="text-xs text-brand-600 group-hover:translate-x-0.5 transition-transform flex items-center">
              Moderate <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent WhatsApp Leads */}
        <div className="lg:col-span-2 bg-white rounded-[var(--radius-md)] border border-border-light shadow-subtle overflow-hidden">
          <div className="p-6 border-b border-border-light flex items-center justify-between">
            <div>
              <h2 className="font-heading text-lg font-bold text-text-primary">Recent WhatsApp Enquiries</h2>
              <p className="text-xs text-text-muted">Buyers initiated WhatsApp order conversations</p>
            </div>
            <Link href="/admin/enquiries" className="text-xs text-brand-600 hover:text-brand-800 font-semibold flex items-center">
              View All <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

          <div className="divide-y divide-border-light">
            {enquiries.length === 0 ? (
              <div className="p-8 text-center text-text-muted text-sm">No enquiries recorded yet.</div>
            ) : (
              enquiries.slice(0, 5).map((enq) => (
                <div key={enq.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-warm-50/50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-text-primary">{enq.productName}</span>
                      <span className="text-xs px-2 py-0.5 bg-warm-100 rounded text-text-secondary">{enq.variant}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                      <span>Qty: <strong className="text-text-primary">{enq.quantity}</strong></span>
                      <span>•</span>
                      <span className="capitalize">Source: {enq.source.replace('_', ' ')}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(enq.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        enq.status === 'new'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : enq.status === 'contacted'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-green-50 text-green-700 border border-green-200'
                      }`}
                    >
                      {enq.status.charAt(0).toUpperCase() + enq.status.slice(1)}
                    </span>
                    {enq.status !== 'completed' && (
                      <button
                        onClick={() => updateEnquiryStatus(enq.id, 'completed')}
                        className="p-1.5 hover:bg-green-50 text-text-muted hover:text-green-700 rounded transition-colors"
                        title="Mark as completed"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions & Store Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-[var(--radius-md)] border border-border-light shadow-subtle p-6">
            <h3 className="font-heading text-base font-bold text-text-primary mb-4">Quick Management</h3>
            <div className="space-y-2.5">
              <Link
                href="/admin/products"
                className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-warm-50 hover:bg-brand-50 text-text-primary hover:text-brand-800 transition-colors text-sm font-medium border border-transparent hover:border-brand-200"
              >
                <span className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-brand-600" /> Add or Edit Products
                </span>
                <ArrowUpRight className="w-4 h-4 text-text-muted" />
              </Link>

              <Link
                href="/admin/categories"
                className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-warm-50 hover:bg-brand-50 text-text-primary hover:text-brand-800 transition-colors text-sm font-medium border border-transparent hover:border-brand-200"
              >
                <span className="flex items-center gap-2.5">
                  <FolderOpen className="w-4 h-4 text-brand-600" /> Manage Categories
                </span>
                <ArrowUpRight className="w-4 h-4 text-text-muted" />
              </Link>

              <Link
                href="/admin/reviews"
                className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-warm-50 hover:bg-brand-50 text-text-primary hover:text-brand-800 transition-colors text-sm font-medium border border-transparent hover:border-brand-200"
              >
                <span className="flex items-center gap-2.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" /> Customer Testimonials
                </span>
                <ArrowUpRight className="w-4 h-4 text-text-muted" />
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-warm-50 hover:bg-brand-50 text-text-primary hover:text-brand-800 transition-colors text-sm font-medium border border-transparent hover:border-brand-200"
              >
                <span className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-brand-600" /> Store Details & Contact Info
                </span>
                <ArrowUpRight className="w-4 h-4 text-text-muted" />
              </Link>
            </div>
          </div>

          {/* Quick Contact info */}
          <div className="bg-brand-900 text-white rounded-[var(--radius-md)] p-6 shadow-subtle">
            <h3 className="font-heading text-base font-bold text-white mb-2">SenseMe India</h3>
            <p className="text-xs text-brand-300 mb-4">
              Mylal Exports, Coimbatore, Tamil Nadu. Official Wholesale & Private-Label Manufacturing Portal.
            </p>
            <div className="space-y-2 text-xs text-brand-200">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-400" />
                <span>+91 91508 70543</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-400" />
                <span>contact@sensemeindia.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
