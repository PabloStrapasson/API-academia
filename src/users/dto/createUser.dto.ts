import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UniqueEmail } from '../validation/uniqueEmailValidator';
import { IsValidCPF } from '../validation/cpfValidator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail(undefined, { message: 'O email informado é inválido' })
  @UniqueEmail({ message: 'Já existe um usuario com este e-mail' })
  email: string;

  @MaxLength(14, { message: 'A CPF deve ter no máximo 14 caracteres' })
  @Matches(/^(\d{3}\.\d{3}\.\d{3}\-\d{2})$/, {
    message: 'O CPF informado é inválido',
  })
  @IsValidCPF({ message: 'O CPF informado é inválido' })
  cpf: string;

  //@MaxLength(8, { message: '' })
  /*@Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,30}$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
  })*/
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  birthday: Date;

  @MinLength(8, { message: 'A senha precisa ter pelo menos 8 caracteres' })
  @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,30}$/, {
    message:
      'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
  })
  password: string;
}
