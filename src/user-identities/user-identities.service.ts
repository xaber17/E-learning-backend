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
export class UserIdentitiesService {
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

      if (newuser.kelas_id) {
        let kelas = await this.kelasRepository.findOne({
          kelas_id: newuser.kelas_id
        })

        if (kelas) {
          kelas.siswa.push({
            user_id: newuser.user_id,
            nama_user: newuser.nama_user,
            role: newuser.role
          })
        } else {
          throw new NotFoundException("Kelas Tidak Ditemukan")
        }
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
    id: string,
    updateProfileDto : UpdateUserDto,
  ) {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
    });

    if (user) {
      if (user.kelas_id !== updateProfileDto.kelas_id) {
        let kelasBaru = await this.kelasRepository.findOne({
          kelas_id: updateProfileDto.kelas_id
        })
        let kelasLama = await this.kelasRepository.findOne({
          kelas_id: user.kelas_id
        })

        if (kelasBaru && kelasLama) {
          let indeks = kelasLama.siswa.findIndex(siswa => {
            siswa["user_id"] === id
          })
          console.log("Before ", indeks)
          kelasLama.siswa.splice(indeks, 1)
        }
      }
      let result = await this.userRepository.update(id, updateProfileDto)
      return result;
    }

    throw new NotFoundException('User tidak ditemukan');
  }
}
