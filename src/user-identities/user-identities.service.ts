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
import { UsersEntity } from './entities/users.entity';
import { ConfigService } from '@nestjs/config';
import { generateSha512 } from 'src/utility/string-util';
import {
  RegistrationUserDto,
} from './dto/registration-user.dto';
import { UpdatePhotoDto, UpdateUserDto } from './dto/update-user.dto';
import { Cache } from 'cache-manager';
import { isEmpty } from 'class-validator';

@Injectable()
export class UserIdentitiesService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async registration(registrationUserDto: RegistrationUserDto) {
    const checkEmail = await this.userRepository.findOne({
      where: { email: registrationUserDto.email },
    });

    if (checkEmail) {
      throw new BadRequestException('Email Sudah Digunakan');
    }

    try {
      const salt = this.config.get<string>('secretKey');
      const hashPassword = generateSha512(registrationUserDto.password, salt);
      const username = registrationUserDto.email.split("@")

      let regisData = Object.assign(
        new UsersEntity(),
        registrationUserDto
      );

      let newuser = {
        ...regisData,
        username: username[0],
        password: hashPassword,
        email: registrationUserDto.email,
        status: true,
        created_by: 'admin',
      }

      const request = await this.userRepository.save(newuser);
      return request;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getProfile(id: number) {
    try {
      const user = await this.userRepository.findOne({
        user_id: id
      });
      return user
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async changePassword(userId: string, body: any) {
    const salt = this.config.get<string>('secretKey');
    const newPasswordHashed = generateSha512(body.newPassword, salt);
    const oldPasswordHashed = generateSha512(body.oldPassword, salt);
    const user = await this.userRepository.findOne({
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
        return this.userRepository.save(user);
      }
      throw new BadRequestException('Wrong Old Password');
    }
    throw new NotFoundException('User not found');
  }

  async updateProfile(
    userId: string,
    { email, ...updateProfileDto }: UpdateUserDto,
  ) {
    const user = await this.userRepository.findOne({
      where: { reference_id: userId, is_enable: true },
    });
    if (user) {
      const patric = await this.userRepository.findOne(
        user.user_id
      );
      if (!patric) {
        throw new NotFoundException('Data tidak ditemukan');
      }
      await this.userRepository.save(user);
      await this.userRepository.save(patric);
      return user;
    }

    throw new NotFoundException('Peserta tidak ditemukan');
  }
}
