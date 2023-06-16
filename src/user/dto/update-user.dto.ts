import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ type: String, example: 'getarnr' })
  @IsOptional()
  @IsString()
  username: string;

  @ApiPropertyOptional({ type: String, example: 'Getar Nuansa R' })
  @IsOptional()
  @IsString()
  nama_user: string;

  @ApiPropertyOptional({ type: Boolean, example: true })
  @IsOptional()
  status: boolean;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  kelas_id: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  password: string;
}
