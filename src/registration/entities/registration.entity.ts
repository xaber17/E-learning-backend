import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'pre_registration_users' })
export class RegistrationsUserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  employee_number: string;
  @Column({ nullable: true })
  pension_number: string;
  @Column({ nullable: true })
  tmt_pension: string;
  @Column({ nullable: true })
  prl: string;
  @Column({ nullable: true })
  identity_number: string;
  @Column({ nullable: true })
  family_deed_number: string;
  @Column({ nullable: true })
  fullname: string;
  @Column({ nullable: true })
  place_of_birth: string;
  @Column({ nullable: true, type: 'timestamptz' })
  date_of_birth: Date;
  @Column({ nullable: true })
  first_telephone_number: string;
  @Column({ nullable: true })
  second_telephone_number: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  email_corporate: string;
  @Column({ nullable: true })
  province_id: number;
  @Column({ nullable: true })
  region_id: number;
  @Column({ nullable: true })
  district_id: number;
  @Column({ nullable: true })
  sub_district_id: number;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  rt: string;
  @Column({ nullable: true })
  rw: string;
  @Column({ nullable: true })
  home_clinic: number;
  @Column({ nullable: true })
  sk_mppk_doc: string;
  @Column({ nullable: true })
  identity_doc: string;
  @Column({ nullable: true })
  family_deed_doc: string;
  @Column({ nullable: true })
  photo_doc: string;
  @Column({ nullable: true })
  prl_doc: string;
  @CreateDateColumn({ nullable: true, type: 'timestamptz' })
  created_at: Date;
  @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
  updated_at: Date;
  @Column({ nullable: true, default: 'system' })
  created_by: string;
  @Column({ nullable: true })
  updated_by: string;
  @Column({ nullable: true })
  remarks: string;
  @Column({ nullable: true })
  emergency_contact: string;
  @Column({ nullable: true })
  emergency_contact_name: string;
  @Column({ nullable: true })
  ref_id: number;
  @Column({ nullable: true, default: 'waiting_for_review' })
  status: string;
}
