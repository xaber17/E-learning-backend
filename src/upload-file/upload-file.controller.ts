import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseInterceptors, StreamableFile, Request, UseGuards } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import { error } from 'console';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { MaterisEntity } from 'src/materi/entities/materi.entity';
import { SoalsEntity } from 'src/soal/entities/soal.entity';

@ApiTags('UPLOAD-FILE')
@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  @ApiOperation({ summary: 'Upload File Materi' })
  @ApiResponse({
    status: 200,
    description: 'Login Success',
    type: MaterisEntity
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Kelas Tidak Ditemukan',
  })
  @ApiBearerAuth('JWT')
  @ApiBody({ type: CreateUploadFileDto })
  @UseGuards(JwtAuthGuard)
  @Post('materi')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploaded-file',
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
      }
    })
  }))
  async asyncuploadMateri(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 100000 }),
        new FileTypeValidator({ fileType: 'pdf' })
      ]
    })
  ) file: Express.Multer.File, @Body() body, @Request() req) {
    let data = {
      kelas_id: body.kelas_id,
      user_id: req.user.userId,
      filename: body.name
    }
    return this.uploadFileService.create(file, data, "materi")
  }

  @ApiOperation({ summary: 'Upload File Soal' })
  @ApiResponse({
    status: 200,
    description: 'Upload Success',
    type: SoalsEntity
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Kelas Tidak Ditemukan',
  })
  @ApiBearerAuth('JWT')
  @ApiBody({ type: CreateUploadFileDto })
  @UseGuards(JwtAuthGuard)
  @Post('soal')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploaded-file',
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
      }
    })
  }))
  async asyncuploadSoal(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 100000 }),
        new FileTypeValidator({ fileType: 'pdf' })
      ]
    })
  ) file: Express.Multer.File, @Body() body, @Request() req) {
    let data = {
      kelas_id: body.kelas_id,
      user_id: req.user.userId,
      filename: body.name,
      tipe: body.tipe_soal || null
    }
    return this.uploadFileService.create(file, data, "soal")
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('get')
  find(): StreamableFile {
    const file = createReadStream(join(process.cwd(), `./uploaded-file/Lembar Pengesahan PKL 1.pdf`))
    return new StreamableFile(file);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadFileService.remove(+id);
  }
}
