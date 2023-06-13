import { Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFileEntity } from './entities/upload-file.entity';
import { Repository } from 'typeorm';
import { KelassEntity } from 'src/kelas/entities/kelas.entity';
import { MaterisEntity } from 'src/materi/entities/materi.entity';
import { SoalsEntity } from 'src/soal/entities/soal.entity';

@Injectable()
export class UploadFileService {
  constructor(
    @InjectRepository(UploadFileEntity)
    private uploadFileRepository: Repository<UploadFileEntity>,
    @InjectRepository(KelassEntity)
    private kelasRepository: Repository<KelassEntity>,
    @InjectRepository(MaterisEntity)
    private materiRepository: Repository<MaterisEntity>,
    @InjectRepository(SoalsEntity)
    private soalRepository: Repository<SoalsEntity>,
  ) {}

  async create(file, data, type) {
    const checkKelas = await this.kelasRepository.findOneBy({
      kelas_id: data.kelas_id,
    });

    if (checkKelas) {
      const dataFile: UploadFileEntity = {
        ...file,
        filename: data.filename,
        kelas_id: data.kelas_id,
        user_id: data.user_id,
      };

      let result;
      const resultFile = await this.uploadFileRepository.save(dataFile);
      if (type === 'materi') {
        const materi = {
          materi_name: data.filename,
          file_id: resultFile.file_id,
          kelas_id: resultFile.kelas_id,
          user_id: resultFile.user_id,
        };
        result = await this.materiRepository.save(materi);
      } else {
        const soal = {
          soal_name: data.filename,
          file_id: resultFile.file_id,
          kelas_id: resultFile.kelas_id,
          user_id: resultFile.user_id,
          tipe_soal: data.tipe,
        };
        result = await this.soalRepository.save(soal);
      }
      return { result };
    } else {
      throw new NotFoundException('Kelas tidak ada');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadFile`;
  }
}
