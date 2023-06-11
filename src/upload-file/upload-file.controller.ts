import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseInterceptors, StreamableFile } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import { error } from 'console';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploaded-file',
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
      }
    })
  }))
  async asyncuploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 100000 }),
        new FileTypeValidator({ fileType: 'pdf' })
      ]
    })
  ) file: Express.Multer.File) {
    return this.uploadFileService.create(file)
  }

  @Get('get')
  find(): StreamableFile {
    const file = createReadStream(join(process.cwd(), `./uploaded-file/Lembar Pengesahan PKL 1.pdf`))
    return new StreamableFile(file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadFileService.remove(+id);
  }
}
