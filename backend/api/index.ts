import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const expressApp = express();
let nestApp: any = null;

async function createNestApp() {
  if (!nestApp) {
    const adapter = new ExpressAdapter(expressApp);
    nestApp = await NestFactory.create(AppModule, adapter);
    
    nestApp.useGlobalPipes(new ValidationPipe());
    nestApp.enableCors({
      origin: process.env.FRONTEND_URL || '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    
    await nestApp.init();
  }
  return nestApp;
}

export default async (req: any, res: any) => {
  await createNestApp();
  return expressApp(req, res);
};
