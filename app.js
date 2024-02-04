import express from "express";
import { findAvailablePort } from "./findAvailablePort.js";
import dotenv from "dotenv";
import mysql from "mysql2";

/*Como importar json:
import fs from "node:fs";
const movie = JSON.parse(fs.readFileSync("movie.json", "utf-8"));

o tambien creanddo require:
import {createRequire} from "node:module";
const require = createRequire(import.meta.url);
const movie = require("./movie.json");
*/

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

findAvailablePort(desiredPort).then((port) => {
  app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
  });
});
