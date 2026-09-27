'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '@/lib/admin-auth';
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Star,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: FolderOpen },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminShell({
  children,
  title,
  subtitle,
  actions,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  const { adminUser, loading, logout } = useAdminAuth(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-text-muted">Authenticating admin...</p>
        </div>
      </div>
    );
  }

  if (!adminUser) return null;

  return (
    <div className="min-h-screen bg-surface-secondary flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-border-light fixed top-0 left-0 bottom-0 z-30 shadow-subtle">
        <div className="p-5 border-b border-border-light flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#E6E2D9] p-1 flex items-center justify-center shadow-2xs">
              <Image
                src="/logo-transparent.png"
                alt="SenseMe Logo"
                width={26}
                height={26}
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-lg font-bold text-brand-900 tracking-tight">SenseMe</span>
              <span className="text-brand-500 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-brand-50 rounded-full">Admin</span>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div className="px-6 py-4 border-b border-border-light bg-warm-50/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-800 font-bold flex items-center justify-center text-sm">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-text-primary truncate">{adminUser.name}</p>
              <p className="text-xs text-text-muted truncate">{adminUser.email}</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-text-secondary hover:bg-warm-100 hover:text-text-primary'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-text-muted'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border-light space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 text-sm text-text-secondary hover:bg-warm-100 rounded-[var(--radius-sm)] transition-colors"
          >
            <span className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 text-text-muted" /> Live Website
            </span>
            <span className="text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded">Store ↗</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors w-full rounded-[var(--radius-sm)] font-medium"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-border-light z-40 flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-warm-100 rounded-[var(--radius-sm)] transition-colors"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5 text-text-primary" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-white border border-[#E6E2D9] p-0.5 flex items-center justify-center">
            <Image
              src="/logo-transparent.png"
              alt="SenseMe Logo"
              width={22}
              height={22}
              className="object-contain"
            />
          </div>
          <div className="font-heading text-base font-bold text-brand-900">
            SenseMe <span className="text-brand-600 text-xs">Admin</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="p-2 hover:bg-red-50 rounded-[var(--radius-sm)] text-text-muted hover:text-red-600 transition-colors"
          aria-label="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed top-0 left-0 bottom-0 w-72 bg-white z-[60] lg:hidden flex flex-col shadow-2xl animate-fade-in">
            <div className="p-6 border-b border-border-light flex items-center justify-between">
              <span className="font-heading text-lg font-bold text-brand-900">SenseMe Admin</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-[var(--radius-sm)] hover:bg-warm-100"
              >
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-sm)] text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-brand-600 text-white'
                        : 'text-text-secondary hover:bg-warm-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-border-light">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-warm-100 rounded-[var(--radius-sm)] mb-2"
              >
                <ExternalLink className="w-4 h-4" /> View Live Store ↗
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-[var(--radius-sm)] w-full font-medium"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 min-w-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {title && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                  {title}
                </h1>
                {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
              </div>
              {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
