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
import { MaterisEntity } from './entities/materi.entity';
import { ConfigService } from '@nestjs/config';
import { generateSha512 } from 'src/utility/string-util';
import { Cache } from 'cache-manager';
import { isEmpty } from 'class-validator';
import { CreateMateriDto } from './dto/create-materi.dto';

@Injectable()
export class MateriService {
  constructor(
    @InjectRepository(MaterisEntity)
    private materiRepository: Repository<MaterisEntity>,
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
