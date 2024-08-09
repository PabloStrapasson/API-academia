import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePlanDto {
  @IsNotEmpty({ message: 'O campo nome não pode ser vazio' })
  @IsString()
  name: string;

  @IsDefined({ message: 'O campo preço não pode ser vazio' })
  @IsNumber()
  price: number;

  //@IsString()
  @IsOptional()
  description?: string;
}
