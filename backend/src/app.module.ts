import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { Book } from './entities/book.entity';
import { getDatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
          database: configService.get('DB_NAME') || (config as any).database,
        };
      },
      inject: [ConfigService],
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
