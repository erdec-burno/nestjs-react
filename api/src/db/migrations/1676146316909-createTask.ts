import { MigrationInterface, QueryRunner } from "typeorm";

export class createTask1676146316909 implements MigrationInterface {
    name = 'createTask1676146316909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`text\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`text\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`text\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`text\` varchar(255) NOT NULL`);
    }

}
