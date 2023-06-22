import { Module } from '@nestjs/common';
import { JawabanService } from './jawaban.service';
import { JawabanController } from './jawaban.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoalsEntity } from 'src/soal/entities/soal.entity';
import { KelassEntity } from 'src/kelas/entities/kelas.entity';
import { Jawaban } from './entities/jawaban.entity';
import { UsersEntity } from 'src/user/entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule, AuthModule, TypeOrmModule.forFeature([SoalsEntity, KelassEntity, Jawaban, UsersEntity])],
  controllers: [JawabanController],
  providers: [JawabanService],
  exports: [JawabanService],
})
export class JawabanModule {}
