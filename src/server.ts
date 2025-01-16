import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./database/data-source";

import livroRoutes from "./routes/livro.routes";
import auditorioRoutes from "./routes/auditorio.routes";
import autorRoutes from "./routes/autor.routes";
import leitorRoutes from "./routes/leitor.routes";

import swaggerUi from "swagger-ui-express";

const swaggerDocument = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "API de Gerenciamento de Biblioteca",
    description: "Documentação da API para gerenciamento de livros, autores, leitores e auditórios.",
  },
  host: "localhost:3333",
  basePath: "/",
  schemes: ["http"],
  paths: {
    "/livros": {
      get: {
        tags: ["Livros"],
        summary: "Listar todos os livros",
        responses: {
          200: {
            description: "Lista de livros cadastrados",
          },
        },
      },
      post: {
        tags: ["Livros"],
        summary: "Criar um novo livro",
        parameters: [
          {
            in: "body",
            name: "body",
            description: "Dados do livro a ser criado",
            required: true,
            schema: {
              $ref: "#/definitions/Livro",
            },
          },
        ],
        responses: {
          201: {
            description: "Livro criado com sucesso",
          },
        },
      },
    },
    "/livros/{id}": {
      get: {
        tags: ["Livros"],
        summary: "Buscar livro por ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "ID do livro",
          },
        ],
        responses: {
          200: {
            description: "Detalhes do livro encontrado",
          },
          404: {
            description: "Livro não encontrado",
          },
        },
      },
      put: {
        tags: ["Livros"],
        summary: "Atualizar um livro existente",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "ID do livro",
          },
          {
            in: "body",
            name: "body",
            description: "Dados atualizados do livro",
            required: true,
            schema: {
              $ref: "#/definitions/Livro",
            },
          },
        ],
        responses: {
          204: {
            description: "Livro atualizado com sucesso",
          },
          404: {
            description: "Livro não encontrado",
          },
        },
      },
      delete: {
        tags: ["Livros"],
        summary: "Deletar um livro existente",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
            description: "ID do livro",
          },
        ],
        responses: {
          204: {
            description: "Livro deletado com sucesso",
          },
          404: {
            description: "Livro não encontrado",
          },
        },
      },
    },
  },
  definitions: {
    Livro: {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
        title: {
          type: "string",
        },
        description: {
          type: "string",
        },
        publication_date: {
          type: "string",
          format: "date",
        },
        isbn: {
          type: "string",
        },
        page_count: {
          type: "integer",
        },
        language: {
          type: "string",
        },
        created_at: {
          type: "string",
          format: "date-time",
        },
        updated_at: {
          type: "string",
          format: "date-time",
        },
      },
    },
  },
};

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/livros", livroRoutes);
app.use("/auditorios", auditorioRoutes);
app.use("/autores", autorRoutes);
app.use("/leitores", leitorRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com banco de dados estabelecida com sucesso!");
    app.listen(3333, () => {
      console.log("Servidor rodando em http://localhost:3333");
      console.log("Documentação disponível em http://localhost:3333/api-docs");
    });
  })
  .catch(() => {
    console.log("Erro ao conectar com o banco de dados");
  });

  app.get("/", (_req, res) => {
    res.send("API de gerenciamento de biblioteca está rodando! :D");
  });
  
