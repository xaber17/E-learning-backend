import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
// import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { Type, Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDataDto {
  @ApiResponseProperty({ type: Number, example: '123' })
  @Expose()
  user_id: number;

  @ApiResponseProperty({ type: String, example: 'getarnr' })
  @Expose()
  username: string

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  status: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  nama_user: string;

  @ApiResponseProperty({ type: Number, example: '123123' })
  @Expose()
  kelas_id: number;
}
// export class GetUserResponseDto extends BaseResponseDto {
//   @ApiResponseProperty({ type: UserDataDto })
//   data: UserDataDto;
// }
