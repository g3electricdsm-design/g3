'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function getSessionId(): string {
  const key = 'g3_sid';
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return;
    if (pathname === lastTracked.current) return;
    lastTracked.current = pathname;

    const payload = JSON.stringify({
      sessionId: getSessionId(),
      path: pathname,
      referrer: document.referrer || null,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        '/api/analytics/track',
        new Blob([payload], { type: 'application/json' }),
      );
    } else {
      fetch('/api/analytics/track', {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
