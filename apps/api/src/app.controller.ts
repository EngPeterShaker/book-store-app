import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      message: 'Book Store API',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        books: '/books',
        health: '/health',
        debug: '/debug'
      }
    };
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    };
  }

  @Get('debug')
  getDebug() {
    return {
      status: 'debug',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      supabaseUrl: process.env.SUPABASE_URL ? 'configured' : 'not configured',
      supabaseKey: process.env.SUPABASE_ANON_KEY ? 'configured' : 'not configured',
      dbDisabled: process.env.DB_DISABLED || 'not set',
      frontendUrl: process.env.FRONTEND_URL || 'not set',
    };
  }
}
