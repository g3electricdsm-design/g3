-- Supabase Migration Script for Projects Table
-- Run this in Supabase SQL Editor to create the projects table

-- Create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Residential', 'Commercial')),
  type TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  overview TEXT,
  client TEXT NOT NULL,
  location TEXT NOT NULL,
  services JSONB NOT NULL DEFAULT '[]'::jsonb,
  challenges TEXT NOT NULL,
  size TEXT NOT NULL CHECK (size IN ('small', 'medium', 'large', 'short', 'square', 'tall', 'wide', 'panoramic', 'extraTall')),
  slug TEXT,
  "seoTitle" TEXT,
  "metaDescription" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

-- Create index on id for faster lookups
CREATE INDEX IF NOT EXISTS idx_projects_id ON projects(id);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT
  USING (true);

-- Create policy to allow public insert (for admin)
CREATE POLICY "Allow public insert" ON projects
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow public update (for admin)
CREATE POLICY "Allow public update" ON projects
  FOR UPDATE
  USING (true);

-- Create policy to allow public delete (for admin)
CREATE POLICY "Allow public delete" ON projects
  FOR DELETE
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Insert default projects (uncomment if you want to seed the database)
-- You can copy the default projects from src/data/projects.ts and format them as INSERT statements
