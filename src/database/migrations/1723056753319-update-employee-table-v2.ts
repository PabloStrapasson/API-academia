import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEmployeeTableV21723056753319 implements MigrationInterface {
    name = 'UpdateEmployeeTableV21723056753319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "birthday" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "birthday" character varying NOT NULL`);
    }

}
