import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { UniqueEmailValidator } from './validation/uniqueEmailValidator';
import { CPFValidator } from '../resources/validation/cpfValidator';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  controllers: [EmployeeController],
  providers: [EmployeeService, UniqueEmailValidator, CPFValidator],
})
export class EmployeeModule {}
