import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'upload_files'})
export class UploadFile {
  @PrimaryGeneratedColumn()
  file_id: number

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;
}


