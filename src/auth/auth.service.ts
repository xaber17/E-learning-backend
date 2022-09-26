import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { getRepository, Repository, In } from 'typeorm';
import { UserIdentity } from '../user-identities/entities/user-identities.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthConstant, AuthConstantType } from './constant';
import { generateSha512 } from 'src/utility/string-util';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginActivity } from './entities/login-activities.entity';
import { LoginActivityDto } from './dto/login-activity.dto';
import { UsersEntity } from 'src/user-identities/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
    private readonly config: ConfigService,
    @InjectRepository(UserIdentity)
    private userIdentityRepository: Repository<UserIdentity>,
    @InjectRepository(LoginActivity)
    private loginActivityRepository: Repository<LoginActivity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>
  ) {}

  async validateUser(
    loginId: string,
    password: string,
  ): Promise<[AuthConstantType | null, UserIdentity | null]> {
    let resultAuth = await getRepository(UserIdentity).findOne({
      where: { login_id: loginId },
    });

    if (resultAuth) {
      const user =
        await this.userRepository.findOne(
          resultAuth.reference_id,
        );
        
      if (user) {
        const matched = await this.validatePassword(
          password,
          resultAuth.password,
        );

        if (matched) {
          resultAuth['status'] = user.status.toLowerCase();
          return [null, resultAuth];
        }

        return [AuthConstant.user_not_authorized, null];
      }
    }

    return [AuthConstant.user_not_found, null];
  }

  async login(user: UserIdentity) {
    const payload = {
      deviceId: user.device_id,
      email: user.email,
      userId: user.reference_id,
      phoneNumber: user.phone_number,
      recordId: user.record_id,
    };
    const token = this.generateToken(payload);
    return {
      token: token,
      userId: payload.userId,
      email: payload.email,
      deviceId: payload.deviceId,
      phoneNumber: payload.phoneNumber,
      recordId: payload.recordId,
      status: user['status']
    };
  }

  async logout(token: string) {
    const ttl = 24 * 3600 * 30;
    const result = await this.cacheManager.set(token, token, { ttl: ttl });
    return result;
  }

  async compareWithPreviousToken(token: string) {
    const result = await this.cacheManager.get(token);
    if (result) {
      return false;
    }

    return true;
  }

  async getToken(userId: string) {
    const data = await this.userIdentityRepository.findOne({
      where: { reference_id: userId },
    });

    return { device_id: data.device_id, fcm_token_id: data.fcm_token_id };
  }

  async putToken(userId: string, body: any) {
    const data = await this.userIdentityRepository.findOne({
      where: { reference_id: userId },
    });
    const fcmData = data.fcm_token_id || [];
    if (fcmData) {
      if (!fcmData.includes(body.fcm_token_id)) {
        fcmData.push(body.fcm_token_id);
      }
    } else {
      fcmData.push(body.fcm_token_id);
    }
    data.device_id = body.device_id;
    data.fcm_token_id = fcmData;
    return this.userIdentityRepository.save(data);
  }

  private validatePassword(password: string, storedHash: string) {
    const salt = this.config.get<string>('secretKey');
    const value = generateSha512(password, salt);
    if (value === storedHash) {
      return true;
    } else {
      return false;
    }
  }

  verifyJwt(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      return null;
    }
  }

  private generateToken(payload) {
    return this.jwtService.sign(payload);
  }

  generateTokenFor10Mins(payload) {
    return this.jwtService.sign(payload, { expiresIn: '10m' });
  }

  async postActivity(body: LoginActivityDto) {
    const activity = new LoginActivity();
    activity.login_id = body.login_id;
    activity.device_id = body.device_id;
    activity.longitude_area = body.longitude_area;
    activity.latitude_area = body.latitude_area;
    activity.phone_number = body.phone_number;
    activity.platform = body.platform;
    activity.platform_os = body.platform_os;
    return this.loginActivityRepository.insert(activity);
  }

  async getIdentityByUserId(id: string) {
    const data = await this.userIdentityRepository.findOne({
      where: { reference_id: id },
    });

    return data;
  }
}
