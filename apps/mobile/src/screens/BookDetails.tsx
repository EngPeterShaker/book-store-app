import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Book } from '@book-store/shared-types';
import { useApi } from '../contexts/ApiContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, Loading, Button } from '../components';
import { colors, spacing, typography, layout } from '../constants/theme';

export const BookDetails: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { bookId } = route.params;
  const { apiClient } = useApi();
  const { t } = useLanguage();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getBook(bookId);
      setBook(data);
    } catch (error) {
      console.error('Error fetching book:', error);
      Alert.alert(t.common.error, 'Failed to load book details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(t.books.deleteBook, 'Are you sure you want to delete this book?', [
      { text: t.common.cancel, style: 'cancel' },
      {
        text: t.common.delete,
        style: 'destructive',
        onPress: async () => {
          try {
            setDeleting(true);
            await apiClient.deleteBook(bookId);
            Alert.alert(t.common.success, 'Book deleted successfully');
            navigation.goBack();
          } catch (error) {
            console.error('Error deleting book:', error);
            Alert.alert(t.common.error, 'Failed to delete book');
          } finally {
            setDeleting(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return <Loading fullScreen message={t.common.loading} />;
  }

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Book not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>

        {book.description && (
          <>
            <Text style={styles.sectionTitle}>{t.books.description}</Text>
            <Text style={styles.description}>{book.description}</Text>
          </>
        )}

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t.books.price}:</Text>
            <Text style={styles.infoValue}>${book.price.toFixed(2)}</Text>
          </View>
          {book.isbn && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t.books.isbn}:</Text>
              <Text style={styles.infoValue}>{book.isbn}</Text>
            </View>
          )}
          {book.publishedDate && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t.books.publishedDate}:</Text>
              <Text style={styles.infoValue}>
                {new Date(book.publishedDate).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          title={t.books.editBook}
          onPress={() => navigation.navigate('EditBook', { bookId: book.id })}
          variant="primary"
          style={styles.button}
        />
        <Button
          title={t.books.deleteBook}
          onPress={handleDelete}
          variant="outline"
          loading={deleting}
          style={styles.button}
        />
      </View>
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
  title: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  author: {
    ...typography.h6,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h6,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body1,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  infoSection: {
    marginTop: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  infoLabel: {
    ...typography.body1,
    color: colors.textSecondary,
  },
  infoValue: {
    ...typography.body1,
    color: colors.text,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  button: {
    marginBottom: spacing.md,
  },
  errorText: {
    ...typography.body1,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
