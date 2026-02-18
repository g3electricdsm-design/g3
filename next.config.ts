import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
// Extract the host (e.g. "abcxyz.supabase.co") from the full URL for use in CSP
const supabaseHost = supabaseUrl ? new URL(supabaseUrl).host : '*.supabase.co';

const cspDirectives = [
  "default-src 'self'",
  // Next.js requires 'unsafe-inline' for inline hydration scripts unless nonces are configured
  "script-src 'self' 'unsafe-inline'",
  // Tailwind CSS and Framer Motion generate inline styles at runtime
  "style-src 'self' 'unsafe-inline'",
  // Supabase storage images + data URIs used by lottie-react
  `img-src 'self' data: blob: https://${supabaseHost}`,
  // Supabase API calls
  `connect-src 'self' https://${supabaseHost}`,
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join('; ');

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Prevents the page from being embedded in iframes (clickjacking)
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevents browsers from MIME-sniffing response content types
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Controls how much referrer info is sent with requests
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Restricts access to browser features not needed by this site
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          // Enforces HTTPS for 1 year (only active on HTTPS)
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          // Content Security Policy
          { key: 'Content-Security-Policy', value: cspDirectives },
        ],
      },
    ];
  },
};

export default nextConfig;
