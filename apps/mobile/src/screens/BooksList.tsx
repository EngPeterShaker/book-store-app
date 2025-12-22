import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Book } from '@book-store/shared-types';
import { useApi } from '../contexts/ApiContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, SearchBar, Loading, Button } from '../components';
import { colors, spacing, typography, layout } from '../constants/theme';

export const BooksList: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { apiClient } = useApi();
  const { t } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiClient.getBooks();
      setBooks(data);
      setFilteredBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      Alert.alert(t.common.error, 'Failed to load books. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [apiClient]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
  }, [fetchBooks]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, books]);

  const renderBookItem = ({ item }: { item: Book }) => (
    <Card onPress={() => navigation.navigate('BookDetails', { bookId: item.id })}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>by {item.author}</Text>
      {item.description && (
        <Text style={styles.bookDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}
      <View style={styles.bookFooter}>
        <Text style={styles.bookPrice}>${item.price.toFixed(2)}</Text>
        {item.isbn && <Text style={styles.bookIsbn}>ISBN: {item.isbn}</Text>}
      </View>
    </Card>
  );

  if (loading && !refreshing) {
    return <Loading fullScreen message={t.common.loading} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={`${t.common.search} ${t.books.title.toLowerCase()}...`}
        />
        <Button
          title={t.books.addBook}
          onPress={() => navigation.navigate('AddBook')}
          size="medium"
        />
      </View>

      <FlatList
        data={filteredBooks}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? `No ${t.books.title.toLowerCase()} found matching your search` : `No ${t.books.title.toLowerCase()} available`}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: layout.screenPadding,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: layout.screenPadding,
  },
  bookTitle: {
    ...typography.h5,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  bookAuthor: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  bookDescription: {
    ...typography.body2,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  bookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookPrice: {
    ...typography.h6,
    color: colors.primary,
  },
  bookIsbn: {
    ...typography.caption,
    color: colors.textLight,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
