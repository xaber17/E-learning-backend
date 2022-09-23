import { NotFoundException, Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import {
  CreateOtpDto,
  CreateOtpPegawaiDto,
  VerifyOtpDto,
} from './dto/create-otp.dto';
import axios from 'axios';
import * as qs from 'qs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserIdentity } from '../user-identities/entities/user-identities.entity';

const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD';
authenticator.options = { digits: 4, step: 180 };

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(UserIdentity)
    private userRepository: Repository<UserIdentity>,
  ) {}

  /**
   * @deprecated will be removed in the future, use otp service instead
   * @param createOtpDto CreateOtpDto
   * @returns {string}
   */
  async create(createOtpDto: CreateOtpDto) {
    const token = authenticator.generate(secret);
    await axios({
      method: 'post',
      url: 'http://sms-api.jatismobile.com/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        userid: 'ykstest',
        password: 'ykstest123',
        msisdn: createOtpDto.phoneNumber,
        message: `Permintaan ${Math.floor(
          Math.random() * (9999 - 1000 + 1) + 1000,
        )}. Kode OTP ${token} untuk AllCare Systems berlaku 1 menit. Hubungi Layanan Yakes Pertamina  021-50961111 untuk bantuan.`,
        sender: 'CLUB21TEST',
        division: 'AT1',
        batchname: 'yakes',
        uploadby: 'yakes',
        channel: 2,
      }),
    });

    return token;
  }

  /**
   * @deprecated will be removed in the future, use otp service instead
   * @param verifyOtpDto VerifyDto
   * @returns {Promise<{valid: boolean}>}
   */
  async findOne(verifyOtpDto: VerifyOtpDto) {
    const token = authenticator.generate(secret);

    if (token === verifyOtpDto.otp) {
      const isValid = authenticator.check(token, secret);
      // if (verifyOtpDto.phoneNumber) {
      // const user = await this.cacheManager.get<string>(
      //   `request_otp_by_${verifyOtpDto.phoneNumber}`,
      // );
      // if (user) {
      //   const { otp, ...rest }: AnyObject = JSON.parse(user);
      //   const jwt = this.authService.generateTokenFor10Mins(rest);
      //   return {
      //     valid: isValid && token === otp,
      //     token: jwt,
      //   };
      // }
      // }
      return {
        valid: isValid,
      };
    }

    return {
      valid: false,
    };
  }

  async by_loginId(createOtpPegawaiDto: CreateOtpPegawaiDto) {
    const user = await this.userRepository.findOne({
      where: { login_id: createOtpPegawaiDto.nomorPegawai, is_enable: true },
    });
    if (user) {
      if (user.phone_number) {
        return user;
      }
      throw new NotFoundException(
        'No. Handphone Anda belum terdaftar, untuk bantuan silahkan hubungi Yakes Pertamina 021-50961111',
      );
    }
    throw new NotFoundException(
      'Maaf Anda belum terdaftar, untuk bantuan silahkan hubungi Yakes Pertamina 021-50961111',
    );
  }
}
