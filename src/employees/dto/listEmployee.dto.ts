import { EnumJobs } from '../../enum/jobsEnum';

export class ListEmployeesDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly cpf: string,
    readonly bithday: Date,
    readonly job: EnumJobs,
  ) {}
}
