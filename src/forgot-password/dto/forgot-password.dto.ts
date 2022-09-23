import { IsString, IsNotEmpty, Matches, IsAlphanumeric, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {

  @ApiProperty({ type: String, description: 'new password', example: 'abc123' })
  @IsNotEmpty()
  @MinLength(6, { message: 'Panjang Password Minimal 6 Karakter' })
  @IsAlphanumeric()
  @Matches(/(?=.*[A-Za-z])+(?=.*[0-9])/, { message: 'Password harus menggunakan kombinasi Huruf dan Angka' })
  newPassword: string;

  @ApiProperty({ type: String, description: 'No pegawai', example: '123456' })
  @IsNotEmpty()
  @IsString()
  noPegawai: string;
}
