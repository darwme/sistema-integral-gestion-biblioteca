import { Router } from "express";

const adminRouter = Router();

adminRouter.get("/dashboard", (req, res) => {
  res.send("Hello from dashboard admin");
});

adminRouter.get("/users", (req, res) => {
  res.send("Hello from users admin page");
});

adminRouter.get("/libros", (req, res) => {
  res.send("Hello from libros admin page");
});

export default adminRouter;
