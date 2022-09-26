import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  last_name: string;
  @Column({ nullable: true })
  place_of_birth: string;
  @Column({ nullable: true })
  date_of_birth: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  first_name: string;
  @Column({ nullable: true })
  employee_number: string;
  @Column({ nullable: true })
  position: string;
  @Column({ nullable: true })
  grade: string;
  @Column({ nullable: true })
  resident_number: string;
  @Column({ nullable: true })
  health_social_number: string;
  @Column({ nullable: true })
  citizenship: string;
  @Column({ nullable: true })
  identity_type: string;
  @Column({ nullable: true })
  identity_number: string;
  @Column({ nullable: true })
  gender: string;
  @Column({ nullable: true })
  blood_type: string;
  @Column({ nullable: true })
  rhesus_type: string;
  @Column({ nullable: true })
  height_metric: string;
  @Column({ nullable: true })
  weight_metric: string;
  @Column({ nullable: true })
  body_weight: string;
  @Column({ nullable: true })
  modified_by: string;
  @Column({ nullable: true })
  status: string;
  @Column({ nullable: true })
  reason: string;
  @Column({ nullable: true })
  remarks: string;
  @Column({ nullable: true })
  registration_number: string;
  @Column({ nullable: true })
  family_deed_number: string;
  @Column({ nullable: true })
  pension_number: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  photo: string;
  @Column({ nullable: true })
  fullname: string;
  @Column({ nullable: true })
  name_on_card: string;
  @Column({ nullable: true })
  sap_code: string;
  @Column({ nullable: true })
  body_height: string;
  @Column({ nullable: true })
  effective_date: Date;
  @Column({ nullable: true })
  expired_date: Date;
  @Column({ nullable: true })
  is_pension: number;
  @Column({ nullable: true })
  company_id: number;
  @CreateDateColumn({ nullable: true, type: 'timestamptz' })
  created_at: Date;
  @CreateDateColumn({ nullable: true, type: 'timestamptz' })
  updated_at: Date;
  @CreateDateColumn({ nullable: true, type: 'timestamp' })
  registration_date: Date;
  @Column({ nullable: true })
  clinic_provider_id: number;
  @Column({ nullable: true })
  grade_type: string;
  @Column({ nullable: true })
  is_homeclinic: string;
}
