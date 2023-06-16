import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
// import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { Type, Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

@Exclude()
export class CreateKelasDto {
  @IsOptional()
  @ApiResponseProperty({ type: String, example: 'Matematika' })
  kelas_name: string;

  @IsOptional()
  @ApiResponseProperty({ type: String, example: 'Ini Pelajaran Matematika yang susah' })
  deskripsi: string;
}
