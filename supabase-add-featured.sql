-- Migration: Add featured column to projects table
-- Run this if you use Supabase and want to persist "Featured project"

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

UPDATE projects
SET featured = false
WHERE featured IS NULL;
