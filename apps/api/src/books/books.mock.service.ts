import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from '../types/book.interface';

@Injectable()
export class BooksMockService {
  private books: Book[] = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publisher: "Charles Scribner's Sons",
      description: "A classic American novel set in the summer of 1922.",
      isbn: "978-0-7432-7356-5",
      price: 15.99,
      publishedDate: "1925-04-10",
      imageUrl: "/images/great-gatsby.jpg",
      category: "Classic Literature",
      inStock: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      publisher: "J.B. Lippincott & Co.",
      description: "A gripping tale of coming-of-age in the American South.",
      isbn: "978-0-06-112008-4",
      price: 18.50,
      publishedDate: "1960-07-11",
      imageUrl: "/images/to-kill-a-mockingbird.jpg",
      category: "Classic Literature",
      inStock: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      publisher: "Secker & Warburg",
      description: "A dystopian social science fiction novel.",
      isbn: "978-0-452-28423-4",
      price: 16.75,
      publishedDate: "1949-06-08",
      imageUrl: "/images/1984.jpg",
      category: "Science Fiction",
      inStock: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ];

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook: Book = {
      id: Math.max(...this.books.map(b => b.id)) + 1,
      title: createBookDto.title,
      author: createBookDto.author || '',
      publisher: createBookDto.publisher,
      description: createBookDto.description || '',
      isbn: createBookDto.isbn,
      price: createBookDto.price,
      publishedDate: createBookDto.publishedDate || new Date().toISOString(),
      imageUrl: undefined, // Not in DTO
      category: createBookDto.genre, // Use genre from DTO
      inStock: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.books.push(newBook);
    return newBook;
  }

  async findAll(): Promise<Book[]> {
    return this.books;
  }

  async findOne(id: number): Promise<Book> {
    const book = this.books.find(b => b.id === id);
    if (!book) {
      throw new Error(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const bookIndex = this.books.findIndex(b => b.id === id);
    if (bookIndex === -1) {
      throw new Error(`Book with ID ${id} not found`);
    }
    
    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...updateBookDto,
      updated_at: new Date().toISOString(),
    };
    return this.books[bookIndex];
  }

  async remove(id: number): Promise<void> {
    const bookIndex = this.books.findIndex(b => b.id === id);
    if (bookIndex === -1) {
      throw new Error(`Book with ID ${id} not found`);
    }
    this.books.splice(bookIndex, 1);
  }

  async findByGenre(genre: string): Promise<Book[]> {
    return this.books.filter(book => 
      book.category && book.category.toLowerCase().includes(genre.toLowerCase())
    );
  }

  async search(searchTerm: string): Promise<Book[]> {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.description && book.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  async getCount(): Promise<number> {
    return this.books.length;
  }
}
