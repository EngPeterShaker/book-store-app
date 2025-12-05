const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://tmytkcwtghcexpdbudki.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRteXRrY3d0Z2hjZXhwZGJ1ZGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3ODIyNDUsImV4cCI6MjA0ODM1ODI0NX0.1p8Lk0G3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3Z3';

const supabase = createClient(supabaseUrl, supabaseKey);

// Mock books data for demonstration
const MOCK_BOOKS = [
  // Hachette Book Group Books
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    publisher: 'Hachette Book Group',
    description: 'A novel about life choices and alternate realities.',
    isbn: '978-0525559474',
    price: 26.00,
    stock: 15,
    genre: 'Fiction',
    published_date: '2020-08-13'
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    publisher: 'Hachette Book Group',
    description: 'An easy & proven way to build good habits & break bad ones.',
    isbn: '978-0735211292',
    price: 27.00,
    stock: 22,
    genre: 'Self-Help',
    published_date: '2018-10-16'
  },

  // HarperCollins Publishers Books
  {
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    publisher: 'HarperCollins Publishers',
    description: 'A mystery about a young woman who raised herself in the marshes.',
    isbn: '978-0735219090',
    price: 18.00,
    stock: 8,
    genre: 'Fiction',
    published_date: '2018-08-14'
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    publisher: 'HarperCollins Publishers',
    description: 'A memoir about a woman who grows up in a survivalist family.',
    isbn: '978-0399590504',
    price: 19.99,
    stock: 12,
    genre: 'Memoir',
    published_date: '2018-02-20'
  },

  // Macmillan Publishers Books
  {
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    publisher: 'Macmillan Publishers',
    description: 'A reclusive Hollywood icon finally tells her story.',
    isbn: '978-1250093452',
    price: 17.00,
    stock: 18,
    genre: 'Fiction',
    published_date: '2017-06-13'
  },

  // Penguin Random House Books
  {
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    publisher: 'Penguin Random House',
    description: 'A counterintuitive approach to living a good life.',
    isbn: '978-0062457714',
    price: 24.99,
    stock: 20,
    genre: 'Self-Help',
    published_date: '2016-09-13'
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    publisher: 'Penguin Random House',
    description: 'The groundbreaking international bestseller.',
    isbn: '978-0062316097',
    price: 24.99,
    stock: 16,
    genre: 'History',
    published_date: '2014-01-01'
  },

  // Oxford University Press Books
  {
    title: 'The Oxford English Dictionary',
    author: 'Oxford University Press',
    publisher: 'Oxford University Press',
    description: 'The definitive record of the English language.',
    isbn: '978-0199212604',
    price: 195.00,
    stock: 3,
    genre: 'Reference',
    published_date: '2005-01-01'
  },
  {
    title: 'Oxford Advanced Learner\'s Dictionary',
    author: 'Oxford University Press',
    publisher: 'Oxford University Press',
    description: 'The world\'s bestselling advanced-level dictionary.',
    isbn: '978-0194799003',
    price: 45.00,
    stock: 10,
    genre: 'Reference',
    published_date: '2015-03-01'
  },

  // Cambridge University Press Books
  {
    title: 'English Grammar in Use',
    author: 'Raymond Murphy',
    publisher: 'Cambridge University Press',
    description: 'The world\'s best-selling grammar book.',
    isbn: '978-0521189064',
    price: 35.00,
    stock: 14,
    genre: 'Education',
    published_date: '2012-02-23'
  },
  {
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    publisher: 'Cambridge University Press',
    description: 'The authoritative introduction to algorithms.',
    isbn: '978-0262033848',
    price: 89.99,
    stock: 6,
    genre: 'Technology',
    published_date: '2009-07-31'
  },

  // Wiley Books
  {
    title: 'Fundamentals of Physics',
    author: 'David Halliday',
    publisher: 'Wiley',
    description: 'The classic textbook for physics students.',
    isbn: '978-0470469118',
    price: 75.00,
    stock: 8,
    genre: 'Science',
    published_date: '2013-01-01'
  },
  {
    title: 'Business Statistics',
    author: 'David F. Groebner',
    publisher: 'Wiley',
    description: 'A comprehensive introduction to business statistics.',
    isbn: '978-0134496498',
    price: 65.00,
    stock: 9,
    genre: 'Business',
    published_date: '2017-01-01'
  },

  // Elsevier Books
  {
    title: 'Gray\'s Anatomy',
    author: 'Henry Gray',
    publisher: 'Elsevier',
    description: 'The definitive textbook of human anatomy.',
    isbn: '978-0323353175',
    price: 125.00,
    stock: 4,
    genre: 'Medical',
    published_date: '2015-09-25'
  },
  {
    title: 'Robbins Basic Pathology',
    author: 'Vinay Kumar',
    publisher: 'Elsevier',
    description: 'A comprehensive textbook of pathology.',
    isbn: '978-0323353175',
    price: 95.00,
    stock: 7,
    genre: 'Medical',
    published_date: '2017-04-01'
  },

  // Pearson Books
  {
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    publisher: 'Pearson',
    description: 'The leading calculus textbook for students.',
    isbn: '978-0538498876',
    price: 85.00,
    stock: 11,
    genre: 'Mathematics',
    published_date: '2011-01-01'
  },
  {
    title: 'Psychology',
    author: 'David G. Myers',
    publisher: 'Pearson',
    description: 'The world\'s bestselling psychology textbook.',
    isbn: '978-1464140815',
    price: 78.00,
    stock: 13,
    genre: 'Psychology',
    published_date: '2014-01-01'
  },

  // McGraw-Hill Education Books
  {
    title: 'Campbell Biology',
    author: 'Lisa A. Urry',
    publisher: 'McGraw-Hill Education',
    description: 'The world\'s most successful majors biology textbook.',
    isbn: '978-0134093413',
    price: 92.00,
    stock: 5,
    genre: 'Biology',
    published_date: '2016-10-01'
  },
  {
    title: 'Chemistry: The Central Science',
    author: 'Theodore E. Brown',
    publisher: 'McGraw-Hill Education',
    description: 'The authoritative introduction to chemistry.',
    isbn: '978-0134414232',
    price: 88.00,
    stock: 9,
    genre: 'Chemistry',
    published_date: '2017-01-01'
  },

  // Bloomsbury Publishing Books
  {
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    publisher: 'Bloomsbury Publishing',
    description: 'The first book in the Harry Potter series.',
    isbn: '978-0747532699',
    price: 12.99,
    stock: 25,
    genre: 'Fantasy',
    published_date: '1997-06-26'
  },
  {
    title: 'A Room with a View',
    author: 'E.M. Forster',
    publisher: 'Bloomsbury Publishing',
    description: 'A classic novel of manners and romance.',
    isbn: '978-0141183049',
    price: 9.99,
    stock: 12,
    genre: 'Fiction',
    published_date: '1908-10-01'
  }
];

async function addBooksToDatabase() {
  try {
    console.log('Starting to add books to database...');

    // First, ensure publishers exist
    const publishers = [...new Set(MOCK_BOOKS.map(book => book.publisher))];
    console.log('Ensuring publishers exist:', publishers);

    for (const publisherName of publishers) {
      // Check if publisher exists
      const { data: existingPublisher } = await supabase
        .from('publishers')
        .select('id, name')
        .eq('name', publisherName)
        .single();

      if (!existingPublisher) {
        // Create publisher
        const { data: newPublisher, error: publisherError } = await supabase
          .from('publishers')
          .insert([{ name: publisherName, is_active: true }])
          .select()
          .single();

        if (publisherError) {
          console.error(`Error creating publisher ${publisherName}:`, publisherError);
        } else {
          console.log(`Created publisher: ${publisherName} (ID: ${newPublisher.id})`);
        }
      } else {
        console.log(`Publisher ${publisherName} already exists (ID: ${existingPublisher.id})`);
      }
    }

    // Now add books
    for (const book of MOCK_BOOKS) {
      try {
        // Get publisher ID
        const { data: publisher } = await supabase
          .from('publishers')
          .select('id')
          .eq('name', book.publisher)
          .single();

        if (!publisher) {
          console.error(`Publisher not found for book: ${book.title}`);
          continue;
        }

        // Check if book already exists
        const { data: existingBook } = await supabase
          .from('books')
          .select('id, title')
          .eq('title', book.title)
          .eq('isbn', book.isbn)
          .single();

        if (existingBook) {
          console.log(`Book "${book.title}" already exists, skipping...`);
          continue;
        }

        // Add book
        const { data: newBook, error: bookError } = await supabase
          .from('books')
          .insert([{
            title: book.title,
            description: book.description,
            isbn: book.isbn,
            price: book.price,
            stock: book.stock,
            published_date: book.published_date,
            publisher_id: publisher.id,
            is_available: true
          }])
          .select()
          .single();

        if (bookError) {
          console.error(`Error adding book "${book.title}":`, bookError);
        } else {
          console.log(`Added book: "${book.title}" by ${book.author} (ID: ${newBook.id})`);

          // Add author if not exists and link to book
          const { data: existingAuthor } = await supabase
            .from('authors')
            .select('id')
            .eq('full_name', book.author)
            .single();

          let authorId;
          if (!existingAuthor) {
            const { data: newAuthor, error: authorError } = await supabase
              .from('authors')
              .insert([{ full_name: book.author }])
              .select()
              .single();

            if (authorError) {
              console.error(`Error creating author ${book.author}:`, authorError);
              continue;
            }
            authorId = newAuthor.id;
            console.log(`Created author: ${book.author} (ID: ${authorId})`);
          } else {
            authorId = existingAuthor.id;
          }

          // Link book to author
          const { error: linkError } = await supabase
            .from('book_authors')
            .insert([{
              book_id: newBook.id,
              author_id: authorId,
              role: 'Author'
            }]);

          if (linkError) {
            console.error(`Error linking book to author for "${book.title}":`, linkError);
          }

          // Add category/genre
          const { data: existingCategory } = await supabase
            .from('categories')
            .select('id')
            .eq('name', book.genre)
            .single();

          let categoryId;
          if (!existingCategory) {
            const { data: newCategory, error: categoryError } = await supabase
              .from('categories')
              .insert([{ name: book.genre }])
              .select()
              .single();

            if (categoryError) {
              console.error(`Error creating category ${book.genre}:`, categoryError);
            } else {
              categoryId = newCategory.id;
              console.log(`Created category: ${book.genre} (ID: ${categoryId})`);
            }
          } else {
            categoryId = existingCategory.id;
          }

          if (categoryId) {
            // Link book to category
            const { error: categoryLinkError } = await supabase
              .from('book_categories')
              .insert([{
                book_id: newBook.id,
                category_id: categoryId
              }]);

            if (categoryLinkError) {
              console.error(`Error linking book to category for "${book.title}":`, categoryLinkError);
            }

            // Set primary category
            await supabase
              .from('books')
              .update({ primary_category_id: categoryId })
              .eq('id', newBook.id);
          }
        }
      } catch (error) {
        console.error(`Unexpected error processing book "${book.title}":`, error);
      }
    }

    console.log('Finished adding books to database!');
  } catch (error) {
    console.error('Database operation failed:', error);
  }
}

addBooksToDatabase();
