import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JawabanService } from './jawaban.service';
import { CreateJawabanDto } from './dto/create-jawaban.dto';
import { UpdateJawabanDto } from './dto/update-jawaban.dto';

@Controller('jawaban')
export class JawabanController {
  constructor(private readonly jawabanService: JawabanService) {}

  @Post()
  create(@Body() createJawabanDto: CreateJawabanDto) {
    return this.jawabanService.create(createJawabanDto);
  }

  @Get()
  findAll() {
    return this.jawabanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jawabanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJawabanDto: UpdateJawabanDto) {
    return this.jawabanService.update(+id, updateJawabanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jawabanService.remove(+id);
  }
}
