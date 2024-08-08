import { EnumJobs } from '../enum/jobsEnum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'employees' })
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', length: 100, nullable: false })
  email: string;

  @Column({ name: 'cpf', length: 14, nullable: false })
  cpf: string;

  @Column({ name: 'birthday', nullable: false })
  birthday: Date;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @Column()
  job: EnumJobs;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
