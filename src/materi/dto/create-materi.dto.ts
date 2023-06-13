import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Type, Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

@Exclude()
export class CreateMateriDto {
  @IsOptional()
  @ApiResponseProperty({ type: String, example: 'Matematika' })
  materi_name: string;

  @IsOptional()
  @ApiResponseProperty({ type: Number })
  file_id: number;

  @IsOptional()
  @ApiResponseProperty({ type: Number })
  user_id: number;

  @IsOptional()
  @ApiResponseProperty({ type: Number })
  kelas_id: number;
}
