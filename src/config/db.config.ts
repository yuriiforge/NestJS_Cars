import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Report } from '../reports/report.entity';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: process.env.NODE_ENV === 'test' ? 'test-db.sqlite' : 'db.sqlite',
  entities: [User, Report],
  synchronize: true,
};
