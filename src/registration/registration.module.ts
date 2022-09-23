import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { KafkaModule } from 'src/kafka/kafka.module';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { ConfigModule } from '@nestjs/config';
import { UserIdentity } from '../user-identities/entities/user-identities.entity';
import { UsersEntity } from '../user-identities/entities/users.entity';
import { BeneficaryEntity } from '../user-identities/entities/beneficary.entity';
import { BeneficiaryDomicileEntity } from '../user-identities/entities/user-beneficary-domicile.entity';
import { UserDomicileEntity } from '../user-identities/entities/user-demociles.entity';
import { UserContactEntity } from '../user-identities/entities/user-contact.entity';
import { BeneficaryContactEntity } from '../user-identities/entities/beneficary-contact.entity';
import RegistrationsUserEntity from './entities/registration.entity';
import RegistrationsBeneficiaryEntity from './entities/registration-beneficiary.entity';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    TypeOrmModule.forFeature([
      UserIdentity,
      UsersEntity,
      UserDomicileEntity,
      UserContactEntity,
      BeneficaryEntity,
      BeneficiaryDomicileEntity,
      BeneficaryContactEntity,
      RegistrationsUserEntity,
      RegistrationsBeneficiaryEntity
    ]),
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
  exports: [RegistrationService],
})
export class RegistrationModule { }
