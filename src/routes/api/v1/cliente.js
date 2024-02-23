import { Router } from "express";

import UsuarioController from "../../../controllers/api/v1/usuario.js";

const clienteRouter = Router();

clienteRouter.get("/", UsuarioController.getUsuariosClientes);
clienteRouter.post("/", UsuarioController.createUsuarioCliente);

export default clienteRouter;
