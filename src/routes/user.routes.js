import { Router } from "express";
import { openUserPage } from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.get("/user/:id", openUserPage);

export default userRouter; 