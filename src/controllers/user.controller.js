import { selectSession } from "../repositories/session.repository.js";
import { getUserPosts } from "../repositories/posts.repository.js";
import { getUsersBySearchBar } from "../repositories/user.repository.js";

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

export async function searchUser(req, res){

    const searchTerm = req.query.term;
    try {
        const users = await getUsersBySearchBar(searchTerm);
        const usersList = removeDuplicateUsers(users.rows);
        res.status(200).send(users.rows);
    } catch (error) {
        console.log("Erro ao buscar usuários: ", error.message);
        res.status(500).send({ message: error.message });
    };
}

function removeDuplicateUsers(usersList) {
    const idSet = new Set(); 
    const uniqueList = [];  
    for (const obj of usersList) {
      if (!idSet.has(obj.id)) {
        idSet.add(obj.id);
        uniqueList.push(obj);
      }
    }  
    return uniqueList;
}


