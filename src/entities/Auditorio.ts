import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("auditoriums") // Mapeia a classe para a tabela auditoriums no DB

class Auditorio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "int", nullable: false })
  capacity: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  location: string;

  @Column({ type: "boolean", nullable: false })
  has_projector: boolean;

  @Column({ type: "boolean", nullable: false })
  has_sound_system: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Auditorio;
