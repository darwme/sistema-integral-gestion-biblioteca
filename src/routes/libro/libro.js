import { Router } from "express";
import { LibroController } from "../../controllers/libro.js";

export const librosRouter = Router();

librosRouter.get("/", LibroController.getAll);
librosRouter.post("/", LibroController.create);

librosRouter.get("/:id_libro", LibroController.getById);
librosRouter.delete("/:id_libro", LibroController.delete);
librosRouter.patch("/:id_libro", LibroController.update);
