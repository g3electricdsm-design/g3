#!/usr/bin/env node

/**
 * Supabase Keep-Alive Script
 *
 * Performs a minimal read against the Supabase database to prevent
 * the free-tier project from being paused due to inactivity.
 *
 * Usage:
 *   NEXT_PUBLIC_SUPABASE_URL=<url> NEXT_PUBLIC_SUPABASE_ANON_KEY=<key> node scripts/keep-alive.js
 *
 * Recommended: run via a cron job (e.g. GitHub Actions) every 5–6 days.
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function ping() {
  const start = Date.now();

  const { data, error } = await supabase
    .from('projects')
    .select('id')
    .limit(1);

  const elapsed = Date.now() - start;

  if (error) {
    console.error(`[keep-alive] Query failed after ${elapsed}ms:`, error.message);
    process.exit(1);
  }

  const rowCount = Array.isArray(data) ? data.length : 0;
  console.log(`[keep-alive] OK — ${rowCount} row(s) returned in ${elapsed}ms (${new Date().toISOString()})`);
}

ping();
