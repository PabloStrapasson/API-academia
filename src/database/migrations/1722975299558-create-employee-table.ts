import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployeeTable1722975299558 implements MigrationInterface {
    name = 'CreateEmployeeTable1722975299558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "cpf" character varying(14) NOT NULL, "birthday" character varying NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
