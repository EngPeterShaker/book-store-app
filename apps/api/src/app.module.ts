import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';

@Module({})
export class AppModule {
  static forRoot(): DynamicModule {
    const imports: any[] = [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      BooksModule.forRoot(),
    ];

    return {
      module: AppModule,
      imports,
      controllers: [AppController],
      providers: [AppService],
    };
  }
}

// For backward compatibility, export the configured module
const configuredModule = AppModule.forRoot();
export default configuredModule;
