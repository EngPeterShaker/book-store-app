import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Book } from '../entities/book.entity';

@Injectable()
export class BooksMockService {
  private books: Book[] = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description: "A classic American novel set in the summer of 1922.",
      isbn: "978-0-7432-7356-5",
      price: 15.99,
      stock: 25,
      genre: "Classic Fiction",
      publishedDate: new Date("1925-04-10"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description: "A gripping tale of coming-of-age in the American South.",
      isbn: "978-0-06-112008-4",
      price: 18.50,
      stock: 30,
      genre: "Classic Fiction",
      publishedDate: new Date("1960-07-11"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      description: "A dystopian social science fiction novel.",
      isbn: "978-0-452-28423-4",
      price: 16.75,
      stock: 20,
      genre: "Dystopian Fiction",
      publishedDate: new Date("1949-06-08"),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook: Book = {
      id: Math.max(...this.books.map(b => b.id)) + 1,
      title: createBookDto.title,
      author: createBookDto.author,
      description: createBookDto.description || '',
      isbn: createBookDto.isbn,
      price: createBookDto.price,
      stock: createBookDto.stock || 0,
      genre: createBookDto.genre || '',
      publishedDate: new Date(createBookDto.publishedDate || new Date()),
      createdAt: new Date(),
      updatedAt: new Date(),
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
    
    const updatedData: any = { ...updateBookDto };
    if (updatedData.publishedDate && typeof updatedData.publishedDate === 'string') {
      updatedData.publishedDate = new Date(updatedData.publishedDate);
    }
    
    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...updatedData,
      updatedAt: new Date(),
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
      book.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  async search(searchTerm: string): Promise<Book[]> {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
