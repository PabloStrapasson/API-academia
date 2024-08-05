import { IsNotEmpty } from 'class-validator';
import { UniqueJob } from '../validation/uniqueJobValidator';

export class CreateJobDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @UniqueJob({ message: 'Já existe um cargo com esse nome' })
  name: string;
}
