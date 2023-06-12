import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { BaseResponseInterceptor } from './utility/interceptor/base-response.interceptor';

async function bootstrap() {
  const PORT = 3000;
  const basePath = 'api';
  const app = await NestFactory.create(AppModule , {
    logger: ['error', 'warn', 'log']
  });

  app.setGlobalPrefix(basePath);
  // app.useGlobalInterceptors(new BaseResponseInterceptor())
    const config = new DocumentBuilder()
      .setTitle('E-Learning Service')
      .setDescription('Service for using E-Learning')
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
  
  await app.listen(PORT);
  console.log(`App running in http://localhost:${PORT}`)
}
bootstrap();
