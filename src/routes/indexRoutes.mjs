import { Router } from "express";
import userRouter from "./userRoutes.mjs";
import roofTopRouter from "./rooftopRoutes.mjs";
import bookingRouter from "./bookingRoutes.mjs";

const indexRoutes = Router();

indexRoutes.use("/user",userRouter);
indexRoutes.use("/rooftop",roofTopRouter)
indexRoutes.use("/booking",bookingRouter)


indexRoutes.get("/test", (req, res) => {
  res.json({ message: "Welcome to the API" });
});



export default indexRoutes;