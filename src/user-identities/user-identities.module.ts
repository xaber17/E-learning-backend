import { Module } from '@nestjs/common';
import { UserIdentitiesService } from './user-identities.service';
import { UserIdentitiesController } from './user-identities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { KelasModule } from 'src/kelas/kelas.module';
import { KelassEntity } from 'src/kelas/entities/kelas.entity';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature([
      UsersEntity,
      KelassEntity
    ]),
  ],
  controllers: [UserIdentitiesController],
  providers: [UserIdentitiesService],
  exports: [UserIdentitiesService],
})
export class UserIdentitiesModule {}
