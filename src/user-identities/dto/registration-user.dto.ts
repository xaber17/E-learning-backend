import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsMobilePhone,
  IsOptional,
  MinLength,
  IsAlphanumeric,
  Matches,
  IsEmail
} from 'class-validator';
import {
  ApiProperty,
  ApiResponseProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { UserRole } from '../entities/users.entity';

export class RegistrationUserDto {
  @IsNotEmpty()
  @MinLength(6, { message: 'Panjang Password Minimal 6 Karakter' })
  // @IsAlphanumeric()
  // @Matches(/(?=.*[a-z])+(?=.*[0-9])/, { message: 'Password harus menggunakan kombinasi Huruf dan Angka' })
  @ApiProperty({ type: String, description: 'password', example: 'test123' })
  password: string;

  @IsString()
  @ApiProperty({ type: String, description: 'nama peserta', default: 'Test111' })
  name: string;

  @IsString()
  @IsMobilePhone()
  @ApiProperty({ type: String, description: 'nomor hp', default: '123456789' })
  phone_number: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email', default: 'test@gmail.com' })
  email: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: Boolean, description: 'status', default: true })
  status: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, enum: UserRole, description: 'role', default: 'siswa' })
  role: UserRole;
}
export class RegistrationUserResponseDto extends BaseResponseDto {
  @ApiResponseProperty({ type: RegistrationUserDto })
  data: RegistrationUserDto;
}
