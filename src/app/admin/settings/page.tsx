'use client';

import { useState } from 'react';
import { useData } from '@/lib/data-context';
import AdminShell from '@/components/AdminShell';
import {
  Settings,
  Save,
  CheckCircle2,
  Building,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
  FileText,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { settings, updateSettings, isFirebaseConfigured } = useData();

  const [formData, setFormData] = useState({
    businessName: settings.businessName,
    whatsappNumber: settings.whatsappNumber,
    email: settings.email,
    phone: settings.phone,
    address: settings.address,
    instagram: settings.instagram || '',
    facebook: settings.facebook || '',
    linkedin: settings.linkedin || '',
    footerText: settings.footerText,
    metaTitle: settings.metaTitle,
    metaDescription: settings.metaDescription,
  });

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    await updateSettings(formData);
    setSaving(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 4000);
  };

  return (
    <AdminShell
      title="Store Settings & Configuration"
      subtitle="Manage corporate contact details, social links, SEO tags, and platform configurations"
    >
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {/* Save confirmation banner */}
        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-[var(--radius-md)] flex items-center gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm font-semibold">
              Settings updated successfully! Changes are applied across the store and persisted.
            </p>
          </div>
        )}

        {/* Firebase Environment Status Card */}
        <div className="bg-white rounded-[var(--radius-md)] p-6 border border-border-light shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isFirebaseConfigured ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
              }`}
            >
              {isFirebaseConfigured ? <ShieldCheck className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold text-text-primary">
                {isFirebaseConfigured ? 'Cloud Firestore & Auth Connected' : 'Local Storage Mode Active'}
              </h3>
              <p className="text-xs text-text-muted">
                {isFirebaseConfigured
                  ? 'All changes are synchronized live with Google Cloud Firestore.'
                  : 'Operating in self-contained resilient mode with instant local persistence.'}
              </p>
            </div>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              isFirebaseConfigured ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
            }`}
          >
            {isFirebaseConfigured ? 'Production Cloud' : 'Self-Contained'}
          </span>
        </div>

        {/* Corporate Contact Information */}
        <div className="bg-white rounded-[var(--radius-md)] p-6 border border-border-light shadow-subtle space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-border-light">
            <Building className="w-5 h-5 text-brand-600" />
            <h3 className="font-heading text-base font-bold text-text-primary">
              Company & Corporate Contact
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                Brand / Business Entity Name
              </label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                Official Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                Primary Phone Number
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                WhatsApp Ordering Number (Digits only, including country code)
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white font-mono"
              />
              <span className="text-[11px] text-text-muted mt-1 block">
                Used to generate direct WhatsApp purchase & inquiry links (e.g. 919150870543)
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
              Registered Facility & Factory Address
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-[var(--radius-md)] p-6 border border-border-light shadow-subtle space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-border-light">
            <Share2 className="w-5 h-5 text-brand-600" />
            <h3 className="font-heading text-base font-bold text-text-primary">
              Social Media Channels
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
                placeholder="https://www.instagram.com/sensemeindia"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                Facebook Page URL
              </label>
              <input
                type="url"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
                placeholder="https://www.facebook.com/sensemeindia"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                LinkedIn Company URL
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
                placeholder="https://www.linkedin.com/company/sensemeindia"
              />
            </div>
          </div>
        </div>

        {/* Global SEO & Footer Content */}
        <div className="bg-white rounded-[var(--radius-md)] p-6 border border-border-light shadow-subtle space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-border-light">
            <Globe className="w-5 h-5 text-brand-600" />
            <h3 className="font-heading text-base font-bold text-text-primary">
              Global SEO & Footer Callout
            </h3>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
              Default Meta Title
            </label>
            <input
              type="text"
              required
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
              Default Meta Description
            </label>
            <textarea
              rows={2}
              required
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              className="w-full px-3.5 py-2 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white leading-relaxed"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
              Footer Headline Callout Text
            </label>
            <input
              type="text"
              required
              value={formData.footerText}
              onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary py-3 px-8 text-sm font-semibold shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving Changes...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </AdminShell>
  );
}
