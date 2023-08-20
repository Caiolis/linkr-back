import { Router } from "express";
import { openUserPage, searchUser } from "../controllers/user.controller.js";
import { searchBar } from "../controllers/users.controller.js";
import { tokenvalidade } from "../middlewares/session.validaded.js";

const userRouter = Router();

userRouter.get("/user/:id", openUserPage);
// userRouter.get("/search", tokenvalidade, searchBar);
userRouter.get("/search", tokenvalidade, searchUser);

export default userRouter;