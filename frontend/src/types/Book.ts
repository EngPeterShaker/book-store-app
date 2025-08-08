export interface Book {
  id: number;
  title: string;
  author: string;
  description?: string;
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
  description?: string;
  isbn: string;
  price: number;
  stock?: number;
  genre?: string;
  publishedDate?: string;
}

export interface UpdateBookDto extends Partial<CreateBookDto> {}
