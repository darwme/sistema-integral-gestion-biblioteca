import express from "express";
import { findAvailablePort } from "./findAvailablePort.js";
import { connection } from "./src/config/mysql/config.js";
import dotenv from "dotenv";
import mysql from "mysql2";
import apiLibrosRouter from "./src/routes/api/v1/books.js";
import librosRouter from "./src/routes/libro/libro.js";
import adminRouter from "./src/routes/admin/admin.js";
import userRouter from "./src/routes/user/user.js";
import prestamoRouter from "./src/routes/prestamo/prestamo.js";

const app = express();
app.disable("x-powered-by");

dotenv.config();

const desiredPort = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/libros", apiLibrosRouter);
app.use("/catalogo", librosRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/prestamo", prestamoRouter);

app.use((req, res) => {
  res.status(404).send("Error: Pagina no encontrada.");
});

findAvailablePort(desiredPort).then((port) => {
  app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
  });
});
