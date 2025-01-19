import { Router } from "express";
import userRouter from "./userRoutes.mjs";

const indexRoutes = Router();

indexRoutes.use("/user",userRouter);



indexRoutes.get("/test", (req, res) => {
  res.json({ message: "Welcome to the API" });
});



export default indexRoutes;