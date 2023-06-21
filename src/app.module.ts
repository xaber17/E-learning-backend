import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadFileModule } from './upload-file/upload-file.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import * as redisStore from 'cache-manager-ioredis';
import { AuthModule } from './auth/auth.module';
import appConfig from './app.config';
import { UserModule } from './user/users.module';
import { KelasModule } from './kelas/kelas.module';
import { SoalModule } from './soal/soal.module';
import { MateriModule } from './materi/materi.module';
import { JawabanModule } from './jawaban/jawaban.module';

@Module({
  imports: [
    UploadFileModule,
    AuthModule,
    UserModule,
    KelasModule,
    SoalModule,
    MateriModule,
    JawabanModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const { config } = await import('./orm.config');
        return config;
      },
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 3600 * 24 * 30,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
