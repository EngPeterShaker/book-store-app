import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string, defaultValue?: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.books': 'Books',
    'nav.publishers': 'Publishers',
    'nav.search': 'Search',
    'nav.language': 'Language',
    'nav.addBook': 'Add Book',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.notFound': 'Not Found',
    'common.back': 'Back',
    'common.viewAll': 'View All',
    'common.search': 'Search',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.viewDetails': 'View Details',
    'book.by': 'by',
    'book.stock': 'Stock',

    // Book related
    'book.title': 'Title',
    'book.author': 'Author',
    'book.publisher': 'Publisher',
    'book.genre': 'Genre',
    'book.price': 'Price',
    'book.description': 'Description',
    'book.publishedDate': 'Published Date',
    'book.isbn': 'ISBN',

    // Publisher related
    'publisher.about': 'About',
    'publisher.books': 'Books',
    'publisher.founded': 'Founded',
    'publisher.location': 'Location',
    'publisher.website': 'Website',
    'publisher.contact': 'Contact Information',
    'publisher.connect': 'Connect With Us',
    'publisher.specialties': 'Specialties',
    'publisher.authors': 'Featured Authors',
    'publisher.awards': 'Awards & Achievements',
    'publisher.mission': 'Our Mission',
    'publisher.notFound': 'Publisher Not Found',
    'publisher.notFoundDesc': 'We don\'t have information about this publisher',

    // Search
    'search.placeholder': 'Search books...',
    'search.genre': 'Filter by genre',
    'search.allGenres': 'All Genres',

    // Messages
    'error.loading': 'Failed to load data',
    'error.search': 'Failed to search books',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.books': 'الكتب',
    'nav.publishers': 'الناشرون',
    'nav.search': 'البحث',
    'nav.language': 'اللغة',
    'nav.addBook': 'إضافة كتاب',

    // Common
    'common.loading': 'جارٍ التحميل...',
    'common.error': 'خطأ',
    'common.notFound': 'غير موجود',
    'common.back': 'العودة',
    'common.viewAll': 'عرض الكل',
    'common.search': 'بحث',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.viewDetails': 'عرض التفاصيل',
    'book.by': 'بواسطة',
    'book.stock': 'المخزون',

    // Book related
    'book.title': 'العنوان',
    'book.author': 'المؤلف',
    'book.publisher': 'الناشر',
    'book.genre': 'النوع',
    'book.price': 'السعر',
    'book.description': 'الوصف',
    'book.publishedDate': 'تاريخ النشر',
    'book.isbn': 'ISBN',

    // Publisher related
    'publisher.about': 'حول',
    'publisher.books': 'الكتب',
    'publisher.founded': 'تأسس في',
    'publisher.location': 'الموقع',
    'publisher.website': 'الموقع الإلكتروني',
    'publisher.contact': 'معلومات الاتصال',
    'publisher.connect': 'تواصل معنا',
    'publisher.specialties': 'التخصصات',
    'publisher.authors': 'المؤلفون المميزون',
    'publisher.awards': 'الجوائز والإنجازات',
    'publisher.mission': 'رسالتنا',
    'publisher.notFound': 'الناشر غير موجود',
    'publisher.notFoundDesc': 'ليس لدينا معلومات عن هذا الناشر',

    // Search
    'search.placeholder': 'البحث في الكتب...',
    'search.genre': 'تصفية حسب النوع',
    'search.allGenres': 'جميع الأنواع',

    // Messages
    'error.loading': 'فشل في تحميل البيانات',
    'error.search': 'فشل في البحث في الكتب',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);

    // Update document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Set initial direction
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const isRTL = language === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  const t = (key: string, defaultValue?: string): string => {
    return translations[language][key as keyof typeof translations.en] || defaultValue || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    isRTL,
    t,
    dir,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
