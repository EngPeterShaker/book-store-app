import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PUBLISHERS } from '../types/Publisher';
import { Book } from '../types/Book';
import { booksApi } from '../services/api';
import BookCard from './BookCard';
import './PublisherDetails.css';

// Dynamic publisher data for database publishers
const DYNAMIC_PUBLISHERS: Record<string, any> = {
  'Hachette Book Group': {
    name: 'Hachette Book Group',
    description: 'Hachette Book Group is a publishing company owned by Hachette Livre, the largest publishing company in France, and the third largest trade and educational publisher in the world.',
    founded: '2006',
    location: 'New York, USA',
    website: 'https://www.hachettebookgroup.com'
  },
  'HarperCollins Publishers': {
    name: 'HarperCollins Publishers',
    description: 'HarperCollins Publishers LLC is one of the Big Five English-language publishing companies, headquartered in New York City.',
    founded: '1989',
    location: 'New York, USA',
    website: 'https://www.harpercollins.com'
  },
  'Macmillan Publishers': {
    name: 'Macmillan Publishers',
    description: 'Macmillan Publishers is a global trade publishing company operating in over 70 countries. It is known for publishing quality fiction, nonfiction, and children\'s books.',
    founded: '1843',
    location: 'New York, USA',
    website: 'https://us.macmillan.com'
  },
  'Penguin Random House': {
    name: 'Penguin Random House',
    description: 'Penguin Random House is a multinational publishing house formed in 2013 from the merger of Penguin Books and Random House.',
    founded: '2013',
    location: 'New York, USA',
    website: 'https://www.penguinrandomhouse.com'
  },
  'Scholastic Corporation': {
    name: 'Scholastic Corporation',
    description: 'Scholastic Corporation is an American multinational publishing, education and media company that publishes and distributes children\'s books worldwide.',
    founded: '1920',
    location: 'New York, USA',
    website: 'https://www.scholastic.com'
  },
  'Simon & Schuster': {
    name: 'Simon & Schuster',
    description: 'Simon & Schuster is a prominent American publishing company and a subsidiary of Paramount Global. It is one of the four largest English-language publishers.',
    founded: '1924',
    location: 'New York, USA',
    website: 'https://www.simonandschuster.com'
  }
};

const PublisherDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allPublishers, setAllPublishers] = useState<string[]>([]);

  const publisherName = name ? decodeURIComponent(name) : '';
  const publisher = DYNAMIC_PUBLISHERS[publisherName] || PUBLISHERS[publisherName];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all publishers for the fallback page
        const publishersResponse = await booksApi.getAllPublishers();
        setAllPublishers(publishersResponse);

        // Fetch books for this publisher
        const allBooks = await booksApi.getAll();
        const publisherBooks = allBooks.filter(book => book.publisher === publisherName);
        setBooks(publisherBooks);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    // Combine dynamic publishers from API with static mock publishers
    const combinedPublishers = Array.from(new Set([...allPublishers, ...Object.keys(DYNAMIC_PUBLISHERS), ...Object.keys(PUBLISHERS)]))
      .sort()
      .map(publisherName => {
        // Try to get data from dynamic publishers first, then mock publishers
        const pubData = DYNAMIC_PUBLISHERS[publisherName] || PUBLISHERS[publisherName];
        if (pubData) {
          return pubData;
        }
        // If no data available, create a basic entry
        return {
          name: publisherName,
          description: `Books published by ${publisherName}.`,
          location: 'Location not specified'
        };
      });

    return (
      <div className="publisher-not-found">
        <h2>Publisher Not Found</h2>
        <p>We don't have detailed information about "{publisherName}"</p>
        <p>However, here are all the publishers we have in our database:</p>

        <div className="available-publishers">
          <h3>Available Publishers ({combinedPublishers.length})</h3>
          <div className="publishers-grid">
            {combinedPublishers.map((pub: any) => (
              <Link
                key={pub.name}
                to={`/publishers/${encodeURIComponent(pub.name)}`}
                className="publisher-card"
              >
                <h4>{pub.name}</h4>
                <p>{pub.description.substring(0, 100)}...</p>
                {pub.location && <span className="location">📍 {pub.location}</span>}
              </Link>
            ))}
          </div>
        </div>

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
