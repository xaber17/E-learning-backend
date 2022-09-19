import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { ApiEndpointGuard } from './auth/guard/api-endpoint.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalGuards(new ApiEndpointGuard());
  await app.listen(3000);
}
bootstrap();
