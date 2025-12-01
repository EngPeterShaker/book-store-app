import axios from 'axios';
import { Book, CreateBookDto, UpdateBookDto } from '../types/Book';

// API base URL - can be configured via environment variable
// In production (monorepo), use relative path to /api. In development, use localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging (development only)
if (process.env.NODE_ENV === 'development') {
  api.interceptors.request.use((config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  });
}

// Add response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.config?.url, error.message);
    
    // Handle authentication errors (401) from Vercel SSO
    if (error.response?.status === 401) {
      console.warn('Authentication required - likely Vercel SSO protection is enabled');
      // Return a more user-friendly error
      const authError = new Error('Backend authentication required. Please disable Vercel protection or use local development.');
      authError.name = 'AuthenticationError';
      return Promise.reject(authError);
    }
    
    return Promise.reject(error);
  }
);

export const booksApi = {
  // Get all books
  getAll: async (): Promise<Book[]> => {
    try {
      const response = await api.get('/books');
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error('API returned non-array data for getAll:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error in booksApi.getAll:', error);
      throw error;
    }
  },

  // Get a single book by ID
  getById: async (id: number): Promise<Book> => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  // Create a new book
  create: async (book: CreateBookDto): Promise<Book> => {
    const response = await api.post('/books', book);
    return response.data;
  },

  // Update an existing book
  update: async (id: number, book: UpdateBookDto): Promise<Book> => {
    const response = await api.patch(`/books/${id}`, book);
    return response.data;
  },

  // Delete a book
  delete: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
  },

  // Search books
  search: async (query: string): Promise<Book[]> => {
    try {
      const response = await api.get(`/books?search=${encodeURIComponent(query)}`);
      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error('API returned non-array data for search:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error in booksApi.search:', error);
      throw error;
    }
  },
};

export default api;
