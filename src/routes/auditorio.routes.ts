//Alexandro Oliveira

import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import Auditorium from "../entities/Auditorio";

const auditorioRoutes = Router();

/*  Criar um auditório 
Teste no postman  - metodo http: POST
http://localhost:{Porta}/auditorios
 {
    "name": "Auditório de Conferências",
    "capacity": 200,
    "location": "Avenida Central, 1010",
    "has_projector": true,
    "has_sound_system": true
  }

*/

auditorioRoutes.post("/", async (req, res) => {
  const { name, capacity, location, has_projector, has_sound_system } = req.body;

  const repository = AppDataSource.getRepository(Auditorium);

  const auditorio = repository.create({
    name,
    capacity,
    location,
    has_projector,
    has_sound_system,
  });

  await repository.save(auditorio);
  return res.status(201).json(auditorio);
});


/*  Buscar todos os auditórios 

Teste no postman- metodo http: GET
http://localhost:{Porta}/auditorios
*/

auditorioRoutes.get("/", async (req, res) => {
  const repository = AppDataSource.getRepository(Auditorium);

  const auditorios = await repository.find();
  return res.status(200).json(auditorios);
});

/*  Buscar um auditório específico por ID 

Teste no postman- metodo http: GET 
http://localhost:{Porta}/auditorios/{id}

*/
auditorioRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const repository = AppDataSource.getRepository(Auditorium);

  const auditorio = await repository.findOne({ where: { id: Number(id) } });
  if (!auditorio) {
    return res.status(404).json({ error: "Auditório não encontrado" });
  }
  return res.status(200).json(auditorio);
});

/*  Atualizar as informações de um auditório 

Teste no postman- metodo http: PUT 
http://localhost:{Porta}/auditorios/{id}

{
  "name": "Auditório teste"
}

*/
auditorioRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, capacity, location, has_projector, has_sound_system } = req.body;

  const repository = AppDataSource.getRepository(Auditorium);

  const auditorio = await repository.findOne({ where: { id: Number(id) } });
  if (!auditorio) {
    return res.status(404).json({ error: "Auditório não encontrado" });
  }

  repository.merge(auditorio, {
    name,
    capacity,
    location,
    has_projector,
    has_sound_system,
  });
  await repository.save(auditorio);
  return res.status(200).json(auditorio);
});

/*  Deletar um auditório 

Teste no postman- metodo http: DELETE 
http://localhost:{Porta}/auditorios/{id}
*/

auditorioRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const repository = AppDataSource.getRepository(Auditorium);

  const result = await repository.delete(id);
  if (result.affected === 0) {
    return res.status(404).json({ error: "Auditório não encontrado" });
  }

  return res.status(204).send();
});

export default auditorioRoutes;
