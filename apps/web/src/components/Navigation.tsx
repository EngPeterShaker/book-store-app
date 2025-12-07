import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Navigation.scss';

const Navigation: React.FC = () => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('.main-nav');
      const hamburger = document.querySelector('.hamburger-menu');
      if (nav && hamburger && !nav.contains(event.target as Node) && !hamburger.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="main-nav">
      <div className="nav-content">
        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <Link to="/" className="nav-link">
            {t('nav.home')}
          </Link>
          <Link to="/books/new" className="nav-link add-book-btn">
            {t('nav.addBook')}
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <LanguageSwitcher />
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
            {t('nav.home')}
          </Link>
          <Link to="/books/new" className="mobile-nav-link add-book-btn" onClick={() => setIsMobileMenuOpen(false)}>
            {t('nav.addBook')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
