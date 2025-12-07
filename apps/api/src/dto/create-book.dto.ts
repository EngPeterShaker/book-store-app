import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  title_ar?: string;  // Arabic title

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  author_ar?: string;  // Arabic author name

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  description_ar?: string;  // Arabic description

  @IsNotEmpty()
  @IsString()
  isbn: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsDateString()
  publishedDate?: string;
}
