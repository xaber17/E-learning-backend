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
import { UserIdentitiesService } from './user-identities/user-identities.service';
import { BaseResponseDto } from './utility/dto/base-response.dto';

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
