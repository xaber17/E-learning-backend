import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJawabanDto } from './dto/create-jawaban.dto';
import { UpdateJawabanDto } from './dto/update-jawaban.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoalsEntity } from 'src/soal/entities/soal.entity';
import { KelassEntity } from 'src/kelas/entities/kelas.entity';
import { Jawaban } from './entities/jawaban.entity';
import { UsersEntity } from 'src/user/entities/users.entity';

@Injectable()
export class JawabanService {
  constructor(
    @InjectRepository(Jawaban)
    private jawabanRepository: Repository<Jawaban>,
    @InjectRepository(SoalsEntity)
    private soalRepository: Repository<SoalsEntity>,
    @InjectRepository(KelassEntity)
    private kelasRepository: Repository<KelassEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}
  
  async create(createJawabanDto: CreateJawabanDto) {
    try {
      const request = await this.jawabanRepository.insert(createJawabanDto);
      return request;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async findAll(soal_id: number) {
    const jawaban = await this.jawabanRepository.find({
      where: { soal_id: soal_id }
    });
    for (let index = 0; index < jawaban.length; index++) {
      const siswa =  await this.userRepository.findOne({
        where: { user_id: jawaban[index].user_id }
      })
      jawaban[index]['siswa_name'] = siswa.nama_user
    }
    return jawaban;
  }

  findOne(id: number) {
    return `This action returns a #${id} jawaban`;
  }

  async update(id: number, updateJawabanDto: UpdateJawabanDto) {
    const result = await this.jawabanRepository.update(id, updateJawabanDto)
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} jawaban`;
  }
}
