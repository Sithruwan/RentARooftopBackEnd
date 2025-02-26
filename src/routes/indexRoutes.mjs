import { Router } from "express";
import userRouter from "./userRoutes.mjs";
import roofTopRouter from "./rooftopRoutes.mjs";

const indexRoutes = Router();

indexRoutes.use("/user",userRouter);
indexRoutes.use("/rooftop",roofTopRouter)



indexRoutes.get("/test", (req, res) => {
  res.json({ message: "Welcome to the API" });
});



export default indexRoutes;