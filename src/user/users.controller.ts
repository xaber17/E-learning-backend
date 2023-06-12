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
} from '@nestjs/common';
// import { plainToClass } from 'class-transformer';
import { UserService } from './users.service';
import {
  RegistrationUserDto,
} from './dto/registration-user.dto';
// import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { UserDataDto } from './dto/get-user.dto';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './entities/users.entity';
// import * as dayjs from 'dayjs';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  @ApiOperation({ summary: 'Get User Profile' })
  @ApiResponse({
    status: 200,
    description: 'Login Success',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid userId'
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getProfile(@Request() req) {
    console.log(req.user)
    const data = await this.userService.getProfile(req.user.userId);
    console.log(data, 
      "data")
    return { message: 'success', data };
  }

  @ApiOperation({ summary: 'Regis New User' })
  @ApiResponse({
    status: 200,
    description: 'Regis Success',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid userId',
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Post('registration')
  async registration(@Body() registrationUserDto: RegistrationUserDto, @Request() req) {
    console.log(req.user)
    if (req.user.role === "admin") {
      return this.userService.registration(registrationUserDto);
    }
    return { code: 401, message: "Bukan Admin" }
  }

  @ApiOperation({ summary: 'Update Profile User Identities' })
  @ApiResponse({
    status: 200,
    description: 'Berhasil ubah data',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid userId',
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Patch('update-profile')
  async updateProfile(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    let result = await this.userService.updateProfile(
      req.user.userId,
      updateUserDto,
    );
    return { message: 'Berhasil ubah data', result };
  }

  @Get('new-admin')
  async newAdmin() {
    const data: RegistrationUserDto = {
      username: 'getarnr',
      nama_user: 'Getar Nuansa R',
      nomor_induk: '123456789123456',
      status: true,
      role: UserRole.ADMIN,
      kelas_id: 0,
      password: 'test123'
    }
    const result = await this.userService.registration(data);
    if (result) {
      return { message: 'Berhasil membuat admin' };
    } 
    throw new Error("Gagal Membuat Admin Baru");
  }
}
