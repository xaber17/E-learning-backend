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
import { SoalsEntity } from './entities/soal.entity';
import { ConfigService } from '@nestjs/config';
import { generateSha512 } from 'src/utility/string-util';
import { Cache } from 'cache-manager';
import { isEmpty } from 'class-validator';
import { CreateSoalDto } from './dto/create-soal.dto';
import { UpdateSoalDto } from './dto/update-soal.dto';

@Injectable()
export class SoalService {
  constructor(
    @InjectRepository(SoalsEntity)
    private soalRepository: Repository<SoalsEntity>,
  ) { }

  async create( createSoalDto: CreateSoalDto ) {
    try {
      const request = await this.soalRepository.save(createSoalDto);
      return request;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async get(id: number) {
    try {
      const soal = await this.soalRepository.findOne({
        soal_id: id
      });
      return soal;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async delete(id: number) {
    try {
      const soal = await this.soalRepository.delete({
        soal_id: id
      });
      return soal;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async update(
    id: string,
    updateSoalDto : UpdateSoalDto,
  ) {
    const soal = await this.soalRepository.findOne({
      where: { soal_id: id },
    });
    if (soal) {
      let result = await this.soalRepository.update(id, updateSoalDto)
      return result;
    }
    throw new NotFoundException('Soal tidak ditemukan');
  }
  
}