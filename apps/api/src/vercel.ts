import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import express from 'express';

const server = express();

server.use((req, res, next) => {
  console.log('Incoming Request:', req.method, req.url);
  next();
});

async function createNestServer(expressInstance: express.Express) {
  try {
    const app = await NestFactory.create(
      AppModule.forRoot(),
      new ExpressAdapter(expressInstance),
      {
        logger: ['error', 'warn', 'log'],
      },
    );

    // Enable CORS
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    await app.init();

    console.log('Nest Ready for Vercel');
  } catch (error) {
    console.error('Failed to initialize NestJS app:', error);
    throw error;
  }
}

createNestServer(server)
  .then(() => console.log('Nest Ready for Vercel'))
  .catch((err) => console.error('Nest Vercel Error', err));

export default server;
