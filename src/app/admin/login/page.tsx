'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple password check (in production, this would be server-side)
    if (password === 'G3Electric2024!') {
      // Store authentication state in cookies
      document.cookie = `admin_authenticated=true; path=/; max-age=${24 * 60 * 60}`; // 24 hours
      document.cookie = `admin_timestamp=${Date.now()}; path=/; max-age=${24 * 60 * 60}`; // 24 hours
      
      // Redirect to admin page
      router.push('/admin');
    } else {
      setError('Invalid password. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/admin/login" />

      {/* Login Form */}
      <section className="py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white-smoke rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple mb-4">
                <LockClosedIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="font-montserrat text-3xl font-bold text-earle-black">
                Admin Access
              </h2>
              <p className="font-raleway text-earle-black mt-2">
                Enter password to access admin panel
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-earle-black mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent font-raleway"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple hover:bg-phlox focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                href="/" 
                className="text-sm text-purple hover:text-phlox font-raleway transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{backgroundColor: '#70877F'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-megrim text-2xl text-white mb-4">G3 Electric</h3>
            <p className="font-raleway text-white-smoke mb-4">Safe & Dependable Electrical Services</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
