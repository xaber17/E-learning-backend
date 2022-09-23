import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponseDto } from 'src/utility/dto/base-response.dto';
import { Type, Exclude, Expose } from 'class-transformer';

@Exclude()
export class UsersDataDto {
  @ApiResponseProperty({ type: Number, example: '123' })
  @Expose()
  id: number;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  email: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  employee_number: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  position: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  grade: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  health_social_number: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  resident_number: string;

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
  citizenship: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  identity_type: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  identity_number: string;
  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  gender: string;
  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  blood_type: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  rhesus_type: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  height_metric: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  weight_metric: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  body_weight: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  effective_date: Date;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  expired_date: Date;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  is_pension: number;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  status: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  reason: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  company_id: number;

  // @ApiResponseProperty({ type: String, example: '123123' })
  // @Expose()
  // progress_id: number;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  remarks: string;

  // @ApiResponseProperty({ type: String, example: '123123' })
  // @Expose()
  // activity_id: number;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  registration_number: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  family_deed_number: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  registration_date: Date;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  pension_number: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  phone: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  category: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  photo: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  fullname: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  grade_type: string;

  // @ApiResponseProperty({ type: String, example: '123123' })
  // @Expose()
  // group_level: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  clinic_provider_id: number;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  name_on_card: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  sap_code: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  @Expose()
  body_height: string;

  @ApiResponseProperty({ type: String, example: '1' })
  @Expose()
  is_homeclinic: string;
}

export class DomicileDto {
  @ApiResponseProperty({ type: Number, example: '123123' })
  id: number;

  @ApiResponseProperty({ type: String, example: '123123' })
  address: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  rt: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  rw: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  postal_code: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  sub_district_id: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  district_id: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  region_id: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  province_id: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  effective_date: Date;

  @ApiResponseProperty({ type: String, example: '123123' })
  reason: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  remarks: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  time_period: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  regency_id: string;
}

export class UserDomicileDto extends DomicileDto {
  @ApiResponseProperty({ type: Number, example: '123123' })
  user_id: number;
}

export class BeneficiaryDomicileDto extends DomicileDto {
  @ApiResponseProperty({ type: Number, example: '123123' })
  beneficiary_id: number;
}

export class BeneficariesDataDto {
  @ApiResponseProperty({ type: Number, example: '123' })
  id: number;

  @ApiResponseProperty({ type: String, example: '123' })
  first_name: string;

  @ApiResponseProperty({ type: String, example: '123' })
  last_name: string;

  @ApiResponseProperty({ type: String, example: '123' })
  health_social_number: string;

  @ApiResponseProperty({ type: String, example: '123' })
  registration_number: string;

  @ApiResponseProperty({ type: String, example: '123' })
  place_of_birth: string;

  @ApiResponseProperty({ type: String, example: '123' })
  date_of_birth: string;

  @ApiResponseProperty({ type: String, example: '123' })
  gender: string;

  @ApiResponseProperty({ type: String, example: '123' })
  blood_type: string;

  @ApiResponseProperty({ type: String, example: '123' })
  rhesus_type: string;

  @ApiResponseProperty({ type: Date, example: '123' })
  effective_date: Date;

  @ApiResponseProperty({ type: Date, example: '123' })
  expired_date: Date;

  @ApiResponseProperty({ type: String, example: '123' })
  status: string;

  @ApiResponseProperty({ type: Number, example: '123' })
  user_id: number;

  @ApiResponseProperty({ type: Number, example: '123' })
  is_twin: number;

  @ApiResponseProperty({ type: String, example: '123' })
  photo: string;

  @ApiResponseProperty({ type: String, example: '123' })
  fullname: string;

  @ApiResponseProperty({ type: String, example: '123' })
  resident_number: string;

  @ApiResponseProperty({ type: String, example: '123' })
  body_height: string;

  @ApiResponseProperty({ type: String, example: '123' })
  body_weight: string;

  @ApiResponseProperty({ type: String, example: '123' })
  birth_order: string;

  @ApiResponseProperty({ type: Date, example: '123' })
  registration_date: Date;

  @ApiResponseProperty({ type: Number, example: '123' })
  clinic_provider_id: number;

  // @ApiResponseProperty({ type: String, example: '123' })
  // category: string;

  @ApiResponseProperty({ type: String, example: '123' })
  name_on_card: string;

  @ApiResponseProperty({ type: String, example: '123' })
  grade: string;

  @ApiResponseProperty({ type: String, example: '123' })
  beneficiary_type: string;

  @ApiResponseProperty({ type: String, example: '123' })
  email: string;

  @ApiResponseProperty({ type: String, example: '123' })
  phone: string;

  @ApiResponseProperty({ type: String, example: '123' })
  height_metric: string;

  @ApiResponseProperty({ type: String, example: '123' })
  weight_metric: string;

  @ApiProperty({ type: BeneficiaryDomicileDto, example: '123' })
  @Type(() => BeneficiaryDomicileDto)
  domicile: BeneficiaryDomicileDto;

  @ApiResponseProperty({ type: String, example: '1' })
  @Expose()
  is_homeclinic: string;
}

export class UserDataDto {
  @ApiResponseProperty({ type: Number, example: '123' })
  record_id: number;

  @ApiResponseProperty({ type: String, example: '123' })
  login_id: string;

  @ApiResponseProperty({ type: String, example: 'badrus@gmail.com' })
  email: string;

  @ApiResponseProperty({ type: Number, example: '123' })
  reference_id: number;

  @ApiResponseProperty({ type: Boolean, example: true })
  is_enable: boolean;

  @ApiResponseProperty({ type: String, example: '123123' })
  device_id: string;

  @ApiResponseProperty({ type: String, example: '123123' })
  phone_number: string;

  @ApiResponseProperty({ type: Boolean, example: true })
  is_user: boolean;

  @ApiProperty({ type: UsersDataDto })
  @Type(() => UsersDataDto)
  users: UsersDataDto;

  @ApiResponseProperty({ type: [BeneficariesDataDto] })
  @Type(() => BeneficariesDataDto)
  kerabat: BeneficariesDataDto[];

  @ApiProperty({ type: UserDomicileDto })
  @Type(() => UserDomicileDto)
  domicile: UserDomicileDto;
}

export class GetUserResponseDto extends BaseResponseDto {
  @ApiResponseProperty({ type: UserDataDto })
  data: UserDataDto;
}
