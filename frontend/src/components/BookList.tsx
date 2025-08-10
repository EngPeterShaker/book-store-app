import React, { useState, useEffect } from 'react';
import { Book } from '../types/Book';
import { bookService } from '../services/api';
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
        let data: Book[];
        
        if (searchQuery) {
          data = await bookService.searchBooks(searchQuery);
        } else if (genre) {
          data = await bookService.getBooksByGenre(genre);
        } else {
          data = await bookService.getAllBooks();
        }
        
                if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error('API response data is not an array:', response.data);
          setBooks([]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch books');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery, genre]);

  const handleDeleteBook = async (bookId: number) => {
    try {
      await bookService.deleteBook(bookId);
      setBooks(books.filter(book => book.id !== bookId));
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
        <p>{books.length} book{books.length !== 1 ? 's' : ''} found</p>
      </div>
      
      {books.length === 0 ? (
        <div className="no-books">No books found.</div>
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
