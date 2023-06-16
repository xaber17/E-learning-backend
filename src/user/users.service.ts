/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Not, Repository } from 'typeorm';
import { UserRole, UsersEntity } from './entities/users.entity';
import { ConfigService } from '@nestjs/config';
import { generateSha512 } from 'src/utility/string-util';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { KelassEntity } from 'src/kelas/entities/kelas.entity';
import { instanceToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(KelassEntity)
    private kelasRepository: Repository<KelassEntity>,
    private dataSource: DataSource
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
      const regisData = Object.assign(new UsersEntity(), registrationUserDto);

      const newuser = {
        ...regisData,
        password: hashPassword,
        status: true,
        created_by: 'admin',
      };

      if (newuser.role === 'admin' || newuser.role === 'guru') {
        request = await this.userRepository.save(newuser);
      } else {
        const kelas = await this.kelasRepository.findOne({
          where: { kelas_id: newuser.kelas_id },
        });

        if (kelas) {
          request = await this.userRepository.save(newuser);
          const kelas = await this.kelasRepository.findOne({
            where: { kelas_id: newuser.kelas_id }
          })
          console.log('Data kelas registration: ', kelas)
        } else {
          console.log('Error di registration');
          throw new NotFoundException('Kelas tidak ditemukan');
        }
      }

      return request;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getProfile(id: number, role: string) {
    try {
      let guru, siswa;
      const result = await this.userRepository.findOne({
        where: { user_id: id },
      });
      if (role === UserRole.ADMIN) {
        guru = await this.userRepository.find({
          where: { role: UserRole.GURU },
        });
        siswa = await this.userRepository.find({
          where: { role: UserRole.SISWA },
        });
      }
      const user = instanceToInstance<UsersEntity>(result);
      const data = {
        user,
        guru,
        siswa,
      };
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getAllUser() {
    try {
      // const query = createQueryBuilder(UsersEntity, 'user')
      // .leftJoin
      const user = await this.userRepository.find();
      for (let index = 0; index < user.length; index++) {
        if (user[index].kelas_id != 0) {
          const kelas = await this.kelasRepository.findOne({
            where: { kelas_id: user[index].kelas_id }
          })
          user[index]['kelas_name'] = kelas.kelas_name
        }
      }
      return user;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async changePassword(userId: number, body: any) {
    const salt = this.config.get<string>('secretKey');
    const newPasswordHashed = generateSha512(body.newPassword, salt);
    const oldPasswordHashed = generateSha512(body.oldPassword, salt);
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
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

  async updateOtherProfile(id: number, updateProfileDto: UpdateUserDto) {
    if (updateProfileDto.status) {
      updateProfileDto.status = (updateProfileDto.status.toString() == 'true')
    }
    const user = await this.userRepository.findOne({
      where: { user_id: id },
    });

    if (user) {
      return await this.userRepository.update(id, updateProfileDto);
    } else {
      throw new NotFoundException('Kelas tidak ditemukan');
    }
  }

  async updateProfile(id: number, updateProfileDto: UpdateUserDto) {
    updateProfileDto.status = (updateProfileDto.status.toString() == 'true')
    const user = await this.userRepository.findOne({
      where: { user_id: id },
    });

    if (user) {
      return await this.userRepository.update(id, updateProfileDto);
    } else {
      throw new NotFoundException('Kelas tidak ditemukan');
    }
  }

  async delete(id: number) {
    try {
      const user = await this.userRepository.delete({
        user_id: id,
      });
      return user;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
