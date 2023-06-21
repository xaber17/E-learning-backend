/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterisEntity } from './entities/materi.entity';
import { CreateMateriDto } from './dto/create-materi.dto';
import { KelassEntity } from 'src/kelas/entities/kelas.entity';
import { UsersEntity } from 'src/user/entities/users.entity';

@Injectable()
export class MateriService {
  constructor(
    @InjectRepository(MaterisEntity)
    private materiRepository: Repository<MaterisEntity>,
    @InjectRepository(KelassEntity)
    private kelasRepository: Repository<KelassEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  async create(createMateriDto: CreateMateriDto) {
    try {
      const request = await this.materiRepository.save(createMateriDto);
      return request;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async get(id: number) {
    try {
      const materi = await this.materiRepository.findOneBy({
        materi_id: id,
      });
      return materi;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getAll(user) {
    let materi;
    try {
      if (user.role === 'siswa') {
        materi = await this.materiRepository.find({
          where: {kelas_id: user.kelasId},
          order: { created_at: 'DESC' }
        });
      } else {
        materi = await this.materiRepository.find({
          order: { created_at: 'DESC' }
        });
      }
      
      for (let index = 0; index < materi.length; index++) {
        if (materi[index].kelas_id != 0) {
          const guru =  await this.userRepository.findOne({
            where: { user_id: materi[index].user_id }
          })
          const kelas = await this.kelasRepository.findOne({
            where: { kelas_id: materi[index].kelas_id }
          })

          if (guru) {
            materi[index]['user_name'] = guru.nama_user
          } else {
            materi[index]['user_name'] = 'By Admin'
          }

          if (kelas) {
            materi[index]['kelas_name'] = kelas.kelas_name
          } else {
            materi[index]['kelas_name'] = 'Kelas Belum ada'
          }
        }
      }
      return materi;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async delete(id: number) {
    try {
      const materi = await this.materiRepository.delete({
        materi_id: id,
      });
      return materi;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
