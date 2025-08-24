-- Book Store Sample Data
-- Run this AFTER schema.sql

-- 1. Insert Publishers
INSERT INTO publishers (name, description, website, email, founded_year, address, city, state, country) VALUES
('Penguin Random House', 'World''s largest English-language general trade book publisher', 'https://penguinrandomhouse.com', 'info@penguinrandomhouse.com', 1927, '1745 Broadway', 'New York', 'NY', 'USA'),
('HarperCollins Publishers', 'Leading English-language publisher', 'https://harpercollins.com', 'info@harpercollins.com', 1989, '195 Broadway', 'New York', 'NY', 'USA'),
('Simon & Schuster', 'American publishing company', 'https://simonandschuster.com', 'info@simonandschuster.com', 1924, '1230 Avenue of the Americas', 'New York', 'NY', 'USA'),
('Macmillan Publishers', 'British publishing company', 'https://macmillan.com', 'info@macmillan.com', 1843, '120 Broadway', 'New York', 'NY', 'USA'),
('Scholastic Corporation', 'American multinational publishing and media company', 'https://scholastic.com', 'info@scholastic.com', 1920, '557 Broadway', 'New York', 'NY', 'USA'),
('Hachette Book Group', 'Publishing company owned by Hachette Livre', 'https://hachettebookgroup.com', 'info@hbgusa.com', 2006, '1290 Avenue of the Americas', 'New York', 'NY', 'USA'),
('Oxford University Press', 'Largest university press in the world', 'https://oup.com', 'info@oup.com', 1586, '198 Madison Avenue', 'New York', 'NY', 'USA'),
('Cambridge University Press', 'Publishing business of University of Cambridge', 'https://cambridge.org', 'info@cambridge.org', 1534, '1 Liberty Plaza', 'New York', 'NY', 'USA');

-- 2. Insert Authors
INSERT INTO authors (first_name, last_name, biography, birth_date, nationality) VALUES
('F. Scott', 'Fitzgerald', 'American novelist and short story writer, widely regarded as one of the greatest American writers of the 20th century.', '1896-09-24', 'American'),
('Harper', 'Lee', 'American novelist best known for her 1960 novel To Kill a Mockingbird.', '1926-04-28', 'American'),
('George', 'Orwell', 'English novelist, essayist, journalist and critic whose work is marked by lucid prose.', '1903-06-25', 'British'),
('Jane', 'Austen', 'English novelist known primarily for her six major novels.', '1775-12-16', 'British'),
('J.D.', 'Salinger', 'American writer known for his 1951 novel The Catcher in the Rye.', '1919-01-01', 'American'),
('William', 'Golding', 'British novelist, playwright, and poet who won a Nobel Prize in Literature.', '1911-09-19', 'British'),
('J.K.', 'Rowling', 'British author, best known for the Harry Potter series.', '1965-07-31', 'British'),
('J.R.R.', 'Tolkien', 'English writer, poet, philologist, and academic, best known for The Hobbit and The Lord of the Rings.', '1892-01-03', 'British'),
('Agatha', 'Christie', 'English writer known for her detective novels.', '1890-09-15', 'British'),
('Stephen', 'King', 'American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels.', '1947-09-21', 'American'),
('Margaret', 'Atwood', 'Canadian poet, novelist, literary critic, essayist, teacher, environmental activist, and inventor.', '1939-11-18', 'Canadian'),
('Toni', 'Morrison', 'American novelist, essayist, book editor, and college professor.', '1931-02-18', 'American');

-- 3. Insert Categories
INSERT INTO categories (name, description) VALUES
('Fiction', 'Imaginative literature including novels and short stories'),
('Classic Literature', 'Timeless works of fiction that have stood the test of time'),
('Mystery & Thriller', 'Suspenseful stories involving crime, puzzles, or danger'),
('Romance', 'Stories focused on love and relationships'),
('Science Fiction', 'Fiction dealing with futuristic concepts and advanced technology'),
('Fantasy', 'Fiction involving magical or supernatural elements'),
('Horror', 'Fiction intended to frighten, unsettle, or create suspense'),
('Young Adult', 'Fiction targeted at teenage readers'),
('Children''s Books', 'Books written specifically for children'),
('Biography & Memoir', 'Non-fiction accounts of real people''s lives'),
('History', 'Non-fiction about past events'),
('Self-Help', 'Books offering advice for improving one''s life'),
('Business', 'Books about business, economics, and management'),
('Cooking', 'Books about food preparation and recipes'),
('Travel', 'Books about travel destinations and experiences'),
('Health & Fitness', 'Books about physical and mental wellness'),
('Art & Design', 'Books about visual arts and design'),
('Technology', 'Books about computers, programming, and technology'),
('Poetry', 'Collections of poems and poetic works'),
('Drama', 'Plays and theatrical works');

-- 4. Insert Book Series
INSERT INTO book_series (name, description, total_books, is_completed) VALUES
('Harry Potter', 'A series of fantasy novels following the young wizard Harry Potter', 7, true),
('The Lord of the Rings', 'Epic high-fantasy trilogy', 3, true),
('Chronicles of Narnia', 'Series of seven fantasy novels', 7, true),
('Sherlock Holmes', 'Collection of detective stories featuring Sherlock Holmes', 60, true),
('The Hunger Games', 'Dystopian science fiction trilogy', 3, true);

-- 5. Insert Books
INSERT INTO books (title, description, isbn, isbn13, price, original_price, stock, page_count, format, published_date, publisher_id, primary_category_id, series_id, series_number, is_bestseller, is_featured) VALUES
-- Classic Literature
('The Great Gatsby', 'A classic American novel set in the summer of 1922, exploring themes of decadence, idealism, resistance to change, social upheaval, and excess.', '9780743273565', '978-0-7432-7356-5', 15.99, 18.99, 45, 180, 'Paperback', '1925-04-10', 1, 2, NULL, NULL, true, true),
('To Kill a Mockingbird', 'A gripping tale of racial injustice and loss of innocence in the American South during the 1930s.', '9780061120084', '978-0-06-112008-4', 18.50, 22.99, 38, 376, 'Paperback', '1960-07-11', 2, 2, NULL, NULL, true, true),
('1984', 'A dystopian social science fiction novel about totalitarian control and surveillance.', '9780452284234', '978-0-452-28423-4', 16.75, 19.99, 52, 328, 'Paperback', '1949-06-08', 1, 2, NULL, NULL, true, true),
('Pride and Prejudice', 'A romantic novel of manners set in Georgian England, following Elizabeth Bennet.', '9780141439518', '978-0-14-143951-8', 14.99, 17.99, 41, 432, 'Paperback', '1813-01-28', 1, 4, NULL, NULL, true, false),
('The Catcher in the Rye', 'A coming-of-age story following teenager Holden Caulfield in New York City.', '9780316769488', '978-0-316-76948-8', 17.25, 20.99, 29, 277, 'Paperback', '1951-07-16', 2, 2, NULL, NULL, true, false),

-- Fantasy Series
('Harry Potter and the Philosopher''s Stone', 'The first book in the Harry Potter series, introducing the young wizard Harry Potter.', '9780747532699', '978-0-7475-3269-9', 24.99, 29.99, 67, 223, 'Hardcover', '1997-06-26', 2, 6, 1, 1, true, true),
('Harry Potter and the Chamber of Secrets', 'The second book in the Harry Potter series, where Harry returns to Hogwarts.', '9780747538493', '978-0-7475-3849-3', 24.99, 29.99, 58, 251, 'Hardcover', '1998-07-02', 2, 6, 1, 2, true, false),
('Harry Potter and the Prisoner of Azkaban', 'The third Harry Potter book, introducing Sirius Black and the Marauder''s Map.', '9780747542155', '978-0-7475-4215-5', 24.99, 29.99, 44, 317, 'Hardcover', '1999-07-08', 2, 6, 1, 3, true, false),

-- Tolkien Works
('The Hobbit', 'A fantasy novel about Bilbo Baggins'' unexpected journey to help reclaim the Dwarf Kingdom of Erebor.', '9780547928227', '978-0-547-92822-7', 22.99, 26.99, 73, 366, 'Paperback', '1937-09-21', 2, 6, NULL, NULL, true, true),
('The Fellowship of the Ring', 'The first volume of The Lord of the Rings, following Frodo''s quest to destroy the One Ring.', '9780547928210', '978-0-547-92821-0', 25.99, 29.99, 35, 479, 'Paperback', '1954-07-29', 2, 6, 2, 1, true, false),
('The Two Towers', 'The second volume of The Lord of the Rings, continuing the epic quest.', '9780547928203', '978-0-547-92820-3', 25.99, 29.99, 32, 415, 'Paperback', '1954-11-11', 2, 6, 2, 2, true, false),

-- Modern Fiction
('The Handmaid''s Tale', 'A dystopian novel set in a totalitarian society where women have lost most of their rights.', '9780385490818', '978-0-385-49081-8', 19.99, 24.99, 28, 311, 'Paperback', '1985-08-17', 1, 5, NULL, NULL, false, true),
('Beloved', 'A novel about the trauma of slavery and its aftermath in post-Civil War Ohio.', '9781400033416', '978-1-4000-3341-6', 21.99, 25.99, 22, 321, 'Paperback', '1987-09-02', 1, 2, NULL, NULL, false, false),

-- Mystery & Thriller
('The Murder of Roger Ackroyd', 'A classic Hercule Poirot mystery novel with a famous twist ending.', '9780062073556', '978-0-06-207355-6', 16.99, 19.99, 33, 288, 'Paperback', '1926-06-01', 2, 3, NULL, NULL, false, false),
('The Girl with the Dragon Tattoo', 'A psychological thriller about a journalist and a hacker investigating a disappearance.', '9780307949486', '978-0-307-94948-6', 18.99, 22.99, 25, 590, 'Paperback', '2005-08-01', 1, 3, NULL, NULL, false, true),

-- Horror
('The Shining', 'A horror novel about a family staying at an isolated hotel with a violent past.', '9780307743657', '978-0-307-74365-7', 17.99, 21.99, 31, 447, 'Paperback', '1977-01-28', 1, 7, NULL, NULL, false, false),
('It', 'A horror novel about a group of children who encounter a shape-shifting entity.', '9781501142970', '978-1-5011-4297-0', 19.99, 24.99, 27, 1138, 'Paperback', '1986-09-15', 1, 7, NULL, NULL, false, true),

-- Young Adult
('The Hunger Games', 'A dystopian novel about a televised fight to the death in a post-apocalyptic society.', '9780439023528', '978-0-439-02352-8', 16.99, 19.99, 42, 374, 'Paperback', '2008-09-14', 5, 8, 5, 1, true, true),
('Catching Fire', 'The second book in The Hunger Games trilogy.', '9780439023498', '978-0-439-02349-8', 16.99, 19.99, 38, 391, 'Paperback', '2009-09-01', 5, 8, 5, 2, true, false),

-- Non-Fiction
('Sapiens: A Brief History of Humankind', 'A narrative about human history from the Stone Age to the twenty-first century.', '9780062316097', '978-0-06-231609-7', 23.99, 28.99, 19, 443, 'Paperback', '2014-09-04', 2, 11, NULL, NULL, false, true),
('Educated', 'A memoir about a woman who grows up in a survivalist family and eventually pursues education.', '9780399590504', '978-0-399-59050-4', 20.99, 24.99, 26, 334, 'Hardcover', '2018-02-20', 1, 10, NULL, NULL, false, true);

-- 6. Insert Book-Author Relationships
INSERT INTO book_authors (book_id, author_id, role, order_index) VALUES
-- Single authors
(1, 1, 'Author', 0),  -- The Great Gatsby - F. Scott Fitzgerald
(2, 2, 'Author', 0),  -- To Kill a Mockingbird - Harper Lee
(3, 3, 'Author', 0),  -- 1984 - George Orwell
(4, 4, 'Author', 0),  -- Pride and Prejudice - Jane Austen
(5, 5, 'Author', 0),  -- The Catcher in the Rye - J.D. Salinger
(6, 7, 'Author', 0),  -- Harry Potter 1 - J.K. Rowling
(7, 7, 'Author', 0),  -- Harry Potter 2 - J.K. Rowling
(8, 7, 'Author', 0),  -- Harry Potter 3 - J.K. Rowling
(9, 8, 'Author', 0),  -- The Hobbit - J.R.R. Tolkien
(10, 8, 'Author', 0), -- Fellowship - J.R.R. Tolkien
(11, 8, 'Author', 0), -- Two Towers - J.R.R. Tolkien
(12, 11, 'Author', 0), -- The Handmaid's Tale - Margaret Atwood
(13, 12, 'Author', 0), -- Beloved - Toni Morrison
(14, 9, 'Author', 0),  -- Roger Ackroyd - Agatha Christie
(15, 10, 'Author', 0), -- The Shining - Stephen King
(16, 10, 'Author', 0), -- It - Stephen King
(6, 6, 'Author', 0);   -- Lord of the Flies - William Golding

-- Note: Books 17-20 would need corresponding author IDs that we haven't inserted yet
-- For now, let's add a few more authors for the remaining books

INSERT INTO authors (first_name, last_name, biography, birth_date, nationality) VALUES
('Stieg', 'Larsson', 'Swedish journalist and writer, best known for the Millennium trilogy.', '1954-08-15', 'Swedish'),
('Suzanne', 'Collins', 'American television writer and author, best known for The Hunger Games series.', '1962-08-10', 'American'),
('Yuval Noah', 'Harari', 'Israeli public intellectual, historian and a professor.', '1976-02-24', 'Israeli'),
('Tara', 'Westover', 'American memoirist, essayist and historian.', '1986-09-27', 'American');

-- Complete the book-author relationships
INSERT INTO book_authors (book_id, author_id, role, order_index) VALUES
(15, 13, 'Author', 0), -- The Girl with the Dragon Tattoo - Stieg Larsson
(17, 14, 'Author', 0), -- The Hunger Games - Suzanne Collins
(18, 14, 'Author', 0), -- Catching Fire - Suzanne Collins
(19, 15, 'Author', 0), -- Sapiens - Yuval Noah Harari
(20, 16, 'Author', 0); -- Educated - Tara Westover

-- 7. Insert Book Categories (many-to-many relationships)
INSERT INTO book_categories (book_id, category_id) VALUES
-- Classic Literature
(1, 1), (1, 2), -- The Great Gatsby: Fiction, Classic Literature
(2, 1), (2, 2), -- To Kill a Mockingbird: Fiction, Classic Literature
(3, 1), (3, 2), (3, 5), -- 1984: Fiction, Classic Literature, Science Fiction
(4, 1), (4, 2), (4, 4), -- Pride and Prejudice: Fiction, Classic Literature, Romance
(5, 1), (5, 2), -- The Catcher in the Rye: Fiction, Classic Literature

-- Fantasy
(6, 1), (6, 6), (6, 8), -- Harry Potter 1: Fiction, Fantasy, Young Adult
(7, 1), (7, 6), (7, 8), -- Harry Potter 2: Fiction, Fantasy, Young Adult
(8, 1), (8, 6), (8, 8), -- Harry Potter 3: Fiction, Fantasy, Young Adult
(9, 1), (9, 6), -- The Hobbit: Fiction, Fantasy
(10, 1), (10, 6), -- Fellowship: Fiction, Fantasy
(11, 1), (11, 6), -- Two Towers: Fiction, Fantasy

-- Modern Fiction
(12, 1), (12, 5), -- The Handmaid's Tale: Fiction, Science Fiction
(13, 1), (13, 2), -- Beloved: Fiction, Classic Literature

-- Mystery & Thriller
(14, 1), (14, 3), -- Roger Ackroyd: Fiction, Mystery & Thriller
(15, 1), (15, 3), -- Dragon Tattoo: Fiction, Mystery & Thriller

-- Horror
(16, 1), (16, 7), -- The Shining: Fiction, Horror
(17, 1), (17, 7), -- It: Fiction, Horror

-- Young Adult
(18, 1), (18, 5), (18, 8), -- The Hunger Games: Fiction, Science Fiction, Young Adult
(19, 1), (19, 5), (19, 8), -- Catching Fire: Fiction, Science Fiction, Young Adult

-- Non-Fiction
(20, 11), -- Sapiens: History
(21, 10); -- Educated: Biography & Memoir

-- 8. Insert Sample Reviews
INSERT INTO reviews (book_id, reviewer_name, reviewer_email, rating, title, comment, is_verified_purchase, helpful_count) VALUES
(1, 'John Smith', 'john.smith@email.com', 5, 'A timeless masterpiece', 'Fitzgerald''s prose is absolutely beautiful. The symbolism and themes are as relevant today as they were nearly a century ago.', true, 23),
(1, 'Sarah Johnson', 'sarah.j@email.com', 4, 'Great but heavy', 'Beautiful writing but quite heavy thematically. Definitely worth reading for the literary value.', true, 15),
(2, 'Michael Brown', 'mike.brown@email.com', 5, 'Essential reading', 'Every person should read this book. Harper Lee created something truly special that speaks to justice and humanity.', true, 31),
(3, 'Emily Davis', 'emily.d@email.com', 5, 'Prophetic and terrifying', 'Orwell''s vision of the future is chillingly accurate in many ways. A must-read for understanding modern society.', true, 42),
(3, 'David Wilson', 'david.w@email.com', 4, 'Thought-provoking', 'Dense but incredibly important. Makes you think about privacy, freedom, and government control.', false, 18),
(6, 'Lisa Chen', 'lisa.chen@email.com', 5, 'Magical beginning', 'The start of an incredible journey! Perfect for both children and adults. Rowling created a world I never want to leave.', true, 67),
(6, 'Tom Anderson', 'tom.a@email.com', 5, 'Pure magic', 'Started reading this to my kids and ended up more invested than they were! Brilliant storytelling.', true, 29),
(9, 'Jennifer Lee', 'jen.lee@email.com', 5, 'Adventure perfection', 'Tolkien''s world-building is unmatched. The Hobbit is the perfect introduction to Middle-earth.', true, 34),
(12, 'Amanda White', 'amanda.w@email.com', 4, 'Disturbing but important', 'Atwood''s vision is terrifying because it feels so possible. Excellent writing, difficult subject matter.', true, 26),
(15, 'Robert Taylor', 'rob.taylor@email.com', 4, 'Gripping thriller', 'Couldn''t put it down! Complex characters and an intricate plot. Looking forward to the rest of the series.', true, 19),
(18, 'Jessica Martinez', 'jessica.m@email.com', 5, 'Addictive dystopian fiction', 'Collins created a compelling world with strong characters. Perfect blend of action, romance, and social commentary.', true, 45),
(20, 'Mark Thompson', 'mark.t@email.com', 5, 'Eye-opening history', 'Harari makes complex historical concepts accessible and engaging. Changed how I think about human civilization.', true, 38),
(21, 'Rachel Green', 'rachel.g@email.com', 5, 'Powerful memoir', 'Westover''s story is both heartbreaking and inspiring. Beautifully written account of education''s transformative power.', true, 52);
