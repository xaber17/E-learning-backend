import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { Type, Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

@Exclude()
export class CreateKelasDto {
  @IsOptional()
  @ApiResponseProperty({ type: String, example: 'Matematika' })
  kelas_name: string

  @ApiResponseProperty({ type: Number })
  kelas_id: number;
}
export class CreateKelasResponseDto extends BaseResponseDto {
  @ApiResponseProperty({ type: CreateKelasDto })
  data: CreateKelasDto;
}
