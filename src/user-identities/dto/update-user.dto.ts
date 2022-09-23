import {
  IsEmail,
  IsNotEmpty,
  IsIn,
  IsInt,
  IsUrl,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    type: String,
    description: 'alamat',
    example: 'Jl. MT Haryono No Kav 22-23 RT/RW 09/01',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'kode pos',
    example: '12770',
  })
  @IsOptional()
  @IsString()
  postal_code?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'wilayah',
    example: 'Jakarta Selatan',
  })
  @IsOptional()
  @IsString()
  region_id?: string;

  @ApiPropertyOptional({ type: String, description: 'rt', example: '12770' })
  @IsOptional()
  @IsString()
  rt?: string;

  @ApiPropertyOptional({ type: String, description: 'rw', example: '12770' })
  @IsOptional()
  @IsString()
  rw?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'sub district id',
    example: '12770',
  })
  @IsOptional()
  @IsString()
  sub_district_id?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'district id',
    example: '12770',
  })
  @IsOptional()
  @IsString()
  district_id?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'provincei d',
    example: '12770',
  })
  @IsOptional()
  @IsString()
  province_id?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'email',
    example: 'test@email.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    type: Number,
    description:
      'beneficiary (kerabat) id required jika update profile kerabat',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  beneId?: number;
}

export class UpdatePhotoDto {
  @IsNotEmpty()
  @IsIn(['user', 'beneficiary'])
  ref: 'user' | 'beneficiary';

  @IsNotEmpty()
  @IsInt()
  ref_id: number;

  @IsNotEmpty()
  @IsUrl({ require_tld: false })
  photo: string;
}
