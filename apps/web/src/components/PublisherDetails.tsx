import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PUBLISHERS, Publisher } from '../types/Publisher';
import { Book } from '../types/Book';
import { Branch } from '../types/Branch';
import { booksApi } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';
import BookCard from './BookCard';
import BranchCard from './BranchCard';
import { getMapUrl } from '../utils/maps';
import './PublisherDetails.scss';

// Dynamic publisher data for database publishers
const DYNAMIC_PUBLISHERS: Record<string, any> = {
  'Hachette Book Group': {
    name: 'Hachette Book Group',
    description: 'Hachette Book Group is a publishing company owned by Hachette Livre, the largest publishing company in France, and the third largest trade and educational publisher in the world.',
    founded: '2006',
    location: 'New York, USA',
    website: 'https://www.hachettebookgroup.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '2',
        section: 'A',
        booth: '32',
        date: '2025-01-25'
      }
    ]
  },
  'HarperCollins Publishers': {
    name: 'HarperCollins Publishers',
    description: 'HarperCollins Publishers LLC is one of the Big Five English-language publishing companies, headquartered in New York City.',
    founded: '1989',
    location: 'New York, USA',
    website: 'https://www.harpercollins.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '3',
        section: 'B',
        booth: '15',
        date: '2025-01-25'
      },
      {
        event: 'London Book Fair 2025',
        hall: '1',
        section: 'C',
        booth: '45',
        date: '2025-04-08'
      }
    ]
  },
  'Macmillan Publishers': {
    name: 'Macmillan Publishers',
    description: 'Macmillan Publishers is a global trade publishing company operating in over 70 countries. It is known for publishing quality fiction, nonfiction, and children\'s books.',
    founded: '1843',
    location: 'New York, USA',
    website: 'https://us.macmillan.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '1',
        section: 'D',
        booth: '28',
        date: '2025-01-25'
      }
    ]
  },
  'Penguin Random House': {
    name: 'Penguin Random House',
    description: 'Penguin Random House is a multinational publishing house formed in 2013 from the merger of Penguin Books and Random House.',
    founded: '2013',
    location: 'New York, USA',
    website: 'https://www.penguinrandomhouse.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '4',
        section: 'A',
        booth: '12',
        date: '2025-01-25'
      },
      {
        event: 'Frankfurt Book Fair 2025',
        hall: '3.0',
        section: 'B',
        booth: '67',
        date: '2025-10-16'
      }
    ]
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
    website: 'https://www.simonandschuster.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '2',
        section: 'C',
        booth: '8',
        date: '2025-01-25'
      }
    ]
  },
  'Oxford University Press': {
    name: 'Oxford University Press',
    description: 'Oxford University Press is the largest university press in the world, publishing in 70 languages and 190 countries.',
    founded: '1478',
    location: 'Oxford, UK',
    website: 'https://www.oup.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '1',
        section: 'B',
        booth: '21',
        date: '2025-01-25'
      }
    ]
  },
  'Cambridge University Press': {
    name: 'Cambridge University Press',
    description: 'Cambridge University Press is the publishing business of the University of Cambridge and is the oldest publishing house in the world.',
    founded: '1534',
    location: 'Cambridge, UK',
    website: 'https://www.cambridge.org',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '1',
        section: 'A',
        booth: '19',
        date: '2025-01-25'
      }
    ]
  },
  'Wiley': {
    name: 'Wiley',
    description: 'Wiley is a global leader in research and education, publishing over 1,500 peer-reviewed journals and 1,500 new books annually.',
    founded: '1807',
    location: 'Hoboken, USA',
    website: 'https://www.wiley.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '3',
        section: 'D',
        booth: '42',
        date: '2025-01-25'
      }
    ]
  },
  'Elsevier': {
    name: 'Elsevier',
    description: 'Elsevier is a global information analytics business that helps institutions and professionals progress science, advance healthcare and improve performance.',
    founded: '1880',
    location: 'Amsterdam, Netherlands',
    website: 'https://www.elsevier.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '4',
        section: 'B',
        booth: '33',
        date: '2025-01-25'
      }
    ]
  },
  'Pearson': {
    name: 'Pearson',
    description: 'Pearson is a British multinational publishing and education company. It is the world\'s leading learning company.',
    founded: '1844',
    location: 'London, UK',
    website: 'https://www.pearson.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '2',
        section: 'D',
        booth: '56',
        date: '2025-01-25'
      }
    ]
  },
  'McGraw-Hill Education': {
    name: 'McGraw-Hill Education',
    description: 'McGraw-Hill Education is a learning science company that delivers personalized learning experiences that help students, parents, educators and professionals drive results.',
    founded: '1888',
    location: 'New York, USA',
    website: 'https://www.mheducation.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '3',
        section: 'A',
        booth: '17',
        date: '2025-01-25'
      }
    ]
  },
  'Houghton Mifflin Harcourt': {
    name: 'Houghton Mifflin Harcourt',
    description: 'Houghton Mifflin Harcourt is a publisher of textbooks, instructional technology materials, assessments, and services supporting improved learning outcomes.',
    founded: '1832',
    location: 'Boston, USA',
    website: 'https://www.hmhco.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '4',
        section: 'C',
        booth: '29',
        date: '2025-01-25'
      }
    ]
  },
  'Cengage Learning': {
    name: 'Cengage Learning',
    description: 'Cengage Learning is a leading provider of innovative teaching, learning and research solutions for the academic, professional and library markets worldwide.',
    founded: '2007',
    location: 'Boston, USA',
    website: 'https://www.cengage.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '5',
        section: 'A',
        booth: '11',
        date: '2025-01-25'
      }
    ]
  },
  'Bloomsbury Publishing': {
    name: 'Bloomsbury Publishing',
    description: 'Bloomsbury Publishing is a leading independent publishing house established in 1986. It has companies in London, New York, Sydney, Oxford and New Delhi.',
    founded: '1986',
    location: 'London, UK',
    website: 'https://www.bloomsbury.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '1',
        section: 'C',
        booth: '35',
        date: '2025-01-25'
      }
    ]
  },
  'Farrar, Straus and Giroux': {
    name: 'Farrar, Straus and Giroux',
    description: 'Farrar, Straus and Giroux is an American book publishing company, founded in 1946. It publishes literary fiction and non-fiction, and books for children and young adults.',
    founded: '1946',
    location: 'New York, USA',
    website: 'https://www.fsgbooks.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '2',
        section: 'B',
        booth: '23',
        date: '2025-01-25'
      }
    ]
  },
  'Little, Brown and Company': {
    name: 'Little, Brown and Company',
    description: 'Little, Brown and Company is an American publisher founded in 1837. It is now a division of the Hachette Book Group.',
    founded: '1837',
    location: 'New York, USA',
    website: 'https://www.littlebrown.com',
    events: [
      {
        event: 'Cairo International Book Fair 2025',
        hall: '3',
        section: 'C',
        booth: '47',
        date: '2025-01-25'
      }
    ]
  }
};

const PublisherDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allPublishers, setAllPublishers] = useState<string[]>([]);
  const [publisher, setPublisher] = useState<Publisher | null>(null);

  const publisherName = name ? decodeURIComponent(name) : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Try to fetch publisher details from API first
        const publisherData = await booksApi.getPublisherByName(publisherName);

        if (publisherData) {
          setPublisher(publisherData);
        } else {
          // Fallback to static/dynamic publishers
          const fallbackPublisher = DYNAMIC_PUBLISHERS[publisherName] || PUBLISHERS[publisherName];
          setPublisher(fallbackPublisher || null);
        }

        // Fetch all publishers for the fallback page
        const publishersResponse = await booksApi.getAllPublishers();
        setAllPublishers(publishersResponse);

        // Fetch books for this publisher
        const allBooks = await booksApi.getAll();
        const publisherBooks = allBooks.filter(book => book.publisher === publisherName);
        setBooks(publisherBooks);

        // Fetch branches for this publisher
        const branchesData = await booksApi.getBranchesByPublisherName(publisherName);
        setBranches(branchesData);

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
        <h2>{t('publisher.notFound')}</h2>
        <p>{t('publisher.notFoundDesc')}</p>
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
          ← {t('common.back')} {t('nav.books')}
        </button>
      </div>
    );
  }

  return (
    <div
      className="publisher-details"
      style={{
        ...(publisher.brand_color_primary && {
          '--publisher-primary': publisher.brand_color_primary,
        }),
        ...(publisher.brand_color_secondary && {
          '--publisher-secondary': publisher.brand_color_secondary,
        }),
      } as React.CSSProperties}
    >
      {/* Banner Section */}
      {publisher.banner_url && (
        <div className="publisher-banner">
          <img src={publisher.banner_url} alt={`${publisher.name} banner`} />
        </div>
      )}

      {/* Header with Logo */}
      <div className="publisher-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
      </div>

      <div className="publisher-profile">
        {publisher.logo_url && (
          <div className="publisher-logo">
            <img src={publisher.logo_url} alt={`${publisher.name} logo`} />
          </div>
        )}

        <div className="publisher-info">
          <h1 className="publisher-name">{publisher.name}</h1>

          {publisher.tagline && (
            <p className="publisher-tagline">{publisher.tagline}</p>
          )}

          {/* Statistics Cards */}
          <div className="publisher-stats">
            {(publisher.founded || publisher.founded_year) && (
              <div className="stat-card">
                <span className="stat-label">{t('publisher.founded')}</span>
                <span className="stat-value">{publisher.founded_year || publisher.founded}</span>
              </div>
            )}
            <div className="stat-card">
              <span className="stat-label">{t('book.stock')}</span>
              <span className="stat-value">{books.length}</span>
            </div>
            {(publisher.city || publisher.location) && (
              <div className="stat-card">
                <span className="stat-label">{t('publisher.location')}</span>
                <span className="stat-value">{publisher.city || publisher.location}</span>
              </div>
            )}
          </div>

          {/* About Section */}
          <div className="publisher-description">
            <h2>{t('publisher.about')}</h2>
            <p>{publisher.description}</p>

            {publisher.mission_statement && (
              <div className="mission-statement">
                <h3>{t('publisher.mission')}</h3>
                <p>{publisher.mission_statement}</p>
              </div>
            )}

            {publisher.specialties && publisher.specialties.length > 0 && (
              <div className="publisher-specialties">
                <h3>{t('publisher.specialties')}</h3>
                <div className="specialties-tags">
                  {publisher.specialties.map((specialty, index) => (
                    <span key={index} className="specialty-tag">{specialty}</span>
                  ))}
                </div>
              </div>
            )}

            {publisher.notable_authors && publisher.notable_authors.length > 0 && (
              <div className="notable-authors">
                <h3>{t('publisher.authors')}</h3>
                <ul>
                  {publisher.notable_authors.map((author, index) => (
                    <li key={index}>{author}</li>
                  ))}
                </ul>
              </div>
            )}

            {publisher.awards && publisher.awards.length > 0 && (
              <div className="publisher-awards">
                <h3>{t('publisher.awards')}</h3>
                <ul>
                  {publisher.awards.map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Contact Information */}
          {(publisher.email || publisher.phone || publisher.address || publisher.website) && (
            <div className="publisher-contact">
              <h2>{t('publisher.contact')}</h2>
              <div className="contact-grid">
                {publisher.email && (
                  <div className="contact-item">
                    <span className="contact-icon">✉️</span>
                    <div>
                      <span className="contact-label">Email</span>
                      <a href={`mailto:${publisher.email}`} className="contact-value">
                        {publisher.email}
                      </a>
                    </div>
                  </div>
                )}

                {publisher.phone && (
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <div>
                      <span className="contact-label">Phone</span>
                      <a href={`tel:${publisher.phone}`} className="contact-value">
                        {publisher.phone}
                      </a>
                    </div>
                  </div>
                )}

                {publisher.website && (
                  <div className="contact-item">
                    <span className="contact-icon">🌐</span>
                    <div>
                      <span className="contact-label">Website</span>
                      <a
                        href={publisher.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-value"
                      >
                        {publisher.website}
                      </a>
                    </div>
                  </div>
                )}

                {publisher.address && (
                  <div className="contact-item">
                    <span className="contact-icon">📍</span>
                    <div>
                      <span className="contact-label">Address</span>
                      <a
                        href={getMapUrl(publisher.address, publisher.city, publisher.state, publisher.country)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-value contact-value--link"
                        title="Open in maps"
                      >
                        {publisher.address}
                        {publisher.city && `, ${publisher.city}`}
                        {publisher.state && `, ${publisher.state}`}
                        {publisher.country && `, ${publisher.country}`}
                        {publisher.postal_code && ` ${publisher.postal_code}`}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Event Booth Information */}
          {publisher.events && publisher.events.length > 0 && (
            <div className="publisher-events">
              <h2>{t('publisher.events')}</h2>
              <div className="events-grid">
                {publisher.events.map((event: any, index: number) => (
                  <div key={index} className="event-card">
                    <div className="event-header">
                      <h3 className="event-name">{event.event}</h3>
                      <span className="event-date">
                        📅 {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="event-details">
                      <div className="event-location">
                        <span className="location-label">{t('publisher.boothLocation')}</span>
                        <span className="location-value">
                          {t('publisher.hall')} {event.hall} - {event.section} {event.booth}
                        </span>
                      </div>
                      <div className="event-booth-info">
                        <div className="booth-detail">
                          <span className="detail-label">{t('publisher.hall')}</span>
                          <span className="detail-value">{event.hall}</span>
                        </div>
                        <div className="booth-detail">
                          <span className="detail-label">{t('publisher.section')}</span>
                          <span className="detail-value">{event.section}</span>
                        </div>
                        <div className="booth-detail">
                          <span className="detail-label">{t('publisher.booth')}</span>
                          <span className="detail-value">{event.booth}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Media Links */}
          {(publisher.social_twitter || publisher.social_linkedin || publisher.social_instagram ||
            publisher.social_facebook || publisher.social_youtube) && (
            <div className="publisher-social">
              <h2>{t('publisher.connect')}</h2>
              <div className="social-links">
                {publisher.social_twitter && (
                  <a
                    href={publisher.social_twitter.startsWith('http') ? publisher.social_twitter : `https://twitter.com/${publisher.social_twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link twitter"
                    title="Twitter"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                )}

                {publisher.social_linkedin && (
                  <a
                    href={publisher.social_linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link linkedin"
                    title="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}

                {publisher.social_instagram && (
                  <a
                    href={publisher.social_instagram.startsWith('http') ? publisher.social_instagram : `https://instagram.com/${publisher.social_instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link instagram"
                    title="Instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                )}

                {publisher.social_facebook && (
                  <a
                    href={publisher.social_facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link facebook"
                    title="Facebook"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}

                {publisher.social_youtube && (
                  <a
                    href={publisher.social_youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link youtube"
                    title="YouTube"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Branches & Locations Section */}
      {branches && branches.length > 0 && (
        <div className="publisher-branches">
          <h2>{t('publisher.locations')} ({branches.length})</h2>
          <div className="branches-grid">
            {branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>
        </div>
      )}

      {/* Books Section */}
      <div className="publisher-books">
        <h2>{t('publisher.books')} {publisher.name}</h2>

        {loading && <div className="loading">{t('common.loading')}</div>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && books.length === 0 && (
          <div className="no-books">
            <p>No books from this publisher in our collection yet.</p>
            <Link to="/books/new" className="add-book-btn">
              {t('nav.addBook')}
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
