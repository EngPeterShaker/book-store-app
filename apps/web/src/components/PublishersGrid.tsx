import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { booksApi } from '../services/api';

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

const PublishersGrid: React.FC = () => {
  const { t } = useLanguage();
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        setLoading(true);

        // First try to get detailed publisher data
        try {
          const detailedPublishers = await booksApi.getAllPublishersWithDetails();
          if (detailedPublishers && detailedPublishers.length > 0) {
            setPublishers(detailedPublishers);
            return;
          }
        } catch (error) {
          console.log('Detailed publishers not available, falling back to names only');
        }

        // Fallback to names only and create basic publisher objects
        const publisherNames = await booksApi.getAllPublishers();

        // Mock publisher data for database publishers
        const DYNAMIC_PUBLISHERS: Record<string, any> = {
          'Hachette Book Group': {
            name: 'Hachette Book Group',
            description: 'Hachette Book Group is a publishing company owned by Hachette Livre, the largest publishing company in France, and the third largest trade and educational publisher in the world.',
            founded: '2006',
            location: 'New York, USA',
            website: 'https://www.hachettebookgroup.com',
            city: 'New York',
            country: 'USA'
          },
          'HarperCollins Publishers': {
            name: 'HarperCollins Publishers',
            description: 'HarperCollins Publishers LLC is one of the Big Five English-language publishing companies, headquartered in New York City.',
            founded: '1989',
            location: 'New York, USA',
            website: 'https://www.harpercollins.com',
            city: 'New York',
            country: 'USA'
          },
          'Macmillan Publishers': {
            name: 'Macmillan Publishers',
            description: 'Macmillan Publishers is a global trade publishing company operating in over 70 countries. It is known for publishing quality fiction, nonfiction, and children\'s books.',
            founded: '1843',
            location: 'New York, USA',
            website: 'https://us.macmillan.com',
            city: 'New York',
            country: 'USA'
          },
          'Penguin Random House': {
            name: 'Penguin Random House',
            description: 'Penguin Random House is a multinational publishing house formed in 2013 from the merger of Penguin Books and Random House.',
            founded: '2013',
            location: 'New York, USA',
            website: 'https://www.penguinrandomhouse.com',
            city: 'New York',
            country: 'USA'
          },
          'Scholastic Corporation': {
            name: 'Scholastic Corporation',
            description: 'Scholastic Corporation is an American multinational publishing, education and media company that publishes and distributes children\'s books worldwide.',
            founded: '1920',
            location: 'New York, USA',
            website: 'https://www.scholastic.com',
            city: 'New York',
            country: 'USA'
          },
          'Simon & Schuster': {
            name: 'Simon & Schuster',
            description: 'Simon & Schuster is a prominent American publishing company and a subsidiary of Paramount Global. It is one of the four largest English-language publishers.',
            founded: '1924',
            location: 'New York, USA',
            website: 'https://www.simonandschuster.com',
            city: 'New York',
            country: 'USA'
          }
        };

        // Convert publisher names to publisher objects
        const publisherObjects = publisherNames.map(name => {
          return DYNAMIC_PUBLISHERS[name] || {
            name,
            description: `Books published by ${name}.`,
            location: 'Location not specified'
          };
        });

        setPublishers(publisherObjects);
      } catch (err) {
        setError('Failed to load publishers');
        console.error('Error fetching publishers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishers();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        {t('common.loading')}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        {error}
      </div>
    );
  }

  return (
    <div className="publishers-page">
      <div className="page-header">
        <h1 className="page-title">{t('nav.publishers')}</h1>
        <p className="page-description">
          Discover books from renowned publishers around the world
        </p>
      </div>

      <div className="publishers-grid">
        {publishers.map((publisher) => (
          <Link
            key={publisher.name}
            to={`/publishers/${encodeURIComponent(publisher.name)}`}
            className="publisher-card"
          >
            <div className="publisher-card-header">
              <h3 className="publisher-name">{publisher.name}</h3>
              {publisher.tagline && (
                <p className="publisher-tagline">{publisher.tagline}</p>
              )}
            </div>

            <div className="publisher-card-content">
              <p className="publisher-description">
                {publisher.description.length > 120
                  ? `${publisher.description.substring(0, 120)}...`
                  : publisher.description}
              </p>

              <div className="publisher-meta">
                {publisher.founded && (
                  <span className="meta-item">
                    📅 {t('publisher.founded')} {publisher.founded}
                  </span>
                )}
                {(publisher.city || publisher.location) && (
                  <span className="meta-item">
                    📍 {publisher.city || publisher.location}
                  </span>
                )}
                {publisher.website && (
                  <span className="meta-item">
                    🌐 {t('publisher.website')}
                  </span>
                )}
              </div>
            </div>

            <div className="publisher-card-footer">
              <span className="view-books-link">
                {t('publisher.books')} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PublishersGrid;
