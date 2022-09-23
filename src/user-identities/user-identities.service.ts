/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserIdentity } from './entities/user-identities.entity';
import { UsersEntity } from './entities/users.entity';
import { ConfigService } from '@nestjs/config';
import { generateSha512 } from 'src/utility/string-util';
import {
  RegistrationUserDto,
} from './dto/registration-user.dto';
import { UpdatePhotoDto, UpdateUserDto } from './dto/update-user.dto';
import { Cache } from 'cache-manager';
import { UserRepository } from 'src/user-identities/repositories/user-repository';
import { isEmpty } from 'class-validator';

@Injectable()
export class UserIdentitiesService {
  constructor(
    @InjectRepository(UserIdentity)
    private userIdentityRepository: Repository<UserIdentity>,
    private usersRepository: UserRepository,
    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async registration(registrationUserDto: RegistrationUserDto) {
    try {
      const salt = this.config.get<string>('secretKey');
      const hashPassword = generateSha512(registrationUserDto.password, salt);
      const request = await this.userIdentityRepository.insert({
        login_id: registrationUserDto.loginId,
        password: hashPassword,
        email: registrationUserDto.email,
        device_id: registrationUserDto.deviceId,
        is_user: true,
        is_enable: true,
        created_by: 'system',
        reference_id: registrationUserDto.referenceId,
      });
      return request;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getProfile(id: number) {
    const today = new Date();
    try {
      const identitie = await this.userIdentityRepository.findOne({
        where: { reference_id: id, is_enable: true },
      });
      const users = await this.usersRepository.findStatusActivePreregisDeceased(
        identitie?.reference_id ?? id,
      );

      if (identitie && users) {
        users.status = users.status.toLowerCase();
        if (users.status == 'active') {
          return {
            record_id: identitie.record_id,
            login_id: identitie.login_id,
            email: identitie.email,
            reference_id: identitie.reference_id,
            is_enable: identitie.is_enable,
            device_id: identitie.device_id,
            phone_number: identitie.phone_number,
            is_user: identitie.is_user,
            users: users,
          };
        } else {
          return {
            record_id: identitie.record_id,
            login_id: identitie.login_id,
            email: identitie.email,
            reference_id: identitie.reference_id,
            is_enable: identitie.is_enable,
            device_id: identitie.device_id,
            phone_number: identitie.phone_number,
            is_user: identitie.is_user,
            users: users,
          }
        }
      } else {
        throw new NotFoundException('user is not active');
      }
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async changePassword(userId: string, body: any) {
    const salt = this.config.get<string>('secretKey');
    const newPasswordHashed = generateSha512(body.newPassword, salt);
    const oldPasswordHashed = generateSha512(body.oldPassword, salt);
    const user = await this.userIdentityRepository.findOne({
      where: { reference_id: userId, is_enable: true },
    });
    if (user) {
      if (newPasswordHashed === user.password) {
        throw new BadRequestException(
          'Old and New Password cannot be the Same',
        );
      }
      if (user.password === oldPasswordHashed) {
        user.password = newPasswordHashed;
        return this.userIdentityRepository.save(user);
      }
      throw new BadRequestException('Wrong Old Password');
    }
    throw new NotFoundException('User not found');
  }

  async updateProfile(
    userId: string,
    { email, ...updateProfileDto }: UpdateUserDto,
  ) {
    const user = await this.userIdentityRepository.findOne({
      where: { reference_id: userId, is_enable: true },
    });
    if (user) {
      const patric = await this.usersRepository.findStatusActive(
        user.reference_id
      );
      if (!patric) {
        throw new NotFoundException('Data tidak ditemukan');
      }
      await this.userIdentityRepository.save(user);
      await this.usersRepository.save(patric);
      return user;
    }

    throw new NotFoundException('Peserta tidak ditemukan');
  }

  async updatePhoto(payload: UpdatePhotoDto) {
    let repository: Repository<UsersEntity> =
      this.usersRepository;

    const entity = await repository.findOne({ id: payload.ref_id });
    if (entity) {
      entity.photo = payload.photo;
      return repository.save(entity);
    }

    throw new NotFoundException('User tidak ditemukan');
  }

  async getIdentityByLoginId(loginId: string) {
    try {
      return await this.userIdentityRepository.findOne({
        where: { login_id: loginId, is_enable: true },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
