import { Router } from "express";
import { likesDELETE, likesGET, likesPOST, likesUSERSGET } from "../controllers/likes.controller.js";
import  { tokenvalidade } from "../middlewares/session.validaded.js"; 

const likes = Router();
likes.get('/likes', tokenvalidade, likesGET);
likes.post('/likes/send', tokenvalidade, likesPOST);
likes.post('/likes/undone', tokenvalidade, likesDELETE);
likes.get('/likes/users', tokenvalidade, likesUSERSGET);

export default likes;