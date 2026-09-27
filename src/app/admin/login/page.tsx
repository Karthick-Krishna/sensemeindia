'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAdminAuth } from '@/lib/admin-auth';
import { Shield, Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@sensemeindia.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAdminAuth(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        router.push('/admin');
      } else {
        setError(res.error || 'Invalid email or password.');
      }
    } catch (err: unknown) {
      setError('Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setEmail('admin@sensemeindia.com');
    setPassword('admin123');
    setLoading(true);
    const res = await login('admin@sensemeindia.com', 'admin123');
    if (res.success) {
      router.push('/admin');
    } else {
      setError('Unable to log in as demo admin.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative gradient blur background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2 mb-3 group">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#E6E2D9] p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-all">
              <Image
                src="/logo-transparent.png"
                alt="SenseMe India Official Logo"
                width={52}
                height={52}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-2xl font-bold text-brand-900">SenseMe</span>
              <span className="font-heading text-xs uppercase tracking-widest text-brand-500 font-semibold px-2 py-0.5 bg-brand-50 rounded-full">
                Admin Portal
              </span>
            </div>
          </Link>
          <h1 className="font-heading text-xl font-bold text-text-primary">Admin Control Center</h1>
          <p className="text-sm text-text-muted mt-1">Manage products, enquiries, categories & settings</p>
        </div>

        <div className="bg-white rounded-[var(--radius-lg)] shadow-elevated p-8 border border-border-light">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-light">
            <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-text-primary">Sign In</h2>
              <p className="text-xs text-text-muted">Enter credentials or use instant demo</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-[var(--radius-sm)] p-3 mb-6 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white transition-colors"
                  placeholder="admin@sensemeindia.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-3.5" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-warm-50 border border-border-light rounded-[var(--radius-sm)] text-sm outline-none focus:border-brand-500 focus:bg-white transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-3 mt-2 text-sm font-semibold shadow-sm"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-light" />
            </div>
            <span className="relative bg-white px-3 text-xs text-text-muted font-medium">Or Quick Review</span>
          </div>

          <button
            type="button"
            onClick={handleDemoSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 bg-brand-50 hover:bg-brand-100 text-brand-800 text-xs font-semibold rounded-[var(--radius-sm)] border border-brand-200 flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Enter as Demo Administrator
          </button>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-text-muted hover:text-brand-700 transition-colors">
            ← Return to SenseMe India Public Store
          </Link>
        </div>
      </div>
    </div>
  );
}
