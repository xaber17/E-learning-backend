import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'kelass' })
export class KelassEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  kelas_id: number;

  @Column()
  kelas_name: string;
}
