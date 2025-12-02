import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../config/supabase.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

// Raw Supabase book data structure
interface SupabaseBookData {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  isbn?: string;
  isbn13?: string;
  price: number;
  original_price?: number;
  stock?: number;
  language?: string;
  page_count?: number;
  format?: string;
  published_date?: string;
  edition?: number;
  publisher_id?: number;
  primary_category_id?: number;
  series_id?: number;
  series_number?: number;
  cover_image_url?: string;
  preview_url?: string;
  weight_grams?: number;
  dimensions_cm?: string;
  is_bestseller?: boolean;
  is_featured?: boolean;
  is_available?: boolean;
  is_digital?: boolean;
  created_at: string;
  updated_at: string;

  // Relations
  publishers?: { name: string };
  categories?: { name: string };
  book_series?: { name: string };
  book_authors?: Array<{
    role: string;
    authors?: { full_name: string };
  }>;
  book_categories?: Array<{
    categories?: { name: string };
  }>;
  reviews?: Array<{
    rating: number;
    comment: string;
    reviewer_name: string;
    title?: string;
    helpful_count?: number;
  }>;
}

export interface BookWithRelations {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  isbn?: string;
  isbn13?: string;
  price: number;
  original_price?: number;
  stock?: number;
  language?: string;
  page_count?: number;
  format?: string;
  published_date?: string;
  edition?: number;
  publisher_id?: number;
  primary_category_id?: number;
  series_id?: number;
  series_number?: number;
  cover_image_url?: string;
  preview_url?: string;
  weight_grams?: number;
  dimensions_cm?: string;
  is_bestseller?: boolean;
  is_featured?: boolean;
  is_available?: boolean;
  is_digital?: boolean;
  created_at: string;
  updated_at: string;

  // Computed properties for backward compatibility
  author: string;
  publisher?: string;
  genre: string;
  publishedDate: string;
  createdAt: string;
  updatedAt: string;

  // Related data
  publishers?: { name: string };
  primary_category?: { name: string };
  series?: { name: string };
  authors?: Array<{ full_name: string; role: string }>;
  categories?: Array<{ name: string }>;
  reviews?: Array<{ rating: number; comment: string; reviewer_name: string }>;
}

@Injectable()
export class BooksSupabaseService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private transformBook(book: SupabaseBookData): BookWithRelations {
    // Extract author names from book_authors relationship
    const authors =
      book.book_authors
        ?.map((ba) => ba.authors?.full_name)
        .filter((name): name is string => Boolean(name)) || [];
    const authorName = authors.join(', ') || '';

    // Extract primary genre - safely access dynamic properties
    const genre =
      book.categories && book.categories.name
        ? book.categories.name
        : book.categories && book.categories.name
          ? book.categories.name
          : '';

    // Extract publisher name - safely access dynamic properties
    const publisherName =
      book.publishers && book.publishers.name ? book.publishers.name : '';

    return {
      ...book,
      author: authorName,
      publisher: publisherName,
      genre: genre,
      publishedDate: book.published_date || '',
      createdAt: book.created_at,
      updatedAt: book.updated_at,
      authors:
        book.book_authors?.map((ba) => ({
          full_name: ba.authors?.full_name || '',
          role: ba.role || 'Author',
        })) || [],
      categories:
        book.book_categories?.map((bc) => ({
          name: bc.categories?.name || '',
        })) || [],
    };
  }

  async create(createBookDto: CreateBookDto): Promise<BookWithRelations> {
    const supabase = this.supabaseService.getClient();

    const result = await supabase
      .from('books')
      .insert([
        {
          title: createBookDto.title,
          description: createBookDto.description,
          isbn: createBookDto.isbn,
          price: createBookDto.price,
          stock: createBookDto.stock || 0,
          published_date: createBookDto.publishedDate,
        },
      ])
      .select('*')
      .single();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data, error } = result as { data: SupabaseBookData; error: any };

    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new Error(`Failed to create book: ${error.message}`);
    }

    return this.transformBook(data);
  }

  async findAll(): Promise<BookWithRelations[]> {
    const supabase = this.supabaseService.getClient();

    try {
      const { data, error } = await supabase
        .from('books')
        .select(
          `
          *,
          publishers:publisher_id (name),
          categories:primary_category_id (name),
          book_series:series_id (name),
          book_authors (
            role,
            authors (full_name)
          ),
          book_categories (
            categories (name)
          )
        `,
        )
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error in findAll:', error);
        throw new Error(`Failed to fetch books: ${error.message}`);
      }

      return (data || []).map((book) =>
        this.transformBook(book as SupabaseBookData),
      );
    } catch (error) {
      console.error('Error in findAll:', error);
      // Return empty array instead of throwing to prevent 500 errors
      return [];
    }
  }

  async findOne(id: number): Promise<BookWithRelations> {
    const supabase = this.supabaseService.getClient();

    const result = await supabase
      .from('books')
      .select(
        `
        *,
        publishers:publisher_id (name),
        categories:primary_category_id (name),
        book_series:series_id (name),
        book_authors (
          role,
          authors (full_name)
        ),
        book_categories (
          categories (name)
        ),
        reviews (rating, comment, reviewer_name, title, helpful_count)
      `,
      )
      .eq('id', id)
      .single();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data, error } = result as { data: SupabaseBookData; error: any };

    if (error || !data) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return this.transformBook(data);
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookWithRelations> {
    const supabase = this.supabaseService.getClient();

    const result = await supabase
      .from('books')
      .update({
        title: updateBookDto.title,
        description: updateBookDto.description,
        isbn: updateBookDto.isbn,
        price: updateBookDto.price,
        stock: updateBookDto.stock,
        published_date: updateBookDto.publishedDate,
      })
      .eq('id', id)
      .select('*')
      .single();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data, error } = result as { data: SupabaseBookData; error: any };

    if (error || !data) {
      throw new NotFoundException(
        `Book with ID ${id} not found or update failed`,
      );
    }

    return this.transformBook(data);
  }

  async remove(id: number): Promise<void> {
    const supabase = this.supabaseService.getClient();

    const { error } = await supabase.from('books').delete().eq('id', id);

    if (error) {
      throw new Error(`Failed to delete book: ${error.message}`);
    }
  }

  async findByGenre(genre: string): Promise<BookWithRelations[]> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('books')
      .select(
        `
        *,
        publishers:publisher_id (name),
        categories:primary_category_id (name),
        book_series:series_id (name),
        book_authors (
          role,
          authors (full_name)
        )
      `,
      )
      .or(`title.ilike.%${genre}%, description.ilike.%${genre}%`)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to search books by genre: ${error.message}`);
    }

    return (data || []).map((book) =>
      this.transformBook(book as SupabaseBookData),
    );
  }

  async getCount(): Promise<number> {
    const supabase = this.supabaseService.getClient();

    const { count, error } = await supabase
      .from('books')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw new Error(`Failed to count books: ${error.message}`);
    }

    return count || 0;
  }

  async getAllPublishers(): Promise<string[]> {
    const supabase = this.supabaseService.getClient();

    try {
      const { data, error } = await supabase
        .from('books')
        .select('publishers:publisher_id (name)')
        .not('publisher_id', 'is', null);

      if (error) {
        console.error('Supabase error in getAllPublishers:', error);
        throw new Error(`Failed to fetch publishers: ${error.message}`);
      }

      // Extract unique publisher names with proper type checking
      const publisherNames =
        (data as unknown as Array<{ publishers?: { name: string } }>)
          ?.map((book) => book.publishers?.name)
          .filter(
            (name): name is string =>
              name !== undefined &&
              typeof name === 'string' &&
              name.trim() !== '',
          )
          .filter(
            (name: string, index: number, arr: string[]) =>
              arr.indexOf(name) === index,
          ) // Remove duplicates
          .sort() || [];

      return publisherNames;
    } catch (error) {
      console.error('Error in getAllPublishers:', error);
      // Return empty array instead of throwing to prevent API errors
      return [];
    }
  }

  async getAllPublishersWithDetails(): Promise<any[]> {
    const supabase = this.supabaseService.getClient();

    try {
      const { data, error } = await supabase
        .from('publishers')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error('Supabase error in getAllPublishersWithDetails:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getAllPublishersWithDetails:', error);
      return [];
    }
  }

  async getPublisherByName(name: string): Promise<any | null> {
    const supabase = this.supabaseService.getClient();

    try {
      const { data, error } = await supabase
        .from('publishers')
        .select('*')
        .eq('name', name)
        .single();

      if (error) {
        console.error('Supabase error in getPublisherByName:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getPublisherByName:', error);
      return null;
    }
  }

  async getPublisherById(id: number): Promise<any | null> {
    const supabase = this.supabaseService.getClient();

    try {
      const { data, error } = await supabase
        .from('publishers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase error in getPublisherById:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getPublisherById:', error);
      return null;
    }
  }
}
