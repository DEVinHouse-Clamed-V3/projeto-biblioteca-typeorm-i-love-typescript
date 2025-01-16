import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("books") // mapeia a classe para a tabela books no db
class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 234, nullable: false })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "date" })
  publication_date: Date;

  @Column({ type: "varchar", length: 20, nullable: false })
  isbn: string;

  @Column({ type: "int" })
  page_count: number;

  @Column({ type: "varchar", length: 60 })
  language: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Livro;
