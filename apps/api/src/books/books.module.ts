import { Module, DynamicModule } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksSupabaseService } from './books.supabase.service';
import { BooksMockService } from './books.mock.service';
import { SupabaseService } from '../config/supabase.service';

@Module({})
export class BooksModule {
  static forRoot(): DynamicModule {
    const providers: any[] = [SupabaseService];

    // Check if database should be disabled via environment variable
    const dbDisabled = process.env.DB_DISABLED === 'true';

    if (!dbDisabled) {
      // Use Supabase service when database is enabled
      providers.push({
        provide: 'BooksService',
        useClass: BooksSupabaseService,
      });
    } else {
      // Use mock service when database is not available
      providers.push({
        provide: 'BooksService',
        useClass: BooksMockService,
      });
    }

    return {
      module: BooksModule,
      imports: [],
      controllers: [BooksController],
      providers,
      exports: ['BooksService'],
    };
  }
}

// For backward compatibility
const configuredModule = BooksModule.forRoot();
export default configuredModule;
