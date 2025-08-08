import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BooksService } from './books/books.service';

const sampleBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description:
      "Set in the summer of 1922, The Great Gatsby follows narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    isbn: '978-0-7432-7356-5',
    price: 15.99,
    stock: 25,
    genre: 'Classic Fiction',
    publishedDate: new Date('1925-04-10'),
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description:
      'A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice.',
    isbn: '978-0-06-112008-4',
    price: 18.5,
    stock: 30,
    genre: 'Classic Fiction',
    publishedDate: new Date('1960-07-11'),
  },
  {
    title: '1984',
    author: 'George Orwell',
    description:
      "A dystopian social science fiction novel that follows the life of Winston Smith, a low ranking member of 'the Party'.",
    isbn: '978-0-452-28423-4',
    price: 16.75,
    stock: 20,
    genre: 'Dystopian Fiction',
    publishedDate: new Date('1949-06-08'),
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description:
      'A romantic novel of manners written by Jane Austen in 1813. The novel follows the character development of Elizabeth Bennet.',
    isbn: '978-0-14-143951-8',
    price: 14.99,
    stock: 40,
    genre: 'Romance',
    publishedDate: new Date('1813-01-28'),
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    description:
      'The story of Holden Caulfield, a teenager from New York City who is expelled from his prep school.',
    isbn: '978-0-316-76948-0',
    price: 17.25,
    stock: 15,
    genre: 'Coming of Age',
    publishedDate: new Date('1951-07-16'),
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J.K. Rowling',
    description:
      "The first novel in the Harry Potter series and Rowling's debut novel.",
    isbn: '978-0-7475-3269-9',
    price: 19.99,
    stock: 50,
    genre: 'Fantasy',
    publishedDate: new Date('1997-06-26'),
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description:
      "A children's fantasy novel about the adventures of hobbit Bilbo Baggins.",
    isbn: '978-0-547-92822-7',
    price: 21.5,
    stock: 35,
    genre: 'Fantasy',
    publishedDate: new Date('1937-09-21'),
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    description:
      'A dystopian novel set in a futuristic World State of genetically modified citizens.',
    isbn: '978-0-06-085052-4',
    price: 16.99,
    stock: 22,
    genre: 'Science Fiction',
    publishedDate: new Date('1932-01-01'),
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    description:
      'The first volume in The Lord of the Rings epic fantasy series.',
    isbn: '978-0-547-92837-1',
    price: 24.99,
    stock: 28,
    genre: 'Fantasy',
    publishedDate: new Date('1954-07-29'),
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    description:
      'A science fiction novel set in the distant future amidst a feudal interstellar society.',
    isbn: '978-0-441-17271-9',
    price: 22.75,
    stock: 18,
    genre: 'Science Fiction',
    publishedDate: new Date('1965-08-01'),
  },
  {
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    description:
      'A mystery thriller novel involving a conspiracy within the Catholic Church.',
    isbn: '978-0-307-47437-6',
    price: 19.25,
    stock: 32,
    genre: 'Mystery Thriller',
    publishedDate: new Date('2003-03-18'),
  },
  {
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    description:
      'A psychological thriller about a marriage gone terribly wrong.',
    isbn: '978-0-307-58836-4',
    price: 18.99,
    stock: 26,
    genre: 'Psychological Thriller',
    publishedDate: new Date('2012-06-05'),
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description:
      'A novel about a young Andalusian shepherd in his journey to the pyramids of Egypt.',
    isbn: '978-0-06-231500-7',
    price: 15.5,
    stock: 45,
    genre: 'Philosophical Fiction',
    publishedDate: new Date('1988-01-01'),
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    description: "A narrative of humanity's creation and evolution.",
    isbn: '978-0-06-231609-7',
    price: 23.99,
    stock: 20,
    genre: 'Non-Fiction',
    publishedDate: new Date('2011-01-01'),
  },
  {
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    description:
      'A crime thriller novel about a journalist and a computer hacker investigating a wealthy family.',
    isbn: '978-0-307-47347-8',
    price: 17.75,
    stock: 24,
    genre: 'Crime Thriller',
    publishedDate: new Date('2005-08-01'),
  },
];

async function seed() {
  console.log('Starting database seeding...');

  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    const booksService = app.get(BooksService);

    // Check if books already exist
    const existingBooks = await booksService.findAll();
    if (existingBooks.length > 0) {
      console.log(
        `Database already contains ${existingBooks.length} books. Skipping seed.`,
      );
      await app.close();
      return;
    }

    console.log('Adding sample books to database...');

    for (const bookData of sampleBooks) {
      try {
        // Convert publishedDate to ISO string
        const bookDto = {
          ...bookData,
          publishedDate: bookData.publishedDate.toISOString(),
        };
        const book = await booksService.create(bookDto);
        console.log(`✓ Added: "${book.title}" by ${book.author}`);
      } catch (error) {
        console.error(`✗ Failed to add "${bookData.title}":`, error.message);
      }
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`📚 Added ${sampleBooks.length} books to the database.`);

    await app.close();
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  seed();
}

export { seed };
