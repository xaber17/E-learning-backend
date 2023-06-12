import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'upload_files'})
export class UploadFileEntity {
  @PrimaryGeneratedColumn()
  file_id: number

  @Column({ nullable: true })
  originalname: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column()
  kelas_id: number;

  @Column()
  user_id: number;
}


