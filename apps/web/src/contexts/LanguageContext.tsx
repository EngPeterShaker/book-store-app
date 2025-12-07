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
    'publisher.events': 'Event Booths',
    'publisher.boothLocation': 'Booth Location',
    'publisher.hall': 'Hall',
    'publisher.section': 'Section',
    'publisher.booth': 'Booth',
    'publisher.allPublishers': 'However, here are all the publishers we have in our database:',
    'publisher.availablePublishers': 'Available Publishers',
    'publisher.contact.email': 'Email',
    'publisher.contact.phone': 'Phone',
    'publisher.contact.website': 'Website',
    'publisher.contact.address': 'Address',
    'publisher.noBooks': 'No books from this publisher in our collection yet.',
    'publisher.branches': 'Branches & Locations',
    'publisher.mainBranch': 'Headquarters',
    'publisher.branchType': 'Branch Type',
    'publisher.getDirections': 'Get Directions',
    'publisher.operatingHours': 'Operating Hours',
    'publisher.monday': 'Monday',
    'publisher.tuesday': 'Tuesday',
    'publisher.wednesday': 'Wednesday',
    'publisher.thursday': 'Thursday',
    'publisher.friday': 'Friday',
    'publisher.saturday': 'Saturday',
    'publisher.sunday': 'Sunday',
    'publisher.closed': 'Closed',

    // Search
    'search.placeholder': 'Search books...',
    'search.genre': 'Filter by genre',
    'search.allGenres': 'All Genres',

    // Messages
    'error.loading': 'Failed to load data',
    'error.search': 'Failed to search books',

    // Mystery Pick
    'mystery.title': 'Mystery Pick',
    'mystery.clickToUnwrap': 'Click to Unwrap!',
    'mystery.genre': 'Genre: Literary Fiction',
    'mystery.firstSentence': 'First sentence: "It was the best of times, it was the worst of times..."',

    // Home page
    'home.newArrivals': '📚 New Arrivals',
    'home.discoverBooks': 'Discover the latest books from our curated collection',
    'home.browseCollection': 'Browse Collection →',
    'home.books': 'Books',
    'home.publishers': 'Publishers',
    'home.readers': 'Readers',

    // API Status
    'api.statusTitle': 'API Status',
    'api.urlLabel': 'URL',
    'api.checking': 'Checking connection...',
    'api.authRequired': '❌ Authentication required (Vercel SSO protection enabled)',
    'api.connectedPrefix': '✅ Connected successfully',
    'api.booksFound': 'books found',
    'api.invalidFormat': '❌ Invalid data format received',
    'api.httpErrorPrefix': '❌ HTTP Error',
    'api.connectionFailed': '❌ Connection failed',
    'api.unknownError': 'Unknown error',
    'api.solutionsTitle': 'Solutions',
    'api.solution.local': 'For local development: Make sure backend is running on port 3001',
    'api.solution.production': 'For production: Disable Vercel SSO protection in dashboard',
    'api.solution.alternative': 'Alternative: Deploy to a platform without SSO restrictions',
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
    'publisher.events': 'معارض الكتب',
    'publisher.boothLocation': 'موقع الجناح',
    'publisher.hall': 'القاعة',
    'publisher.section': 'القسم',
    'publisher.booth': 'الجناح',
    'publisher.allPublishers': 'ومع ذلك، إليك جميع الناشرين الموجودين في قاعدة بياناتنا:',
    'publisher.availablePublishers': 'الناشرون المتاحون',
    'publisher.contact.email': 'البريد الإلكتروني',
    'publisher.contact.phone': 'الهاتف',
    'publisher.contact.website': 'الموقع الإلكتروني',
    'publisher.contact.address': 'العنوان',
    'publisher.noBooks': 'لا توجد كتب لهذا الناشر في مجموعتنا حتى الآن.',
    'publisher.branches': 'الفروع والمواقع',
    'publisher.mainBranch': 'المقر الرئيسي',
    'publisher.branchType': 'نوع الفرع',
    'publisher.getDirections': 'الحصول على الاتجاهات',
    'publisher.operatingHours': 'ساعات العمل',
    'publisher.monday': 'الإثنين',
    'publisher.tuesday': 'الثلاثاء',
    'publisher.wednesday': 'الأربعاء',
    'publisher.thursday': 'الخميس',
    'publisher.friday': 'الجمعة',
    'publisher.saturday': 'السبت',
    'publisher.sunday': 'الأحد',
    'publisher.closed': 'مغلق',

    // Search
    'search.placeholder': 'البحث في الكتب...',
    'search.genre': 'تصفية حسب النوع',
    'search.allGenres': 'جميع الأنواع',

    // Messages
    'error.loading': 'فشل في تحميل البيانات',
    'error.search': 'فشل في البحث في الكتب',

    // Mystery Pick
    'mystery.title': 'اختيار عشوائي',
    'mystery.clickToUnwrap': 'انقر لفتح الهدية!',
    'mystery.genre': 'النوع: أدب خيالي',
    'mystery.firstSentence': 'الجملة الأولى: "كان أفضل الأوقات، وكان أسوأ الأوقات..."',

    // Home page
    'home.newArrivals': '📚 الوافدون الجدد',
    'home.discoverBooks': 'اكتشف أحدث الكتب من مجموعتنا المختارة',
    'home.browseCollection': 'تصفح المجموعة ←',
    'home.books': 'الكتب',
    'home.publishers': 'الناشرون',
    'home.readers': 'القراء',

    // API Status
    'api.statusTitle': 'حالة API',
    'api.urlLabel': 'الرابط',
    'api.checking': 'جارٍ فحص الاتصال...',
    'api.authRequired': '❌ مطلوب المصادقة (حماية Vercel SSO مفعلة)',
    'api.connectedPrefix': '✅ تم الاتصال بنجاح',
    'api.booksFound': 'كتاب تم العثور عليه',
    'api.invalidFormat': '❌ تنسيق البيانات غير صحيح',
    'api.httpErrorPrefix': '❌ خطأ HTTP',
    'api.connectionFailed': '❌ فشل الاتصال',
    'api.unknownError': 'خطأ غير معروف',
    'api.solutionsTitle': 'الحلول',
    'api.solution.local': 'للتطوير المحلي: تأكد من تشغيل الخادم الخلفي على المنفذ 3001',
    'api.solution.production': 'للإنتاج: قم بتعطيل حماية Vercel SSO في لوحة التحكم',
    'api.solution.alternative': 'بديل: انشر على منصة بدون قيود SSO',
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
