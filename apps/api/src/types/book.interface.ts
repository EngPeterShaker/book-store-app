export interface Book {
  id: number;
  title: string;
  author?: string;
  description?: string;
  price?: number;
  isbn?: string;
  publishedDate?: string;
  imageUrl?: string;
  category?: string;
  inStock?: boolean;
  created_at?: string;
  updated_at?: string;
}
