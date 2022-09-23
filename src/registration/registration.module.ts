import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { ConfigModule } from '@nestjs/config';
import { UserIdentity } from '../user-identities/entities/user-identities.entity';
import { UsersEntity } from '../user-identities/entities/users.entity';
import RegistrationsUserEntity from './entities/registration.entity';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature([
      UserIdentity,
      UsersEntity,
      RegistrationsUserEntity
    ]),
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService],
})
export class RegistrationModule { }
