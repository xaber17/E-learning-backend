import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsAlphanumeric,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    type: String,
    description: 'Old Password',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ type: String, description: 'New password', example: 'abc123' })
  @IsNotEmpty()
  @MinLength(6, { message: 'Panjang Password Minimal 6 Karakter' })
  @IsAlphanumeric()
  // @Matches(/(?=.*[A-Za-z])+(?=.*[0-9])/, { message: 'Password harus menggunakan kombinasi Huruf dan Angka' })
  newPassword: string;
}
