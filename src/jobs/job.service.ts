import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobEntity } from './job.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  async createJob(createJobDto: CreateJobDto) {
    const job = new JobEntity();
    Object.assign(job, createJobDto as JobEntity);

    return await this.jobRepository.save(job);
  }

  async findAllJobs() {
    const jobs = await this.jobRepository.find();

    return jobs;
  }

  async findJobById(id: string) {
    const job = await this.jobRepository.findOneBy({ id });
    if (job === null) {
      throw new NotFoundException('Cargo não encontrado!');
    }

    return job;
  }

  async findJobByName(name: string) {
    const job = await this.jobRepository.findOneBy({ name });
    if (job === null) {
      throw new NotFoundException('Cargo não encontrado!');
    }

    return job;
  }

  async updateJob(id: string, updateJobDto: UpdateJobDto) {
    const job = await this.jobRepository.findOneBy({ id });
    if (job === null) {
      throw new NotFoundException('Cargo não encontrado!');
    }

    Object.assign(job, updateJobDto as JobEntity);

    return await this.jobRepository.save(job);
  }

  async removeJob(id: string) {
    const result = await this.jobRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Cargo não encontrado!');
    }

    return `This action removes a #${id} job`;
  }
}
