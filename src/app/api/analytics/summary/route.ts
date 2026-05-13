import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

interface PageViewRow {
  created_at: string;
  session_id: string;
  path: string;
  referrer_host: string | null;
}

const OWN_HOSTS = ['g3electricdsm.com', 'www.g3electricdsm.com', 'localhost'];

export async function GET(request: NextRequest) {
  const isAuth = request.cookies.get('admin_authenticated')?.value === 'true';
  const ts = request.cookies.get('admin_timestamp')?.value;
  if (!isAuth || !ts || Date.now() - parseInt(ts) > 24 * 60 * 60 * 1000) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const daysParam = request.nextUrl.searchParams.get('days');
  const days = [30, 60, 90].includes(Number(daysParam)) ? Number(daysParam) : 30;

  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabaseAdmin
    .from('page_views')
    .select('created_at, session_id, path, referrer_host')
    .gte('created_at', since.toISOString())
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const allRows = (data ?? []) as PageViewRow[];

  const formRows = allRows.filter((r) => r.path === '/__form_submit');
  const rows = allRows.filter((r) => r.path !== '/__form_submit');

  const pageViews = rows.length;
  const totalFormSubmissions = formRows.length;

  const sessionSet = new Set<string>();
  const sessionPages = new Map<string, number>();
  const pathCounts = new Map<string, number>();
  const refCounts = new Map<string, number>();
  const dailyMap = new Map<string, { views: number; sessions: Set<string>; forms: number }>();

  for (const row of rows) {
    sessionSet.add(row.session_id);
    sessionPages.set(row.session_id, (sessionPages.get(row.session_id) || 0) + 1);
    pathCounts.set(row.path, (pathCounts.get(row.path) || 0) + 1);

    const host = row.referrer_host;
    const refLabel =
      !host || OWN_HOSTS.includes(host) ? null : host;
    if (refLabel) {
      refCounts.set(refLabel, (refCounts.get(refLabel) || 0) + 1);
    }

    const dateKey = row.created_at.slice(0, 10);
    if (!dailyMap.has(dateKey)) {
      dailyMap.set(dateKey, { views: 0, sessions: new Set(), forms: 0 });
    }
    const day = dailyMap.get(dateKey)!;
    day.views++;
    day.sessions.add(row.session_id);
  }

  for (const row of formRows) {
    const dateKey = row.created_at.slice(0, 10);
    if (!dailyMap.has(dateKey)) {
      dailyMap.set(dateKey, { views: 0, sessions: new Set(), forms: 0 });
    }
    dailyMap.get(dateKey)!.forms++;
  }

  const sessions = sessionSet.size;
  let bounces = 0;
  for (const count of sessionPages.values()) {
    if (count === 1) bounces++;
  }
  const bounceRate = sessions > 0 ? Math.round((bounces / sessions) * 100) : 0;
  const avgPages = sessions > 0 ? Math.round((pageViews / sessions) * 10) / 10 : 0;

  // Zero-fill daily series
  const daily: { date: string; views: number; sessions: number; forms: number }[] = [];
  const cursor = new Date(since);
  const today = new Date();
  while (cursor <= today) {
    const key = cursor.toISOString().slice(0, 10);
    const entry = dailyMap.get(key);
    daily.push({
      date: key,
      views: entry?.views ?? 0,
      sessions: entry?.sessions.size ?? 0,
      forms: entry?.forms ?? 0,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  const topPages = [...pathCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, count]) => ({ path, count }));

  const topReferrers = [...refCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([host, count]) => ({ host, count }));

  return NextResponse.json({
    pageViews,
    sessions,
    bounceRate,
    avgPages,
    formSubmissions: totalFormSubmissions,
    daily,
    topPages,
    topReferrers,
  });
}
