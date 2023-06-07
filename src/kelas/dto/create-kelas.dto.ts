import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { Type, Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

@Exclude()
export class CreateKelasDto {
  @IsOptional()
  @ApiResponseProperty({ type: String, example: 'Matematika' })
  kelas_name: string

  @IsOptional()
  @ApiResponseProperty({ type: Array })
  siswa: object[];

  @IsOptional()
  @ApiResponseProperty({ type: Array })
  soal: object[];

  @IsOptional()
  @ApiResponseProperty({ type: Array })
  materi: object[];
}
export class CreateKelasResponseDto extends BaseResponseDto {
  @ApiResponseProperty({ type: CreateKelasDto })
  data: CreateKelasDto;
}
