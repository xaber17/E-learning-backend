import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFileEntity } from './entities/upload-file.entity';
import { KelassEntity } from 'src/kelas/entities/kelas.entity';
import { MaterisEntity } from 'src/materi/entities/materi.entity';
import { SoalsEntity } from 'src/soal/entities/soal.entity';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature([
      UploadFileEntity,
      KelassEntity,
      MaterisEntity,
      SoalsEntity,
    ]),
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
