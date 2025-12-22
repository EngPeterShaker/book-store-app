import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { CreateBookDto, UpdateBookDto } from '@book-store/shared-types';
import { useApi } from '../contexts/ApiContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Input, Button, Loading } from '../components';
import { colors, spacing, layout } from '../constants/theme';

interface BookFormProps {
  route: any;
  navigation: any;
}

export const BookForm: React.FC<BookFormProps> = ({ route, navigation }) => {
  const { bookId } = route.params || {};
  const isEditing = !!bookId;
  const { apiClient } = useApi();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    isbn: '',
    publishedDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditing) {
      fetchBook();
    }
  }, [bookId]);

  const fetchBook = async () => {
    try {
      const book = await apiClient.getBook(bookId);
      setFormData({
        title: book.title,
        author: book.author,
        description: book.description || '',
        price: book.price.toString(),
        isbn: book.isbn || '',
        publishedDate: book.publishedDate || '',
      });
    } catch (error) {
      console.error('Error fetching book:', error);
      Alert.alert(t.common.error, 'Failed to load book data');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = t.forms.required;
    }
    if (!formData.author.trim()) {
      newErrors.author = t.forms.required;
    }
    if (!formData.price.trim()) {
      newErrors.price = t.forms.required;
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      const bookData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        description: formData.description.trim() || undefined,
        price: parseFloat(formData.price),
        isbn: formData.isbn.trim() || undefined,
        publishedDate: formData.publishedDate.trim() || undefined,
      };

      if (isEditing) {
        await apiClient.updateBook(bookId, bookData as UpdateBookDto);
        Alert.alert(t.common.success, 'Book updated successfully');
      } else {
        await apiClient.createBook(bookData as CreateBookDto);
        Alert.alert(t.common.success, 'Book created successfully');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving book:', error);
      Alert.alert(t.common.error, `Failed to ${isEditing ? 'update' : 'create'} book`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading fullScreen message={t.common.loading} />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          label={`${t.books.bookTitle} *`}
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          error={errors.title}
          placeholder={`Enter ${t.books.bookTitle.toLowerCase()}`}
        />

        <Input
          label={`${t.books.author} *`}
          value={formData.author}
          onChangeText={(text) => setFormData({ ...formData, author: text })}
          error={errors.author}
          placeholder={`Enter ${t.books.author.toLowerCase()} name`}
        />

        <Input
          label={t.books.description}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          placeholder={`Enter ${t.books.description.toLowerCase()}`}
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        <Input
          label={`${t.books.price} *`}
          value={formData.price}
          onChangeText={(text) => setFormData({ ...formData, price: text })}
          error={errors.price}
          placeholder="0.00"
          keyboardType="decimal-pad"
        />

        <Input
          label={t.books.isbn}
          value={formData.isbn}
          onChangeText={(text) => setFormData({ ...formData, isbn: text })}
          placeholder={`Enter ${t.books.isbn}`}
        />

        <Input
          label={t.books.publishedDate}
          value={formData.publishedDate}
          onChangeText={(text) => setFormData({ ...formData, publishedDate: text })}
          placeholder="YYYY-MM-DD"
        />

        <View style={styles.buttonContainer}>
          <Button
            title={isEditing ? `${t.common.edit} ${t.books.title}` : `${t.common.create} ${t.books.title}`}
            onPress={handleSubmit}
            loading={saving}
            fullWidth
          />
          <Button
            title={t.common.cancel}
            onPress={() => navigation.goBack()}
            variant="outline"
            fullWidth
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
});
