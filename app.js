import express from "express";

import { librosRouter } from "./src/routes/libro/libro.js";
import { corsMiddleware } from "./src/middlewares/cors.js";

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(corsMiddleware());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/libros", librosRouter);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
