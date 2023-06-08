// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
//   CreateDateColumn,
// } from 'typeorm';

// @Entity({ name: 'user_contact_persons' })
// export class UserContactEntity {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @Column({ nullable: true })
//   user_id: number;
//   @Column({ nullable: true })
//   name: string;
//   @Column({ nullable: true })
//   phone_number: string;
//   @Column({ nullable: true })
//   email: string;
//   @Column({ nullable: true })
//   created_by: string;
//   @CreateDateColumn({ nullable: true, type: 'timestamptz' })
//   created_at: Date;
//   @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
//   updated_at: Date;
//   @Column({ nullable: true })
//   is_emergency_contact: number;
//   @Column({ nullable: true })
//   modified_by: string;
//   @Column({ nullable: true })
//   telephone_number: string;
//   @Column({ nullable: true })
//   address: string;
//   @Column({ nullable: true })
//   first_telephone_number: string;
//   @Column({ nullable: true })
//   second_telephone_number: string;
//   @Column({ nullable: true })
//   remarks: string;
//   @Column({ nullable: true })
//   email_corporate: string;
// }
