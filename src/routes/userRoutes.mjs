import { Router } from "express";
import userController from "../controllers/user.controller.mjs";

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/refresh", userController.refreshToken);
userRouter.post("/logout", userController.logout);

export default userRouter;