'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const AUTO_DISMISS_MS = 4000;

export default function Toast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error'>('success');

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    const toast = searchParams.get('toast');
    const toastType = searchParams.get('toastType');

    if (!toast) return;

    setMessage(toast);
    setType(toastType === 'error' ? 'error' : 'success');

    requestAnimationFrame(() => setVisible(true));

    const params = new URLSearchParams(searchParams.toString());
    params.delete('toast');
    params.delete('toastType');
    const remaining = params.toString();
    router.replace(`${pathname}${remaining ? `?${remaining}` : ''}`, { scroll: false });
  }, [searchParams, router, pathname]);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(dismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [visible, dismiss]);

  if (!visible && !message) return null;

  const isError = type === 'error';

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ease-out ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0 pointer-events-none'
      }`}
      onTransitionEnd={() => {
        if (!visible) setMessage('');
      }}
    >
      <div
        style={{
          backgroundColor: isError ? '#242729' : '#6D0091',
          border: isError ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(198,54,255,0.3)',
        }}
        className="flex items-center gap-3 rounded-lg px-5 py-4 shadow-2xl"
      >
        {isError ? (
          <ExclamationTriangleIcon className="h-6 w-6 flex-shrink-0 text-red-400" />
        ) : (
          <CheckCircleIcon className="h-6 w-6 flex-shrink-0 text-white" />
        )}
        <span className="font-montserrat text-sm font-medium text-white pr-2">
          {message}
        </span>
        <button
          type="button"
          onClick={dismiss}
          className="flex-shrink-0 rounded p-1 text-white/60 hover:text-white transition-colors"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
