/**
 * Arabic Localization Utilities
 * Provides functions for culturally appropriate formatting of numbers, dates, and text
 */

/**
 * Convert Western numerals (0-9) to Eastern Arabic numerals (٠-٩)
 */
export const toArabicNumerals = (num: number | string): string => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/\d/g, (digit) => arabicNumerals[parseInt(digit)]);
};

/**
 * Format price in Egyptian Pounds (EGP) with proper Arabic formatting
 */
export const formatPrice = (price: number, language: 'en' | 'ar'): string => {
  if (language === 'ar') {
    // Arabic format: ١٢٣٫٤٥ ج.م
    const formatted = price.toFixed(2);
    return `${toArabicNumerals(formatted)} ج.م`;
  }
  // English format: EGP 123.45
  return `EGP ${price.toFixed(2)}`;
};

/**
 * Format date with cultural preferences
 */
export const formatDate = (dateString: string, language: 'en' | 'ar'): string => {
  const date = new Date(dateString);

  if (language === 'ar') {
    // Arabic format using Arabic-Indic numerals and Arabic month names
    const arabicMonths = [
      'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];

    const day = toArabicNumerals(date.getDate());
    const month = arabicMonths[date.getMonth()];
    const year = toArabicNumerals(date.getFullYear());

    return `${day} ${month} ${year}`;
  }

  // English format
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format year with cultural preferences
 */
export const formatYear = (year: number | string, language: 'en' | 'ar'): string => {
  if (language === 'ar') {
    return toArabicNumerals(year);
  }
  return String(year);
};

/**
 * Get display text with fallback - shows Arabic if available, otherwise English
 */
export const getLocalizedText = (
  englishText: string,
  arabicText: string | undefined | null,
  language: 'en' | 'ar'
): string => {
  if (language === 'ar' && arabicText) {
    return arabicText;
  }
  return englishText;
};

/**
 * Format book title with proper display
 */
export const getBookTitle = (
  title: string,
  titleAr: string | undefined | null,
  language: 'en' | 'ar'
): string => {
  return getLocalizedText(title, titleAr, language);
};

/**
 * Format author name with proper display
 */
export const getAuthorName = (
  author: string,
  authorAr: string | undefined | null,
  language: 'en' | 'ar'
): string => {
  return getLocalizedText(author, authorAr, language);
};

/**
 * Format description with proper display
 */
export const getDescription = (
  description: string | undefined,
  descriptionAr: string | undefined | null,
  language: 'en' | 'ar'
): string => {
  if (language === 'ar' && descriptionAr) {
    return descriptionAr;
  }
  return description || '';
};

/**
 * Format stock quantity
 */
export const formatStock = (stock: number, language: 'en' | 'ar'): string => {
  if (language === 'ar') {
    return toArabicNumerals(stock);
  }
  return String(stock);
};

/**
 * Egyptian book genres in both languages
 */
export const GENRES = {
  'Fiction': { en: 'Fiction', ar: 'الأدب الروائي' },
  'Poetry': { en: 'Poetry', ar: 'الشعر' },
  'History': { en: 'History', ar: 'التاريخ' },
  'Philosophy': { en: 'Philosophy', ar: 'الفلسفة' },
  'Science': { en: 'Science', ar: 'العلوم' },
  'Religion': { en: 'Religion', ar: 'الدين' },
  'Children': { en: 'Children\'s Books', ar: 'كتب الأطفال' },
  'Self-Help': { en: 'Self-Help', ar: 'التنمية الذاتية' },
  'Education': { en: 'Education', ar: 'التعليم' },
  'Biography': { en: 'Biography', ar: 'السيرة الذاتية' },
  'Reference': { en: 'Reference', ar: 'المراجع' },
  'Technology': { en: 'Technology', ar: 'التكنولوجيا' },
  'Memoir': { en: 'Memoir', ar: 'المذكرات' },
};

/**
 * Get localized genre name
 */
export const getGenreName = (genre: string, language: 'en' | 'ar'): string => {
  const genreData = GENRES[genre as keyof typeof GENRES];
  if (genreData) {
    return language === 'ar' ? genreData.ar : genreData.en;
  }
  return genre;
};
