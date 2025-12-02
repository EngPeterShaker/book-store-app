import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
  Inject,
} from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookWithRelations } from './books.supabase.service';

interface BooksService {
  create(createBookDto: CreateBookDto): Promise<BookWithRelations>;
  findAll(): Promise<BookWithRelations[]>;
  findOne(id: number): Promise<BookWithRelations>;
  update(id: number, updateBookDto: UpdateBookDto): Promise<BookWithRelations>;
  remove(id: number): Promise<void>;
  findByGenre(genre: string): Promise<BookWithRelations[]>;
  getCount(): Promise<number>;
  getAllPublishers(): Promise<string[]>;
  getAllPublishersWithDetails(): Promise<any[]>;
  getPublisherByName(name: string): Promise<any>;
  getPublisherById(id: number): Promise<any>;
}

@Controller('books')
export class BooksController {
  constructor(
    @Inject('BooksService') private readonly booksService: BooksService,
  ) {}

  @Post()
  create(@Body(ValidationPipe) createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get('test/count')
  async getCount() {
    try {
      const count = await this.booksService.getCount();
      return { success: true, count, message: 'Database connection working!' };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Database connection failed',
      };
    }
  }

  @Get('publishers/all')
  async getAllPublishers() {
    try {
      const publishers = await this.booksService.getAllPublishers();
      return {
        success: true,
        publishers,
        count: publishers.length,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        publishers: [],
        count: 0,
      };
    }
  }

  @Get('publishers/details')
  async getAllPublishersWithDetails() {
    try {
      const publishers = await this.booksService.getAllPublishersWithDetails();
      return {
        success: true,
        publishers,
        count: publishers.length,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        publishers: [],
        count: 0,
      };
    }
  }

  @Get('publishers/:name')
  async getPublisherByName(@Param('name') name: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const publisher: any = await this.booksService.getPublisherByName(
        decodeURIComponent(name),
      );
      if (!publisher) {
        return {
          success: false,
          message: 'Publisher not found',
          publisher: null,
        };
      }
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        publisher,
      };
    } catch (error: any) {
      return {
        success: false,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        error: error?.message || 'Unknown error',
        publisher: null,
      };
    }
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}
