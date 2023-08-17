import { Router } from "express";

// Schemas
import schemaValidation from "../middlewares/schemaValidation.js";
import { postSchema } from "../schemas/posts.schema.js";

// Middlewares
import { validateToken } from "../middlewares/session.middleware.js";

// Controllers
import { getAllPosts, publishPost } from "../controllers/posts.controller.js";


const postRouter = Router();

postRouter.post('/publish', schemaValidation(postSchema), validateToken, publishPost);
postRouter.get('/posts/all', getAllPosts)

export default postRouter;