import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfiguration {
  app = {
    port: this.config.get<number>('PORT', 3000),
    apiPrefix: this.config.get<string>('API_PREFIX', 'api/v1'),
    env: this.config.get<string>('NODE_ENV', 'development'),
  };

  database = {
    url: this.config.get<string>('DATABASE_URL'),
    directUrl: this.config.get<string>('DIRECT_URL'),
  };

  jwt = {
    secret: this.config.get<string>('JWT_SECRET'),
    expiresIn: this.config.get<string>('JWT_EXPIRES_IN', '7d'),
  };

  cors = {
    origin: this.config.get<string>('CORS_ORIGIN', '*'),
  };

  constructor(private config: ConfigService) {}
}
