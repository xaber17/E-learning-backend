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
// import { plainToClass } from 'class-transformer';
import { UserService } from './users.service';
import { RegistrationUserDto } from './dto/registration-user.dto';
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
import { plainToClass } from 'class-transformer';
// import * as dayjs from 'dayjs';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: 'Get Current User Profile' })
  @ApiResponse({
    status: 200,
    description: 'Login Success',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid userId',
  })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req) {
    const result = await this.userService.getProfile(
      req.user.userId,
      req.user.role,
    );
    return { message: 'success', result };
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
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Post('registration')
  async registration(
    @Body() registrationUserDto: RegistrationUserDto,
    @Request() req,
  ) {
    if (req.user.role === 'admin') {
      return this.userService.registration(registrationUserDto);
    }
    return { code: 401, message: 'Bukan Admin' };
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
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Patch('update-profile')
  async updateProfile(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    const result = await this.userService.updateProfile(
      req.user.userId,
      updateUserDto,
    );
    return { message: 'Berhasil ubah data', result };
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
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Patch('update/:userId')
  async updateOtherUser(@Body() updateUserDto: UpdateUserDto, @Request() req, @Param() param) {
    if (req.user.role === 'admin') {
      console.log('Masuk Controller Update User Lain: ', param.userId, updateUserDto)
      const result = await this.userService.updateOtherProfile(
        param.userId,
        updateUserDto,
      );
      return { message: 'Berhasil ubah data', result };
    }
    return { code: 401, message: 'Bukan Admin' };
  }
    

  @Get('new-admin')
  async newAdmin() {
    const data: RegistrationUserDto = {
      username: 'admin',
      nama_user: 'Getar Nuansa R',
      nomor_induk: '123456789123456',
      status: true,
      role: UserRole.ADMIN,
      kelas_id: 0,
      password: 'test123',
    };
    const result = await this.userService.registration(data);
    if (result) {
      return { message: 'Berhasil membuat admin', result };
    }
    throw new Error('Gagal Membuat Admin Baru');
  }

  @ApiOperation({ summary: 'Get User Profile' })
  @ApiResponse({
    status: 200,
    description: 'Login Success',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid userId',
  })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUser(@Request() req) {
    console.log(req.user)
    if (req.user.role === 'admin') {
      const data = this.userService.getAllUser();
      return data;
    }
    return { code: 401, message: 'Bukan Admin' };
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({
    status: 200,
    description: 'Delete Success',
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
  @Delete('delete/:userId')
  async delete(@Request() req, @Param() param) {
    if (req.user.role === 'admin' || 'guru') {
      return this.userService.delete(param.userId);
    }
    return { code: 401, message: 'Bukan Admin / Guru' };
  }
}
