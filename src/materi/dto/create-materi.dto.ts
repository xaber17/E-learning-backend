import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { Type, Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

@Exclude()
export class CreateMateriDto {
  @IsOptional()
  @ApiResponseProperty({ type: String, example: 'Matematika' })
  materi_name: string

  @IsOptional()
  @ApiResponseProperty({ type: String })
  file_id: number;

  @IsOptional()
  @ApiResponseProperty({ type: Number })
  tipe_materi: number;
}
export class CreateMateriResponseDto extends BaseResponseDto {
  @ApiResponseProperty({ type: CreateMateriDto })
  data: CreateMateriDto;
}
