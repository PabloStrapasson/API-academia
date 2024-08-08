import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity';
import { Repository } from 'typeorm';
import { ListEmployeesDto } from './dto/listEmployee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    const employee = new EmployeeEntity();
    Object.assign(employee, createEmployeeDto as EmployeeEntity);
    const newEmployee = await this.employeeRepository.save(employee);

    const employeeDto = new ListEmployeesDto(
      newEmployee.id,
      newEmployee.name,
      newEmployee.email,
      newEmployee.cpf,
      newEmployee.birthday,
      newEmployee.job,
    );

    return employeeDto;
  }

  async findAllEmployees() {
    const employees = await this.employeeRepository.find();
    const employeeList = employees.map(
      (employee) =>
        new ListEmployeesDto(
          employee.id,
          employee.name,
          employee.email,
          employee.cpf,
          employee.birthday,
          employee.job,
        ),
    );

    return employeeList;
  }

  async findEmployeeById(id: string) {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (employee === null) {
      throw new NotFoundException('Funcionário não encontrado!');
    }

    const employeeDto = new ListEmployeesDto(
      employee.id,
      employee.name,
      employee.email,
      employee.cpf,
      employee.birthday,
      employee.job,
    );

    return employeeDto;
  }

  async findEmail(email: string) {
    const employee = await this.employeeRepository.findOneBy({ email });

    if (employee === null) {
      throw new NotFoundException('Email não cadastrado!');
    }

    return employee;
  }

  async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (employee === null) {
      throw new NotFoundException('Funcionário não encontrado!');
    }

    Object.assign(employee, updateEmployeeDto as EmployeeEntity);
    const updatedEmployee = await this.employeeRepository.save(employee);

    const employeeDto = new ListEmployeesDto(
      updatedEmployee.id,
      updatedEmployee.name,
      updatedEmployee.email,
      updatedEmployee.cpf,
      updatedEmployee.birthday,
      employee.job,
    );

    return employeeDto;
  }

  async removeEmployee(id: string) {
    const result = await this.employeeRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Funcionário não encontrado!');
    }
  }
}
