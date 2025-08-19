import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Book } from '../types/Book';
import { booksApi } from '../services/api';
import './BookDetails.css';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await booksApi.getById(parseInt(id));
        setBook(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch book details');
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = async () => {
    if (!book) return;
    
    if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      try {
        await booksApi.delete(book.id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete book');
        console.error('Error deleting book:', err);
      }
    }
  };

  if (loading) return <div className="loading">Loading book details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!book) return <div className="error">Book not found</div>;

  return (
    <div className="book-details">
      <div className="book-details-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Books
        </button>
        <div className="book-actions">
          <Link to={`/books/${book.id}/edit`} className="edit-btn">
            Edit Book
          </Link>
          <button onClick={handleDelete} className="delete-btn">
            Delete Book
          </button>
        </div>
      </div>

      <div className="book-details-content">
        <div className="book-main-info">
          <h1 className="book-title">{book.title}</h1>
          <h2 className="book-author">by {book.author}</h2>
          
          {book.genre && (
            <span className="book-genre-tag">{book.genre}</span>
          )}
          
          <div className="book-pricing">
            <div className="book-price">${Number(book.price).toFixed(2)}</div>
            <div className="book-stock">
              {book.stock > 0 ? (
                <span className="in-stock">In Stock ({book.stock} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>
          </div>
        </div>

        {book.description && (
          <div className="book-description">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
        )}

        <div className="book-metadata">
          <div className="metadata-grid">
            <div className="metadata-item">
              <label>ISBN:</label>
              <span>{book.isbn}</span>
            </div>
            
            {book.publishedDate && (
              <div className="metadata-item">
                <label>Published:</label>
                <span>{new Date(book.publishedDate).toLocaleDateString()}</span>
              </div>
            )}
            
            <div className="metadata-item">
              <label>Added:</label>
              <span>{new Date(book.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="metadata-item">
              <label>Last Updated:</label>
              <span>{new Date(book.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
