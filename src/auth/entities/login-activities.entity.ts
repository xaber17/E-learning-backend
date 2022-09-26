import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
@Entity({ name: 'login_activities' })
export class LoginActivity {
  @PrimaryGeneratedColumn()
  record_id: number;

  @Column({ nullable: true })
  platform: string;

  @Column({ nullable: true })
  platform_os: string;

  @Column({ nullable: true })
  login_id: string;

  @CreateDateColumn({ nullable: true, type: 'timestamptz' })
  timestamp: Date;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  cell_id: string;

  @Column({ nullable: true })
  operator_id: string;

  @Column({ nullable: true })
  device_id: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  longitude_area: number;

  @Column({ nullable: true })
  latitude_area: number;
}
