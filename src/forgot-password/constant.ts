import { HttpStatus } from '@nestjs/common';

export type ForgotConstantType = {
  message: string;
  code: HttpStatus;
};

export const ForgotConstant = {
  user_not_found: {
    message: 'User not found',
    code: HttpStatus.NOT_FOUND,
  },
};
