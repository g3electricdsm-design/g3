-- Analytics: page_views table
-- Run this in the Supabase SQL Editor once.

CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer TEXT,
  referrer_host TEXT,
  device TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views (created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views (session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views (path);

-- RLS enabled with NO public policies.
-- All inserts/reads go through the service-role key server-side.
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
