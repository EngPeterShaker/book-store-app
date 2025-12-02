import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSwitcher.scss';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="language-switcher"
      title={t('nav.language')}
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      <span className="language-flag">
        {language === 'en' ? '🇺🇸' : '🇸🇦'}
      </span>
      <span className="language-code">
        {language === 'en' ? 'EN' : 'عر'}
      </span>
      <span className="language-name">
        {language === 'en' ? 'English' : 'العربية'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
