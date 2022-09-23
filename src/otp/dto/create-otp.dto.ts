import { ApiResponseProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';

export class CreateOtpDto {
  @IsNotEmpty()
  @IsMobilePhone()
  @ApiProperty({
    type: String,
    description: 'phoneNumber',
    example: '6285156529102',
  })
  phoneNumber: string;
}
export class CreateOtpPegawaiDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'nomorPegawai',
    example: '123456',
  })
  nomorPegawai: string;
}
export class VerifyOtpDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'otp',
    example: '654321',
  })
  otp: string;

  @ApiPropertyOptional({
    type: String,
    description: 'phoneNumber',
    example: '6285156529102 or 0876465723',
  })
  @IsOptional()
  @IsMobilePhone()
  phoneNumber?: string;
}
export class OtpResponseDto extends BaseResponseDto {
  @ApiResponseProperty({ type: CreateOtpDto })
  data: null;
}