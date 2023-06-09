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
import { MateriService } from './materi.service';
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
import { CreateMateriDto } from './dto/create-materi.dto';
import { UpdateMateriDto } from './dto/update-materi.dto';

@ApiTags('MATERI')
@Controller('materi')
export class MateriController {
  constructor(
    private readonly materiService: MateriService,
  ) {}
  @ApiOperation({ summary: 'Get Materi Profile' })
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
    description: 'Invalid Materi id',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req) {
    const result = await this.materiService.get(req.user.materiId);
    return { message: 'success', result };
  }

  @ApiOperation({ summary: 'New Materi' })
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
  async create(@Body() createMateriDto: CreateMateriDto, @Request() req) {
    if (req.user.role === "admin" || "guru") {
      return this.materiService.create(createMateriDto);
    }
    return { code: 401, message: "Bukan Admin / Guru" }
  }

  @ApiOperation({ summary: 'Update Materi' })
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
  async updateProfile(@Body() updateMateriDto: UpdateMateriDto, @Request() req) {
    if (req.user.role === "admin" || "guru") {
      let result = await this.materiService.update(
        req.user.materiId,
        updateMateriDto,
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
      return this.materiService.delete(body.materiId);
    }
    return { code: 401, message: "Bukan Admin / Guru" }
  }
}
