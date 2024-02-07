import { Router } from "express";
import { createRequire } from "node:module";
import mysql from "mysql2/promise";
const require = createRequire(import.meta.url);

const books = require("../books.json");
const apiLibrosRouter = Router();

apiLibrosRouter.get("/", (req, res) => {
  res.json(books);
});

apiLibrosRouter.get("/:id", (req, res) => {
  const book = books.find((book) => book.id === req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

export default apiLibrosRouter;
