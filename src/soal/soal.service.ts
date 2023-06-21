/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoalsEntity } from './entities/soal.entity';
import { CreateSoalDto } from './dto/create-soal.dto';
import { KelassEntity } from 'src/kelas/entities/kelas.entity';
import { UsersEntity } from 'src/user/entities/users.entity';

@Injectable()
export class SoalService {
  constructor(
    @InjectRepository(SoalsEntity)
    private soalRepository: Repository<SoalsEntity>,
    @InjectRepository(KelassEntity)
    private kelasRepository: Repository<KelassEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async getAll(user) {
    try {
      let soal;
      if (user.role === 'siswa') {
        soal = await this.soalRepository.find({
          where: {kelas_id: user.kelasId}
        });
      } else {
        soal = await this.soalRepository.find();
      }

      for (let index = 0; index < soal.length; index++) {
        const guru =  await this.userRepository.findOne({
          where: { user_id: soal[index].user_id }
        })

        if (guru) {
          soal[index]['guru_name'] = guru.nama_user
        } else {
          soal[index]['guru_name'] = 'By Admin'
        }

        if (soal[index].kelas_id != 0) {
          const kelas = await this.kelasRepository.findOne({
            where: { kelas_id: soal[index].kelas_id }
          })

          if (kelas) {
            soal[index]['kelas_name'] = kelas.kelas_name
          } else {
            soal[index]['kelas_name'] = '-'
          }
        }
        soal[index]['deadlines'] = soal[index]?.deadline?.toDateString()
      }

      return soal;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async create(createSoalDto: CreateSoalDto) {
    try {
      const request = await this.soalRepository.insert(createSoalDto);
      return request;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async get(id: number) {
    try {
      const soal = await this.soalRepository.findOneBy({
        soal_id: id,
      });
      return soal;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async delete(id: number) {
    try {
      const soal = await this.soalRepository.delete({
        soal_id: id,
      });
      return soal;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  // async update(
  //   id: number,
  //   updateSoalDto : UpdateSoalDto,
  // ) {
  //   const soal = await this.soalRepository.findOne({
  //     where: { soal_id: id },
  //   });
  //   if (soal) {
  //     let result = await this.soalRepository.update(id, updateSoalDto)
  //     return result;
  //   }
  //   throw new NotFoundException('Soal tidak ditemukan');
  // }
}

