import { NextResponse } from 'next/server';
import { supabase, TESTIMONIALS_TABLE } from '@/lib/supabase';

// Hit daily by a Vercel Cron Job (see vercel.json) so the Supabase
// free-tier project registers activity and never auto-pauses.
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: 'Supabase not configured' },
      { status: 500 }
    );
  }

  const { count, error } = await supabase
    .from(TESTIMONIALS_TABLE)
    .select('*', { count: 'exact', head: true });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    testimonials: count,
    pingedAt: new Date().toISOString(),
  });
}
