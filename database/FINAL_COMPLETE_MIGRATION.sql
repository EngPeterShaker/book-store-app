-- ============================================
-- FINAL COMPLETE MIGRATION
-- Adds all missing columns and Arabic content
-- Run this in Supabase SQL Editor
-- ============================================

-- ============================================
-- PART 1: Add ALL missing columns to BOOKS table
-- ============================================

ALTER TABLE books ADD COLUMN IF NOT EXISTS title VARCHAR(500);
ALTER TABLE books ADD COLUMN IF NOT EXISTS author VARCHAR(255);
ALTER TABLE books ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE books ADD COLUMN IF NOT EXISTS genre VARCHAR(100);
ALTER TABLE books ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2);
ALTER TABLE books ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0;
ALTER TABLE books ADD COLUMN IF NOT EXISTS isbn VARCHAR(50);
ALTER TABLE books ADD COLUMN IF NOT EXISTS published_date DATE;
ALTER TABLE books ADD COLUMN IF NOT EXISTS publisher_id INTEGER;

-- Add Arabic columns to books
ALTER TABLE books ADD COLUMN IF NOT EXISTS title_ar VARCHAR(500);
ALTER TABLE books ADD COLUMN IF NOT EXISTS author_ar VARCHAR(255);
ALTER TABLE books ADD COLUMN IF NOT EXISTS description_ar TEXT;

-- ============================================
-- PART 2: Add ALL missing columns to PUBLISHERS table
-- ============================================

ALTER TABLE publishers ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS email VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS state VARCHAR(100);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS country VARCHAR(100);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS postal_code VARCHAR(20);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS founded VARCHAR(50);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS founded_year INTEGER;

-- Branding columns
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS banner_url TEXT;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS brand_color_primary VARCHAR(7);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS brand_color_secondary VARCHAR(7);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS tagline VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS mission_statement TEXT;

-- Enhanced description
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS specialties TEXT[];
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS awards TEXT[];
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS notable_authors TEXT[];

-- Business
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS business_hours JSONB;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Social media
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS social_twitter VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS social_linkedin VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS social_instagram VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS social_facebook VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS social_youtube VARCHAR(255);

-- Arabic columns
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS name_ar VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS description_ar TEXT;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS tagline_ar VARCHAR(500);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS mission_statement_ar TEXT;

-- ============================================
-- PART 3: Create indexes
-- ============================================

CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);
CREATE INDEX IF NOT EXISTS idx_books_author ON books(author);
CREATE INDEX IF NOT EXISTS idx_books_genre ON books(genre);
CREATE INDEX IF NOT EXISTS idx_books_publisher ON books(publisher_id);
CREATE INDEX IF NOT EXISTS idx_books_title_ar ON books(title_ar);
CREATE INDEX IF NOT EXISTS idx_books_author_ar ON books(author_ar);

CREATE INDEX IF NOT EXISTS idx_publishers_name ON publishers(name);
CREATE INDEX IF NOT EXISTS idx_publishers_country ON publishers(country);
CREATE INDEX IF NOT EXISTS idx_publishers_city ON publishers(city);
CREATE INDEX IF NOT EXISTS idx_publishers_name_ar ON publishers(name_ar);

-- ============================================
-- PART 4: Insert Egyptian Publishers
-- ============================================

INSERT INTO publishers (
  name, description, founded, location, website, email, phone,
  country, city, tagline, mission_statement,
  brand_color_primary, brand_color_secondary, is_active
)
VALUES
  ('دار الشروق',
   'واحدة من أكبر دور النشر المصرية، تأسست عام 1968 وتنشر الأدب العربي المعاصر',
   '1968', 'القاهرة، مصر', 'https://shorouk.com', 'info@shorouk.com', '+20 2 23463430',
   'مصر', 'القاهرة', 'نشر الفكر المستنير', 'نسعى لنشر المعرفة والثقافة في العالم العربي',
   '#C41E3A', '#8B0000', true),

  ('الدار المصرية اللبنانية',
   'دار نشر رائدة تأسست عام 1985، متخصصة في الأدب والعلوم الإنسانية',
   '1985', 'القاهرة، مصر', 'https://almasriah.com', 'contact@almasriah.com', '+20 2 27943444',
   'مصر', 'القاهرة', 'جسر بين الثقافات', 'نربط بين الثقافة المصرية واللبنانية والعربية',
   '#1B4D3E', '#2E8B57', true),

  ('دار المعارف',
   'من أعرق دور النشر المصرية، تأسست عام 1890',
   '1890', 'القاهرة، مصر', 'https://darelmaaref.com', 'info@darelmaaref.com', '+20 2 25743222',
   'مصر', 'القاهرة', 'قرن من المعرفة', 'نشر المعرفة والتنوير منذ أكثر من قرن',
   '#2C5F2D', '#4A7C59', true),

  ('مكتبة الأسرة',
   'مشروع حكومي مصري يهدف لنشر الثقافة بأسعار رمزية',
   '1995', 'القاهرة، مصر', 'https://familylibrary.gov.eg', 'info@familylibrary.gov.eg', '+20 2 27356666',
   'مصر', 'القاهرة', 'القراءة للجميع', 'إتاحة الكتب الجيدة للأسرة المصرية',
   '#FFD700', '#FFA500', true),

  ('دار نهضة مصر',
   'دار نشر مصرية عريقة تأسست عام 1938',
   '1938', 'الجيزة، مصر', 'https://nahdetmisr.com', 'info@nahdetmisr.com', '+20 2 33376898',
   'مصر', 'الجيزة', 'نهضة الفكر المصري', 'نشر العلم والمعرفة لبناء مصر الحديثة',
   '#0066CC', '#004080', true),

  ('الهيئة المصرية العامة للكتاب',
   'هيئة حكومية مصرية تهدف لنشر الثقافة والكتب بأسعار رمزية',
   '1970', 'القاهرة، مصر', 'https://egbook.gov.eg', 'info@egbook.gov.eg', '+20 2 27943480',
   'مصر', 'القاهرة', 'الثقافة للجميع', 'نشر الثقافة وإتاحة الكتب لكل المصريين',
   '#CE1126', '#FFFFFF', true),

  ('دار الآداب',
   'دار نشر لبنانية تأسست عام 1956، رائدة في نشر الأدب العربي',
   '1956', 'بيروت، لبنان', 'https://daraladab.com', 'info@daraladab.com', '+961 1 301461',
   'لبنان', 'بيروت', 'عاصمة الأدب العربي', 'نشر أفضل الأعمال الأدبية العربية',
   '#8B0000', '#A52A2A', true)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- PART 5: Insert Arabic Books
-- ============================================

DO $$
DECLARE
  v_pub_id INT;
BEGIN
  -- دار الشروق books
  SELECT id INTO v_pub_id FROM publishers WHERE name = 'دار الشروق' LIMIT 1;
  IF v_pub_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
      ('Midaq Alley', 'زقاق المدق', 'Naguib Mahfouz', 'نجيب محفوظ', v_pub_id,
       'A novel set in 1940s Cairo', 'رواية تدور أحداثها في القاهرة في الأربعينيات',
       'Fiction', 95.00, 25, 'AR-SHOROUK-001', '1947-01-01'),

      ('The Cairo Trilogy', 'الثلاثية: بين القصرين', 'Naguib Mahfouz', 'نجيب محفوظ', v_pub_id,
       'Nobel Prize-winning trilogy', 'ثلاثية نجيب محفوظ الحائزة على نوبل',
       'Fiction', 120.00, 30, 'AR-SHOROUK-002', '1956-01-01'),

      ('Vertigo', 'فيرتيجو', 'Ahmed Mourad', 'أحمد مراد', v_pub_id,
       'Psychological thriller', 'رواية تشويق نفسي',
       'Fiction', 100.00, 50, 'AR-SHOROUK-003', '2007-01-01'),

      ('The Blue Elephant', 'الفيل الأزرق', 'Ahmed Mourad', 'أحمد مراد', v_pub_id,
       'Psychological horror', 'رواية رعب نفسي',
       'Fiction', 105.00, 55, 'AR-SHOROUK-004', '2012-01-01'),

      ('Chicago', 'شيكاغو', 'Alaa Al Aswany', 'علاء الأسواني', v_pub_id,
       'Egyptian expats in America', 'المصريون المغتربون في أمريكا',
       'Fiction', 95.00, 32, 'AR-SHOROUK-005', '2007-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  -- الدار المصرية اللبنانية books
  SELECT id INTO v_pub_id FROM publishers WHERE name = 'الدار المصرية اللبنانية' LIMIT 1;
  IF v_pub_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
      ('The Yacoubian Building', 'عمارة يعقوبيان', 'Alaa Al Aswany', 'علاء الأسواني', v_pub_id,
       'Life in Cairo apartment', 'رواية عن سكان عمارة في القاهرة',
       'Fiction', 110.00, 45, 'AR-MASRIAH-001', '2002-01-01'),

      ('Zaat', 'ذات', 'Sonallah Ibrahim', 'صنع الله إبراهيم', v_pub_id,
       'Satirical novel', 'رواية ساخرة عن المجتمع المصري',
       'Fiction', 85.00, 28, 'AR-MASRIAH-002', '1992-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  -- دار المعارف books
  SELECT id INTO v_pub_id FROM publishers WHERE name = 'دار المعارف' LIMIT 1;
  IF v_pub_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
      ('The Thief and the Dogs', 'اللص والكلاب', 'Naguib Mahfouz', 'نجيب محفوظ', v_pub_id,
       'Psychological novel', 'رواية نفسية عن الانتقام',
       'Fiction', 75.00, 40, 'AR-MAAREF-001', '1961-01-01'),

      ('Arabic Grammar Made Easy', 'النحو الواضح', 'Ali al-Jarim', 'علي الجارم', v_pub_id,
       'Arabic grammar textbook', 'كتاب قواعد اللغة العربية',
       'Education', 95.00, 75, 'AR-MAAREF-002', '1945-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  -- الهيئة المصرية العامة للكتاب books
  SELECT id INTO v_pub_id FROM publishers WHERE name = 'الهيئة المصرية العامة للكتاب' LIMIT 1;
  IF v_pub_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
      ('The Cheapest Nights', 'أرخص الليالي', 'Yusuf Idris', 'يوسف إدريس', v_pub_id,
       'Egyptian short stories', 'قصص قصيرة مصرية',
       'Fiction', 60.00, 35, 'AR-EGBOOK-001', '1954-01-01'),

      ('Days', 'الأيام', 'Taha Hussein', 'طه حسين', v_pub_id,
       'Autobiography', 'السيرة الذاتية لطه حسين',
       'Biography', 85.00, 45, 'AR-EGBOOK-002', '1929-01-01'),

      ('Don''t Be Sad', 'لا تحزن', 'Aaidh al-Qarni', 'عائض القرني', v_pub_id,
       'Islamic self-help', 'التغلب على الحزن',
       'Self-Help', 95.00, 65, 'AR-EGBOOK-003', '2003-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  -- مكتبة الأسرة books
  SELECT id INTO v_pub_id FROM publishers WHERE name = 'مكتبة الأسرة' LIMIT 1;
  IF v_pub_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
      ('Arabian Nights', 'ألف ليلة وليلة', 'Traditional', 'تراثي', v_pub_id,
       'Classic tales', 'قصص ألف ليلة وليلة',
       'Children', 75.00, 60, 'AR-FAMILY-001', '1998-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  -- دار نهضة مصر books
  SELECT id INTO v_pub_id FROM publishers WHERE name = 'دار نهضة مصر' LIMIT 1;
  IF v_pub_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
      ('Kalila and Dimna', 'كليلة ودمنة', 'Ibn al-Muqaffa', 'ابن المقفع', v_pub_id,
       'Arabic fables', 'حكايات عربية كلاسيكية',
       'Children', 65.00, 50, 'AR-NAHDA-001', '2000-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  -- دار الآداب books
  SELECT id INTO v_pub_id FROM publishers WHERE name = 'دار الآداب' LIMIT 1;
  IF v_pub_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
      ('Memory in the Flesh', 'ذاكرة الجسد', 'Ahlam Mosteghanemi', 'أحلام مستغانمي', v_pub_id,
       'Love story', 'قصة حب جزائرية',
       'Fiction', 115.00, 38, 'AR-ADAB-001', '1993-01-01'),

      ('I Love You', 'أحبك أو لا أحبك', 'Nizar Qabbani', 'نزار قباني', v_pub_id,
       'Romantic poetry', 'شعر رومانسي',
       'Poetry', 75.00, 42, 'AR-ADAB-002', '1971-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

END $$;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

SELECT '✅ Egyptian Publishers Added:' as status, COUNT(*) as count
FROM publishers WHERE country = 'مصر';

SELECT '✅ Arabic Books Added:' as status, COUNT(*) as count
FROM books WHERE title_ar IS NOT NULL;

SELECT name as "الناشر", city as "المدينة", founded as "تأسس"
FROM publishers
WHERE country IN ('مصر', 'لبنان')
ORDER BY founded
LIMIT 10;

SELECT title_ar as "العنوان", author_ar as "المؤلف", price as "السعر"
FROM books
WHERE title_ar IS NOT NULL
ORDER BY id DESC
LIMIT 10;

COMMIT;
