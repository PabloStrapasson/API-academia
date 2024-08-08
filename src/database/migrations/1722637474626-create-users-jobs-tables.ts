import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersJobsTables1722637474626 implements MigrationInterface {
  name = 'CreateUsersJobsTables1722637474626';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "cpf" character varying(14) NOT NULL, "birthday" character varying NOT NULL, "password" character varying(255) NOT NULL, "registration" character varying(10) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
