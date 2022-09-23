import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('REGISTRATION')
@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @ApiOperation({ summary: 'New Registration for New User User ' })
  @ApiResponse({
    status: 200,
    description: 'Berhasil Registrasi',
    type: CreateRegistrationDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Post('partic')
  async createPartic(
    @Body() createRegistrationDto: CreateRegistrationDto,
    @Request() req,
  ) {
    if (req.user.userId !== createRegistrationDto.ref_id) {
      throw new ForbiddenException('Not Allowed');
    }
    return this.registrationService.registrationPartic(
      createRegistrationDto,
      req.user.userId,
    );
  }

  @ApiOperation({ summary: 'New Registration for New Beneficiary User' })
  @ApiResponse({
    status: 200,
    description: 'Berhasil Registrasi',
    type: CreateRegistrationDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Post('bene')
  async createBene(
    @Body() createRegistrationDto: CreateRegistrationDto,
    @Request() req,
  ) {
    if (req.user.userId !== createRegistrationDto.ref_id) {
      throw new ForbiddenException('Not Allowed');
    }
    return this.registrationService.registrationBene(
      createRegistrationDto,
      req.user.userId,
    );
  }

  @ApiOperation({ summary: 'Get default registration data' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateRegistrationDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('partic')
  async getRegistData(@Request() req) {
    const result = await this.registrationService.getRegistrationData(
      req.user.userId,
    );
    return { message: 'Success', result };
  }

  @ApiOperation({ summary: 'Get default registration data' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateRegistrationDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Tidak ada data Pasangan',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('bene')
  async getRegistDataPasangan(@Request() req) {
    const result = await this.registrationService.getRegistrationDataPasangan(
      req.user.userId,
    );
    return { message: 'Success', result };
  }

  @ApiOperation({ summary: 'Get user registration data' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateRegistrationDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Data Registrasi Tidak Ditemukan',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('data-partic')
  async registrationPartic(@Request() req) {
    const result = await this.registrationService.dataRegistrationPartic(
      req.user.userId,
    );
    return { message: 'Success', result };
  }

  @ApiOperation({ summary: 'Get beneficiary registration data' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateRegistrationDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Data Registrasi Tidak Ditemukan',
    type: BaseResponseDto,
  })
  @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('data-bene')
  async registrationBene(@Request() req) {
    const result = await this.registrationService.dataRegistrationBene(
      req.user.userId,
    );
    return { message: 'Success', result };
  }
}
