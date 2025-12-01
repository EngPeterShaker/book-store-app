import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';

let cachedApp: any = null;

async function bootstrap() {
  if (!cachedApp) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);

    cachedApp = await NestFactory.create(AppModule.forRoot(), adapter, {
      logger: ['error', 'warn', 'log'],
    });

    cachedApp.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));

    cachedApp.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    await cachedApp.init();
    console.log('NestJS app initialized for Vercel');
  }
  return cachedApp;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const app = await bootstrap();
    const httpAdapter = app.getHttpAdapter();
    const instance = httpAdapter.getInstance();

    // Handle the request
    instance(req, res);
  } catch (error) {
    console.error('Error in Vercel handler:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
