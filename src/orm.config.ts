import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  // url: '',
  host: process.env.DB_HOST, // localhost
  port: Number(process.env.DB_PORT), // 5432
  username: process.env.DB_USERNAME, // databse login role username
  password: process.env.DB_PASSWORD, // database login role password
  database: process.env.DB_DATABASE, // db name
  // entities: ['src/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};
