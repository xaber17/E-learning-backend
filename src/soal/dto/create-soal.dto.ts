import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { Type, Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

@Exclude()
export class CreateSoalDto {
  @IsOptional()
  @ApiResponseProperty({ type: String, example: 'Matematika' })
  soal_name: string

  @IsOptional()
  @ApiResponseProperty({ type: String })
  file_id: number;

  @IsOptional()
  @ApiResponseProperty({ type: Number })
  tipe_soal: number;
}
export class CreateSoalResponseDto extends BaseResponseDto {
  @ApiResponseProperty({ type: CreateSoalDto })
  data: CreateSoalDto;
}
