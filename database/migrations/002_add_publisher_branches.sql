-- Migration: Add Publisher Branches/Locations System
-- Created: 2025-12-02
-- Description: Phase 2 - Adds support for multiple publisher locations/branches

-- Create publisher_branches table
CREATE TABLE IF NOT EXISTS publisher_branches (
  id SERIAL PRIMARY KEY,
  publisher_id INTEGER NOT NULL REFERENCES publishers(id) ON DELETE CASCADE,
  branch_name VARCHAR(255) NOT NULL,
  branch_type VARCHAR(50) DEFAULT 'Office', -- HQ, Office, Warehouse, Bookstore, Distribution Center
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
  hours_of_operation JSONB, -- JSON format: {"monday": "9AM-5PM", ...}

  -- Branch metadata
  is_main_branch BOOLEAN DEFAULT false,
  branch_icon_url TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT unique_publisher_branch_name UNIQUE (publisher_id, branch_name)
);

-- Add comments for documentation
COMMENT ON TABLE publisher_branches IS 'Stores multiple locations/branches for each publisher';
COMMENT ON COLUMN publisher_branches.branch_type IS 'Type of branch: HQ, Office, Warehouse, Bookstore, Distribution Center';
COMMENT ON COLUMN publisher_branches.is_main_branch IS 'Indicates if this is the headquarters or main branch';
COMMENT ON COLUMN publisher_branches.hours_of_operation IS 'Operating hours in JSON format';
COMMENT ON COLUMN publisher_branches.latitude IS 'Latitude coordinate for map display';
COMMENT ON COLUMN publisher_branches.longitude IS 'Longitude coordinate for map display';

-- Create indexes for better performance
CREATE INDEX idx_branches_publisher ON publisher_branches(publisher_id);
CREATE INDEX idx_branches_type ON publisher_branches(branch_type);
CREATE INDEX idx_branches_main ON publisher_branches(is_main_branch) WHERE is_main_branch = true;
CREATE INDEX idx_branches_location ON publisher_branches(city, country);

-- Add updated_at trigger
CREATE TRIGGER update_publisher_branches_updated_at
  BEFORE UPDATE ON publisher_branches
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add validation check for branch_type
ALTER TABLE publisher_branches
ADD CONSTRAINT check_branch_type
  CHECK (branch_type IN ('HQ', 'Office', 'Warehouse', 'Bookstore', 'Distribution Center', 'Regional Office'));

COMMIT;
