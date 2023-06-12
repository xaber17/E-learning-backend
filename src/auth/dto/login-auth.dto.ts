import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
// import { BaseResponseDto } from 'src/utility/dto/base-response.dto';

const exampleToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJKb2huIFdpY2siLCJub21vclBlZ2F3YWkiOjEyMzQ1NiwiaWF0IjoxNjE5ODU3NjQ3LCJleHAiOjE2MTk4NTc3MDd9.7EyXCPcH5YCsmBudzeixMiR-w8VV7fosPluH1ezp4RQ';

export class LoginAuthDto {
  @IsString()
  @ApiProperty({ type: String, description: 'username', example: 'testing123' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'password', example: 'test123' })
  password: string;
}

export class LoginDataDto {
  @ApiResponseProperty({ type: String, example: exampleToken })
  token: string;
  @ApiResponseProperty({ type: Number, example: 1 })
  userId: number;
  @ApiResponseProperty({ type: String, example: 'john' })
  username: string;
}
