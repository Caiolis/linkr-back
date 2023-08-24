import { Router } from "express";
import { openUserPage, searchUser, getAllUserPosts } from "../controllers/user.controller.js";
import { searchBar } from "../controllers/users.controller.js";
import { tokenvalidade } from "../middlewares/session.validaded.js";

const userRouter = Router();

userRouter.get("/user/:id", getAllUserPosts);
userRouter.get("/search", tokenvalidade, searchUser);

export default userRouter;