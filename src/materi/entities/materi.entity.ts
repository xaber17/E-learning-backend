import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'materis' })
export class MaterisEntity {
  @PrimaryGeneratedColumn()
  materi_id: number;

  @Column({ nullable: true })
  materi_name: string;

  @Column({ nullable: true })
  file_id: number;
}
