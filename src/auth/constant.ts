import { HttpStatus } from '@nestjs/common';

export type AuthConstantType = {
  message: string;
  code: HttpStatus;
};

export const AuthConstant = {
  user_not_found: {
    // message: 'Email yang Anda masukkan tidak terdaftar',
    message: 'Email yang Anda masukkan salah',
    code: HttpStatus.NOT_FOUND,
  },
  user_not_authorized: {
    // message: 'Kata sandi yang Anda masukkan salah',
    message: 'Email yang Anda masukkan salah',
    code: HttpStatus.UNAUTHORIZED,
  },
  nohp_not_found: {
    // message: 'No. Handphone yang Anda masukkan tidak terdaftar',
    message: 'Email yang Anda masukkan salah',
    code: HttpStatus.NOT_FOUND,
  },
};
