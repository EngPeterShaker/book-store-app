-- Migration: Add Publisher Branding and Social Media Fields
-- Created: 2025-12-02
-- Description: Adds logo, banner, brand colors, social media links, and enhanced metadata for Phase 1

-- Add branding fields to publishers table
ALTER TABLE publishers
ADD COLUMN logo_url TEXT,
ADD COLUMN banner_url TEXT,
ADD COLUMN brand_color_primary VARCHAR(7), -- Hex color code e.g., #FF5733
ADD COLUMN brand_color_secondary VARCHAR(7),
ADD COLUMN tagline VARCHAR(255),
ADD COLUMN mission_statement TEXT,
ADD COLUMN specialties TEXT[], -- Array of specialties/genres
ADD COLUMN awards TEXT[], -- Array of awards and achievements
ADD COLUMN notable_authors TEXT[], -- Array of featured author names
ADD COLUMN business_hours JSONB, -- Flexible JSON for operating hours
ADD COLUMN social_twitter VARCHAR(255),
ADD COLUMN social_linkedin VARCHAR(255),
ADD COLUMN social_instagram VARCHAR(255),
ADD COLUMN social_facebook VARCHAR(255),
ADD COLUMN social_youtube VARCHAR(255);

-- Add comments for documentation
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

-- Create index for brand color searches (in case we want to filter/group by brand)
CREATE INDEX idx_publishers_active ON publishers(is_active) WHERE is_active = true;

-- Add validation check for hex color format (optional but recommended)
ALTER TABLE publishers
ADD CONSTRAINT check_brand_color_primary_format
  CHECK (brand_color_primary IS NULL OR brand_color_primary ~ '^#[0-9A-Fa-f]{6}$'),
ADD CONSTRAINT check_brand_color_secondary_format
  CHECK (brand_color_secondary IS NULL OR brand_color_secondary ~ '^#[0-9A-Fa-f]{6}$');
