import { ApiResponseProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum SoalType {
  UJIAN = 'Ujian',
  KUIS = 'Kuis',
}

@Entity({ name: 'soals' })
export class SoalsEntity {
  @ApiResponseProperty({ type: Number, example: 12 })
  @PrimaryGeneratedColumn()
  soal_id: number;

  @ApiResponseProperty({ type: Number, example: 'Soal Jaringan 2022' })
  @Column({ nullable: true })
  soal_name: string;

  @ApiResponseProperty({ type: Number, example: 52 })
  @Column({ nullable: true })
  file_id: number;

  @ApiResponseProperty({ enum: SoalType, example: SoalType.KUIS })
  @Column({ type: 'enum', enum: SoalType, nullable: true })
  tipe_soal: SoalType;

  @ApiResponseProperty({ type: Number, example: 12 })
  @Column()
  user_id: number;

  @ApiResponseProperty({ type: Number, example: 2 })
  @Column()
  kelas_id: number;

  @CreateDateColumn({ nullable: true, type: 'timestamp' })
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  deadline: Date;

  @ApiResponseProperty({ type: String, example: 'Lores ipmnum' })
  @Column({ nullable: true })
  pertanyaan: string;
}
