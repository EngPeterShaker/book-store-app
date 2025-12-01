import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';

let cachedApp: any = null;

async function bootstrap() {
  if (!cachedApp) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    
    cachedApp = await NestFactory.create(AppModule.forRoot(), adapter);
    
    cachedApp.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    
    cachedApp.enableCors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow same-origin requests (monorepo deployment)
        // Both frontend and backend are served from the same domain
        if (origin.includes('vercel.app')) {
          return callback(null, true);
        }

        // Allow localhost for development
        if (origin.includes('localhost')) {
          return callback(null, true);
        }

        // Allow any origin in production (since it's a public API)
        return callback(null, true);
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
