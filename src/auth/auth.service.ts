import { Injectable, Inject } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { JwtService } from '@nestjs/jwt';
import { AuthConstant, AuthConstantType } from './constant';
import { generateSha512 } from 'src/utility/string-util';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/user/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
    private readonly config: ConfigService,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>
  ) {}

  async validateUser(
    loginId: string,
    password: string,
  ): Promise<[AuthConstantType | null, UsersEntity | null]> {
    console.log(loginId)
    let resultAuth = await this.userRepository.findOne({
      where: { username: loginId },
    });

    console.log(resultAuth)
    if (resultAuth) {
      const user =
        await this.userRepository.findOne({
          where: { user_id: resultAuth.user_id }
        });
        
      if (user) {
        const matched = await this.validatePassword(
          password,
          resultAuth.password,
        );

        if (matched) {
          resultAuth.status = true;
          return [null, resultAuth];
        }

        return [AuthConstant.user_not_authorized, null];
      }
    }

    return [AuthConstant.user_not_found, null];
  }

  async login(user: UsersEntity) {
    const payload = {
      username: user.username,
      userId: user.user_id,
      role: user.role,
      kelasId: user.kelas_id
    };
    console.log(payload)
    const token = this.generateToken(payload);
    return {
      token: token,
      userId: payload.userId,
      username: payload.username,
      role: payload.role,
      kelas: payload.kelasId,
      status: user['status']
    };
  }

  async logout(token: string) {
    const ttl = 24 * 3600 * 30;
    const result = await this.cacheManager.set(token, token, ttl);
    return result;
  }

  async compareWithPreviousToken(token: string) {
    const result = await this.cacheManager.get(token);
    if (result) {
      return false;
    }
    return true;
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
}
