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
import { SoalService } from './soal.service';
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
import { CreateSoalDto } from './dto/create-soal.dto';
import { UpdateSoalDto } from './dto/update-soal.dto';

@ApiTags('SOAL')
@Controller('soal')
export class SoalController {
  constructor(
    private readonly soalService: SoalService,
  ) {}
  @ApiOperation({ summary: 'Get Soal Profile' })
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
    description: 'Invalid Soal id',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req) {
    const result = await this.soalService.get(req.user.soalId);
    return { message: 'success', result };
  }

  @ApiOperation({ summary: 'New Soal' })
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
  async create(@Body() createSoalDto: CreateSoalDto, @Request() req) {
    if (req.user.role === "admin" || "guru") {
      return this.soalService.create(createSoalDto);
    }
    return { code: 401, message: "Bukan Admin / Guru" }
  }

  @ApiOperation({ summary: 'Update Soal' })
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
  async updateProfile(@Body() updateSoalDto: UpdateSoalDto, @Request() req) {
    if (req.user.role === "admin" || "guru") {
      let result = await this.soalService.update(
        req.user.soalId,
        updateSoalDto,
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
      return this.soalService.delete(body.soalId);
    }
    return { code: 401, message: "Bukan Admin / Guru" }
  }
}
