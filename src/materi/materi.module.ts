import { Module } from '@nestjs/common';
import { MateriService } from './materi.service';
import { MateriController } from './materi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterisEntity } from './entities/materi.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature([MaterisEntity]),
  ],
  controllers: [MateriController],
  providers: [MateriService],
  exports: [MateriService],
})
export class MateriModule {}
