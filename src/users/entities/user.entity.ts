import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity({ name: 'user_identities' })
export class UserIdentity {
  @PrimaryGeneratedColumn()
  record_id: number;

  @Column({ nullable: true })
  login_id: string;

  @Column({ nullable: true, unique: true })
  user_id: number;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  is_enable: boolean;

  @CreateDateColumn({ nullable: true, type: 'timestamptz' })
  created_date: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
  modified_date: Date;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  updated_by: string;

  @Column({ nullable: true })
  device_id: string;

  @Column({ nullable: true, unique: true })
  phone_number: string;

  @Column({ nullable: true, default: false })
  is_admin: boolean;
}
