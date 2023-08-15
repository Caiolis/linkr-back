import { Router } from "express";
import schemaValidation from "../middlewares/schemaValidation.js";
import signUpSchema from "../schemas/signUp.schema.js";
import  { signIn, signUp } from "../controllers/auth.controller.js";
import signInSchema from "../schemas/signIn.schema.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidation(signUpSchema), signUp);
authRouter.post("/signin", schemaValidation(signInSchema), signIn);

export default authRouter;