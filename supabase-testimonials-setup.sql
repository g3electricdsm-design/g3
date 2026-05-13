-- Supabase Setup Script for Testimonials
-- Run this entire script in the Supabase SQL Editor

-- Step 1: Create the testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  project TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  image_mode TEXT NOT NULL DEFAULT 'single' CHECK (image_mode IN ('single', 'before-after')),
  image TEXT,
  image2 TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_testimonials_id ON testimonials(id);

-- Step 3: Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access" ON testimonials;
DROP POLICY IF EXISTS "Allow public insert" ON testimonials;
DROP POLICY IF EXISTS "Allow public update" ON testimonials;
DROP POLICY IF EXISTS "Allow public delete" ON testimonials;

-- Step 5: Create RLS policies
CREATE POLICY "Allow public read access" ON testimonials
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert" ON testimonials
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update" ON testimonials
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete" ON testimonials
  FOR DELETE
  USING (true);

-- Step 6: Create the update_updated_at_column function (idempotent)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 7: Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 8: Insert default testimonials
INSERT INTO testimonials (id, name, location, project, rating, title, text, image_mode) VALUES
(1, 'Nick', 'Waukee, IA', 'Windstorm client', 5, 'Windstorm Emergency Response', 'Austin & Lacey at G3 turned what would have been a nightmare into a dream. We had a 75-year-old tree fall onto our garage from a wind storm, and he was there to provide estimates by the end of the day. Throughout the entirety of the project, he kept in constant communication with our roofing contractors and included us in all design decisions. Dependable, safe, and fast are what you need in an electrical professional; G3 is all three.', 'single'),
(2, 'Sarah Johnson', 'West Des Moines, IA', 'Kitchen Lighting Installation', 5, 'Kitchen Lighting Transformation', 'G3 Electric transformed our kitchen with beautiful LED lighting. The team was professional, punctual, and the quality of work exceeded our expectations. Highly recommend their services!', 'single'),
(3, 'Mike Thompson', 'Des Moines, IA', 'Electrical Panel Upgrade', 5, 'Electrical Panel Upgrade', 'Outstanding work on our electrical panel upgrade. The electricians were knowledgeable, clean, and explained everything clearly. Our home is now safer and more efficient. Thank you G3 Electric!', 'single'),
(4, 'Lisa Chen', 'Ankeny, IA', 'Smart Home Installation', 5, 'Smart Home Integration', 'G3 Electric made our smart home dreams a reality. They installed smart switches, outlets, and integrated everything seamlessly. The team was patient and answered all our questions. Excellent service!', 'single'),
(5, 'Jennifer Davis', 'Johnston, IA', 'Emergency Electrical Repair', 5, 'Weekend Emergency, Handled Fast', 'When our electrical panel failed on a weekend, G3 Electric responded quickly and fixed the issue professionally. Their emergency service is top-notch. We''re grateful for their prompt and reliable service.', 'single'),
(6, 'David Wilson', 'Clive, IA', 'Outdoor Lighting System', 5, 'Outdoor Lighting System', 'The outdoor lighting system G3 Electric installed has enhanced both the security and beauty of our property. The work was done efficiently and the results are stunning. Highly professional team!', 'single')
ON CONFLICT (id) DO NOTHING;

-- Step 9: Reset the sequence to continue from the highest ID
SELECT setval('testimonials_id_seq', (SELECT MAX(id) FROM testimonials));

-- Done! Your testimonials table is now set up with default data.
-- Verify by running: SELECT * FROM testimonials;
