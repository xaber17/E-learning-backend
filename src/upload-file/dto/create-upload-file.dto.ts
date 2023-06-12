import { ApiProperty, ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import { Type, Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { SoalType } from 'src/soal/entities/soal.entity';

@Exclude()
export class CreateUploadFileDto {
  @ApiProperty({ type: String, example: 'Materi Jaringan 2020', description: 'Materi Name'})
  name: string

  @IsOptional()
  file_id: number;

  @IsOptional()
  user_id: number;

  @ApiProperty({ type: Number, example: 2, description: 'kelas id'})
  kelas_id: number;

  @ApiPropertyOptional({ enum: SoalType, example: '(Optional)', description: 'Jika Soal yang diupload'})
  tipe_soal: SoalType;
}
