-- ============================================
-- COMPLETE ARABIC LOCALIZATION MIGRATION
-- Run this in Supabase SQL Editor
-- This includes BOTH Phase 1 enhancements AND Arabic content
-- ============================================

-- ============================================
-- STEP 1: Add all missing columns to publishers table
-- ============================================

-- Phase 1 columns (if they don't exist)
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS banner_url TEXT;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS brand_color_primary VARCHAR(7);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS brand_color_secondary VARCHAR(7);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS tagline VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS mission_statement TEXT;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS specialties TEXT[];
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS awards TEXT[];
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS notable_authors TEXT[];
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS business_hours JSONB;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS social_twitter VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS social_linkedin VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS social_instagram VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS social_facebook VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS social_youtube VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS email VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS state VARCHAR(100);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS country VARCHAR(100);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS postal_code VARCHAR(20);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS founded VARCHAR(50);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS founded_year INTEGER;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Arabic columns
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS name_ar VARCHAR(255);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS description_ar TEXT;
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS tagline_ar VARCHAR(500);
ALTER TABLE publishers ADD COLUMN IF NOT EXISTS mission_statement_ar TEXT;

-- ============================================
-- STEP 2: Add Arabic columns to books table
-- ============================================

ALTER TABLE books ADD COLUMN IF NOT EXISTS title_ar VARCHAR(500);
ALTER TABLE books ADD COLUMN IF NOT EXISTS author_ar VARCHAR(255);
ALTER TABLE books ADD COLUMN IF NOT EXISTS description_ar TEXT;

-- ============================================
-- STEP 3: Create indexes
-- ============================================

CREATE INDEX IF NOT EXISTS idx_books_title_ar ON books(title_ar);
CREATE INDEX IF NOT EXISTS idx_books_author_ar ON books(author_ar);
CREATE INDEX IF NOT EXISTS idx_publishers_name_ar ON publishers(name_ar);
CREATE INDEX IF NOT EXISTS idx_publishers_country ON publishers(country);
CREATE INDEX IF NOT EXISTS idx_publishers_city ON publishers(city);

-- ============================================
-- STEP 4: Insert Egyptian and Arabic Publishers
-- ============================================

INSERT INTO publishers (name, description, founded, location, website, email, phone, country, city, tagline, mission_statement, brand_color_primary, brand_color_secondary, is_active)
VALUES
('دار الشروق', 'واحدة من أكبر دور النشر المصرية، تأسست عام 1968 وتنشر الأدب العربي المعاصر والكتب الفكرية', '1968', 'القاهرة، مصر', 'https://shorouk.com', 'info@shorouk.com', '+20 2 23463430', 'مصر', 'القاهرة', 'نشر الفكر المستنير', 'نسعى لنشر المعرفة والثقافة في العالم العربي', '#C41E3A', '#8B0000', true),

('الدار المصرية اللبنانية', 'دار نشر رائدة تأسست عام 1985، متخصصة في الأدب والعلوم الإنسانية', '1985', 'القاهرة، مصر', 'https://almasriah.com', 'contact@almasriah.com', '+20 2 27943444', 'مصر', 'القاهرة', 'جسر بين الثقافات', 'نربط بين الثقافة المصرية واللبنانية والعربية', '#1B4D3E', '#2E8B57', true),

('دار المعارف', 'من أعرق دور النشر المصرية، تأسست عام 1890، رائدة في النشر التعليمي والثقافي', '1890', 'القاهرة، مصر', 'https://darelmaaref.com', 'info@darelmaaref.com', '+20 2 25743222', 'مصر', 'القاهرة', 'قرن من المعرفة', 'نشر المعرفة والتنوير منذ أكثر من قرن', '#2C5F2D', '#4A7C59', true),

('مكتبة الأسرة', 'مشروع حكومي مصري يهدف لنشر الثقافة بأسعار رمزية', '1995', 'القاهرة، مصر', 'https://familylibrary.gov.eg', 'info@familylibrary.gov.eg', '+20 2 27356666', 'مصر', 'القاهرة', 'القراءة للجميع', 'إتاحة الكتب الجيدة للأسرة المصرية بأسعار في متناول الجميع', '#FFD700', '#FFA500', true),

('دار نهضة مصر', 'دار نشر مصرية عريقة تأسست عام 1938، متخصصة في الكتب التعليمية والثقافية', '1938', 'الجيزة، مصر', 'https://nahdetmisr.com', 'info@nahdetmisr.com', '+20 2 33376898', 'مصر', 'الجيزة', 'نهضة الفكر المصري', 'نشر العلم والمعرفة لبناء مصر الحديثة', '#0066CC', '#004080', true),

('الهيئة المصرية العامة للكتاب', 'هيئة حكومية مصرية تهدف لنشر الثقافة والكتب بأسعار رمزية', '1970', 'القاهرة، مصر', 'https://egbook.gov.eg', 'info@egbook.gov.eg', '+20 2 27943480', 'مصر', 'القاهرة', 'الثقافة للجميع', 'نشر الثقافة وإتاحة الكتب لكل المصريين', '#CE1126', '#FFFFFF', true),

('المركز الثقافي العربي', 'دار نشر عربية رائدة مقرها الدار البيضاء وبيروت، متخصصة في الفكر والفلسفة', '1989', 'الدار البيضاء، المغرب / بيروت، لبنان', 'https://arabicenter.org', 'info@arabicenter.org', '+212 522 298989', 'المغرب', 'الدار البيضاء', 'الفكر العربي المعاصر', 'نشر الفكر النقدي والفلسفة العربية المعاصرة', '#8B4513', '#A0522D', true),

('المؤسسة العربية للدراسات والنشر', 'دار نشر لبنانية عريقة تأسست عام 1975، رائدة في نشر البحوث والدراسات', '1975', 'بيروت، لبنان', 'https://alinst.org', 'info@alinst.org', '+961 1 785107', 'لبنان', 'بيروت', 'الدراسات العربية الرصينة', 'نشر البحوث والدراسات الأكاديمية العربية', '#6B8E23', '#556B2F', true),

('دار الآداب', 'دار نشر لبنانية تأسست عام 1956، رائدة في نشر الأدب العربي المعاصر', '1956', 'بيروت، لبنان', 'https://daraladab.com', 'info@daraladab.com', '+961 1 301461', 'لبنان', 'بيروت', 'عاصمة الأدب العربي', 'نشر أفضل الأعمال الأدبية العربية المعاصرة', '#8B0000', '#A52A2A', true),

('دار الساقي', 'دار نشر لبنانية بريطانية تأسست عام 1979، متخصصة في الأدب والفكر', '1979', 'بيروت، لبنان / لندن، المملكة المتحدة', 'https://alsaqi.com', 'info@alsaqi.com', '+961 1 866442', 'لبنان', 'بيروت', 'نافذة على العالم', 'جسر ثقافي بين الشرق والغرب', '#2F4F4F', '#696969', true)
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- STEP 5: Insert Arabic Books
-- ============================================

DO $$
DECLARE
  shorouk_id INT;
  masriah_id INT;
  maaref_id INT;
  family_id INT;
  nahda_id INT;
  egbook_id INT;
  arab_center_id INT;
  adab_id INT;
  saqi_id INT;
BEGIN
  -- Get publisher IDs
  SELECT id INTO shorouk_id FROM publishers WHERE name = 'دار الشروق' LIMIT 1;
  SELECT id INTO masriah_id FROM publishers WHERE name = 'الدار المصرية اللبنانية' LIMIT 1;
  SELECT id INTO maaref_id FROM publishers WHERE name = 'دار المعارف' LIMIT 1;
  SELECT id INTO family_id FROM publishers WHERE name = 'مكتبة الأسرة' LIMIT 1;
  SELECT id INTO nahda_id FROM publishers WHERE name = 'دار نهضة مصر' LIMIT 1;
  SELECT id INTO egbook_id FROM publishers WHERE name = 'الهيئة المصرية العامة للكتاب' LIMIT 1;
  SELECT id INTO arab_center_id FROM publishers WHERE name = 'المركز الثقافي العربي' LIMIT 1;
  SELECT id INTO adab_id FROM publishers WHERE name = 'دار الآداب' LIMIT 1;
  SELECT id INTO saqi_id FROM publishers WHERE name = 'دار الساقي' LIMIT 1;

  -- Only insert if we have publisher IDs
  IF shorouk_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('Midaq Alley', 'زقاق المدق', 'Naguib Mahfouz', 'نجيب محفوظ', shorouk_id, 'A novel set in 1940s Cairo', 'رواية تدور أحداثها في القاهرة في الأربعينيات', 'Fiction', 95.00, 25, '978-977-09-0234-1', '1947-01-01'),
    ('The Cairo Trilogy', 'الثلاثية: بين القصرين', 'Naguib Mahfouz', 'نجيب محفوظ', shorouk_id, 'Nobel Prize-winning trilogy', 'الجزء الأول من ثلاثية نجيب محفوظ الحائزة على نوبل', 'Fiction', 120.00, 30, '978-977-09-0156-3', '1956-01-01'),
    ('In the Shade of the Quran', 'في ظلال القرآن', 'Sayyid Qutb', 'سيد قطب', shorouk_id, 'Quranic interpretation', 'تفسير القرآن الكريم', 'Religion', 350.00, 12, '978-977-09-4567-1', '1954-01-01'),
    ('Chicago', 'شيكاغو', 'Alaa Al Aswany', 'علاء الأسواني', shorouk_id, 'Egyptian expats in America', 'رواية عن المصريين المغتربين في أمريكا', 'Fiction', 95.00, 32, '978-977-09-1567-4', '2007-01-01'),
    ('Vertigo', 'فيرتيجو', 'Ahmed Mourad', 'أحمد مراد', shorouk_id, 'Psychological thriller', 'رواية تشويق نفسي تدور أحداثها في القاهرة', 'Fiction', 100.00, 50, '978-977-09-2345-6', '2007-01-01'),
    ('The Blue Elephant', 'الفيل الأزرق', 'Ahmed Mourad', 'أحمد مراد', shorouk_id, 'Psychological horror', 'رواية رعب نفسي', 'Fiction', 105.00, 55, '978-977-09-2789-2', '2012-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF masriah_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('Zaat', 'ذات', 'Sonallah Ibrahim', 'صنع الله إبراهيم', masriah_id, 'Satirical novel', 'رواية ساخرة عن المجتمع المصري', 'Fiction', 85.00, 28, '978-977-421-234-8', '1992-01-01'),
    ('The Yacoubian Building', 'عمارة يعقوبيان', 'Alaa Al Aswany', 'علاء الأسواني', masriah_id, 'Cairo apartment building', 'رواية عن سكان عمارة في وسط القاهرة', 'Fiction', 110.00, 45, '978-977-273-234-9', '2002-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF maaref_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('The Thief and the Dogs', 'اللص والكلاب', 'Naguib Mahfouz', 'نجيب محفوظ', maaref_id, 'Psychological novel', 'رواية نفسية عن رجل يسعى للانتقام', 'Fiction', 75.00, 40, '978-977-02-1234-5', '1961-01-01'),
    ('Arabic Grammar Made Easy', 'النحو الواضح', 'Ali al-Jarim', 'علي الجارم', maaref_id, 'Arabic grammar textbook', 'كتاب مبسط لقواعد اللغة العربية', 'Education', 95.00, 75, '978-977-02-6789-3', '1945-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF egbook_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('The Cheapest Nights', 'أرخص الليالي', 'Yusuf Idris', 'يوسف إدريس', egbook_id, 'Short stories', 'مجموعة قصص قصيرة تصور المجتمع المصري', 'Fiction', 60.00, 35, '978-977-01-3456-7', '1954-01-01'),
    ('Days', 'الأيام', 'Taha Hussein', 'طه حسين', egbook_id, 'Autobiography', 'السيرة الذاتية لعميد الأدب العربي', 'Biography', 85.00, 45, '978-977-01-2345-6', '1929-01-01'),
    ('Don''t Be Sad', 'لا تحزن', 'Aaidh al-Qarni', 'عائض القرني', egbook_id, 'Islamic self-help', 'منظور إسلامي للتغلب على الحزن', 'Self-Help', 95.00, 65, '978-977-01-9012-4', '2003-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF nahda_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('Kalila and Dimna', 'كليلة ودمنة', 'Ibn al-Muqaffa', 'ابن المقفع', nahda_id, 'Classic Arabic fables', 'الحكايات العربية الكلاسيكية للأطفال', 'Children', 65.00, 50, '978-977-14-2345-9', '2000-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF family_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('Arabian Nights for Children', 'ألف ليلة وليلة للأطفال', 'Traditional', 'تراثي', family_id, 'Arabian Nights stories', 'قصص مختارة من ألف ليلة وليلة للقراء الصغار', 'Children', 75.00, 60, '978-977-11-3456-0', '1998-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF adab_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('Memory in the Flesh', 'ذاكرة الجسد', 'Ahlam Mosteghanemi', 'أحلام مستغانمي', adab_id, 'Love story', 'قصة حب تدور أحداثها أثناء استقلال الجزائر', 'Fiction', 115.00, 38, '978-9953-36-123-4', '1993-01-01'),
    ('I Love You', 'أحبك أو لا أحبك', 'Nizar Qabbani', 'نزار قباني', adab_id, 'Romantic poetry', 'ديوان شعر في الحب والرومانسية', 'Poetry', 75.00, 42, '978-9953-36-789-0', '1971-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF saqi_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('Poems of Mahmoud Darwish', 'ديوان محمود درويش', 'Mahmoud Darwish', 'محمود درويش', saqi_id, 'Palestinian poetry', 'مجموعة من شعر المقاومة الفلسطينية', 'Poetry', 95.00, 35, '978-1-85516-234-5', '2003-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

END $$;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count Egyptian/Arabic publishers
SELECT 'Egyptian/Arabic Publishers:' as info, COUNT(*) as count
FROM publishers
WHERE country IN ('مصر', 'لبنان', 'المغرب');

-- Count books with Arabic titles
SELECT 'Books with Arabic titles:' as info, COUNT(*) as count
FROM books
WHERE title_ar IS NOT NULL;

-- Show sample publishers
SELECT name, country, city, founded
FROM publishers
WHERE country IN ('مصر', 'لبنان', 'المغرب')
ORDER BY founded
LIMIT 10;

-- Show sample Arabic books
SELECT title_ar as "العنوان", author_ar as "المؤلف", genre as "النوع", price as "السعر"
FROM books
WHERE title_ar IS NOT NULL
LIMIT 10;

COMMIT;
