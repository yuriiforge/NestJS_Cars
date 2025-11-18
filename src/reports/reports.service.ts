import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly reportsRepo: Repository<Report>,
  ) {}

  async create(reportDto: CreateReportDto, user: User): Promise<Report> {
    const report = this.reportsRepo.create(reportDto);
    report.user = user;

    return this.reportsRepo.save(report);
  }
}
