import { Router } from "express";

// Routes
import authRouter from "./auth.routes.js";
<<<<<<< HEAD
import postRouter from "./posts.routes.js";
=======
import likes from "./likes.routes.js";
>>>>>>> LIKES

const router = Router();

router.use(authRouter);
<<<<<<< HEAD
router.use(postRouter);
=======
router.use(likes);
>>>>>>> LIKES

export default router;