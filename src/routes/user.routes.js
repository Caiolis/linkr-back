import { Router } from "express";
import { searchBar } from "../controllers/users.controller.js";
import { tokenvalidade } from "../middlewares/session.validaded.js";

const userRouter = Router();

userRouter.get("/search", tokenvalidade, searchBar);

export default userRouter;

