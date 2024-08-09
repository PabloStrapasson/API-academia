import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePlanTableV21723213925603 implements MigrationInterface {
    name = 'UpdatePlanTableV21723213925603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "price" TYPE integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "price" TYPE integer`);
    }

}
