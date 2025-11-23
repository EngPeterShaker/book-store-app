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

@Controller('books')
export class BooksController {
  constructor(@Inject('BooksService') private readonly booksService: any) {}

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
      return { success: false, error: error.message, message: 'Database connection failed' };
    }
  }

  @Get()
  findAll(@Query('genre') genre?: string, @Query('search') search?: string) {
    if (genre) {
      return this.booksService.findByGenre(genre);
    }
    if (search) {
      return this.booksService.search(search);
    }
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
