import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';

const exampleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJKb2huIFdpY2siLCJub21vclBlZ2F3YWkiOjEyMzQ1NiwiaWF0IjoxNjE5ODU3NjQ3LCJleHAiOjE2MTk4NTc3MDd9.7EyXCPcH5YCsmBudzeixMiR-w8VV7fosPluH1ezp4RQ';

export class LoginAuthDto {
  @IsString()
  @ApiProperty({ type: String, description: 'nomorPegawai', example: '123456' })
  nomorPegawai: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password', example: '13031990' })
  password: string;
}

export class LoginDataDto {
  @ApiResponseProperty({ type: String, example: exampleToken })
  token: string;
  @ApiResponseProperty({ type: Number, example: 1 })
  userId: number;
  @ApiResponseProperty({ type: String, example: 'john@mail.com' })
  email: string;
  @ApiResponseProperty({ type: String, example: 'atoll' })
  deviceId: string;
  @ApiResponseProperty({ type: String, example: '08224568856' })
  phoneNumber: string;
}
export class LoginAuthResponseDto extends BaseResponseDto {
  @ApiResponseProperty({ type: LoginDataDto })
  data: LoginDataDto;
}
