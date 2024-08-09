import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePlanTableV31723214271498 implements MigrationInterface {
    name = 'UpdatePlanTableV31723214271498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "plans" ADD "price" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "plans" ADD "price" integer NOT NULL`);
    }

}
