import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FcmTokenDto {
  @ApiProperty({ type: String, description: 'FCM Token', example: 'asdsa98y8hi' })
  @IsNotEmpty()
  @IsString()
  fcm_token_id: string;

  @ApiProperty({ type: String, description: 'Device ID', example: 'x-device-id' })
  @IsNotEmpty()
  @IsString()
  device_id: string;
}
