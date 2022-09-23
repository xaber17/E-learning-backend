/* eslint-disable @typescript-eslint/ban-types */
import { ApiResponseProperty } from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiResponseProperty({
    type: String,
    example: 'd95e8e5b-5d8e-4d2d-85cb-d8d7b567a50d',
  })
  requestId: string;
  @ApiResponseProperty({
    type: String,
    example: 'e4bcce51-f45b-424e-8f30-a8b93b4efd8d',
  })
  responseId: string;
  @ApiResponseProperty({ type: String, example: '2021-05-01T08:27:27.377Z' })
  timestamp: string;
  @ApiResponseProperty({ type: Number })
  responseCode: number;
  @ApiResponseProperty({ type: String })
  responseStatus: string;
  @ApiResponseProperty({ type: String })
  responseMessage: string;
  @ApiResponseProperty({ enum: [null] })
  data: unknown;
}
