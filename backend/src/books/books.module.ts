import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksMockService } from './books.mock.service';
import { BooksController } from './books.controller';
import { Book } from '../entities/book.entity';
import { shouldUseDatabase } from '../config/database.config';

@Module({})
export class BooksModule {
  static forRoot(): DynamicModule {
    const imports: any[] = [];
    const providers: any[] = [];

    if (shouldUseDatabase()) {
      imports.push(TypeOrmModule.forFeature([Book]));
      providers.push(BooksService);
    } else {
      // Use mock service when database is not available
      providers.push({
        provide: BooksService,
        useClass: BooksMockService,
      });
    }

    return {
      module: BooksModule,
      imports,
      controllers: [BooksController],
      providers,
      exports: [BooksService],
    };
  }
}

// For backward compatibility
const configuredModule = BooksModule.forRoot();
export default configuredModule;
