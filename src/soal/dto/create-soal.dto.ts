import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Type, Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { SoalType } from '../entities/soal.entity';

@Exclude()
export class CreateSoalDto {
  @IsOptional()
  @ApiResponseProperty({ type: String, example: 'Matematika' })
  soal_name: string

  @IsOptional()
  @ApiResponseProperty({ type: Number })
  file_id: number;

  @IsOptional()
  @ApiResponseProperty({ enum: SoalType })
  tipe_soal: SoalType;

  @IsOptional()
  @ApiResponseProperty({ type: Number })
  user_id: number;

  @IsOptional()
  @ApiResponseProperty({ type: Number })
  kelas_id: number;
}