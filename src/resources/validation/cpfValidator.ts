import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: false })
export class CPFValidator implements ValidatorConstraintInterface {
  reduceArray(arrayDigits: string): number {
    let sum = 0;
    const scalar = arrayDigits.length + 1;

    for (let i = 0; i < arrayDigits.length; i++) {
      sum = sum + parseInt(arrayDigits[i]) * (scalar - i);
    }

    return sum;
  }

  validate(value: any): boolean {
    const [digits, validatorDigits] = value.split('-');
    const clearDigits = digits.replace(/\./g, '');

    let sum = this.reduceArray(clearDigits);
    let rest = (sum * 10) % 11;

    if (rest != validatorDigits[0]) return false;

    sum = this.reduceArray(clearDigits + validatorDigits[0]);
    rest = (sum * 10) % 11;

    if (rest != validatorDigits[1]) return false;

    return true;
  }
}

export const IsValidCPF = (validationOptions: ValidationOptions) => {
  return (obj: object, prop: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: prop,
      options: validationOptions,
      constraints: [],
      validator: CPFValidator,
    });
  };
};
