import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import PublishersGrid from './components/PublishersGrid';
import BentoGrid from './components/BentoGrid';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';
import PublisherDetails from './components/PublisherDetails';
import ApiStatus from './components/ApiStatus';
import LanguageSwitcher from './components/LanguageSwitcher';
import './styles/main.scss';

function AppContent() {
  const { t } = useLanguage();

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <Link to="/" className="logo">
              <h1>📚 BookStore</h1>
            </Link>
            <nav className="main-nav">
              <Link to="/" className="nav-link">{t('nav.publishers')}</Link>
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
                <BentoGrid />
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
