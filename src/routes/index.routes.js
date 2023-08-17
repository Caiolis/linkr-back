import { Router } from "express";

// Routes
import authRouter from "./auth.routes.js";
import postRouter from "./posts.routes.js";
import likes from "./likes.routes.js";

const router = Router();

router.use(authRouter);
router.use(postRouter);
router.use(likes);

export default router;