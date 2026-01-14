-- Complete Supabase Setup Script for Projects
-- Run this entire script in Supabase SQL Editor

-- Step 1: Create the projects table
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
  size TEXT NOT NULL CHECK (size IN ('small', 'medium', 'large')),
  slug TEXT,
  seo_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_id ON projects(id);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- Step 3: Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access" ON projects;
DROP POLICY IF EXISTS "Allow public insert" ON projects;
DROP POLICY IF EXISTS "Allow public update" ON projects;
DROP POLICY IF EXISTS "Allow public delete" ON projects;

-- Step 5: Create RLS policies
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert" ON projects
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update" ON projects
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete" ON projects
  FOR DELETE
  USING (true);

-- Step 6: Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 7: Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 8: Clear existing data (optional - comment out if you want to keep existing data)
-- TRUNCATE TABLE projects RESTART IDENTITY CASCADE;

-- Step 9: Insert default projects
INSERT INTO projects (id, title, category, type, image, description, client, location, services, challenges, size) VALUES
(1, 'Modern Kitchen Lighting', 'Residential', 'Lighting', '/images/portfolio/modern-kitchen-lighting.jpg', 'Custom LED under-cabinet lighting installation', 'Johnson Family', 'Des Moines, IA', '["LED Installation", "Under-cabinet Lighting", "Pendant Light Installation", "Recessed Lighting", "Smart Switch Integration"]'::jsonb, 'Working around existing cabinetry and ensuring proper electrical load distribution', 'large'),
(2, 'Office Building Wiring', 'Commercial', 'New Build', '/images/portfolio/office-building-wiring.jpg', 'Complete electrical infrastructure for new office complex', 'Metro Business Center', 'Cedar Rapids, IA', '["Main Service Installation", "Panel Installation", "Office Circuit Wiring", "AV System Integration", "Emergency Lighting", "Fire Safety Systems"]'::jsonb, 'Coordinating with multiple contractors and meeting strict commercial building codes', 'large'),
(3, 'Smart Home Integration', 'Residential', 'Outlets & Controls', '/images/portfolio/smart-home-integration.jpg', 'Smart switches and outlet installation throughout home', 'Smith Residence', 'Iowa City, IA', '["Smart Switch Installation", "Smart Outlet Installation", "Home Automation Wiring", "Security System Integration", "Audio System Wiring"]'::jsonb, 'Integrating with existing electrical systems while maintaining home aesthetics', 'medium'),
(4, 'Retail Store Lighting', 'Commercial', 'Lighting', '/images/portfolio/retail-store-lighting.jpg', 'Energy-efficient LED lighting for retail space', 'Boutique Fashion Store', 'Davenport, IA', '["Track Lighting Installation", "Display Case Lighting", "Ambient Lighting", "Smart Controls", "Energy Management"]'::jsonb, 'Maintaining consistent lighting levels while highlighting merchandise effectively', 'small'),
(5, 'Ceiling Fan Installation', 'Residential', 'Fans', '/images/portfolio/smart-home-integration.jpg', 'Multiple ceiling fan installations with smart controls', 'Williams Family', 'Ames, IA', '["Ceiling Fan Installation", "Smart Control Integration", "Electrical Box Upgrades", "Remote Control Setup"]'::jsonb, 'Installing fans in rooms with limited ceiling access and ensuring proper support', 'small'),
(6, 'Restaurant Electrical', 'Commercial', 'New Build', '/images/portfolio/office-building-wiring.jpg', 'Complete electrical system for new restaurant build', 'Bella Vista Restaurant', 'Des Moines, IA', '["Kitchen Equipment Circuits", "Dining Room Lighting", "Bar Electrical", "Outdoor Lighting", "Emergency Systems", "Fire Suppression Integration"]'::jsonb, 'Meeting commercial kitchen electrical codes and coordinating with kitchen equipment installation', 'large'),
(7, 'Outdoor Lighting System', 'Residential', 'Lighting', '/images/portfolio/retail-store-lighting.jpg', 'Landscape and security lighting installation', 'Thompson Residence', 'West Des Moines, IA', '["Landscape Lighting", "Security Lighting", "Motion Sensors", "Smart Controls", "Weatherproof Installation"]'::jsonb, 'Working with existing landscaping and ensuring weatherproof connections', 'medium'),
(8, 'Warehouse Lighting', 'Commercial', 'Lighting', '/images/portfolio/manufacturing-plant-upgrade.jpg', 'High-bay LED lighting for industrial warehouse', 'Midwest Distribution Center', 'Cedar Falls, IA', '["High-bay LED Installation", "Electrical Panel Upgrades", "Motion Sensor Integration", "Emergency Lighting", "Energy Management"]'::jsonb, 'Working around ongoing warehouse operations and managing high-voltage electrical work', 'small'),
(9, 'Historic Home Rewiring', 'Residential', 'Rewiring', '/images/portfolio/historic-home-rewiring.jpg', 'Complete electrical rewiring of 1920s historic home', 'Historic Preservation Society', 'Dubuque, IA', '["Complete Rewiring", "Panel Upgrades", "Historic Fixture Restoration", "Code Compliance", "Safety Inspection"]'::jsonb, 'Working around historic features and meeting both preservation and safety requirements', 'large'),
(10, 'Medical Office Electrical', 'Commercial', 'New Build', '/images/portfolio/medical-office-electrical.jpg', 'Specialized electrical systems for medical practice', 'Des Moines Medical Group', 'Des Moines, IA', '["Medical Equipment Circuits", "Emergency Power Systems", "Specialized Lighting", "Code Compliance", "Safety Systems"]'::jsonb, 'Meeting strict healthcare electrical codes and coordinating with medical equipment installation', 'medium'),
(11, 'Pool & Spa Electrical', 'Residential', 'Outdoor', '/images/portfolio/pool-spa-electrical.jpg', 'Pool and spa electrical installation with safety systems', 'Miller Family', 'West Des Moines, IA', '["Pool Equipment Wiring", "Safety Systems", "Outdoor Lighting", "GFCI Protection", "Smart Controls"]'::jsonb, 'Ensuring proper grounding and bonding for pool safety and working in wet conditions', 'medium'),
(12, 'Manufacturing Plant Upgrade', 'Commercial', 'Industrial', '/images/portfolio/manufacturing-plant-upgrade.jpg', 'Electrical system upgrade for manufacturing facility', 'Iowa Manufacturing Co.', 'Waterloo, IA', '["Power Distribution Upgrades", "Panel Installation", "Heavy Machinery Circuits", "Safety Systems", "Emergency Power"]'::jsonb, 'Working around production schedules and managing high-voltage electrical work in industrial environment', 'large'),
(13, 'Home Theater Installation', 'Residential', 'Entertainment', '/images/portfolio/home-theater-installation.jpg', 'Complete home theater electrical and AV installation', 'Entertainment Enthusiast', 'Cedar Rapids, IA', '["Dedicated Circuits", "AV System Wiring", "Smart Lighting", "Sound System Integration", "Home Automation"]'::jsonb, 'Managing electrical noise and ensuring clean power for sensitive audio equipment', 'small'),
(14, 'Church Lighting Renovation', 'Commercial', 'Lighting', '/images/portfolio/church-lighting-renovation.jpg', 'Historic church lighting restoration and modernization', 'First Methodist Church', 'Iowa City, IA', '["Historic Fixture Restoration", "LED Conversion", "Accent Lighting", "Dimming Controls", "Energy Management"]'::jsonb, 'Balancing modern efficiency with historic preservation requirements', 'medium'),
(15, 'EV Charging Station', 'Residential', 'EV Infrastructure', '/images/portfolio/ev-charging-station.jpg', 'Home electric vehicle charging station installation', 'Green Energy Family', 'Ames, IA', '["240V Circuit Installation", "EV Charger Mounting", "Smart Controls", "Panel Integration", "Safety Systems"]'::jsonb, 'Ensuring proper electrical capacity and safety for high-power EV charging', 'small')
ON CONFLICT (id) DO NOTHING;

-- Step 10: Reset the sequence to continue from the highest ID
SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));

-- Done! Your projects table is now set up with default data.
-- You can verify by running: SELECT * FROM projects;
