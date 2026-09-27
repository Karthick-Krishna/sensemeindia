'use client';

import { useState } from 'react';
import { useData } from '@/lib/data-context';
import AdminShell from '@/components/AdminShell';
import { Enquiry, ContactSubmission } from '@/lib/types';
import {
  MessageSquare,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Package,
  Layers,
  Calendar,
} from 'lucide-react';

export default function AdminEnquiriesPage() {
  const { enquiries, contacts, updateEnquiryStatus, updateContactStatus, settings } = useData();

  const [activeTab, setActiveTab] = useState<'whatsapp' | 'contacts'>('whatsapp');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Stats
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;
  const newContactsCount = contacts.filter((c) => c.status === 'new').length;

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.productName.toLowerCase().includes(search.toLowerCase()) ||
      e.variant.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminShell
      title="Customer Enquiries & Leads"
      subtitle="Track inbound WhatsApp buyer requests and website contact submissions"
    >
      {/* Top metrics summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-[var(--radius-md)] p-5 border border-border-light shadow-subtle flex items-center justify-between">
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">New WhatsApp Leads</p>
            <p className="font-heading text-2xl font-bold text-brand-700 mt-1">{newEnquiriesCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-[var(--radius-md)] p-5 border border-border-light shadow-subtle flex items-center justify-between">
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">New Contact Form Inquiries</p>
            <p className="font-heading text-2xl font-bold text-warm-800 mt-1">{newContactsCount}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-warm-100 flex items-center justify-center text-warm-700">
            <Mail className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-[var(--radius-md)] p-5 border border-border-light shadow-subtle flex items-center justify-between">
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Total Combined Leads</p>
            <p className="font-heading text-2xl font-bold text-text-primary mt-1">
              {enquiries.length + contacts.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Layers className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs and search bar */}
      <div className="bg-white rounded-[var(--radius-md)] border border-border-light shadow-subtle p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tab buttons */}
        <div className="flex items-center gap-2 p-1 bg-warm-50 rounded-[var(--radius-sm)] border border-border-light w-full md:w-auto">
          <button
            onClick={() => {
              setActiveTab('whatsapp');
              setStatusFilter('all');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-[var(--radius-sm)] text-xs font-semibold transition-all ${
              activeTab === 'whatsapp'
                ? 'bg-white text-brand-800 shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
            WhatsApp Orders & Enquiries ({enquiries.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('contacts');
              setStatusFilter('all');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-[var(--radius-sm)] text-xs font-semibold transition-all ${
              activeTab === 'contacts'
                ? 'bg-white text-brand-800 shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-brand-600" />
            Contact Form Submissions ({contacts.length})
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search enquiries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-xs outline-none focus:border-brand-500 focus:bg-white"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-xs font-medium outline-none focus:border-brand-500"
          >
            <option value="all">All Statuses</option>
            {activeTab === 'whatsapp' ? (
              <>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </>
            ) : (
              <>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* WhatsApp Enquiries Tab */}
      {activeTab === 'whatsapp' && (
        <div className="bg-white rounded-[var(--radius-md)] border border-border-light shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-warm-50 border-b border-border-light">
                <tr>
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Variant / Qty</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Received</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                      No WhatsApp enquiries found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-warm-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded bg-brand-50 text-brand-700 flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-text-primary text-sm">{enq.productName}</p>
                            <p className="text-xs text-text-muted">ID: {enq.productId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <span className="font-semibold text-text-primary">{enq.quantity} unit(s)</span>
                        <span className="text-text-muted ml-1">({enq.variant})</span>
                      </td>
                      <td className="px-6 py-4 text-xs capitalize text-text-secondary">
                        <span className="px-2 py-0.5 bg-warm-100 rounded text-text-secondary">
                          {enq.source.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(enq.timestamp).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={enq.status}
                          onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as Enquiry['status'])}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                            enq.status === 'new'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : enq.status === 'contacted'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : enq.status === 'completed'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-gray-100 text-gray-500 border-gray-200'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="completed">Completed</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a
                          href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(`Regarding enquiry for ${enq.productName} (${enq.variant} x ${enq.quantity})`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary text-xs py-1.5 px-3 inline-flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          Chat
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contacts Tab */}
      {activeTab === 'contacts' && (
        <div className="space-y-4">
          {filteredContacts.length === 0 ? (
            <div className="bg-white rounded-[var(--radius-md)] border border-border-light p-12 text-center text-text-muted text-sm">
              No contact submissions found matching your search.
            </div>
          ) : (
            filteredContacts.map((cnt) => (
              <div
                key={cnt.id}
                className="bg-white rounded-[var(--radius-md)] border border-border-light shadow-subtle p-6 hover:shadow-elevated transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-warm-100 text-warm-800 font-bold flex items-center justify-center font-heading">
                      {cnt.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary text-base">{cnt.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-text-muted mt-0.5">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {cnt.email}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {cnt.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 bg-brand-50 text-brand-700 font-semibold rounded-full border border-brand-200 capitalize">
                      {cnt.enquiryType} Inquiry
                    </span>
                    <select
                      value={cnt.status}
                      onChange={(e) => updateContactStatus(cnt.id, e.target.value as ContactSubmission['status'])}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${
                        cnt.status === 'new'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : cnt.status === 'read'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-green-50 text-green-700 border-green-200'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>
                </div>

                <div className="bg-warm-50/70 p-4 rounded-[var(--radius-sm)] border border-border-light/60 text-sm text-text-secondary leading-relaxed">
                  {cnt.message}
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border-light text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Received on {new Date(cnt.createdAt).toLocaleString()}
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:${cnt.email}?subject=SenseMe India: Response to your inquiry`}
                      className="text-brand-600 hover:text-brand-800 font-semibold flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" /> Reply via Email
                    </a>
                    <a
                      href={`https://wa.me/${cnt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${cnt.name}, thank you for reaching out to SenseMe India regarding ${cnt.enquiryType}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 font-semibold flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </AdminShell>
  );
}
