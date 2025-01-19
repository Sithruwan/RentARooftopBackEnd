import { Router } from "express";

const indexRoutes = Router();

indexRoutes.get("/test", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

export default indexRoutes;