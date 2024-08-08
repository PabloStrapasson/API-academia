import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeService } from '../employee.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private employeeService: EmployeeService) {}

  async validate(value: any): Promise<boolean> {
    try {
      const userExist = await this.employeeService.findEmail(value);
      return !userExist;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return true;
      }

      throw error;
    }
  }
}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
  return (obj: object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
