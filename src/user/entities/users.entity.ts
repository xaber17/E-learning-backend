// import { Exclude } from 'class-transformer';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = "admin",
  GURU = "guru",
  SISWA = "siswa",
}

export enum UserStatus {
  ACTIVE = "active",
  NOT_ACTIVE = "not active"
}

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  kelas_id: number;

  @Column({ nullable: true, unique: true })
  username: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  updated_by: string;

  @Column({ nullable: true })
  nama_user: string;

  @Column({ nullable: true })
  nomor_induk: string;

  @CreateDateColumn({ nullable: true, type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
  updated_at: Date;
  
  @Column({ type: "enum", enum: UserRole })
  role: UserRole;
}
