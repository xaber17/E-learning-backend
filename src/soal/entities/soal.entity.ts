import { ApiResponseProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum SoalType {
  UJIAN = 'ujian',
  QUIZ = 'quiz',
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

  @ApiResponseProperty({ enum: SoalType, example: SoalType.QUIZ })
  @Column({ type: 'enum', enum: SoalType })
  tipe_soal: SoalType;

  @ApiResponseProperty({ type: Number, example: 12 })
  @Column()
  user_id: number;

  @ApiResponseProperty({ type: Number, example: 2 })
  @Column()
  kelas_id: number;
}
