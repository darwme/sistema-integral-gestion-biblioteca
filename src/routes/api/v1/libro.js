import { Router } from "express";
import LibroController from "../../../controllers/api/v1/libro.js";
const librosAPIRouter = Router();

librosAPIRouter.get("/", LibroController.getLibros);
librosAPIRouter.post("/", LibroController.createLibro);

librosAPIRouter.get("/:_id", LibroController.getLibrobyId);
librosAPIRouter.delete("/:_id", LibroController.deleteLibro);
librosAPIRouter.patch("/:_id", LibroController.updateLibro);

export default librosAPIRouter;
