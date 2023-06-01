import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { Type, Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDataDto {
  @ApiResponseProperty({ type: Number, example: '123' })
  @Expose()
  id: number;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  email: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  first_name: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  last_name: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  place_of_birth: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  date_of_birth: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  identity_number: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  gender: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  status: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  phone: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  photo: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  name: string;
}
export class GetUserResponseDto extends BaseResponseDto {
  @ApiResponseProperty({ type: UserDataDto })
  data: UserDataDto;
}
