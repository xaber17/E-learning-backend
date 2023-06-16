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
import { KelassEntity } from './entities/kelas.entity';
import { ConfigService } from '@nestjs/config';
import { generateSha512 } from 'src/utility/string-util';
import { Cache } from 'cache-manager';
import { isEmpty } from 'class-validator';
import { CreateKelasDto } from './dto/create-kelas.dto';
import { UpdateKelasDto } from './dto/update-kelas.dto';

@Injectable()
export class KelasService {
  constructor(
    @InjectRepository(KelassEntity)
    private kelasRepository: Repository<KelassEntity>,
  ) {}

  async create(createKelasDto: CreateKelasDto) {
    try {
      const request = await this.kelasRepository.save(createKelasDto);
      return request;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async get(id: number) {
    try {
      const kelas = await this.kelasRepository.findOne({
        where: { kelas_id: id },
      });
      return kelas;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getAll() {
    try {
      const kelas = await this.kelasRepository.find();
      return kelas;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async delete(id: number) {
    try {
      const kelas = await this.kelasRepository.delete({
        kelas_id: id,
      });
      return kelas;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async update(id: number, updateKelasDto: UpdateKelasDto) {
    const kelas = await this.kelasRepository.findOne({
      where: { kelas_id: id },
    });
    if (kelas) {
      const result = await this.kelasRepository.update(id, updateKelasDto);
      return result;
    }
    throw new NotFoundException('Kelas tidak ditemukan');
  }
}
