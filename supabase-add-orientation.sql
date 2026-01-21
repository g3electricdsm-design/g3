-- Migration: Add orientation column to projects table
-- Run this if you already have the projects table set up

-- Add orientation column if it doesn't exist
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS orientation TEXT CHECK (orientation IN ('portrait', 'landscape')) DEFAULT 'landscape';

-- Update existing rows to have landscape as default
UPDATE projects 
SET orientation = 'landscape' 
WHERE orientation IS NULL;
