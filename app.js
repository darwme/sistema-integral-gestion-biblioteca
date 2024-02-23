import express from "express";

import librosAPIRouter from "./src/routes/api/v1/libro.js";
import clienteAPIRouter from "./src/routes/api/v1/cliente.js";
import createError from "http-errors";
import { corsMiddleware } from "./src/middlewares/cors.js";
import connectDB from "./src/config/mondodb.js";

const app = express();
app.disable("x-powered-by");
connectDB();

app.use(express.json());
app.use(corsMiddleware());

app.get("/", (req, res) => {
  res.send("Working on /libros and /libros/:id");
});

app.use("/api/libros", librosAPIRouter);
app.use("/api/clientes", clienteAPIRouter);

const port = process.env.PORT ?? 3000;

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log("Usuario sin loguearse");
    res.redirect("/login");
  }
}

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.locals.title = "Error";

  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
