import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserIdentity } from 'src/user-identities/entities/user-identities.entity';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserIdentity]),
    KafkaModule.register({
      clientId: 'all-care-client',
      brokers: [process.env.KAFKA_BOOTSTRAP + ':9092'],
      groupId: process.env.KAFKA_OTP_GROUP,
    }),
  ],
  controllers: [OtpController],
  providers: [OtpService],
})
export class OtpModule {}
