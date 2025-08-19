import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { Book } from './entities/book.entity';
import { getDatabaseConfig, shouldUseDatabase } from './config/database.config';

@Module({})
export class AppModule {
  static forRoot(): DynamicModule {
    const imports: any[] = [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
    ];

    // Only add TypeORM if database should be used
    if (shouldUseDatabase()) {
      imports.push(
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            const config = getDatabaseConfig();
            // Override with environment variables if they exist
            return {
              ...config,
              host: configService.get('DB_HOST') || (config as any).host,
              port: configService.get('DB_PORT') ? +configService.get('DB_PORT') : (config as any).port,
              username: configService.get('DB_USERNAME') || (config as any).username,
              password: configService.get('DB_PASSWORD') || (config as any).password,
              database: configService.get('DB_DATABASE') || configService.get('DB_NAME') || (config as any).database,
            };
          },
          inject: [ConfigService],
        })
      );
    }

    imports.push(BooksModule.forRoot());

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
