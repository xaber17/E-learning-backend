import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Connection } from 'typeorm';
import appConfig from './app.config';
import { UserIdentitiesModule } from './user-identities/user-identities.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import * as redisStore from 'cache-manager-ioredis';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { LoggerModule } from 'nestjs-pino';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env',
        '.env.staging',
        '.env.development.local',
        '.env.development',
      ],
      load: [appConfig],
    }),
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
    TerminusModule,
    UserIdentitiesModule,
    AuthModule,
    ForgotPasswordModule,
    RegistrationModule,
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: { level: 'info' }
        };
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
