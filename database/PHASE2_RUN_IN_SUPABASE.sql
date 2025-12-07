-- ============================================
-- PHASE 2: Publisher Branches/Locations System
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Create the publisher_branches table
CREATE TABLE IF NOT EXISTS publisher_branches (
  id SERIAL PRIMARY KEY,
  publisher_id INTEGER NOT NULL REFERENCES publishers(id) ON DELETE CASCADE,
  branch_name VARCHAR(255) NOT NULL,
  branch_type VARCHAR(50) DEFAULT 'Office',
  description TEXT,

  -- Address fields
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),

  -- Contact information
  phone VARCHAR(50),
  email VARCHAR(255),

  -- Geolocation for maps
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- Operating hours
  hours_of_operation JSONB,

  -- Branch metadata
  is_main_branch BOOLEAN DEFAULT false,
  branch_icon_url TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT unique_publisher_branch_name UNIQUE (publisher_id, branch_name)
);

-- Step 2: Add table comments
COMMENT ON TABLE publisher_branches IS 'Stores multiple locations/branches for each publisher';
COMMENT ON COLUMN publisher_branches.branch_type IS 'Type of branch: HQ, Office, Warehouse, Bookstore, Distribution Center';
COMMENT ON COLUMN publisher_branches.is_main_branch IS 'Indicates if this is the headquarters or main branch';
COMMENT ON COLUMN publisher_branches.hours_of_operation IS 'Operating hours in JSON format';

-- Step 3: Create indexes
CREATE INDEX idx_branches_publisher ON publisher_branches(publisher_id);
CREATE INDEX idx_branches_type ON publisher_branches(branch_type);
CREATE INDEX idx_branches_main ON publisher_branches(is_main_branch) WHERE is_main_branch = true;
CREATE INDEX idx_branches_location ON publisher_branches(city, country);

-- Step 4: Add updated_at trigger
CREATE TRIGGER update_publisher_branches_updated_at
  BEFORE UPDATE ON publisher_branches
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Step 5: Add branch_type validation
ALTER TABLE publisher_branches
ADD CONSTRAINT check_branch_type
  CHECK (branch_type IN ('HQ', 'Office', 'Warehouse', 'Bookstore', 'Distribution Center', 'Regional Office'));

-- ============================================
-- SEED DATA: Publisher Branches
-- ============================================

-- Penguin Random House Branches
INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, description, address, city, state, country, postal_code, phone, email, latitude, longitude, is_main_branch, hours_of_operation)
SELECT
  id,
  'New York Headquarters',
  'HQ',
  'Global headquarters and main publishing office',
  '1745 Broadway',
  'New York',
  'NY',
  'USA',
  '10019',
  '+1 (212) 782-9000',
  'info@penguinrandomhouse.com',
  40.763611,
  -73.983056,
  true,
  '{"monday": "9:00 AM - 6:00 PM", "tuesday": "9:00 AM - 6:00 PM", "wednesday": "9:00 AM - 6:00 PM", "thursday": "9:00 AM - 6:00 PM", "friday": "9:00 AM - 5:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb
FROM publishers WHERE name = 'Penguin Random House';

INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, description, address, city, state, country, postal_code, latitude, longitude, is_main_branch)
SELECT
  id,
  'London Office',
  'Regional Office',
  'European headquarters and operations',
  '20 Vauxhall Bridge Road',
  'London',
  NULL,
  'UK',
  'SW1V 2SA',
  51.489722,
  -0.133611,
  false
FROM publishers WHERE name = 'Penguin Random House';

INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, address, city, state, country, latitude, longitude, is_main_branch)
SELECT
  id,
  'Toronto Distribution Center',
  'Distribution Center',
  '2775 Matheson Blvd East',
  'Toronto',
  'ON',
  'Canada',
  43.643889,
  -79.605556,
  false
FROM publishers WHERE name = 'Penguin Random House';

-- HarperCollins Publishers Branches
INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, description, address, city, state, country, postal_code, phone, latitude, longitude, is_main_branch, hours_of_operation)
SELECT
  id,
  'New York Headquarters',
  'HQ',
  'Corporate headquarters and main editorial offices',
  '195 Broadway',
  'New York',
  'NY',
  'USA',
  '10007',
  '+1 (212) 207-7000',
  40.710556,
  -74.009722,
  true,
  '{"monday": "8:30 AM - 5:30 PM", "tuesday": "8:30 AM - 5:30 PM", "wednesday": "8:30 AM - 5:30 PM", "thursday": "8:30 AM - 5:30 PM", "friday": "8:30 AM - 5:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb
FROM publishers WHERE name = 'HarperCollins Publishers';

INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, address, city, country, latitude, longitude, is_main_branch)
SELECT
  id,
  'London Office',
  'Regional Office',
  '1 London Bridge Street',
  'London',
  'UK',
  51.505,
  -0.088,
  false
FROM publishers WHERE name = 'HarperCollins Publishers';

INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, address, city, country, latitude, longitude, is_main_branch)
SELECT
  id,
  'Sydney Office',
  'Regional Office',
  '25 Ryde Road',
  'Sydney',
  'Australia',
  -33.868,
  151.209,
  false
FROM publishers WHERE name = 'HarperCollins Publishers';

-- Simon & Schuster Branches
INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, description, address, city, state, country, postal_code, phone, latitude, longitude, is_main_branch, hours_of_operation)
SELECT
  id,
  'New York Headquarters',
  'HQ',
  'Global headquarters and publishing center',
  '1230 Avenue of the Americas',
  'New York',
  'NY',
  'USA',
  '10020',
  '+1 (212) 698-7000',
  40.759722,
  -73.980833,
  true,
  '{"monday": "9:00 AM - 5:00 PM", "tuesday": "9:00 AM - 5:00 PM", "wednesday": "9:00 AM - 5:00 PM", "thursday": "9:00 AM - 5:00 PM", "friday": "9:00 AM - 5:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb
FROM publishers WHERE name = 'Simon & Schuster';

INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, address, city, country, latitude, longitude, is_main_branch)
SELECT
  id,
  'UK Office',
  'Office',
  '1st Floor, 222 Gray''s Inn Road',
  'London',
  'UK',
  51.527,
  -0.117,
  false
FROM publishers WHERE name = 'Simon & Schuster';

-- Scholastic Corporation Branches
INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, description, address, city, state, country, postal_code, phone, latitude, longitude, is_main_branch, hours_of_operation)
SELECT
  id,
  'New York Headquarters',
  'HQ',
  'Corporate headquarters and children''s publishing center',
  '557 Broadway',
  'New York',
  'NY',
  'USA',
  '10012',
  '+1 (212) 343-6100',
  40.723889,
  -73.997778,
  true,
  '{"monday": "9:00 AM - 5:00 PM", "tuesday": "9:00 AM - 5:00 PM", "wednesday": "9:00 AM - 5:00 PM", "thursday": "9:00 AM - 5:00 PM", "friday": "9:00 AM - 5:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb
FROM publishers WHERE name = 'Scholastic Corporation';

INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, address, city, state, country, latitude, longitude, is_main_branch)
SELECT
  id,
  'Jefferson City Warehouse',
  'Warehouse',
  '2931 East McCarty Street',
  'Jefferson City',
  'MO',
  'USA',
  38.576,
  -92.173,
  false
FROM publishers WHERE name = 'Scholastic Corporation';

INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, address, city, country, latitude, longitude, is_main_branch)
SELECT
  id,
  'Toronto Office',
  'Office',
  '175 Hillmount Road',
  'Toronto',
  'Canada',
  43.7,
  -79.4,
  false
FROM publishers WHERE name = 'Scholastic Corporation';

-- Macmillan Publishers Branches
INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, description, address, city, state, country, postal_code, latitude, longitude, is_main_branch, hours_of_operation)
SELECT
  id,
  'New York Office',
  'HQ',
  'US headquarters and publishing operations',
  '120 Broadway',
  'New York',
  'NY',
  'USA',
  '10271',
  40.708889,
  -74.010278,
  true,
  '{"monday": "9:00 AM - 5:30 PM", "tuesday": "9:00 AM - 5:30 PM", "wednesday": "9:00 AM - 5:30 PM", "thursday": "9:00 AM - 5:30 PM", "friday": "9:00 AM - 5:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb
FROM publishers WHERE name = 'Macmillan Publishers';

INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, address, city, country, latitude, longitude, is_main_branch)
SELECT
  id,
  'London Headquarters',
  'HQ',
  'The Macmillan Campus, 4 Crinan Street',
  'London',
  'UK',
  51.536,
  -0.117,
  false
FROM publishers WHERE name = 'Macmillan Publishers';

-- Hachette Book Group Branches
INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, description, address, city, state, country, postal_code, phone, latitude, longitude, is_main_branch, hours_of_operation)
SELECT
  id,
  'New York Headquarters',
  'HQ',
  'US headquarters and main offices',
  '1290 Avenue of the Americas',
  'New York',
  'NY',
  'USA',
  '10104',
  '+1 (212) 364-1100',
  40.761667,
  -73.981389,
  true,
  '{"monday": "9:00 AM - 5:00 PM", "tuesday": "9:00 AM - 5:00 PM", "wednesday": "9:00 AM - 5:00 PM", "thursday": "9:00 AM - 5:00 PM", "friday": "9:00 AM - 5:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb
FROM publishers WHERE name = 'Hachette Book Group';

INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, address, city, state, country, latitude, longitude, is_main_branch)
SELECT
  id,
  'Nashville Office',
  'Office',
  '12 Cadillac Drive, Suite 480',
  'Nashville',
  'TN',
  'USA',
  36.16,
  -86.78,
  false
FROM publishers WHERE name = 'Hachette Book Group';

-- Oxford University Press Branches
INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, description, address, city, country, postal_code, latitude, longitude, is_main_branch, hours_of_operation)
SELECT
  id,
  'Oxford Headquarters',
  'HQ',
  'Global headquarters and main publishing house',
  'Great Clarendon Street',
  'Oxford',
  'UK',
  'OX2 6DP',
  51.754,
  -1.254,
  true,
  '{"monday": "9:00 AM - 5:00 PM", "tuesday": "9:00 AM - 5:00 PM", "wednesday": "9:00 AM - 5:00 PM", "thursday": "9:00 AM - 5:00 PM", "friday": "9:00 AM - 5:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb
FROM publishers WHERE name = 'Oxford University Press';

INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, address, city, state, country, latitude, longitude, is_main_branch)
SELECT
  id,
  'New York Office',
  'Office',
  '198 Madison Avenue',
  'New York',
  'NY',
  'USA',
  40.746,
  -73.984,
  false
FROM publishers WHERE name = 'Oxford University Press';

-- Cambridge University Press Branches
INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, description, address, city, country, postal_code, latitude, longitude, is_main_branch, hours_of_operation)
SELECT
  id,
  'Cambridge Headquarters',
  'HQ',
  'Historic headquarters and main publishing center',
  'University Printing House, Shaftesbury Road',
  'Cambridge',
  'UK',
  'CB2 8BS',
  52.205,
  0.122,
  true,
  '{"monday": "9:00 AM - 5:00 PM", "tuesday": "9:00 AM - 5:00 PM", "wednesday": "9:00 AM - 5:00 PM", "thursday": "9:00 AM - 5:00 PM", "friday": "9:00 AM - 5:00 PM", "saturday": "Closed", "sunday": "Closed"}'::jsonb
FROM publishers WHERE name = 'Cambridge University Press';

INSERT INTO publisher_branches (publisher_id, branch_name, branch_type, address, city, state, country, latitude, longitude, is_main_branch)
SELECT
  id,
  'New York Office',
  'Office',
  '1 Liberty Plaza, Floor 20',
  'New York',
  'NY',
  'USA',
  40.709,
  -74.012,
  false
FROM publishers WHERE name = 'Cambridge University Press';

-- ============================================
-- VERIFICATION QUERIES
-- Run these to verify the migration succeeded
-- ============================================

-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'publisher_branches'
ORDER BY ordinal_position;

-- Verify branches were created
SELECT
  p.name as publisher,
  COUNT(pb.id) as branch_count,
  STRING_AGG(pb.branch_name, ', ' ORDER BY pb.is_main_branch DESC) as branches
FROM publishers p
LEFT JOIN publisher_branches pb ON p.id = pb.publisher_id
WHERE p.name IN (
  'Penguin Random House',
  'HarperCollins Publishers',
  'Simon & Schuster',
  'Scholastic Corporation',
  'Macmillan Publishers',
  'Hachette Book Group',
  'Oxford University Press',
  'Cambridge University Press'
)
GROUP BY p.name
ORDER BY p.name;

-- Check all branches with details
SELECT
  p.name as publisher_name,
  pb.branch_name,
  pb.branch_type,
  pb.city,
  pb.country,
  pb.is_main_branch
FROM publisher_branches pb
JOIN publishers p ON pb.publisher_id = p.id
ORDER BY p.name, pb.is_main_branch DESC, pb.branch_name;
