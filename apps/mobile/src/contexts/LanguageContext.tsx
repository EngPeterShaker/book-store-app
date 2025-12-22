import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, Translations, isRTL } from '@book-store/i18n';

type Locale = 'en' | 'ar';

interface LanguageContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => Promise<void>;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = '@book_store_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLocale = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLocale === 'ar' || savedLocale === 'en') {
        setLocaleState(savedLocale);
        // Set RTL for the app
        const shouldBeRTL = isRTL(savedLocale);
        if (I18nManager.isRTL !== shouldBeRTL) {
          I18nManager.forceRTL(shouldBeRTL);
          // Note: Changing RTL requires app restart
        }
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    } finally {
      setIsReady(true);
    }
  };

  const setLocale = async (newLocale: Locale) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLocale);
      setLocaleState(newLocale);
      
      const shouldBeRTL = isRTL(newLocale);
      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.forceRTL(shouldBeRTL);
        // Alert user that app needs to restart for RTL changes
        // This will be handled in the LanguageSwitcher component
      }
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  if (!isReady) {
    return null; // Or a loading screen
  }

  const value: LanguageContextValue = {
    locale,
    t: translations[locale],
    setLocale,
    isRTL: isRTL(locale),
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
