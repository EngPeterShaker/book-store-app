import React from 'react';
import { Book } from '../types/Book';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './BookCard.css';

interface BookCardProps {
  book: Book;
  onDelete: (bookId: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDelete }) => {
  const { t } = useLanguage();

  const handleDelete = () => {
    if (window.confirm(`${t('common.delete')} "${book.title}"?`)) {
      onDelete(book.id);
    }
  };

  return (
    <div className="book-card">
      <div className="book-card-header">
        <h3 className="book-title">{book.title}</h3>
        <div className="book-actions">
          <Link to={`/books/${book.id}/edit`} className="edit-btn">
            {t('common.edit')}
          </Link>
          <button onClick={handleDelete} className="delete-btn">
            {t('common.delete')}
          </button>
        </div>
      </div>

      <div className="book-details">
        <p className="book-author">{t('book.by')} {book.author}</p>
        {book.publisher && (
          <p className="book-publisher">
            <Link to={`/publishers/${encodeURIComponent(book.publisher)}`} className="publisher-link">
              {book.publisher}
            </Link>
          </p>
        )}
        {book.genre && <span className="book-genre">{book.genre}</span>}

        {book.description && (
          <p className="book-description">
            {book.description.length > 100
              ? `${book.description.substring(0, 100)}...`
              : book.description}
          </p>
        )}

        <div className="book-info">
          <div className="book-price">${Number(book.price).toFixed(2)}</div>
          <div className="book-stock">
            {t('book.stock')}: {book.stock}
          </div>
        </div>

        <div className="book-meta">
          <small>ISBN: {book.isbn}</small>
          {book.publishedDate && (
            <small>{t('book.publishedDate')}: {new Date(book.publishedDate).getFullYear()}</small>
          )}
        </div>
      </div>

      <div className="book-card-footer">
        <Link to={`/books/${book.id}`} className="view-details-btn">
          {t('common.viewDetails')}
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
