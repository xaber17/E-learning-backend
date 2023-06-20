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
import dayjs from 'dayjs';

@Injectable()
export class SoalService {
  constructor(
    @InjectRepository(SoalsEntity)
    private soalRepository: Repository<SoalsEntity>,
    @InjectRepository(KelassEntity)
    private kelasRepository: Repository<KelassEntity>
  ) {}

  async getAll() {
    try {
      const soal = await this.soalRepository.find();
      for (let index = 0; index < soal.length; index++) {
        console.log(soal[index].deadline.toDateString())
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

