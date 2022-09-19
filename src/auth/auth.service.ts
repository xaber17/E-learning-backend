import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserIdentity } from 'src/users/entities/user.entity';
import { Cache } from 'cache-manager';
import { AuthConstant, AuthConstantType } from './constant';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    loginId: string,
    password: string,
  ): Promise<[AuthConstantType | null, UserIdentity | null]> {
    let resultAuth = await Repository(UserIdentity).findOne({
      where: { login_id: loginId },
    });

    if (!resultAuth) {
      resultAuth = await getRepository(UserIdentity).findOne({
        where: { phone_number: loginId },
      });
      // if (!resultAuth) {
      //   return [AuthConstant.nohp_not_found, null];
      // }
    }
    if (resultAuth) {
      const participant =
        await this.participantRepository.findStatusActivePreregisDeceased(
          resultAuth.reference_id,
        );
      if (participant) {
        if (participant.status == 'DECEASED') {
          const beneficiary = await this.beneficiaryRepository.findStatusActiveByParticipantId(
            participant.id
          ); 

          if (!beneficiary) {
            return [AuthConstant.user_not_found, null]
          };
        }

        const matched = await this.validatePassword(
          password,
          resultAuth.password,
        );
        if (matched) {
          resultAuth['status'] = participant.status.toLowerCase();
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
      userId: user.user_id,
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

  private generateToken(payload) {
    return this.jwtService.sign(payload);
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
