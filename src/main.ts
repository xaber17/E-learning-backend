import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { BaseResponseInterceptor } from './utility/interceptor/base-response.interceptor';

async function bootstrap() {
  const PORT = 3000;
  const basePath = 'api';
  const app = await NestFactory.create(AppModule , {
    logger: ['error', 'warn', 'log']
  });

  app.setGlobalPrefix(basePath);
  // app.useGlobalInterceptors(new BaseResponseInterceptor())
  await app.listen(PORT);
  console.log(`App running in http://localhost:${PORT}`)
}
bootstrap();
