/* eslint-disable @typescript-eslint/no-var-requires */
// load env first
require('dotenv').config();
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Request,
  BadRequestException,
  Param,
  Delete,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { KelasService } from './materi.service';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateKelasDto } from './dto/create-kelas.dto';
import { UpdateKelasDto } from './dto/update-kelas.dto';

@ApiTags('KELAS')
@Controller('kelas')
export class KelasController {
  constructor(
    private readonly kelasService: KelasService,
  ) {}
  @ApiOperation({ summary: 'Get Kelas Profile' })
  @ApiResponse({
    status: 200,
    description: 'Get Success',
    type: BaseResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BaseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid kelas id',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req) {
    const result = await this.kelasService.get(req.user.kelasId);
    return { message: 'success', result };
  }

  @ApiOperation({ summary: 'New Kelas' })
  @ApiResponse({
    status: 200,
    description: 'Create Success',
    type: BaseResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BaseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createKelasDto: CreateKelasDto, @Request() req) {
    if (req.user.role === "admin" || "guru") {
      return this.kelasService.create(createKelasDto);
    }
    return { code: 401, message: "Bukan Admin / Guru" }
  }

  @ApiOperation({ summary: 'Update Kelas' })
  @ApiResponse({
    status: 200,
    description: 'Berhasil ubah data',
    type: BaseResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BaseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateProfile(@Body() updateKelasDto: UpdateKelasDto, @Request() req) {
    if (req.user.role === "admin" || "guru") {
      let result = await this.kelasService.update(
        req.user.kelasId,
        updateKelasDto,
      );
      return { message: 'Berhasil ubah data', result };
    }
    return { code: 401, message: "Bukan Admin / Guru" }
  }

  @ApiOperation({ summary: 'New Kelas' })
  @ApiResponse({
    status: 200,
    description: 'Create Success',
    type: BaseResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BaseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  delete(@Body() body, @Request() req) {
    if (req.user.role === "admin" || "guru") {
      return this.kelasService.delete(body.kelasId);
    }
    return { code: 401, message: "Bukan Admin / Guru" }
  }
}
