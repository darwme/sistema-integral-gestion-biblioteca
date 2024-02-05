import express from "express";
import { findAvailablePort } from "./findAvailablePort.js";
import dotenv from "dotenv";
import mysql from "mysql2";

/*Como importar json:
import fs from "node:fs";
const movie = JSON.parse(fs.readFileSync("movie.json", "utf-8"));
*/

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const books = require("./book/books.json");

const app = express();
app.disable("x-powered-by");

dotenv.config();

const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PlanetScale!");
connection.end();

const desiredPort = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.find((book) => book.id === req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

findAvailablePort(desiredPort).then((port) => {
  app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
  });
});
