import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JawabanService } from './jawaban.service';
import { CreateJawabanDto } from './dto/create-jawaban.dto';
import { UpdateJawabanDto } from './dto/update-jawaban.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard'

@Controller('jawaban')
export class JawabanController {
  constructor(private readonly jawabanService: JawabanService) {}

  @Post()
  async create(@Body() createJawabanDto: CreateJawabanDto, @Request() req) {
    createJawabanDto.user_id = req.user.userId
    return this.jawabanService.create(createJawabanDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('all')
  async findAll(@Request() req, @Body() body) {
    const result = await this.jawabanService.findAll(body.soalId);
    console.log("Data Get All Soal: ", result)
    return { message: 'success', result };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jawabanService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJawabanDto: UpdateJawabanDto) {
    return this.jawabanService.update(+id, updateJawabanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jawabanService.remove(+id);
  }
}
