require('dotenv').config({ path: '.env.supabase' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'https://tmytkcwtghcexpdbudki.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRteXRrY3d0Z2hjZXhwZGJ1ZGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4Mjk5NzQsImV4cCI6MjA3MDQwNTk3NH0.ZvbEGx6Q01-uS27CTo8mnDkvNf2FtY3eLDbbzhw6M9M';

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample books to add
const SAMPLE_BOOKS = [
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
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    publisher: 'Bloomsbury Publishing',
    description: 'The first book in the Harry Potter series.',
    isbn: '978-0747532699',
    price: 12.99,
    stock: 25,
    genre: 'Fantasy',
    published_date: '1997-06-26'
  }
];

async function addSampleBooks() {
  console.log('Adding sample books...');

  for (const book of SAMPLE_BOOKS) {
    try {
      // Get publisher ID
      const { data: publisher, error: pubError } = await supabase
        .from('publishers')
        .select('id')
        .eq('name', book.publisher)
        .single();

      if (pubError || !publisher) {
        console.error(`Publisher not found for book: ${book.title} (${book.publisher})`);
        continue;
      }

      // Check if book already exists
      const { data: existingBook } = await supabase
        .from('books')
        .select('id, title')
        .eq('title', book.title)
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
        console.error(`Error adding book "${book.title}":`, bookError.message);
      } else {
        console.log(`✓ Added book: "${book.title}" by ${book.author} (ID: ${newBook.id})`);

        // Add author and category logic would go here...
      }
    } catch (error) {
      console.error(`Unexpected error processing book "${book.title}":`, error.message);
    }
  }

  console.log('Finished adding sample books!');
}

// Test connection first
async function testConnection() {
  try {
    const { data, error } = await supabase.from('publishers').select('count').limit(1);
    if (error) {
      console.error('Connection test failed:', error.message);
      return false;
    }
    console.log('✓ Database connection successful');
    return true;
  } catch (error) {
    console.error('Connection test failed:', error.message);
    return false;
  }
}

async function main() {
  const connected = await testConnection();
  if (!connected) {
    console.error('Cannot proceed without database connection');
    return;
  }

  await addSampleBooks();
}

main();
