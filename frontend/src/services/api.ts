import axios from 'axios';
import { Book, CreateBookDto, UpdateBookDto } from '../types/Book';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookService = {
  // Get all books
  getAllBooks: async (): Promise<Book[]> => {
    const response = await api.get('/books');
    return response.data;
  },

  // Get book by ID
  getBookById: async (id: number): Promise<Book> => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  // Create new book
  createBook: async (book: CreateBookDto): Promise<Book> => {
    const response = await api.post('/books', book);
    return response.data;
  },

  // Update book
  updateBook: async (id: number, book: UpdateBookDto): Promise<Book> => {
    const response = await api.patch(`/books/${id}`, book);
    return response.data;
  },

  // Delete book
  deleteBook: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
  },

  // Search books
  searchBooks: async (query: string): Promise<Book[]> => {
    const response = await api.get(`/books?search=${encodeURIComponent(query)}`);
    return response.data;
  },

  // Get books by genre
  getBooksByGenre: async (genre: string): Promise<Book[]> => {
    const response = await api.get(`/books?genre=${encodeURIComponent(genre)}`);
    return response.data;
  },
};

export default api;
