import {
  Controller,
  Post,
  Request,
  Body,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { IncomingHttpHeaders } from 'http';

@ApiTags('FORGOT-PASSWORD')
@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @ApiOperation({ summary: 'Forgot Password Endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Berhasil Membuat Kata Sandi Baru',
    type: BaseResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Kata sandi harus terdiri dari huruf dan angka',
    type: BaseResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBody({ type: ForgotPasswordDto })
  // @ApiBearerAuth('JWT')
  // @UseGuards(JwtAuthGuard)
  @Post()
  async forgot(
    @Body() body: ForgotPasswordDto,
    @Request() req,
    @Headers('x-device-id') deviceId: string,
  ) {
    await this.forgotPasswordService.forgot(
      body.noPegawai,
      body.newPassword,
      deviceId,
    );
    return { message: 'Berhasil membuat kata sandi baru' };
  }
}
