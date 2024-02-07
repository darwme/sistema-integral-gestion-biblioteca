import { Router } from "express";

const solicitanteRouter = Router();

solicitanteRouter.get("/:id", (req, res) => {
  res.send("Hello from user id");
});

export default solicitanteRouter;
