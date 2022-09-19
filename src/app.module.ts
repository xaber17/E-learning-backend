import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import * as redisStore from 'cache-manager-ioredis';
import { LoggerModule } from 'nestjs-pino';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const { config } = await import('./orm.config');
        return config;
      },
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          store: redisStore,
          host: config.get<string>('redisHost'),
          port: config.get<number>('redisPort'),
          ttl: 3600 * 24 * 30,
        };
      },
      inject: [ConfigService],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: { level: 'info' }
        };
      }
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        ttl: 30, //second
        limit: 3,
        storage: new ThrottlerStorageRedisService({
          host: config.get<string>('redisHost'),
          port: config.get<number>('redisPort'),
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
