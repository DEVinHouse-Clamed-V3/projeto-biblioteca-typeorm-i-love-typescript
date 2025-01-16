import { Request, Response, Router } from "express";
import { AppDataSource } from "../database/data-source";
import Livro from "../entities/Livro";

const livroRoutes = Router();
const livroRepository = AppDataSource.getRepository(Livro);

livroRoutes.get("/", async (_req: Request, res: Response): Promise<Response> => {
  try {
    const livros = await livroRepository.find();
    return res.status(200).json(livros);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao listar livros", error });
  }
});

livroRoutes.get("/:id", async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const livro = await livroRepository.findOneBy({ id: parseInt(id) });

    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    return res.status(200).json(livro);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar livro", error });
  }
});

livroRoutes.post("/", async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description, publication_date, isbn, page_count, language } = req.body;

    const livro = livroRepository.create({
      title,
      description,
      publication_date,
      isbn,
      page_count,
      language,
    });

    await livroRepository.save(livro);
    return res.status(201).json(livro);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar livro", error });
  }
});

livroRoutes.put("/:id", async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, description, publication_date, isbn, page_count, language } = req.body;

    const livro = await livroRepository.findOneBy({ id: parseInt(id) });
    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    await livroRepository.update(id, {
      title,
      description,
      publication_date,
      isbn,
      page_count,
      language,
    });

    return res.status(204).json({ message: "Livro atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar livro", error });
  }
});

livroRoutes.delete("/:id", async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const livro = await livroRepository.findOneBy({ id: parseInt(id) });
    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    await livroRepository.delete(id);
    return res.status(204).json({ message: "Livro deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar livro", error });
  }
});

export default livroRoutes;
