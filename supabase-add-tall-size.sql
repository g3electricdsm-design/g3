-- Migration: Allow 'tall' as a projects.size value
-- Run this if you already have the projects table created with a size CHECK constraint

-- Drop the existing CHECK constraint (name is typically projects_size_check for inline CHECK)
ALTER TABLE projects
DROP CONSTRAINT IF EXISTS projects_size_check;

-- Re-create CHECK constraint with the new allowed value
ALTER TABLE projects
ADD CONSTRAINT projects_size_check
CHECK (size IN ('small', 'medium', 'large', 'short', 'square', 'tall', 'wide', 'panoramic', 'extraTall'));

