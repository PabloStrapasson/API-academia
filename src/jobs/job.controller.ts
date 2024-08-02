import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  async createJob(@Body() createJobDto: CreateJobDto) {
    const newJob = await this.jobService.createJob(createJobDto);

    return {
      data: newJob,
      message: 'Cargo cadastrado com sucesso!',
    };
  }

  @Get()
  async findAllJobs() {
    const jobs = await this.jobService.findAllJobs();

    return {
      data: jobs,
      message: 'Cargos encontrados com sucesso!',
    };
  }

  @Get(':id')
  async findJobById(@Param('id') id: string) {
    const job = await this.jobService.findJobById(id);

    return {
      data: job,
      message: 'Cargo encontrado com sucesso!',
    };
  }

  @Get('search')
  async findJobByName(@Query('name') name: string) {
    const job = await this.jobService.findJobByName(name);

    return {
      data: job,
      message: 'Cargo encontrado com sucesso!',
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    const updatedJob = await this.jobService.updateJob(id, updateJobDto);

    return {
      data: updatedJob,
      message: 'Cargo atualizado com sucesso!',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const removedJob = await this.jobService.removeJob(id);

    return {
      data: removedJob,
      message: 'Cargo removido com sucesso!',
    };
  }
}
