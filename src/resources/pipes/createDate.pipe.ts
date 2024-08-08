import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateDatePipe implements PipeTransform {
  constructor() {}

  async transform(birthday: string) {
    const birthdayDate = new Date(birthday);

    return birthdayDate;
  }
}
