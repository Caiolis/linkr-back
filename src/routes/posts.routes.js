import { Router } from "express";

// Schemas
import schemaValidation from "../middlewares/schemaValidation.js";
import { postSchema } from "../schemas/posts.schema.js";

// Middlewares
import { validateToken } from "../middlewares/session.middleware.js";
import { publishPost } from "../controllers/posts.controller.js";

const postRouter = Router();

postRouter.post('/publish', schemaValidation(postSchema), validateToken, publishPost);

export default postRouter;