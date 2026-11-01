import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AllExceptionsFilter } from '@common/filters/all-exceptions.filter';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import { ResponseTimeInterceptor } from '@common/interceptors/response-time.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') || 3000;
  const apiPrefix = configService.get<string>('API_PREFIX') || 'api/v1';

  // Enable CORS
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN', '*'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableCircularCheck: true,
      },
    }),
  );

  // Global filters
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global interceptors
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ResponseTimeInterceptor(),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('HVAVAN Skin API')
    .setDescription('HVAVAN Skin e-commerce platform API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('users')
    .addTag('roles')
    .addTag('permissions')
    .addTag('branches')
    .addTag('products')
    .addTag('categories')
    .addTag('brands')
    .addTag('inventory')
    .addTag('favorites')
    .addTag('cart')
    .addTag('orders')
    .addTag('payments')
    .addTag('refunds')
    .addTag('promotions')
    .addTag('uds')
    .addTag('reviews')
    .addTag('consultations')
    .addTag('notifications')
    .addTag('cms')
    .addTag('analytics')
    .addTag('audit')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule],
  });
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);

  // Health check endpoint
  app.getHttpServer().listen(port, () => {
    Logger.log(`HVAVAN Skin API is running on port ${port}`);
    Logger.log(`API documentation available at: http://localhost:${port}/${apiPrefix}/docs`);
    Logger.log(`Health check: http://localhost:${port}/${apiPrefix}/health`);
  });
}
bootstrap();
