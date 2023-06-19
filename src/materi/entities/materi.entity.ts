import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'materis' })
export class MaterisEntity {
  @ApiResponseProperty({ type: Number, example: 12 })
  @PrimaryGeneratedColumn()
  materi_id: number;

  @ApiResponseProperty({ type: Number, example: 'Materi Jaringan 2020' })
  @Column({ nullable: true })
  materi_name: string;

  @ApiResponseProperty({ type: Number, example: 52 })
  @Column({ nullable: true })
  file_id: number;

  @ApiResponseProperty({ type: Number, example: 1 })
  @Column()
  user_id: number;

  @ApiResponseProperty({ type: Number, example: 2 })
  @Column()
  kelas_id: number;

  @ApiResponseProperty({ type: String, example: 'Avada Kedavra' })
  @Column({ nullable: true })
  deskripsi: string;

  @CreateDateColumn({ nullable: true, type: 'timestamptz' })
  created_at: Date;
}
