import { Module } from '@nestjs/common';
import { KelasService } from './materi.service';
import { KelasController } from './materi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { KelassEntity } from './entities/materi.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature([
      // KelassEntity,
    ]),
  ],
  controllers: [KelasController],
  providers: [KelasService],
  exports: [KelasService],
})
export class KelasModule {}
