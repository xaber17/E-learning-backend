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

@ApiTags('MATERI')
@Controller('materi')
export class MateriController {
  constructor(private readonly materiService: MateriService) {}
  @ApiOperation({ summary: 'Get All Materi Profile' })
  @ApiResponse({
    status: 200,
    description: 'Get Success',
    type: CreateMateriDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: CreateMateriDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid Materi id',
    type: CreateMateriDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllMateri(@Request() req) {
    const result = await this.materiService.getAll();
    console.log(result)
    return { message: 'success', result };
  }

  @ApiOperation({ summary: 'Get Materi Profile' })
  @ApiResponse({
    status: 200,
    description: 'Get Success',
    type: CreateMateriDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: CreateMateriDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid Materi id',
    type: CreateMateriDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getMateri(@Request() req) {
    const result = await this.materiService.get(req.user.materiId);
    return { message: 'success', result };
  }

  @ApiOperation({ summary: 'New Materi' })
  @ApiResponse({
    status: 200,
    description: 'Create Success',
    type: CreateMateriDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: CreateMateriDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid',
    type: CreateMateriDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createMateriDto, @Request() req) {
    console.log('Isi Create Materi dto: ', createMateriDto)
    if (req.user.role === 'admin' || 'guru') {
      return this.materiService.create(createMateriDto);
    }
    return { code: 401, message: 'Bukan Admin / Guru' };
  }

  @ApiOperation({ summary: 'Delete Materi' })
  @ApiResponse({
    status: 200,
    description: 'Create Success',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid',
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:materiId')
  async delete(@Param() param, @Request() req) {
    console.log('Param delete: ', param.materiId)
    if (req.user.role === 'admin' || 'guru') {
      return this.materiService.delete(param.materiId);
    }
    return { code: 401, message: 'Bukan Admin / Guru' };
  }
}
