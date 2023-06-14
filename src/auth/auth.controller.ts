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
    console.log(' Hit Login ', req.user);
    const data = await this.authService.login(req.user);
    const accessToken = data.accessToken;
    const user = data.user;
    delete data.accessToken;
    // this.pinoLogger.info('login')
    return { message: 'Berhasil masuk', accessToken, user };
  }

  // @ApiHeader({ name: 'x-device-id', description: 'Android or iOS device id' })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Headers() header) {
    const prefix = 'Bearer ';
    let accessToken: string = header.authorization;
    if (accessToken.startsWith(prefix)) {
      accessToken = accessToken.slice(prefix.length);
    }
    const result = await this.authService.logout(accessToken);
    return { message: 'Berhasil Keluar', result };
  }
}
// Example Response
// {
//   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ODY0YzcxNy01ODdkLTQ3MmEtOTI5YS04ZTVmMjk4MDI0ZGEtMCIsImlhdCI6MTY4Njc0NTUyOSwiZXhwIjoxNjg3MDA0NzI5fQ.s6-LyRuKllTcwVyV1JfrjJVfYUULQksYxc9uwUOJr7k",
//   "user": {
//       "id": "8864c717-587d-472a-929a-8e5f298024da-0",
//       "displayName": "Jaydon Frankie",
//       "email": "demo@minimals.cc",
//       "password": "demo1234",
//       "photoURL": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_default.jpg",
//       "phoneNumber": "+40 777666555",
//       "country": "United States",
//       "address": "90210 Broadway Blvd",
//       "state": "California",
//       "city": "San Francisco",
//       "zipCode": "94116",
//       "about": "Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.",
//       "role": "admin",
//       "isPublic": true
//   }
// }
