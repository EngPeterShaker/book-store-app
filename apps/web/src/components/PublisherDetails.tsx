import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PUBLISHERS } from '../types/Publisher';
import { Book } from '../types/Book';
import { booksApi } from '../services/api';
import BookCard from './BookCard';
import './PublisherDetails.css';

const PublisherDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const publisherName = name ? decodeURIComponent(name) : '';
  const publisher = PUBLISHERS[publisherName];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const allBooks = await booksApi.getAll();
        const publisherBooks = allBooks.filter(book => book.publisher === publisherName);
        setBooks(publisherBooks);
        setError(null);
      } catch (err) {
        setError('Failed to fetch books');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [publisherName]);

  const handleDelete = async (bookId: number) => {
    try {
      await booksApi.delete(bookId);
      setBooks(books.filter(book => book.id !== bookId));
    } catch (err) {
      setError('Failed to delete book');
      console.error('Error deleting book:', err);
    }
  };

  if (!publisher) {
    return (
      <div className="publisher-not-found">
        <h2>Publisher Not Found</h2>
        <p>We don't have information about "{publisherName}"</p>
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Books
        </button>
      </div>
    );
  }

  return (
    <div className="publisher-details">
      <div className="publisher-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
      </div>

      <div className="publisher-info">
        <h1 className="publisher-name">{publisher.name}</h1>

        <div className="publisher-metadata">
          {publisher.founded && (
            <div className="metadata-item">
              <span className="label">Founded:</span>
              <span className="value">{publisher.founded}</span>
            </div>
          )}
          {publisher.location && (
            <div className="metadata-item">
              <span className="label">Location:</span>
              <span className="value">{publisher.location}</span>
            </div>
          )}
          {publisher.website && (
            <div className="metadata-item">
              <span className="label">Website:</span>
              <a href={publisher.website} target="_blank" rel="noopener noreferrer" className="value">
                {publisher.website}
              </a>
            </div>
          )}
        </div>

        <div className="publisher-description">
          <h2>About</h2>
          <p>{publisher.description}</p>
        </div>
      </div>

      <div className="publisher-books">
        <h2>Books by {publisher.name}</h2>

        {loading && <div className="loading">Loading books...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && books.length === 0 && (
          <div className="no-books">
            <p>No books from this publisher in our collection yet.</p>
            <Link to="/books/new" className="add-book-btn">
              Add a Book
            </Link>
          </div>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="books-grid">
            {books.map(book => (
              <BookCard key={book.id} book={book} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublisherDetails;
