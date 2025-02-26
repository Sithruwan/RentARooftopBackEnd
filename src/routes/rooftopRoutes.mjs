import { body } from "express-validator";
import { addRooftop, deleteRooftop, getAllRooftops, getRooftopById, updateRooftop } from "../controllers/rooftop.controller.mjs";
import { Router } from "express";
import { jwtAuthverifyMiddleware } from "../midlewares/jwtAuthMiddleware.mjs";

const roofTopRouter = Router();

roofTopRouter.post(
  "/",
  jwtAuthverifyMiddleware,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("pricePerHour").isNumeric().withMessage("Price must be a number"),
  ],
  addRooftop
);

roofTopRouter.get("/", getAllRooftops);
roofTopRouter.get("/:id", getRooftopById);
roofTopRouter.put("/:id", jwtAuthverifyMiddleware, updateRooftop);
roofTopRouter.delete("/:id", jwtAuthverifyMiddleware, deleteRooftop);

export default roofTopRouter;