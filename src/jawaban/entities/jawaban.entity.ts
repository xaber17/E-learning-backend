import { ApiResponseProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'jawabans' })
export class Jawaban {
  @PrimaryGeneratedColumn()
  jawaban_id: number;

  @Column()
  soal_id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  nilai: number;

  @Column()
  data_jawaban: string;
}
