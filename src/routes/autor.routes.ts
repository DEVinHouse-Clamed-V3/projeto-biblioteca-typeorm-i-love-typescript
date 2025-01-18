import { Router, Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Autor from "../entities/Autor";

const autorRoutes = Router();

const authorRepository = AppDataSource.getRepository(Autor);

autorRoutes.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, birthdate, biography, nacionality } = req.body;

    if (!name || !nacionality) {
      res.status(400).json({ message: "Nome e nacionalidade são obrigatórios" });
      return;
    }

    const author = authorRepository.create({
      name,
      birthdate,
      biography,
      nacionality,
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await authorRepository.save(author);

    res.status(201).json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar autor" });
  }
});

autorRoutes.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const authors = await authorRepository.find();
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar autores" });
  }
});

autorRoutes.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const author = await authorRepository.findOneBy({ id: Number(id) });

    if (!author) {
      res.status(404).json({ message: "Autor não encontrado" });
      return;
    }

    res.json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar autor" });
  }
});

autorRoutes.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, birthdate, biography, nacionality, active } = req.body;
    const author = await authorRepository.findOneBy({ id: Number(id) });

    if (!author) {
      res.status(404).json({ message: "Autor não encontrado" });
      return;
    }

    author.name = name || author.name;
    author.birthdate = birthdate || author.birthdate;
    author.biography = biography || author.biography;
    author.nacionality = nacionality || author.nacionality;
    author.active = active || author.active;
    author.updated_at = new Date();

    await authorRepository.save(author);
    const authorUpdated = await authorRepository.findOneBy({ id: Number(id) });

    res.json(authorUpdated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar autor" });
  }
});

autorRoutes.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const author = await authorRepository.findOneBy({ id: Number(id) });

    if (!author) {
      res.status(404).json({ message: "Autor não encontrado" });
      return;
    }

    await authorRepository.delete(author);
    res.json({ message: "Autor deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar autor" });
  }
});

export default autorRoutes;
