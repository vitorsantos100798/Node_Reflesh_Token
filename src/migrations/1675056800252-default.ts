import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675056800252 implements MigrationInterface {
    name = 'default1675056800252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reflesh_token" ("id" SERIAL NOT NULL, "refresh_token" character varying NOT NULL, "user_id" character varying NOT NULL, "expires_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_aa8a9eea7159698eaae71c54480" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reflesh_token" ADD CONSTRAINT "FK_172c4755bae5ce821dba970747b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reflesh_token" DROP CONSTRAINT "FK_172c4755bae5ce821dba970747b"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "reflesh_token"`);
    }

}
