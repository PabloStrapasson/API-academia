import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './createEmployee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
