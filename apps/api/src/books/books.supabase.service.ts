import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../config/supabase.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

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
  publishers?: { name: string; };
  primary_category?: { name: string; };
  series?: { name: string; };
  authors?: Array<{ full_name: string; role: string; }>;
  categories?: Array<{ name: string; }>;
  reviews?: Array<{ rating: number; comment: string; reviewer_name: string; }>;
}

@Injectable()
export class BooksSupabaseService {
  constructor(private readonly supabaseService: SupabaseService) {}

  private transformBook(book: any): BookWithRelations {
    // Extract author names from book_authors relationship
    const authors = book.book_authors?.map((ba: any) => ba.authors?.full_name).filter(Boolean) || [];
    const authorName = authors.join(', ') || '';

    // Extract primary genre
    const genre = book.categories?.name || book.primary_category?.name || '';

    // Extract publisher name
    const publisherName = book.publishers?.name || book.publisher?.name || '';

    return {
      ...book,
      author: authorName,
      publisher: publisherName,
      genre: genre,
      publishedDate: book.published_date,
      createdAt: book.created_at,
      updatedAt: book.updated_at,
      authors: book.book_authors?.map((ba: any) => ({
        full_name: ba.authors?.full_name || '',
        role: ba.role || 'Author'
      })) || [],
      categories: book.book_categories?.map((bc: any) => ({
        name: bc.categories?.name || ''
      })) || [],
    };
  }

  async create(createBookDto: CreateBookDto): Promise<BookWithRelations> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('books')
      .insert([{
        title: createBookDto.title,
        description: createBookDto.description,
        isbn: createBookDto.isbn,
        price: createBookDto.price,
        stock: createBookDto.stock || 0,
        published_date: createBookDto.publishedDate
      }])
      .select('*')
      .single();

    if (error) {
      throw new Error(`Failed to create book: ${error.message}`);
    }

    return this.transformBook(data);
  }

  async findAll(): Promise<BookWithRelations[]> {
    const supabase = this.supabaseService.getClient();

    try {
      const { data, error } = await supabase
        .from('books')
        .select(`
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
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error in findAll:', error);
        throw new Error(`Failed to fetch books: ${error.message}`);
      }

      return (data || []).map(book => this.transformBook(book));
    } catch (error) {
      console.error('Error in findAll:', error);
      // Return empty array instead of throwing to prevent 500 errors
      return [];
    }
  }

  async findOne(id: number): Promise<BookWithRelations> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('books')
      .select(`
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
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return this.transformBook(data);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookWithRelations> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('books')
      .update({
        title: updateBookDto.title,
        description: updateBookDto.description,
        isbn: updateBookDto.isbn,
        price: updateBookDto.price,
        stock: updateBookDto.stock,
        published_date: updateBookDto.publishedDate
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error || !data) {
      throw new NotFoundException(`Book with ID ${id} not found or update failed`);
    }

    return this.transformBook(data);
  }

  async remove(id: number): Promise<void> {
    const supabase = this.supabaseService.getClient();
    
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete book: ${error.message}`);
    }
  }

  async findByGenre(genre: string): Promise<BookWithRelations[]> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        publishers:publisher_id (name),
        categories:primary_category_id (name),
        book_series:series_id (name),
        book_authors (
          role,
          authors (full_name)
        )
      `)
      .or(`title.ilike.%${genre}%, description.ilike.%${genre}%`)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to search books by genre: ${error.message}`);
    }

    return (data || []).map(book => this.transformBook(book));
  }

  async search(query: string): Promise<BookWithRelations[]> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        publishers:publisher_id (name),
        categories:primary_category_id (name),
        book_series:series_id (name),
        book_authors (
          role,
          authors (full_name)
        )
      `)
      .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to search books: ${error.message}`);
    }

    return (data || []).map(book => this.transformBook(book));
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
}
