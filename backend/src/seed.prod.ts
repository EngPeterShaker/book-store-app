import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Book } from './entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

async function seedProduction() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const bookRepository = app.get<Repository<Book>>(getRepositoryToken(Book));

  try {
    // Check if books already exist
    const existingBooks = await bookRepository.count();
    if (existingBooks > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    // Sample books for production
    const sampleBooks = [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
        price: 12.99,
        isbn: '978-0743273565',
        publishedDate: new Date('1925-04-10'),
        genre: 'Classic Fiction'
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'The story of young Scout Finch and her father Atticus in a racially divided Alabama town.',
        price: 14.99,
        isbn: '978-0446310789',
        publishedDate: new Date('1960-07-11'),
        genre: 'Classic Fiction'
      },
      {
        title: '1984',
        author: 'George Orwell',
        description: 'A dystopian novel about totalitarianism and surveillance society.',
        price: 13.99,
        isbn: '978-0451524935',
        publishedDate: new Date('1949-06-08'),
        genre: 'Dystopian Fiction'
      }
    ];

    for (const bookData of sampleBooks) {
      const book = bookRepository.create(bookData);
      await bookRepository.save(book);
    }

    console.log('Production database seeded successfully!');
  } catch (error) {
    console.error('Error seeding production database:', error);
  } finally {
    await app.close();
  }
}

// Only run if called directly
if (require.main === module) {
  seedProduction();
}

export { seedProduction };
