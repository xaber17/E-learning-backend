import { IsMobilePhone, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginActivityDto {
  @ApiProperty({
    type: String,
    description: 'Login ID / nomor Pegawai',
    example: '123456',
  })
  @IsString()
  login_id: string;

  @ApiPropertyOptional({
    type: String,
    description: 'phone number',
    example: '082213066683',
  })
  @IsMobilePhone()
  @IsOptional()
  phone_number?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Platform Android / iOS',
    example: 'iOS',
  })
  @IsString()
  @IsOptional()
  platform?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Platform OS version',
    example: 'iOS 10',
  })
  @IsString()
  @IsOptional()
  platform_os?: string;

  @ApiProperty({
    type: String,
    description: 'Device ID',
    example: 'x-device-id',
  })
  @IsString()
  device_id: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Longitude',
    example: -77.0364,
  })
  @IsNumber()
  @IsOptional()
  longitude_area?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Latitude',
    example: 38.8951,
  })
  @IsNumber()
  @IsOptional()
  latitude_area?: number;
}
