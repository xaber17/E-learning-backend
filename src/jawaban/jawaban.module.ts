import { Module } from '@nestjs/common';
import { JawabanService } from './jawaban.service';
import { JawabanController } from './jawaban.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoalsEntity } from 'src/soal/entities/soal.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([SoalsEntity])],
  controllers: [JawabanController],
  providers: [JawabanService],
  exports: [JawabanService],
})
export class JawabanModule {}
