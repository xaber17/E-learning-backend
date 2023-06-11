import { Injectable, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';
import { diskStorage } from 'multer';

@Injectable()
export class UploadFileService {

  
  async create(data) {
    return { data };
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadFile`;
  }
}
