import type { NextRequest } from 'next/server';

/**
 * Stateless HMAC-signed admin session.
 *
 * The session token is `<expiryMs>.<hex signature>` where the signature is
 * HMAC-SHA256 over the expiry timestamp. Uses Web Crypto so the same code
 * runs in route handlers and in the proxy (edge or Node runtime).
 */

export const ADMIN_SESSION_COOKIE = 'admin_session';
export const ADMIN_SESSION_MAX_AGE = 24 * 60 * 60; // 24 hours, in seconds

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET (or ADMIN_PASSWORD) must be set');
  }
  return secret;
}

async function getHmacKey(usage: 'sign' | 'verify'): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    [usage]
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function fromHex(hex: string): Uint8Array | null {
  if (hex.length % 2 !== 0 || /[^0-9a-f]/i.test(hex)) return null;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

export async function createAdminSession(): Promise<string> {
  const expiry = String(Date.now() + ADMIN_SESSION_MAX_AGE * 1000);
  const key = await getHmacKey('sign');
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(expiry)
  );
  return `${expiry}.${toHex(signature)}`;
}

export async function verifyAdminSession(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;
  const [expiry, signatureHex] = token.split('.');
  if (!expiry || !signatureHex) return false;

  const expiryMs = Number(expiry);
  if (!Number.isFinite(expiryMs) || Date.now() > expiryMs) return false;

  const signature = fromHex(signatureHex);
  if (!signature) return false;

  try {
    const key = await getHmacKey('verify');
    // crypto.subtle.verify performs a constant-time comparison.
    return await crypto.subtle.verify(
      'HMAC',
      key,
      signature as BufferSource,
      new TextEncoder().encode(expiry)
    );
  } catch {
    return false;
  }
}

/** True when the request carries a valid admin session cookie. */
export async function isAdminRequest(request: NextRequest): Promise<boolean> {
  return verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}
