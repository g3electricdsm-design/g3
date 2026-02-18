-- Add gallery column to projects table
-- Run this in the Supabase SQL Editor once

ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery JSONB DEFAULT '[]'::jsonb;
