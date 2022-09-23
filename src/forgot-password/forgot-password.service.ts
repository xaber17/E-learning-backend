import {
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserIdentity } from '../user-identities/entities/user-identities.entity';
import { generateSha512 } from 'src/utility/string-util';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import axios from 'axios';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(UserIdentity)
    private userRepository: Repository<UserIdentity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async forgot(noPegawai: string, newPassword: string, deviceId: string) {
    const resultForgot = await this.userRepository.findOne({
      where: { login_id: noPegawai, is_enable: true },
    });
    if (resultForgot) {
      const otpCode = await this.cacheManager.get(
        String(resultForgot.record_id),
      );
      if (!otpCode) {
        throw new ForbiddenException('Not Allowed');
      }
      let data = { data: null };
      try {
        const result = await axios.post(
          `${this.config.get('otpBaseUrl')}/newVerify`,
          {
            otp: otpCode,
            record_id: resultForgot.record_id,
          },
          { headers: { 'x-device-id': deviceId } },
        );
        data = result.data;
      } catch (error) {
        Logger.log(
          error.response?.data,
          '🚀 ~ file: forgot-password.service.ts ~ line 47 ~ ForgotPasswordService ~ forgot ~ error',
        );
      }
      if (data.data?.valid) {
        // const key = `request_otp_by_${resultForgot.phone_number}`;
        // const user = await this.cacheManager.get<string>(key);
        const salt = this.config.get<string>('secretKey');
        const passwordHash = generateSha512(newPassword, salt);
        const result = await this.userRepository.update(
          resultForgot.record_id,
          {
            password: passwordHash,
          },
        );
        // if (user) {
        //   await this.cacheManager.del(key);
        // }
        // await this.cacheManager.set(jwt, jwt);

        return { result };
      }
      throw new ForbiddenException('Not Allowed');
    }

    throw new NotFoundException('User not found');
  }
}
