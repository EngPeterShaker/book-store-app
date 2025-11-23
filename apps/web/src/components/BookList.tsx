import React, { useState, useEffect } from 'react';
import { Book } from '../types/Book';
import { booksApi } from '../services/api';
import BookCard from './BookCard';
import './BookList.css';

interface BookListProps {
  searchQuery?: string;
  genre?: string;
}

const BookList: React.FC<BookListProps> = ({ searchQuery, genre }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        let data: Book[];
        
        if (searchQuery) {
          data = await booksApi.search(searchQuery);
        } else if (genre) {
          data = await booksApi.getAll(); // TODO: Add genre filter
        } else {
          data = await booksApi.getAll();
        }
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error('API returned non-array data:', data);
          setBooks([]);
          setError('Invalid data format received from server');
        }
      } catch (err) {
        console.error('Error fetching books:', err);
        setBooks([]);
        setError('Failed to fetch books. Please check if the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery, genre]);

  const handleDeleteBook = async (bookId: number) => {
    try {
      await booksApi.delete(bookId);
      // Ensure books is an array before filtering
      if (Array.isArray(books)) {
        setBooks(books.filter(book => book.id !== bookId));
      }
    } catch (err) {
      setError('Failed to delete book');
      console.error('Error deleting book:', err);
    }
  };

  if (loading) return <div className="loading">Loading books...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="book-list">
      <div className="book-list-header">
        <h2>
          {searchQuery ? `Search results for "${searchQuery}"` : 
           genre ? `Books in ${genre}` : 
           'All Books'}
        </h2>
        <p>{Array.isArray(books) ? books.length : 0} book{(Array.isArray(books) && books.length !== 1) ? 's' : ''} found</p>
      </div>
      
      {!Array.isArray(books) || books.length === 0 ? (
        <div className="no-books">
          {!Array.isArray(books) ? 'Error loading books.' : 'No books found.'}
        </div>
      ) : (
        <div className="books-grid">
          {books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={handleDeleteBook}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
