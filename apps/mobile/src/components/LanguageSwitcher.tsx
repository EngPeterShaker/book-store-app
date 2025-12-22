import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import { colors, spacing, borderRadius, typography } from '../constants/theme';
import RNRestart from 'react-native-restart';

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale, isRTL } = useLanguage();
  const [switching, setSwitching] = useState(false);

  const handleLanguageChange = async (newLocale: 'en' | 'ar') => {
    if (newLocale === locale || switching) return;

    try {
      setSwitching(true);
      await setLocale(newLocale);
      
      // If RTL direction changed, prompt user to restart
      const newIsRTL = newLocale === 'ar';
      if (isRTL !== newIsRTL) {
        Alert.alert(
          locale === 'en' ? 'Restart Required' : 'مطلوب إعادة التشغيل',
          locale === 'en'
            ? 'The app needs to restart to apply the language direction change.'
            : 'يحتاج التطبيق إلى إعادة التشغيل لتطبيق تغيير اتجاه اللغة.',
          [
            {
              text: locale === 'en' ? 'Restart Now' : 'إعادة التشغيل الآن',
              onPress: () => {
                RNRestart.Restart();
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      setSwitching(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, locale === 'en' && styles.activeButton]}
        onPress={() => handleLanguageChange('en')}
        disabled={switching}
      >
        <Text style={[styles.buttonText, locale === 'en' && styles.activeButtonText]}>
          English
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, locale === 'ar' && styles.activeButton]}
        onPress={() => handleLanguageChange('ar')}
        disabled={switching}
      >
        <Text style={[styles.buttonText, locale === 'ar' && styles.activeButtonText]}>
          العربية
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  activeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buttonText: {
    ...typography.body2,
    color: colors.text,
  },
  activeButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
});
