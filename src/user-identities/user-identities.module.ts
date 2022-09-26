import { Module } from '@nestjs/common';
import { UserIdentitiesService } from './user-identities.service';
import { UserIdentitiesController } from './user-identities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIdentity } from './entities/user-identities.entity';
import { UsersEntity } from './entities/users.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature([
      UserIdentity,
      UsersEntity,
    ]),
  ],
  controllers: [UserIdentitiesController],
  providers: [UserIdentitiesService],
  exports: [UserIdentitiesService],
})
export class UserIdentitiesModule {}
