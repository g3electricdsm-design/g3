import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

function classifyDevice(ua: string): string {
  if (/mobile|android|iphone|ipod/i.test(ua)) return 'mobile';
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  return 'desktop';
}

function extractHost(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  if (!supabaseAdmin) {
    return new Response(null, { status: 204 });
  }

  try {
    const body = await request.json();
    const { sessionId, path, referrer } = body as {
      sessionId?: string;
      path?: string;
      referrer?: string | null;
    };

    if (
      !sessionId ||
      !path ||
      typeof sessionId !== 'string' ||
      typeof path !== 'string' ||
      sessionId.length > 128 ||
      path.length > 2048
    ) {
      return new Response(null, { status: 204 });
    }

    if (path.startsWith('/admin')) {
      return new Response(null, { status: 204 });
    }

    const ua = request.headers.get('user-agent') || '';

    await supabaseAdmin.from('page_views').insert({
      session_id: sessionId,
      path,
      referrer: typeof referrer === 'string' ? referrer.slice(0, 2048) : null,
      referrer_host: extractHost(typeof referrer === 'string' ? referrer : null),
      device: classifyDevice(ua),
      user_agent: ua.slice(0, 512),
    });
  } catch {
    // swallow — analytics should never break the visitor experience
  }

  return new Response(null, { status: 204 });
}
