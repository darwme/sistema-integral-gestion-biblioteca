import { Router } from "express";

const authRouter = Router();

authRouter.get("/login", (req, res) => {
  res.send("Hello from login");
});

authRouter.get("/register", (req, res) => {
  res.send("Hello from register");
});

authRouter.get("/logout", (req, res) => {
  res.send("Hello from logout");
});

authRouter.get("/forgot-password", (req, res) => {
  res.send("Hello from forgot-password");
});

export default authRouter;
