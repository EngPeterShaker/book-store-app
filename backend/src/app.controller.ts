import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
      dbHost: process.env.DB_HOST ? 'configured' : 'not configured',
      frontendUrl: process.env.FRONTEND_URL || 'not set',
    };
  }
}
