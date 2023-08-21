import { Router } from "express";
import { likesDELETE, likesGET, likesPOST, likesUSERSGET } from "../controllers/likes.controller.js";
import  { tokenvalidade } from "../middlewares/session.validaded.js"; 

const likes = Router();
likes.post('/likes', likesGET)
likes.post('/likes/send', likesPOST)
likes.post('/likes/undone',likesDELETE)
likes.get('/likes/users',likesUSERSGET)

export default likes;