import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';
import PublisherDetails from './components/PublisherDetails';
import SearchBar from './components/SearchBar';
import ApiStatus from './components/ApiStatus';
import LanguageSwitcher from './components/LanguageSwitcher';
import './App.css';
import './styles/rtl.css';

function AppContent() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedGenre(''); // Clear genre filter when searching
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedGenre('');
  };

  const handleGenreFilter = (genre: string) => {
    setSelectedGenre(genre);
    setSearchQuery(''); // Clear search when filtering by genre
  };

  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Fantasy',
    'Romance', 'Thriller', 'Biography', 'History', 'Self-Help', 'Technical'
  ];

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <Link to="/" className="logo">
              <h1>📚 BookStore</h1>
            </Link>
            <nav className="main-nav">
              <Link to="/" className="nav-link">{t('nav.home')}</Link>
              <Link to="/books/new" className="nav-link add-book-btn">{t('nav.addBook')}</Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div>
                <ApiStatus />
                <div className="page-header">
                  <SearchBar
                    onSearch={handleSearch}
                    onClear={handleClearSearch}
                  />

                  <div className="genre-filter">
                    <label>Filter by Genre:</label>
                    <select
                      value={selectedGenre}
                      onChange={(e) => handleGenreFilter(e.target.value)}
                      className="genre-select"
                    >
                      <option value="">All Genres</option>
                      {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <BookList
                  searchQuery={searchQuery}
                  genre={selectedGenre}
                />
              </div>
            } />
            <Route path="/books/new" element={<BookForm />} />
            <Route path="/books/:id/edit" element={<BookForm />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/publishers/:name" element={<PublisherDetails />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 BookStore App - Built with React & NestJS</p>
        </footer>
      </div>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
