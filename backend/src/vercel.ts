import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import express from 'express';
import { seedProduction } from './seed.prod';

const server = express();

server.use((req, res, next) => {
  console.log('Incoming Request Headers:', req.headers);
  next();
});

async function createNestServer(expressInstance: express.Express) {
  try {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressInstance),
      {
        logger: ['error', 'warn', 'log'],
      }
    );

    // Enable CORS
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));

    await app.init();
    
    // Seed database on first deployment (production only)
    if (process.env.NODE_ENV === 'production') {
      try {
        await seedProduction();
      } catch (error) {
        console.log('Database seeding skipped or failed:', error.message);
      }
    }

    console.log('Nest Ready for Vercel');
  } catch (error) {
    console.error('Failed to initialize NestJS app:', error);
    throw error;
  }
}

createNestServer(server)
  .then(() => console.log('Nest Ready for Vercel'))
  .catch(err => console.error('Nest Vercel Error', err));

export default server;