/* eslint-disable @typescript-eslint/no-var-requires */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { v4 as uuidv4 } from 'uuid';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utility/filter/http-exception.filter';
import { BaseResponseInterceptor } from './utility/interceptor/base-response.interceptor';
import { ConfigService } from '@nestjs/config';
import fmp = require('fastify-multipart');
import { ApiEndpointGuard } from './auth/guard/api-endpoint.guard';

async function bootstrap() {
  const PORT = 3002;
  const basePath = 'api';
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true
    }),
  );
  const appConfig = app.get(ConfigService);
  app.register(fmp);
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix(basePath);
  app.useGlobalInterceptors(new BaseResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalGuards(new ApiEndpointGuard());
  await app.useGlobalPipes(new ValidationPipe());
  if (appConfig.get('swagger') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Auth Service')
      .setDescription('Service for Authentication with OTP and bearer Token')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT', // This name here is important for matching up with @ApiBearerAuth() in your controller!
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(basePath + '/api-docs', app, document);
  }
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
