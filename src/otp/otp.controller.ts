/* eslint-disable @typescript-eslint/no-var-requires */
// load env first
require('dotenv').config();
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { OtpService } from './otp.service';
import {
  OtpResponseDto,
  CreateOtpPegawaiDto,
  // CreateOtpDto,
  // VerifyOtpDto,
} from './dto/create-otp.dto';
import {
  ApiBody,
  // ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import * as dayjs from 'dayjs';
import { KafkaService } from 'src/kafka/kafka.service';
import { KafkaPayload } from 'src/kafka/kafka.message';
import { OtpGuard } from './otp.guard';
import { Throttle } from '@nestjs/throttler';

@ApiTags('OTP')
@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly client: KafkaService,
  ) {}

  // @Client({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'all-care-client',
  //       brokers: [`${process.env.KAFKA_BOOTSTRAP}:9092`],
  //     },
  //     consumer: {
  //       groupId: process.env.KAFKA_OTP_GROUP,
  //       sessionTimeout: 60000,
  //       rebalanceTimeout: 120000,
  //       heartbeatInterval: 6000,
  //     },
  //   },
  // })
  // client: ClientKafka;
  // async onModuleInit() {
  //   try {
  //     this.client.subscribeToResponseOf(process.env.KAFKA_OTP_GROUP);
  //     await this.client.connect();
  //   } catch (error) {}
  // }

  @ApiOperation({
    summary: 'create new OTP by loginId',
    description:
      'create OTP and resend must be required for body request nomor_pegawai',
  })
  @ApiResponse({
    status: 200,
    description: 'OTP Success',
    type: OtpResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBody({ type: CreateOtpPegawaiDto })
  @UseGuards(OtpGuard)
  @Throttle(4, Number(process.env.RATE_LIMIT_TTL)) // limit: 4, ttl: 1 jam
  @Post('request-by-login-id')
  async by_loginId(
    @Body() createOtpPegawaiDto: CreateOtpPegawaiDto,
    @Req() req,
  ) {
    const user = await this.otpService.by_loginId(createOtpPegawaiDto);
    try {
      // const producer = await this.client.connect();
      // await producer.send({
      // topic: process.env.OTP_TOPIC,
      // messages: [
      //   {
      //     key: `${process.env.OTP_TOPIC}-${dayjs(new Date()).format(
      //       'MMM D, YYYY h:mm A',
      //     )}`,
      //     value: JSON.stringify({
      //       phoneNumber: user.phone_number,
      //       record_id: user.record_id,
      //     }),
      //   },
      // ],
      // });
      // console.log(process.env.OTP_TOPIC);
      const payload: KafkaPayload = {
        messageId: `${process.env.OTP_TOPIC}-${dayjs(new Date()).format(
          'MMM D, YYYY h:mm A',
        )}`,
        body: {
          phoneNumber: user.phone_number,
          record_id: user.record_id,
        },
        messageType: 'all-care-client',
        topicName: process.env.OTP_TOPIC,
      };
      await this.client.sendMessage(process.env.OTP_TOPIC, payload);
    } catch (error) {
      req.log.info(error);
    }
    return {
      message: 'otp sent',
      result: { phoneNumber: user.phone_number, recordId: user.record_id },
    };
  }
}
