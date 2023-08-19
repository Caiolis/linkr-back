import { selectSession } from "../repositories/session.repository.js";
import { getUserPosts } from "../repositories/posts.repository.js";

export async function openUserPage(req, res){

    const { authorization } = req.headers; 
    const token = authorization?.replace("Bearer ", "");
    const { id } = req.params;

    try{
        const session = await selectSession(token);
        if (session.rowCount === 0){
            return res.status(404).send("Usuário não está logado!");
        }
        const userPosts = await getUserPosts(id);
        res.status(200).send(userPosts.rows);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}
