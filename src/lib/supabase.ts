import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// These environment variables should be set in Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Log status (only in development)
if (process.env.NODE_ENV === 'development') {
  if (supabase) {
    console.log('✅ Supabase client initialized');
  } else {
    console.warn('⚠️  Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
}

// Table name for projects
export const PROJECTS_TABLE = 'projects';
