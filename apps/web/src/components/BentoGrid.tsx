import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { booksApi } from '../services/api';

interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
  cover_url?: string;
  publisher?: string; // Make publisher optional to match API
  price: number;
  genre?: string;
}

interface Publisher {
  name: string;
  description: string;
  location?: string;
  founded?: string;
  website?: string;
  logo_url?: string;
  banner_url?: string;
  tagline?: string;
  city?: string;
  state?: string;
  country?: string;
}

const MysteryPick: React.FC<{ books: Book[] }> = ({ books }) => {
  const { t } = useLanguage();
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [revealedBook, setRevealedBook] = useState<Book | null>(null);

  const handleUnwrap = () => {
    if (books.length > 0) {
      const randomBook = books[Math.floor(Math.random() * books.length)];
      setRevealedBook(randomBook);
      setIsUnwrapped(true);
    }
  };

  if (isUnwrapped && revealedBook) {
    return (
      <div className="mystery-pick mystery-pick--revealed">
        <div className="book-cover-small">
          <img
            src={revealedBook.cover_url || '/placeholder-book.jpg'}
            alt={revealedBook.title}
          />
        </div>
        <div className="book-info">
          <h4 style={{ fontFamily: 'var(--font-family-serif)' }}>
            {revealedBook.title}
          </h4>
          <p className="book-author">by {revealedBook.author}</p>
          <p className="book-price">${revealedBook.price}</p>
          <Link to={`/books/${revealedBook.id}`} className="book-link">
            {t('common.viewDetails')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mystery-pick">
      <div className="wrapped-cover" onClick={handleUnwrap}>
        <div className="brown-paper">
          <span className="unwrap-text">{t('mystery.clickToUnwrap')}</span>
        </div>
      </div>
      <h4>{t('mystery.title')}</h4>
      <p>{t('mystery.genre')}</p>
      <p>{t('mystery.firstSentence')}</p>
    </div>
  );
};

const BentoGrid: React.FC = () => {
  const { t, dir } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentBookColor, setCurrentBookColor] = useState('#fefefe');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get detailed publishers first
        try {
          const detailedPublishers = await booksApi.getAllPublishersWithDetails();
          if (detailedPublishers && detailedPublishers.length > 0) {
            setPublishers(detailedPublishers);
          }
        } catch (error) {
          console.log('Detailed publishers not available, falling back to names only');
        }

        // Get books
        const allBooks = await booksApi.getAll();
        setBooks(allBooks.slice(0, 12)); // Limit to 12 books for the grid

      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Extract dominant color from book cover (simplified - in real app would use canvas API)
  const getBookColor = (book: Book) => {
    // This is a simplified version - in production, you'd extract actual colors from images
    const colors = ['#fefefe', '#f7fafc', '#e2e8f0', '#cbd5e0', '#a0aec0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleBookHover = (book: Book) => {
    const color = getBookColor(book);
    setCurrentBookColor(color);
  };

  if (loading) {
    return (
      <div className="loading">
        {t('common.loading')}
      </div>
    );
  }

  return (
    <div
      className="bento-grid-page"
      dir={dir}
      style={{
        background: `linear-gradient(135deg, ${currentBookColor} 0%, #f7fafc 100%)`,
        transition: 'background 0.8s ease'
      }}
    >
      <div className="bento-grid">
        {/* Featured Book - Large */}
        {books[0] && (
          <div className="bento-item bento-item--large">
            <div className="featured-book">
              <div className="book-cover-large">
                <img
                  src={books[0].cover_url || '/placeholder-book.jpg'}
                  alt={books[0].title}
                  onMouseEnter={() => handleBookHover(books[0])}
                />
                <div className="book-overlay">
                  <h2 style={{ fontFamily: 'var(--font-family-serif)' }}>
                    {books[0].title}
                  </h2>
                  <p className="book-author">by {books[0].author}</p>
                  <Link to={`/books/${books[0].id}`} className="read-more-btn">
                    {t('common.viewDetails')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Author Quote */}
        <div className="bento-item bento-item--quote">
          <div className="author-quote">
            <blockquote style={{ fontFamily: 'var(--font-family-serif)', fontStyle: 'italic' }}>
              "A reader lives a thousand lives before he dies. The man who never reads lives only one."
            </blockquote>
            <cite>— George R.R. Martin</cite>
          </div>
        </div>

        {/* Publisher Showcase */}
        {publishers[0] && (
          <div className="bento-item bento-item--publisher">
            <div className="publisher-showcase">
              <h3>{t('nav.publishers')}</h3>
              <div className="publisher-card">
                <img
                  src={publishers[0].logo_url || '/placeholder-publisher.jpg'}
                  alt={publishers[0].name}
                  className="publisher-logo"
                />
                <h4>{publishers[0].name}</h4>
                <p>{publishers[0].description ? publishers[0].description.substring(0, 100) : 'No description available'}...</p>
                <Link to={`/publishers/${encodeURIComponent(publishers[0].name)}`} className="publisher-link">
                  {t('publisher.books')} →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mystery Pick */}
        <div className="bento-item bento-item--mystery">
          <MysteryPick books={books.slice(7, 12)} />
        </div>

        {/* Book Grid Items */}
        {books.slice(1, 7).map((book, index) => (
          <div
            key={book.id}
            className={`bento-item bento-item--book ${index % 2 === 0 ? 'bento-item--vertical' : 'bento-item--horizontal'}`}
          >
            <div className="book-card-compact">
              <div className="book-cover-small">
                <img
                  src={book.cover_url || '/placeholder-book.jpg'}
                  alt={book.title}
                  onMouseEnter={() => handleBookHover(book)}
                />
              </div>
              <div className="book-info">
                <h4 style={{ fontFamily: 'var(--font-family-serif)' }}>
                  {book.title}
                </h4>
                <p className="book-author">by {book.author}</p>
                <p className="book-price">${book.price}</p>
                <Link to={`/books/${book.id}`} className="book-link">
                  {t('common.viewDetails')}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Promotional Block */}
        <div className="bento-item bento-item--promo">
          <div className="promo-block">
            <h3>{t('home.newArrivals')}</h3>
            <p>{t('home.discoverBooks')}</p>
            <Link to="/books" className="promo-btn">
              {t('home.browseCollection')}
            </Link>
          </div>
        </div>

        {/* Statistics Block */}
        <div className="bento-item bento-item--stats">
          <div className="stats-block">
            <div className="stat">
              <span className="stat-number">{books.length}+</span>
              <span className="stat-label">{t('home.books')}</span>
            </div>
            <div className="stat">
              <span className="stat-number">{publishers.length}+</span>
              <span className="stat-label">{t('home.publishers')}</span>
            </div>
            <div className="stat">
              <span className="stat-number">1000+</span>
              <span className="stat-label">{t('home.readers')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
