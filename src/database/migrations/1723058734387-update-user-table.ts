import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1723058734387 implements MigrationInterface {
    name = 'UpdateUserTable1723058734387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthday" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "birthday" character varying NOT NULL`);
    }

}
