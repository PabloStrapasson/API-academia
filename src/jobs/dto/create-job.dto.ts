import { IsNotEmpty } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;
}
