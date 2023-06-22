import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  StreamableFile,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import { error } from 'console';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
    type: MaterisEntity,
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploaded-file',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async asyncuploadMateri(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
    @Request() req,
  ) {
    console.log("Isi Data Materi: ", body, file)
    const data = {
      kelas_id: body.kelas_id,
      deskripsi: body.deskripsi,
      user_id: req.user.userId,
      filename: body.materi_name,
    };
    return this.uploadFileService.create(file, data, 'materi');
  }

  @ApiOperation({ summary: 'Upload File Soal' })
  @ApiResponse({
    status: 200,
    description: 'Upload Success',
    type: SoalsEntity,
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploaded-file',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async asyncuploadSoal(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
    @Request() req,
  ) {
    const data = {
      kelas_id: body.kelas_id,
      user_id: req.user.userId,
      filename: file.filename,
      soal_name: body.soal_name,
      deadline: new Date(body.deadline),
      tipe: body.tipe_soal || null,
    };
    return this.uploadFileService.create(file, data, 'soal');
  }

  @UseGuards(JwtAuthGuard)
  @Post('jawaban')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploaded-file',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async asyncuploadJawaban(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
    @Request() req,
  ) {
    console.log("User: ", req.user)
    const data = {
      kelas_id: req.user.kelasId || 1,
      soal_id: body.soal_id,
      user_id: req.user.userId,
      filename: file.filename,
    };
    return this.uploadFileService.create(file, data, 'jawaban');
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get(':materiId')
  async find(@Param() param): Promise<StreamableFile> {
    console.log(param.materiId)
    const data = await this.uploadFileService.findOne(param.materiId)
    console.log('data file', data)
    const file = createReadStream(
      join(process.cwd(), `./uploaded-file/${data.originalname}`),
    );
    return new StreamableFile(file);
  }

  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadFileService.remove(+id);
  }
}