export class ListUsersDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly registration: number,
    readonly email: string,
    readonly cpf: string,
    readonly bithday: Date,
  ) {}
}
