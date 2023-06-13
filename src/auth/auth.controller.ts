import {
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Headers,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, LoginDataDto } from './dto/login-auth.dto';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './guard/local-auth.guard';
// import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
// import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, // @InjectPinoLogger(AuthController.name) // private readonly pinoLogger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Authentication login' })
  @ApiResponse({
    status: 200,
    description: 'Login Success',
    type: LoginDataDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Login not Success',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  // @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBody({ type: LoginAuthDto })
  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    // this.pinoLogger.info('login')
    return { message: 'Berhasil masuk', result };
  }

  // @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Headers() header) {
    const prefix = 'Bearer ';
    let token: string = header.authorization;
    if (token.startsWith(prefix)) {
      token = token.slice(prefix.length);
    }
    const result = await this.authService.logout(token);
    return { message: 'Berhasil Keluar', result };
  }

  // @ApiOperation({ summary: 'Check JWT Expires' })
  // @ApiResponse({ type: BaseResponseDto, status: 200 })
  // @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  // @ApiBearerAuth('JWT')
  // @UseGuards(JwtAuthGuard)
  // @Get('validate-token')
  // async validateToken(@Headers() header, @Request() req) {
  //   let token: string | undefined = header.authorization;
  //   if (token) {
  //     const prefix = 'Bearer ';
  //     if (token.startsWith(prefix)) {
  //       token = token.slice(prefix.length);
  //     }
  //     const verify = this.authService.verifyJwt(token);
  //     const isNotSameWithPrevToken =
  //       await this.authService.compareWithPreviousToken(token);
  //     if (verify && isNotSameWithPrevToken) {
  //       const identity = await this.authService.getIdentityByUserId(
  //         req.user.userId,
  //       );
  //       return {
  //         message: 'Token Valid',
  //         result: { valid: true },
  //       };
  //     }
  //   }

  //   return { message: 'Token Tidak Valid', result: { valid: false } };
  // }
}
