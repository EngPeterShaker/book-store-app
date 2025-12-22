import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, LanguageSwitcher } from '../components';
import { useLanguage } from '../contexts/LanguageContext';
import { colors, spacing, typography, layout } from '../constants/theme';

export const Settings: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t, locale } = useLanguage();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card>
        <Text style={styles.sectionTitle}>Language / اللغة</Text>
        <Text style={styles.sectionDescription}>
          {locale === 'en'
            ? 'Choose your preferred language for the app'
            : 'اختر لغتك المفضلة للتطبيق'}
        </Text>
        <View style={styles.languageSwitcherContainer}>
          <LanguageSwitcher />
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>
          {locale === 'en' ? 'About' : 'حول'}
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            {locale === 'en' ? 'App Version:' : 'إصدار التطبيق:'}
          </Text>{' '}
          1.0.0
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.infoLabel}>
            {locale === 'en' ? 'Build:' : 'البناء:'}
          </Text>{' '}
          Production
        </Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>
          {locale === 'en' ? 'Features' : 'المميزات'}
        </Text>
        <Text style={styles.featureItem}>
          ✅ {locale === 'en' ? 'Book Management' : 'إدارة الكتب'}
        </Text>
        <Text style={styles.featureItem}>
          ✅ {locale === 'en' ? 'Bilingual Support (EN/AR)' : 'دعم اللغتين (إنجليزي/عربي)'}
        </Text>
        <Text style={styles.featureItem}>
          ✅ {locale === 'en' ? 'RTL Layout Support' : 'دعم التخطيط من اليمين لليسار'}
        </Text>
        <Text style={styles.featureItem}>
          ✅ {locale === 'en' ? 'Search & Filter' : 'البحث والتصفية'}
        </Text>
        <Text style={styles.featureItem}>
          ✅ {locale === 'en' ? 'Offline Ready' : 'جاهز للعمل دون اتصال'}
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: layout.screenPadding,
  },
  sectionTitle: {
    ...typography.h5,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sectionDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  languageSwitcherContainer: {
    marginTop: spacing.sm,
  },
  infoRow: {
    ...typography.body1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontWeight: '600',
    color: colors.text,
  },
  featureItem: {
    ...typography.body1,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
});
