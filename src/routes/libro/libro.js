import { Router } from "express";

const librosRouter = Router();

librosRouter.get("/", (req, res) => {
  res.send("Hello from book");
});

librosRouter.get("/:id", (req, res) => {
  res.send("Hello from book id");
});

export default librosRouter;
