-- ============================================
-- ARABIC LOCALIZATION - Complete Migration
-- Run this in Supabase SQL Editor
-- Adds Egyptian/Arabic publishers, books, and bilingual support
-- ============================================

-- ============================================
-- PART 1: Add Arabic Language Support to Schema
-- ============================================

-- Add Arabic fields to books table
ALTER TABLE books
ADD COLUMN IF NOT EXISTS title_ar VARCHAR(500),
ADD COLUMN IF NOT EXISTS author_ar VARCHAR(255),
ADD COLUMN IF NOT EXISTS description_ar TEXT;

-- Add Arabic fields to publishers table
ALTER TABLE publishers
ADD COLUMN IF NOT EXISTS name_ar VARCHAR(255),
ADD COLUMN IF NOT EXISTS description_ar TEXT,
ADD COLUMN IF NOT EXISTS tagline_ar VARCHAR(500),
ADD COLUMN IF NOT EXISTS mission_statement_ar TEXT;

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_books_title_ar ON books(title_ar);
CREATE INDEX IF NOT EXISTS idx_books_author_ar ON books(author_ar);
CREATE INDEX IF NOT EXISTS idx_publishers_name_ar ON publishers(name_ar);

-- Add comments for documentation
COMMENT ON COLUMN books.title_ar IS 'Arabic translation of book title';
COMMENT ON COLUMN books.author_ar IS 'Arabic name of author';
COMMENT ON COLUMN books.description_ar IS 'Arabic description of book';
COMMENT ON COLUMN publishers.name_ar IS 'Arabic name of publisher';
COMMENT ON COLUMN publishers.description_ar IS 'Arabic description of publisher';

-- ============================================
-- PART 2: Egyptian and Arabic Publishers
-- ============================================

-- Egyptian Publishers
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
-- PART 3: Arabic Books with Real Egyptian/Arabic Titles
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
  arab_inst_id INT;
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
  SELECT id INTO arab_inst_id FROM publishers WHERE name = 'المؤسسة العربية للدراسات والنشر' LIMIT 1;
  SELECT id INTO adab_id FROM publishers WHERE name = 'دار الآداب' LIMIT 1;
  SELECT id INTO saqi_id FROM publishers WHERE name = 'دار الساقي' LIMIT 1;

  -- Insert books (only if publisher IDs were found)
  IF shorouk_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('Midaq Alley', 'زقاق المدق', 'Naguib Mahfouz', 'نجيب محفوظ', shorouk_id, 'A novel set in 1940s Cairo depicting life in a small alley', 'رواية تدور أحداثها في القاهرة في الأربعينيات وتصور الحياة في زقاق صغير', 'Fiction', 95.00, 25, '978-977-09-0234-1', '1947-01-01'),
    ('The Cairo Trilogy: Palace Walk', 'الثلاثية: بين القصرين', 'Naguib Mahfouz', 'نجيب محفوظ', shorouk_id, 'First part of Mahfouz''s Nobel Prize-winning trilogy', 'الجزء الأول من ثلاثية نجيب محفوظ الحائزة على نوبل', 'Fiction', 120.00, 30, '978-977-09-0156-3', '1956-01-01'),
    ('In the Shade of the Quran', 'في ظلال القرآن', 'Sayyid Qutb', 'سيد قطب', shorouk_id, 'Tafsir (interpretation) of the Quran', 'تفسير القرآن الكريم', 'Religion', 350.00, 12, '978-977-09-4567-1', '1954-01-01'),
    ('Chicago', 'شيكاغو', 'Alaa Al Aswany', 'علاء الأسواني', shorouk_id, 'Novel about Egyptian expats in America', 'رواية عن المصريين المغتربين في أمريكا', 'Fiction', 95.00, 32, '978-977-09-1567-4', '2007-01-01'),
    ('Vertigo', 'فيرتيجو', 'Ahmed Mourad', 'أحمد مراد', shorouk_id, 'Psychological thriller set in Cairo', 'رواية تشويق نفسي تدور أحداثها في القاهرة', 'Fiction', 100.00, 50, '978-977-09-2345-6', '2007-01-01'),
    ('The Blue Elephant', 'الفيل الأزرق', 'Ahmed Mourad', 'أحمد مراد', shorouk_id, 'Psychological horror novel', 'رواية رعب نفسي', 'Fiction', 105.00, 55, '978-977-09-2789-2', '2012-01-01'),
    ('My Life', 'حياتي', 'Ahmed Zewail', 'أحمد زويل', shorouk_id, 'Autobiography of Nobel Prize-winning chemist', 'السيرة الذاتية للكيميائي الحائز على نوبل', 'Biography', 125.00, 35, '978-977-09-3456-9', '2002-01-01'),
    ('Nasser: My Story', 'ناصر: قصتي', 'Mohamed Heikal', 'محمد حسنين هيكل', shorouk_id, 'Biography of Gamal Abdel Nasser', 'سيرة جمال عبد الناصر', 'Biography', 155.00, 22, '978-977-09-5678-3', '1973-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF masriah_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('Zaat', 'ذات', 'Sonallah Ibrahim', 'صنع الله إبراهيم', masriah_id, 'A satirical novel about Egyptian society', 'رواية ساخرة عن المجتمع المصري في الثمانينيات والتسعينيات', 'Fiction', 85.00, 28, '978-977-421-234-8', '1992-01-01'),
    ('The Yacoubian Building', 'عمارة يعقوبيان', 'Alaa Al Aswany', 'علاء الأسواني', masriah_id, 'Novel about residents of a Cairo apartment building', 'رواية عن سكان عمارة في وسط القاهرة', 'Fiction', 110.00, 45, '978-977-273-234-9', '2002-01-01'),
    ('The Art of Dealing with People', 'فن التعامل مع الناس', 'Various Authors', 'مؤلفون متعددون', masriah_id, 'Social skills from Islamic perspective', 'المهارات الاجتماعية من منظور إسلامي', 'Self-Help', 75.00, 48, '978-977-273-456-2', '2007-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF maaref_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('The Thief and the Dogs', 'اللص والكلاب', 'Naguib Mahfouz', 'نجيب محفوظ', maaref_id, 'Psychological novel about revenge', 'رواية نفسية عن رجل يسعى للانتقام بعد خروجه من السجن', 'Fiction', 75.00, 40, '978-977-02-1234-5', '1961-01-01'),
    ('The History of Islamic Civilization', 'تاريخ الحضارة الإسلامية', 'Jurji Zaydan', 'جرجي زيدان', maaref_id, 'Comprehensive history of Islamic civilization', 'تاريخ شامل للحضارة الإسلامية', 'History', 185.00, 18, '978-977-02-3456-8', '1902-01-01'),
    ('Arab-Islamic Philosophy', 'الفلسفة العربية الإسلامية', 'Mahmoud Qassem', 'محمود قاسم', maaref_id, 'Study of philosophical thought in Islam', 'دراسة الفكر الفلسفي في العالم الإسلامي', 'Philosophy', 135.00, 18, '978-977-02-5678-9', '1972-01-01'),
    ('Fiqh al-Sunnah', 'فقه السنة', 'Sayyid Sabiq', 'السيد سابق', maaref_id, 'Comprehensive work on Islamic jurisprudence', 'عمل شامل في الفقه الإسلامي', 'Religion', 280.00, 20, '978-977-02-7890-2', '1945-01-01'),
    ('Revival of Religious Sciences', 'إحياء علوم الدين', 'Al-Ghazali', 'الغزالي', maaref_id, 'Classic work on Islamic spirituality', 'عمل كلاسيكي في الروحانية والشريعة الإسلامية', 'Religion', 420.00, 10, '978-977-02-8901-3', '1970-01-01'),
    ('The Little Arab', 'الصغير العربي', 'Kamil Kilani', 'كامل كيلاني', maaref_id, 'Educational stories for Arab children', 'قصص تعليمية للأطفال العرب', 'Children', 55.00, 45, '978-977-02-4567-1', '1995-01-01'),
    ('Arabic Grammar Made Easy', 'النحو الواضح', 'Ali al-Jarim', 'علي الجارم', maaref_id, 'Simplified Arabic grammar textbook', 'كتاب مبسط لقواعد اللغة العربية', 'Education', 95.00, 75, '978-977-02-6789-3', '1945-01-01'),
    ('Arabic Language Skills', 'مهارات اللغة العربية', 'Ahmed Madkour', 'أحمد مدكور', maaref_id, 'Comprehensive Arabic language learning', 'تعلم شامل للغة العربية', 'Education', 105.00, 65, '978-977-02-5670-4', '2015-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF egbook_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('The Cheapest Nights', 'أرخص الليالي', 'Yusuf Idris', 'يوسف إدريس', egbook_id, 'Collection of short stories', 'مجموعة قصص قصيرة تصور المجتمع المصري', 'Fiction', 60.00, 35, '978-977-01-3456-7', '1954-01-01'),
    ('Complete Works of Ahmad Shawqi', 'الأعمال الكاملة لأحمد شوقي', 'Ahmad Shawqi', 'أحمد شوقي', egbook_id, 'Complete poetic works', 'الأعمال الشعرية الكاملة لأمير الشعراء', 'Poetry', 150.00, 20, '978-977-01-5678-9', '2005-01-01'),
    ('Egypt in the Eyes of Egyptians', 'مصر في عيون المصريين', 'Various Authors', 'مؤلفون متعددون', egbook_id, 'Essays on Egyptian identity', 'مجموعة مقالات عن الهوية المصرية', 'History', 95.00, 30, '978-977-01-7890-1', '2010-01-01'),
    ('Days: An Autobiography', 'الأيام', 'Taha Hussein', 'طه حسين', egbook_id, 'Autobiography of the Dean of Arabic Literature', 'السيرة الذاتية لعميد الأدب العربي', 'History', 85.00, 45, '978-977-01-2345-6', '1929-01-01'),
    ('Life of Muhammad', 'السيرة النبوية', 'Ibn Hisham', 'ابن هشام', egbook_id, 'Biography of Prophet Muhammad', 'سيرة النبي محمد صلى الله عليه وسلم', 'Biography', 195.00, 30, '978-977-01-4567-9', '1995-01-01'),
    ('Don''t Be Sad', 'لا تحزن', 'Aaidh al-Qarni', 'عائض القرني', egbook_id, 'Islamic perspective on overcoming sadness', 'منظور إسلامي للتغلب على الحزن', 'Self-Help', 95.00, 65, '978-977-01-9012-4', '2003-01-01'),
    ('Enjoy Your Life', 'استمتع بحياتك', 'Mohammed al-Arefe', 'محمد العريفي', egbook_id, 'Guide to living a fulfilling Islamic life', 'دليل للعيش بحياة إسلامية مُرضية', 'Self-Help', 85.00, 58, '978-977-01-9123-5', '2005-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF nahda_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('Introduction to Islamic Philosophy', 'مدخل إلى الفلسفة الإسلامية', 'Ibrahim Madkour', 'إبراهيم مدكور', nahda_id, 'Introduction to Islamic philosophy', 'مدخل إلى المفاهيم الأساسية في الفلسفة الإسلامية', 'Philosophy', 125.00, 22, '978-977-14-1234-7', '1968-01-01'),
    ('The History of Arabic Science', 'تاريخ العلوم العربية', 'Ahmed Fouad Pasha', 'أحمد فؤاد باشا', nahda_id, 'History of scientific achievements', 'تاريخ الإنجازات العلمية في العالم العربي', 'Science', 165.00, 15, '978-977-14-3456-8', '1995-01-01'),
    ('Chemistry in Daily Life', 'الكيمياء في حياتنا اليومية', 'Mohamed El-Sayed', 'محمد السيد', nahda_id, 'Applied chemistry', 'الكيمياء التطبيقية للفهم اليومي', 'Science', 95.00, 28, '978-977-14-5678-0', '2008-01-01'),
    ('Kalila and Dimna', 'كليلة ودمنة', 'Ibn al-Muqaffa', 'ابن المقفع', nahda_id, 'Classic Arabic fables', 'الحكايات العربية الكلاسيكية للأطفال', 'Children', 65.00, 50, '978-977-14-2345-9', '2000-01-01'),
    ('Mathematics for Secondary School', 'الرياضيات للثانوية', 'Ministry of Education', 'وزارة التربية والتعليم', nahda_id, 'Official mathematics curriculum', 'منهج الرياضيات الرسمي', 'Education', 85.00, 80, '978-977-14-4567-2', '2020-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF family_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('Arabian Nights for Children', 'ألف ليلة وليلة للأطفال', 'Traditional', 'تراثي', family_id, 'Selected stories from Arabian Nights', 'قصص مختارة من ألف ليلة وليلة للقراء الصغار', 'Children', 75.00, 60, '978-977-11-3456-0', '1998-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF arab_center_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('Critique of Arab Thought', 'نقد الفكر العربي', 'Mohammed Abed al-Jabri', 'محمد عابد الجابري', arab_center_id, 'Critical analysis of Arab thought', 'تحليل نقدي للفكر العربي المعاصر', 'Philosophy', 145.00, 25, '978-9953-68-123-4', '1984-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF adab_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('Memory in the Flesh', 'ذاكرة الجسد', 'Ahlam Mosteghanemi', 'أحلام مستغانمي', adab_id, 'Love story during Algerian independence', 'قصة حب تدور أحداثها أثناء استقلال الجزائر', 'Fiction', 115.00, 38, '978-9953-36-123-4', '1993-01-01'),
    ('Beirut Nightmares', 'كوابيس بيروت', 'Ghada al-Samman', 'غادة السمان', adab_id, 'Diary of the Lebanese Civil War', 'يوميات الحرب الأهلية اللبنانية', 'Fiction', 90.00, 25, '978-9953-36-456-7', '1976-01-01'),
    ('I Love You or I Don''t Love You', 'أحبك أو لا أحبك', 'Nizar Qabbani', 'نزار قباني', adab_id, 'Collection of romantic poetry', 'ديوان شعر في الحب والرومانسية', 'Poetry', 75.00, 42, '978-9953-36-789-0', '1971-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

  IF saqi_id IS NOT NULL THEN
    INSERT INTO books (title, title_ar, author, author_ar, publisher_id, description, description_ar, genre, price, stock, isbn, published_date)
    VALUES
    ('Poems of Mahmoud Darwish', 'ديوان محمود درويش', 'Mahmoud Darwish', 'محمود درويش', saqi_id, 'Palestinian resistance poetry', 'مجموعة من شعر المقاومة الفلسطينية', 'Poetry', 95.00, 35, '978-1-85516-234-5', '2003-01-01')
    ON CONFLICT (isbn) DO NOTHING;
  END IF;

END $$;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check publishers with Arabic names
SELECT
  name,
  country,
  city,
  founded
FROM publishers
WHERE country IN ('مصر', 'لبنان', 'المغرب')
ORDER BY founded;

-- Check books with Arabic titles
SELECT
  title_ar as "العنوان",
  author_ar as "المؤلف",
  genre as "النوع",
  price as "السعر"
FROM books
WHERE title_ar IS NOT NULL
LIMIT 20;

-- Count books by publisher
SELECT
  p.name as publisher,
  COUNT(b.id) as book_count,
  STRING_AGG(DISTINCT b.genre, ', ') as genres
FROM publishers p
LEFT JOIN books b ON p.id = b.publisher_id
WHERE p.name IN (
  'دار الشروق',
  'الدار المصرية اللبنانية',
  'دار المعارف',
  'مكتبة الأسرة',
  'دار نهضة مصر',
  'الهيئة المصرية العامة للكتاب',
  'المركز الثقافي العربي',
  'دار الآداب',
  'دار الساقي'
)
GROUP BY p.name
ORDER BY book_count DESC;

COMMIT;
