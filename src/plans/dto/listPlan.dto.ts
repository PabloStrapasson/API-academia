export class ListPlansDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly price: number,
    readonly description: string,
  ) {}
}
