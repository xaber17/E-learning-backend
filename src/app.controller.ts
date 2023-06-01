import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { ChangePasswordDto } from './auth/dto/change-password.dto';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { UserRole, UserStatus } from './user-identities/entities/users.entity';
import { UserIdentitiesService } from './user-identities/user-identities.service';
import { BaseResponseDto } from './utility/dto/base-response.dto';
import { RegistrationUserDto } from './user-identities/dto/registration-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserIdentitiesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('new-admin')
  async newAdmin() {
    const data: RegistrationUserDto = {
      email: 'test@gmail.com',
      phone_number: '123456789',
      status: true,
      name: 'Admin 1',
      role: UserRole.ADMIN,
      password: 'test123'
    }
    const result = await this.userService.registration(data);
    if (result) {
      return { message: 'Berhasil membuat admin' };
    } 
    throw new Error("Gagal Membuat Admin Baru");
  }

  @ApiOperation({ summary: 'Change Password' })
  @ApiResponse({ type: BaseResponseDto, status: 200 })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Body() body: ChangePasswordDto, @Request() req) {
    const result = await this.userService.changePassword(req.user.userId, body);
    return { message: 'Berhasil Mengubah Password' };
  }
}
