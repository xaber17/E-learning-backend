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

@Injectable()
export class SoalService {
  constructor(
    @InjectRepository(SoalsEntity)
    private soalRepository: Repository<SoalsEntity>,
  ) {}

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
