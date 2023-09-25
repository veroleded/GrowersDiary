import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import userController from "../controllers/user-controller";

const userRouter = Router()

userRouter.get('', authMiddleware, userController.getUsers);

export default userRouter;