// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   CreateDateColumn,
//   UpdateDateColumn,
// } from 'typeorm';
// @Entity({ name: 'user_domiciles' })
// export class UserDomicileEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ nullable: true })
//   address: string;

//   @Column({ nullable: true })
//   rt: string;

//   @Column({ nullable: true })
//   rw: string;

//   @Column({ nullable: true })
//   postal_code: string;

//   @Column({ nullable: true })
//   sub_district_id: string;

//   @Column({ nullable: true })
//   district_id: string;

//   @Column({ nullable: true })
//   region_id: string;

//   @Column({ nullable: true })
//   province_id: string;

//   @CreateDateColumn({ nullable: true, type: 'timestamptz' })
//   effective_date: Date;

//   @CreateDateColumn({ nullable: true, type: 'timestamptz' })
//   created_at: Date;

//   @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
//   updated_at: Date;

//   @Column({ nullable: true })
//   modified_by: string;

//   @Column({ nullable: true })
//   created_by: string;

//   @Column({ nullable: true })
//   user_id: number;

//   @Column({ nullable: true })
//   reason: string;

//   @Column({ nullable: true })
//   remarks: string;

//   @Column({ nullable: true })
//   time_period: string;

//   @Column({ nullable: true })
//   regency_id: string;
// }
