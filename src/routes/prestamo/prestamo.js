import { Router } from "express";

const prestamoRouter = Router();

prestamoRouter.get("/", (req, res) => {
  res.send("Hello from prestamo");
});

prestamoRouter.get("/:id", (req, res) => {
  res.send("Hello from prestamo id");
});

export default prestamoRouter;
