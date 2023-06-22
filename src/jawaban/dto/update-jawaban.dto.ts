import { PartialType } from '@nestjs/swagger';
import { CreateJawabanDto } from './create-jawaban.dto';
import { IsOptional } from 'class-validator';

export class UpdateJawabanDto {
  @IsOptional()
  nilai: number
}
