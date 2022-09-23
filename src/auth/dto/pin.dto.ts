import { IsNumberString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';

export class RequestPinDto {
  @ApiProperty({ type: String, description: 'pin', example: '123456' })
  @IsNotEmpty()
  @IsNumberString({ no_symbols: true })
  @Length(6)
  pin: string;
}

export class ValidPinDataDto {
  @ApiResponseProperty({ type: Boolean })
  valid: boolean;
}

export class CheckPinDataDto {
  @ApiResponseProperty({ type: Boolean })
  isConfigure: boolean;
}

export class PinResponseDto extends BaseResponseDto {
  @ApiResponseProperty({ type: ValidPinDataDto, example: { valid: true } })
  data: ValidPinDataDto;
}

export class CheckPinResponseDto extends BaseResponseDto {
  @ApiResponseProperty({
    type: CheckPinDataDto,
    example: { isConfigure: true },
  })
  data: CheckPinDataDto;
}
