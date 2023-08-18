import { Router } from "express";

// Schemas
import schemaValidation from "../middlewares/schemaValidation.js";
import { postSchema } from "../schemas/posts.schema.js";

// Middlewares
import { validateToken } from "../middlewares/session.middleware.js";

// Controllers
import { deletePost, publishPost, updatePost, getAllPosts } from "../controllers/posts.controller.js";

const postRouter = Router();

postRouter.post('/publish', schemaValidation(postSchema), validateToken, publishPost);
postRouter.get('/posts/all', getAllPosts)
postRouter.post('/delete-post/:id', validateToken, deletePost);
postRouter.post('/update-post/:id', validateToken, updatePost);

export default postRouter;