import { Module } from '@nestjs/common';
import { SoalService } from './soal.service';
import { SoalController } from './soal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoalsEntity } from './entities/soal.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { KelassEntity } from 'src/kelas/entities/kelas.entity';

@Module({
  imports: [ConfigModule, AuthModule, TypeOrmModule.forFeature([SoalsEntity, KelassEntity])],
  controllers: [SoalController],
  providers: [SoalService],
  exports: [SoalService],
})
export class SoalModule {}
