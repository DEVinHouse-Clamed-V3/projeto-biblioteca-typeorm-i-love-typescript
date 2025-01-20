
# Projeto: Gerenciamento de Biblioteca

Este é um projeto backend desenvolvido utilizando Typescript, TypeORM e Postgres. O sistema permite o gerenciamento de biblioteca, incluindo as  funcionalidades  para criar, listar, buscar, atualizar e deletar livros, autores, leitores e Auditório.

## Funcionalidades

    *Criação das migrations Autores, Livros, Leitores e Auditório
    *Criação da Entides para Autores, Livros, Leitores e Auditório
    *Criação das rotas com o CRUD para Autores, Livros, Leitores e Auditório.

## Tecnologias utilizadas:

*	Ambiente de execução: Node.js (>= 14.x)
*	Banco de dados: PostgreSQL & MySQL
*	Linguagem: Typescript com o TypeORM
*   Framework: Express.js e Swagger UI
  
## Professor
* Douglas Cavalcante

## Squad do projeto
* Autores: Gustavo Branquinho
* Livros: Brian Souza
* Leitores: Anderson Demetrio
* Auditório: Alexandro Oliveira
  
## Configuração Inicial

## Instalação:
1.	Clone o repositório:
```sh
git clone https://github.com/DEVinHouse-Clamed-V3/projeto-biblioteca-typeorm-i-love-typescript
````
2.	Acesse o diretório do projeto:
```sh
cd projeto-biblioteca-typeorm-i-love-typescript
```
3.	Instale as dependências:
```sh
*	npm install
    ou
*   yarn install

```

6.	Configure o banco de dados

    * Crie um banco de dados no Postgres.
    * Configure as credenciais no arquivo data-sorce.ts do projeto:
```sh
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "nome do usuário",
    password: "Senha",
    database: "nome do banco",
    synchronize: true,
    logging: true,
    entities: [Livro, Auditorio, Leitor, Autor],
    migrations: ["src/database/migrations/*.ts"]
```

7.	Execute as migrações para criar as tabelas no banco de dados:

```sh
npm run typeorm migration:run
# ou
yarn typeorm migration:run
```

O servidor estará rodando em http://localhost:3000 por padrão.

## Vídeo do projeto:

Autores
```sh

```
Livros
```sh
https://drive.google.com/file/d/1ArjfXdY9WczucVOv3021YmnkSZz8j5kC/view?usp=drive_link
```
 Leitores 
 ```sh

```
 Auditório
 ```sh
https://drive.google.com/drive/folders/1uj7s9qe_m_rzb76a7NJGnDGSjJG2X-Jn?usp=drive_link
```

## Licença

- Este projeto tem licença MIT. 
