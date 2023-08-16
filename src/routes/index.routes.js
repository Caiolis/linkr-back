import { Router } from "express";
import authRouter from "./auth.routes.js";
import likes from "./likes.routes.js";

const router = Router();

router.use(authRouter);
router.use(likes);

export default router;