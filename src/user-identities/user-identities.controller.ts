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
import { plainToClass } from 'class-transformer';
import { UserIdentitiesService } from './user-identities.service';
import {
  RegistrationUserDto,
} from './dto/registration-user.dto';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { GetUserResponseDto } from './dto/get-user.dto';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdatePhotoDto, UpdateUserDto } from './dto/update-user.dto';
import * as dayjs from 'dayjs';

@ApiTags('USER')
@Controller('user')
export class UserIdentitiesController {
  constructor(
    private readonly userService: UserIdentitiesService,
  ) {}
  @ApiOperation({ summary: 'Get User Profile' })
  @ApiResponse({
    status: 200,
    description: 'Login Success',
    type: GetUserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BaseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid userId',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getProfile(@Request() req) {
    const result = await this.userService.getProfile(req.user.userId);
    return { message: 'success', result };
  }

  @ApiExcludeEndpoint()
  @Post('registration')
  registration(@Body() registrationUserDto: RegistrationUserDto) {
    return this.userService.registration(registrationUserDto);
  }

  @ApiOperation({ summary: 'Update Profile User Identities' })
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
    description: 'Invalid userId',
    type: BaseResponseDto,
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

  @UseGuards(JwtAuthGuard)
  @Patch('update-photo')
  async updatePhoto(@Body() body: UpdatePhotoDto) {
    await this.userService.updatePhoto(body);

    return { message: 'Berhasil ubah foto profil' };
  }

  @Get('get-by-login-id/:loginId')
  async getIdentityByLoginId(@Param('loginId') loginId: string) {
    const data = await this.userService.getIdentityByLoginId(loginId);
    if (data) {
      return {
        message: 'Berhasil memuat data',
        result: {
          loginId: data.login_id,
          referenceId: data.reference_id,
          recordId: data.record_id,
          isUser: data.is_user,
          isEnable: data.is_enable,
        },
      };
    }

    return {
      message: 'Berhasil memuat data',
      result: null,
    };
  }
}
