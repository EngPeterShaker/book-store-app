import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: false,
    });
    
    // Set global prefix to handle /api routes
    cachedApp.setGlobalPrefix('api');
    
    await cachedApp.init();
    console.log('NestJS app initialized for Vercel (monolithic)');
  }
  return cachedApp;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    console.log('API Request:', req.method, req.url);
    
    const app = await bootstrap();
    const httpAdapter = app.getHttpAdapter();
    const instance = httpAdapter.getInstance();
    
    // Handle the request
    instance(req, res);
  } catch (error) {
    console.error('Error in Vercel handler:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
