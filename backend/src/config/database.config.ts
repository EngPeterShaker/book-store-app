import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';

export const getDatabaseConfig = (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    return {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'bookstore',
      entities: [Book],
      synchronize: false, // Never use synchronize in production
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      logging: false,
    };
  }
  
  // Development configuration
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'bookstore',
    entities: [Book],
    synchronize: true,
    logging: true,
  };
};
