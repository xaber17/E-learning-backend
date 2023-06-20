import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'kelass' })
export class KelassEntity {
  @PrimaryGeneratedColumn()
  kelas_id: number;

  @Column()
  kelas_name: string;

  @Column({ nullable: true })
  deskripsi: string;
}
