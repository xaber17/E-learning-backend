import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectPinoLogger(AuthController.name)
    private readonly pinoLogger: PinoLogger,
    ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    this.pinoLogger.info('Login')
    return {message: 'Login Berhasil', result};
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
