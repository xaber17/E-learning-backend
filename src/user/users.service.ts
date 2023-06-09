/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Not, Repository } from 'typeorm';
import { UsersEntity } from './entities/users.entity';
import { ConfigService } from '@nestjs/config';
import { generateSha512 } from 'src/utility/string-util';
import {
  RegistrationUserDto,
} from './dto/registration-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Cache } from 'cache-manager';
import { isEmpty } from 'class-validator';
import { KelassEntity } from 'src/kelas/entities/kelas.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(KelassEntity)
    private kelasRepository: Repository<KelassEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async registration(registrationUserDto: RegistrationUserDto) {
    const checkUsername = await this.userRepository.findOne({
      where: { username: registrationUserDto.username },
    });

    if (checkUsername) {
      throw new BadRequestException('Username Sudah Digunakan');
    }

    try {
      const salt = this.config.get<string>('secretKey');
      const hashPassword = generateSha512(registrationUserDto.password, salt);
      // const username = registrationUserDto.email.split("@")

      let request;
      let regisData = Object.assign(
        new UsersEntity(),
        registrationUserDto
      );

      let newuser = {
        ...regisData,
        password: hashPassword,
        status: true,
        created_by: 'admin',
      }

      if (newuser.role === "admin" || newuser.role === "guru") {
        request = await this.userRepository.save(newuser);
      } else {
        let kelas = await this.kelasRepository.findOne({
          kelas_id: newuser.kelas_id
        })

        if (kelas) {
          request = await this.userRepository.save(newuser);       
        } else {
          throw new NotFoundException("Kelas Tidak Ditemukan")
        }
      }

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
    id: string,
    updateProfileDto : UpdateUserDto,
  ) {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
    });

    if (user) {
      if (user.kelas_id !== updateProfileDto.kelas_id) {
        let kelas = await this.kelasRepository.findOne({
          kelas_id: updateProfileDto.kelas_id
        })

        if (kelas) {
          return await this.userRepository.update(id, updateProfileDto)
        } else {
          throw new NotFoundException('Kelas tidak ditemukan')
        }
      }
      
      return await this.userRepository.update(id, updateProfileDto)
    }

    throw new NotFoundException('User tidak ditemukan');
  }
}
