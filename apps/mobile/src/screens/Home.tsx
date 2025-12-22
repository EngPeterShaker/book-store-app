import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from '../components';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { colors, spacing, typography, layout } from '../constants/theme';

export const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t, locale } = useLanguage();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Book Store</Text>
          <LanguageSwitcher />
        </View>
        <Text style={styles.subtitle}>Manage your book collection</Text>
      </View>

      <Card>
        <Text style={styles.cardTitle}>{t.books.title}</Text>
        <Text style={styles.cardDescription}>
          Browse, add, edit, and manage your book collection
        </Text>
        <Button
          title={`View ${t.books.title}`}
          onPress={() => navigation.navigate('Books')}
          style={styles.button}
        />
      </Card>

      <Card>
        <Text style={styles.cardTitle}>About</Text>
        <Text style={styles.cardDescription}>
          This is a mobile app for managing a book store, built with React Native and Expo.
        </Text>
        <Text style={styles.cardDescription}>
          Features include book management, search functionality, and offline support.
        </Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>
          {locale === 'en' ? 'Settings' : 'الإعدادات'}
        </Text>
        <Text style={styles.cardDescription}>
          {locale === 'en'
            ? 'Change language, view app information, and more'
            : 'تغيير اللغة وعرض معلومات التطبيق والمزيد'}
        </Text>
        <Button
          title={locale === 'en' ? 'Open Settings' : 'فتح الإعدادات'}
          onPress={() => navigation.navigate('Settings')}
          variant="outline"
          style={styles.button}
        />
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
  header: {
    marginBottom: spacing.xl,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h1,
    color: colors.primary,
  },
  subtitle: {
    ...typography.body1,
    color: colors.textSecondary,
  },
  cardTitle: {
    ...typography.h5,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    ...typography.body1,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.sm,
  },
});
