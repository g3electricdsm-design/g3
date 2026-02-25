-- Run this in Supabase SQL Editor to fix "Error uploading images" for gallery/main image uploads.
-- The upload API uses the anon key, so the bucket needs policies that allow insert and public read.

-- 1. Allow uploads (insert) into the project-images bucket (anon key used by the API)
CREATE POLICY "Allow uploads to project-images"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'project-images');

-- 2. Allow public read so image URLs work on the site
CREATE POLICY "Allow public read project-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-images');

-- If you get "policy already exists", drop it first, e.g.:
-- DROP POLICY IF EXISTS "Allow uploads to project-images" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow public read project-images" ON storage.objects;
