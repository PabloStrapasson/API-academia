import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';
import { HashPasswordPipe } from '../resources/pipes/hashPassword.pipe';
import { CreateDatePipe } from '../resources/pipes/createDate.pipe';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { password, birthday, ...createEmployeeDto }: CreateEmployeeDto,
    @Body('password', HashPasswordPipe) hashPassword: string,
    @Body('birthday', CreateDatePipe) birthdayDate: Date,
  ) {
    const newEmployee = await this.employeeService.createEmployee({
      ...createEmployeeDto,
      password: hashPassword,
      birthday: birthdayDate,
    });

    return {
      data: newEmployee,
      message: 'Funcionário cadastrado com sucesso!',
    };
  }

  @Get()
  async findAllEmployees() {
    const allEmployees = await this.employeeService.findAllEmployees();

    return {
      data: allEmployees,
      message: 'Funcionários encontrados com sucesso!',
    };
  }

  @Get(':id')
  async findEmployeeById(@Param('id') id: string) {
    const employee = await this.employeeService.findEmployeeById(id);

    return {
      data: employee,
      message: 'Funcionário encontrado com sucesso!',
    };
  }

  @Patch(':id')
  async updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    const updatedEmployee = await this.employeeService.updateEmployee(
      id,
      updateEmployeeDto,
    );

    return {
      data: updatedEmployee,
      message: 'Funcionário atualizado com sucesso!',
    };
  }

  @Delete(':id')
  async removeEmployee(@Param('id') id: string) {
    const removedEmployee = await this.employeeService.removeEmployee(id);

    return {
      data: removedEmployee,
      message: 'Usuário removido com sucesso!',
    };
  }
}
