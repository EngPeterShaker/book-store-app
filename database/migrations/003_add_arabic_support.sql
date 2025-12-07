-- ============================================
-- Migration: Add Arabic Language Support
-- Description: Adds Arabic fields for bilingual content
-- ============================================

-- Add Arabic fields to books table
ALTER TABLE books
ADD COLUMN IF NOT EXISTS title_ar VARCHAR(500),
ADD COLUMN IF NOT EXISTS author_ar VARCHAR(255),
ADD COLUMN IF NOT EXISTS description_ar TEXT;

-- Add Arabic fields to publishers table (if not already present)
ALTER TABLE publishers
ADD COLUMN IF NOT EXISTS name_ar VARCHAR(255),
ADD COLUMN IF NOT EXISTS description_ar TEXT,
ADD COLUMN IF NOT EXISTS tagline_ar VARCHAR(500),
ADD COLUMN IF NOT EXISTS mission_statement_ar TEXT;

-- Create indexes for Arabic text search
CREATE INDEX IF NOT EXISTS idx_books_title_ar ON books(title_ar);
CREATE INDEX IF NOT EXISTS idx_books_author_ar ON books(author_ar);
CREATE INDEX IF NOT EXISTS idx_publishers_name_ar ON publishers(name_ar);

-- Add comments
COMMENT ON COLUMN books.title_ar IS 'Arabic translation of book title';
COMMENT ON COLUMN books.author_ar IS 'Arabic name of author';
COMMENT ON COLUMN books.description_ar IS 'Arabic description of book';
COMMENT ON COLUMN publishers.name_ar IS 'Arabic name of publisher';
COMMENT ON COLUMN publishers.description_ar IS 'Arabic description of publisher';

COMMIT;
