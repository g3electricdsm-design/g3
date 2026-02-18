export const SESSION_COOKIE = 'admin_session';
export const SESSION_MAX_AGE = 24 * 60 * 60; // 24 hours in seconds

async function getHmacKey(): Promise<CryptoKey | null> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return null;
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function createSessionToken(): Promise<string> {
  const key = await getHmacKey();
  if (!key) throw new Error('ADMIN_PASSWORD environment variable is not configured');
  const timestamp = Date.now().toString();
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(timestamp));
  const hex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return `${timestamp}.${hex}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  const dotIndex = token.indexOf('.');
  if (dotIndex === -1) return false;
  const timestamp = token.slice(0, dotIndex);
  const hex = token.slice(dotIndex + 1);

  const authTime = parseInt(timestamp, 10);
  if (isNaN(authTime) || Date.now() - authTime > SESSION_MAX_AGE * 1000) return false;

  const key = await getHmacKey();
  if (!key) return false;

  try {
    const hexPairs = hex.match(/.{2}/g);
    if (!hexPairs || hexPairs.length !== 32) return false;
    const sigBytes = new Uint8Array(hexPairs.map(b => parseInt(b, 16)));
    return await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes,
      new TextEncoder().encode(timestamp)
    );
  } catch {
    return false;
  }
}

export async function isAuthenticated(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false;
  return verifySessionToken(cookieValue);
}
