-- =============================================================================
-- COMPLETE MIGRATION SCRIPT FOR PHASE 1: PUBLISHER BRANDING
-- =============================================================================
-- Run this entire file in your Supabase SQL Editor
-- Dashboard URL: https://supabase.com/dashboard/project/tmytkcwtghcexpdbudki/sql
-- =============================================================================

-- STEP 1: Add new columns to publishers table
-- =============================================================================

ALTER TABLE publishers
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS banner_url TEXT,
ADD COLUMN IF NOT EXISTS brand_color_primary VARCHAR(7),
ADD COLUMN IF NOT EXISTS brand_color_secondary VARCHAR(7),
ADD COLUMN IF NOT EXISTS tagline VARCHAR(255),
ADD COLUMN IF NOT EXISTS mission_statement TEXT,
ADD COLUMN IF NOT EXISTS specialties TEXT[],
ADD COLUMN IF NOT EXISTS awards TEXT[],
ADD COLUMN IF NOT EXISTS notable_authors TEXT[],
ADD COLUMN IF NOT EXISTS business_hours JSONB,
ADD COLUMN IF NOT EXISTS social_twitter VARCHAR(255),
ADD COLUMN IF NOT EXISTS social_linkedin VARCHAR(255),
ADD COLUMN IF NOT EXISTS social_instagram VARCHAR(255),
ADD COLUMN IF NOT EXISTS social_facebook VARCHAR(255),
ADD COLUMN IF NOT EXISTS social_youtube VARCHAR(255);

-- Add column comments for documentation
COMMENT ON COLUMN publishers.logo_url IS 'URL to publisher logo image (stored in Supabase Storage)';
COMMENT ON COLUMN publishers.banner_url IS 'URL to publisher banner/cover image';
COMMENT ON COLUMN publishers.brand_color_primary IS 'Primary brand color in hex format (#RRGGBB)';
COMMENT ON COLUMN publishers.brand_color_secondary IS 'Secondary brand color in hex format (#RRGGBB)';
COMMENT ON COLUMN publishers.tagline IS 'Short tagline or motto for the publisher';
COMMENT ON COLUMN publishers.mission_statement IS 'Publisher mission and vision statement';
COMMENT ON COLUMN publishers.specialties IS 'Array of publishing specialties (genres, topics)';
COMMENT ON COLUMN publishers.awards IS 'Array of awards and achievements';
COMMENT ON COLUMN publishers.notable_authors IS 'Featured authors published by this publisher';
COMMENT ON COLUMN publishers.business_hours IS 'Operating hours in JSON format';
COMMENT ON COLUMN publishers.social_twitter IS 'Twitter/X profile URL or handle';
COMMENT ON COLUMN publishers.social_linkedin IS 'LinkedIn company page URL';
COMMENT ON COLUMN publishers.social_instagram IS 'Instagram profile URL or handle';
COMMENT ON COLUMN publishers.social_facebook IS 'Facebook page URL';
COMMENT ON COLUMN publishers.social_youtube IS 'YouTube channel URL';

-- Create index for active publishers
CREATE INDEX IF NOT EXISTS idx_publishers_active ON publishers(is_active) WHERE is_active = true;

-- Add validation check for hex color format
ALTER TABLE publishers
DROP CONSTRAINT IF EXISTS check_brand_color_primary_format,
DROP CONSTRAINT IF EXISTS check_brand_color_secondary_format;

ALTER TABLE publishers
ADD CONSTRAINT check_brand_color_primary_format
  CHECK (brand_color_primary IS NULL OR brand_color_primary ~ '^#[0-9A-Fa-f]{6}$'),
ADD CONSTRAINT check_brand_color_secondary_format
  CHECK (brand_color_secondary IS NULL OR brand_color_secondary ~ '^#[0-9A-Fa-f]{6}$');

-- =============================================================================
-- STEP 2: Populate sample branding data for existing publishers
-- =============================================================================

-- Update Penguin Random House
UPDATE publishers
SET
  logo_url = 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Penguin_Random_House_logo.svg/1200px-Penguin_Random_House_logo.svg.png',
  brand_color_primary = '#FF6B00',
  brand_color_secondary = '#000000',
  tagline = 'Where Stories Live',
  mission_statement = 'We are committed to publishing great books, discovering and nurturing writers, and serving readers with stories and ideas that inform, entertain, and inspire.',
  specialties = ARRAY['Fiction', 'Non-Fiction', 'Children''s Books', 'Literary Fiction', 'Business Books'],
  awards = ARRAY['Pulitzer Prize Winners', 'National Book Award Winners', 'Man Booker Prize Winners'],
  notable_authors = ARRAY['Barack Obama', 'John Grisham', 'Dan Brown', 'Michelle Obama', 'Colleen Hoover'],
  social_twitter = 'https://twitter.com/penguinrandom',
  social_linkedin = 'https://www.linkedin.com/company/penguin-random-house',
  social_instagram = 'https://www.instagram.com/penguinrandomhouse',
  social_facebook = 'https://www.facebook.com/penguinrandomhouse',
  social_youtube = 'https://www.youtube.com/user/randomhouse'
WHERE name = 'Penguin Random House';

-- Update HarperCollins Publishers
UPDATE publishers
SET
  logo_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/HarperCollins_logo.svg/1200px-HarperCollins_logo.svg.png',
  brand_color_primary = '#E31C23',
  brand_color_secondary = '#000000',
  tagline = 'Stories That Matter',
  mission_statement = 'HarperCollins focuses on storytelling that sparks conversation, transforms culture, and inspires readers.',
  specialties = ARRAY['Literary Fiction', 'Romance', 'Thrillers', 'Christian Books', 'Self-Help'],
  awards = ARRAY['Multiple Pulitzer Winners', 'Nobel Prize Authors', 'National Book Critics Circle Awards'],
  notable_authors = ARRAY['Agatha Christie', 'J.R.R. Tolkien', 'C.S. Lewis', 'Harper Lee', 'Shel Silverstein'],
  social_twitter = 'https://twitter.com/HarperCollins',
  social_linkedin = 'https://www.linkedin.com/company/harpercollins',
  social_instagram = 'https://www.instagram.com/harpercollins',
  social_facebook = 'https://www.facebook.com/HarperCollinsPublishers',
  social_youtube = 'https://www.youtube.com/user/HarperCollinsUS'
WHERE name = 'HarperCollins Publishers';

-- Update Simon & Schuster
UPDATE publishers
SET
  logo_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Simon_%26_Schuster_logo.svg/1200px-Simon_%26_Schuster_logo.svg.png',
  brand_color_primary = '#003DA5',
  brand_color_secondary = '#0066CC',
  tagline = 'A CBS Company',
  mission_statement = 'Simon & Schuster publishes award-winning books that entertain, educate, inform, and inspire readers of all ages.',
  specialties = ARRAY['Biography', 'History', 'Politics', 'Business', 'Self-Help'],
  awards = ARRAY['Pulitzer Prize', 'National Book Award', 'PEN/Faulkner Award'],
  notable_authors = ARRAY['Stephen King', 'Walter Isaacson', 'Bob Woodward', 'Doris Kearns Goodwin'],
  social_twitter = 'https://twitter.com/SimonBooks',
  social_linkedin = 'https://www.linkedin.com/company/simon-and-schuster',
  social_instagram = 'https://www.instagram.com/simonbooks',
  social_facebook = 'https://www.facebook.com/SimonandSchuster'
WHERE name = 'Simon & Schuster';

-- Update Macmillan Publishers
UPDATE publishers
SET
  brand_color_primary = '#8B0000',
  brand_color_secondary = '#DC143C',
  tagline = 'Publishers of Books for Everyone',
  mission_statement = 'Macmillan Publishers is dedicated to creating exceptional reading experiences across all genres and formats.',
  specialties = ARRAY['Science Fiction', 'Fantasy', 'Young Adult', 'Academic', 'Educational'],
  awards = ARRAY['Hugo Award Winners', 'Nebula Award Winners', 'Newbery Medal'],
  notable_authors = ARRAY['Brandon Sanderson', 'Patrick Rothfuss', 'John Scalzi', 'N.K. Jemisin'],
  social_twitter = 'https://twitter.com/MacmillanUSA',
  social_linkedin = 'https://www.linkedin.com/company/macmillan-publishers',
  social_instagram = 'https://www.instagram.com/macmillanusa',
  social_facebook = 'https://www.facebook.com/MacmillanUSA'
WHERE name = 'Macmillan Publishers';

-- Update Scholastic Corporation
UPDATE publishers
SET
  brand_color_primary = '#FF0000',
  brand_color_secondary = '#FFD700',
  tagline = 'The Most Trusted Name in Learning',
  mission_statement = 'Scholastic encourages the intellectual and personal growth of all children, beginning with literacy.',
  specialties = ARRAY['Children''s Books', 'Young Adult', 'Educational Materials', 'Book Fairs', 'Graphic Novels'],
  awards = ARRAY['Caldecott Medal', 'Newbery Medal', 'Coretta Scott King Award'],
  notable_authors = ARRAY['J.K. Rowling', 'Suzanne Collins', 'Dav Pilkey', 'R.L. Stine', 'Jeff Kinney'],
  social_twitter = 'https://twitter.com/Scholastic',
  social_linkedin = 'https://www.linkedin.com/company/scholastic',
  social_instagram = 'https://www.instagram.com/scholastic',
  social_facebook = 'https://www.facebook.com/scholastic',
  social_youtube = 'https://www.youtube.com/user/scholasticinc'
WHERE name = 'Scholastic Corporation';

-- Update Hachette Book Group
UPDATE publishers
SET
  brand_color_primary = '#1E3A8A',
  brand_color_secondary = '#3B82F6',
  tagline = 'Publishing That Makes a Difference',
  mission_statement = 'Hachette Book Group publishes books that challenge, inspire, and entertain readers of all backgrounds.',
  specialties = ARRAY['Literary Fiction', 'Mystery', 'Thriller', 'Romance', 'Young Adult'],
  awards = ARRAY['Edgar Awards', 'Hugo Awards', 'Rita Awards'],
  notable_authors = ARRAY['James Patterson', 'David Baldacci', 'Malcolm Gladwell', 'Nicholas Sparks'],
  social_twitter = 'https://twitter.com/HachetteUS',
  social_linkedin = 'https://www.linkedin.com/company/hachette-book-group',
  social_instagram = 'https://www.instagram.com/hachetteus',
  social_facebook = 'https://www.facebook.com/HachetteBookGroup'
WHERE name = 'Hachette Book Group';

-- Update Oxford University Press
UPDATE publishers
SET
  brand_color_primary = '#002147',
  brand_color_secondary = '#7BAFD4',
  tagline = 'Furthering the University''s Objective of Excellence',
  mission_statement = 'Oxford University Press advances knowledge and learning through the highest quality scholarship and research.',
  specialties = ARRAY['Academic', 'Reference', 'Dictionaries', 'Textbooks', 'Research Journals'],
  awards = ARRAY['PROSE Awards', 'AAP Awards', 'R.R. Hawkins Award'],
  notable_authors = ARRAY['C.S. Lewis', 'J.R.R. Tolkien', 'Richard Dawkins', 'Stephen Hawking'],
  social_twitter = 'https://twitter.com/OUPAcademic',
  social_linkedin = 'https://www.linkedin.com/company/oxford-university-press',
  social_instagram = 'https://www.instagram.com/oupacademic',
  social_facebook = 'https://www.facebook.com/OUP.USA'
WHERE name = 'Oxford University Press';

-- Update Cambridge University Press
UPDATE publishers
SET
  brand_color_primary = '#A32C37',
  brand_color_secondary = '#003D5B',
  tagline = 'Unlocking People''s Potential',
  mission_statement = 'Cambridge University Press advances learning, knowledge and research worldwide through its publications.',
  specialties = ARRAY['Academic Publishing', 'Educational Resources', 'Research Journals', 'English Language Teaching'],
  awards = ARRAY['Scholarly Publishing Awards', 'Professional and Scholarly Excellence Awards'],
  notable_authors = ARRAY['Isaac Newton', 'Charles Darwin', 'Stephen Hawking', 'Bertrand Russell'],
  social_twitter = 'https://twitter.com/CambridgeUP',
  social_linkedin = 'https://www.linkedin.com/company/cambridge-university-press',
  social_instagram = 'https://www.instagram.com/cambridgeuniversitypress',
  social_facebook = 'https://www.facebook.com/CambridgeUniversityPress'
WHERE name = 'Cambridge University Press';

-- Add sample business hours for some publishers
UPDATE publishers
SET business_hours = '{
  "monday": "9:00 AM - 5:00 PM",
  "tuesday": "9:00 AM - 5:00 PM",
  "wednesday": "9:00 AM - 5:00 PM",
  "thursday": "9:00 AM - 5:00 PM",
  "friday": "9:00 AM - 5:00 PM",
  "saturday": "Closed",
  "sunday": "Closed"
}'::jsonb
WHERE name IN ('Penguin Random House', 'HarperCollins Publishers', 'Simon & Schuster');

-- =============================================================================
-- STEP 3: Verify the migration
-- =============================================================================

-- Check that new columns exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'publishers'
  AND column_name IN ('logo_url', 'brand_color_primary', 'social_twitter', 'specialties')
ORDER BY column_name;

-- Check publisher data
SELECT
  name,
  tagline,
  brand_color_primary,
  COALESCE(array_length(specialties, 1), 0) as specialty_count,
  COALESCE(array_length(notable_authors, 1), 0) as author_count
FROM publishers
WHERE tagline IS NOT NULL
ORDER BY name;

-- =============================================================================
-- MIGRATION COMPLETE!
-- =============================================================================
-- You should see:
-- 1. Four columns listed (logo_url, brand_color_primary, social_twitter, specialties)
-- 2. Eight publishers with taglines, brand colors, and populated arrays
-- =============================================================================
