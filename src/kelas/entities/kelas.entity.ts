import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'kelass' })
export class KelassEntity {
  @PrimaryGeneratedColumn()
  kelas_id: number;

  @Column({ nullable: true })
  kelas_name: string;

  @Column("simple-array", { nullable: true })
  siswa: object[];

  @Column("simple-array", { nullable: true })
  materi: object[];

  @Column("simple-array", { nullable: true })
  soal: object[];
}
