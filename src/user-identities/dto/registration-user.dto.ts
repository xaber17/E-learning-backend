import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsMobilePhone,
  IsOptional,
  MinLength,
  IsAlphanumeric,
  Matches,
} from 'class-validator';
import {
  ApiProperty,
  ApiResponseProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';

export class RegistrationUserDto {
  @IsString()
  @ApiProperty({ type: String, description: 'no hp', example: '081234556789' })
  loginId: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Panjang Password Minimal 6 Karakter' })
  // @IsAlphanumeric()
  // @Matches(/(?=.*[a-z])+(?=.*[0-9])/, { message: 'Password harus menggunakan kombinasi Huruf dan Angka' })
  @ApiProperty({ type: String, description: 'password', example: 'abc123' })
  password: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'email',
    example: 'ganteng123',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'deviceId',
    example: 'ganteng123',
  })
  deviceId?: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'referenceId', example: '1' })
  referenceId: number;
}
export class RegistrationUpdateUserDto {
  @IsNotEmpty()
  @MinLength(6, { message: 'Panjang Password Minimal 6 Karakter' })
  @IsAlphanumeric()
  // @Matches(/(?=.*[A-Za-z])+(?=.*[0-9])/, { message: 'Password harus menggunakan kombinasi Huruf dan Angka' })
  @ApiProperty({ type: String, description: 'password', example: 'abc123' })
  password: string;

  @IsNotEmpty()
  @IsMobilePhone()
  @ApiProperty({
    type: String,
    description: 'phoneNumber',
    example: 'ganteng123',
  })
  phoneNumber: string;
}
export class RegistrationUserResponseDto extends BaseResponseDto {
  @ApiResponseProperty({ type: RegistrationUserDto })
  data: RegistrationUserDto;
}
