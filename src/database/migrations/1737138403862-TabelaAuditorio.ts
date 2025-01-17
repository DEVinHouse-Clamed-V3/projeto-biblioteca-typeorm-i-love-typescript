import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TabelaAuditorio1737138403862 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "auditoriums",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "capacity",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "location",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "has_projector",
                        type: "boolean",
                        isNullable: false,
                    },
                    {
                        name: "has_sound_system",
                        type: "boolean",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("auditoriums");
    }
}
