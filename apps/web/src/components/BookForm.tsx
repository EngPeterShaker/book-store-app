import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateBookDto } from '../types/Book';
import { booksApi } from '../services/api';
import './BookForm.css';

const BookForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<CreateBookDto>({
    title: '',
    author: '',
    description: '',
    isbn: '',
    price: 0,
    stock: 0,
    genre: '',
    publishedDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      const fetchBook = async () => {
        try {
          const book = await booksApi.getById(parseInt(id));
          setFormData({
            title: book.title,
            author: book.author,
            description: book.description || '',
            isbn: book.isbn,
            price: book.price,
            stock: book.stock,
            genre: book.genre || '',
            publishedDate: book.publishedDate || '',
          });
        } catch (err) {
          setError('Failed to fetch book details');
          console.error('Error fetching book:', err);
        }
      };
      fetchBook();
    }
  }, [isEditing, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing && id) {
        await booksApi.update(parseInt(id), formData);
      } else {
        await booksApi.create(formData);
      }
      navigate('/');
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} book`);
      console.error(`Error ${isEditing ? 'updating' : 'creating'} book:`, err);
    } finally {
      setLoading(false);
    }
  };

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Fantasy',
    'Romance', 'Thriller', 'Biography', 'History', 'Self-Help', 'Technical'
  ];

  return (
    <div className="book-form-container">
      <h2>{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="isbn">ISBN *</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
            placeholder="978-0-123456-78-9"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            >
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="publishedDate">Published Date</label>
            <input
              type="date"
              id="publishedDate"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Enter book description..."
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Book' : 'Add Book')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
