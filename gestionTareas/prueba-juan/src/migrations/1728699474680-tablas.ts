import { MigrationInterface, QueryRunner } from "typeorm";

export class Tablas1728699474680 implements MigrationInterface {
    name = 'Tablas1728699474680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD \`sesionActiva\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`tareas\` DROP FOREIGN KEY \`FK_96019d2dfaa542a03c3c0d4e883\``);
        await queryRunner.query(`ALTER TABLE \`tareas\` DROP FOREIGN KEY \`FK_9e59af40eaf522eb68b552e57bd\``);
        await queryRunner.query(`ALTER TABLE \`tareas\` CHANGE \`fechaCreado\` \`fechaCreado\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`tareas\` CHANGE \`fechaCompletado\` \`fechaCompletado\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`tareas\` CHANGE \`prioridadIdPrio\` \`prioridadIdPrio\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tareas\` CHANGE \`asignadoIdUsuario\` \`asignadoIdUsuario\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`fechaCreado\` \`fechaCreado\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`tareas\` ADD CONSTRAINT \`FK_96019d2dfaa542a03c3c0d4e883\` FOREIGN KEY (\`prioridadIdPrio\`) REFERENCES \`prioridad\`(\`idPrio\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tareas\` ADD CONSTRAINT \`FK_9e59af40eaf522eb68b552e57bd\` FOREIGN KEY (\`asignadoIdUsuario\`) REFERENCES \`usuarios\`(\`idUsuario\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tareas\` DROP FOREIGN KEY \`FK_9e59af40eaf522eb68b552e57bd\``);
        await queryRunner.query(`ALTER TABLE \`tareas\` DROP FOREIGN KEY \`FK_96019d2dfaa542a03c3c0d4e883\``);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`fechaCreado\` \`fechaCreado\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`tareas\` CHANGE \`asignadoIdUsuario\` \`asignadoIdUsuario\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`tareas\` CHANGE \`prioridadIdPrio\` \`prioridadIdPrio\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`tareas\` CHANGE \`fechaCompletado\` \`fechaCompletado\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`tareas\` CHANGE \`fechaCreado\` \`fechaCreado\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`tareas\` ADD CONSTRAINT \`FK_9e59af40eaf522eb68b552e57bd\` FOREIGN KEY (\`asignadoIdUsuario\`) REFERENCES \`usuarios\`(\`idUsuario\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tareas\` ADD CONSTRAINT \`FK_96019d2dfaa542a03c3c0d4e883\` FOREIGN KEY (\`prioridadIdPrio\`) REFERENCES \`prioridad\`(\`idPrio\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP COLUMN \`sesionActiva\``);
    }

}
