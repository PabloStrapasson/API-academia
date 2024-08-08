import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEmployeeTable1723046726601 implements MigrationInterface {
    name = 'UpdateEmployeeTable1723046726601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "job" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "job"`);
    }

}
