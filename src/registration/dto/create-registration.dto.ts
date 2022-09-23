import {
  IsString,
  IsNumber,
  IsEmail,
  IsOptional,
} from 'class-validator';
import {
  ApiProperty,
  ApiResponseProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';

export class CreateRegistrationDto {
  @IsString()
  @ApiProperty({ type: String, description: 'no pekerja' })
  employee_number: string;

  @IsString()
  @ApiProperty({ type: String, description: 'nomor pensiun' })
  pension_number: string;

  @IsString()
  @ApiProperty({ type: String, description: 'tmt pensiun' })
  tmt_pension: string;

  @IsString()
  @ApiProperty({ type: String, description: 'prl' })
  prl: string;

  @IsString()
  @ApiProperty({ type: String, description: 'nik' })
  family_deed_number: string;

  @IsString()
  @ApiProperty({ type: String, description: 'nomor kk' })
  identity_number: string;

  @IsString()
  @ApiProperty({ type: String, description: 'nama peserta' })
  fullname: string;

  @IsString()
  @ApiProperty({ type: String, description: 'tempat lahir' })
  place_of_birth: string;

  @IsString()
  @ApiProperty({ type: String, description: 'tanggal lahir' })
  date_of_birth: string;

  @IsString()
  @ApiProperty({ type: String, description: 'nomor hp pertama' })
  first_telephone_number: string;

  @IsString()
  @ApiProperty({ type: String, description: 'nomor hp kedua' })
  second_telephone_number: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email perusahaan' })
  email_corporate: string;

  @IsString()
  @ApiProperty({ type: String, description: 'nomor hp darurat' })
  emergency_contact: string;

  @IsString()
  @ApiProperty({ type: String, description: 'nama pemilik kontak darurat' })
  emergency_contact_name: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'provinsi' })
  province_id: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'kota/kabupaten' })
  region_id: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'kecamatan' })
  district_id: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'kelurahan' })
  sub_district_id: number;

  @IsString()
  @ApiProperty({ type: String, description: 'alamat' })
  address: string;

  @IsString()
  @ApiProperty({ type: String, description: 'rt' })
  rt: string;

  @IsString()
  @ApiProperty({ type: String, description: 'rw' })
  rw: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'home clinic' })
  home_clinic: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'ref_id' })
  ref_id: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, description: 'status' })
  status: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, description: 'sk_mppk_doc' })
  sk_mppk_doc: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, description: 'identity_doc' })
  identity_doc: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, description: 'family_deed_doc' })
  family_deed_doc: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, description: 'prl_doc' })
  prl_doc: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: String, description: 'photo_doc' })
  photo_doc: string;
}
export class RegistrationUserResponseDto extends BaseResponseDto {
  @ApiResponseProperty({ type: CreateRegistrationDto })
  data: CreateRegistrationDto;
}
