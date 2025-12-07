export interface Book {
  id: number;
  title: string;
  title_ar?: string;  // Arabic title
  author: string;
  author_ar?: string;  // Arabic author name
  publisher?: string;
  description?: string;
  description_ar?: string;  // Arabic description
  isbn: string;
  price: number;
  stock: number;
  genre?: string;
  publishedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
  publisher?: string;
  description?: string;
  isbn: string;
  price: number;
  stock?: number;
  genre?: string;
  publishedDate?: string;
}

export interface UpdateBookDto extends Partial<CreateBookDto> {}
