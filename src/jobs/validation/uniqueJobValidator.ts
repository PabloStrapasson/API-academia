import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { JobService } from '../job.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueJobValidator implements ValidatorConstraintInterface {
  constructor(private jobService: JobService) {}

  async validate(value: any): Promise<boolean> {
    try {
      const jobExist = await this.jobService.findJobByName(value);
      return !jobExist;
    } catch (error) {
      if (error instanceof NotFoundException) {
        return true;
      }

      throw error;
    }
  }
}

export const UniqueJob = (validationOptions: ValidationOptions) => {
  return (obj: object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: validationOptions,
      constraints: [],
      validator: UniqueJobValidator,
    });
  };
};
