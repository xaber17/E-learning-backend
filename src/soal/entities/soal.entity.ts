import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'soals' })
export class SoalsEntity {
  @PrimaryGeneratedColumn()
  soal_id: number;

  @Column({ nullable: true })
  soal_name: string;

  @Column({ nullable: true })
  file_id: number;

  @Column({ nullable: true })
  tipe_soal: number;
}
