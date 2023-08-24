import { selectSession } from "../repositories/session.repository.js";
import { getUserPosts } from "../repositories/posts.repository.js";
import { getUsersBySearchBar } from "../repositories/user.repository.js";
import urlMetadata from "url-metadata";

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
        const newUserPosts = userPosts.rows.map(post => ({...post, requested_by: session.rows[0].user_id}))
        res.status(200).send(newUserPosts);
    }
    catch(error){
        console.log(error.message);
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

export async function getAllUserPosts(req, res){

    const { authorization } = req.headers; 
    const token = authorization?.replace("Bearer ", "");
    const { id } = req.params;

    try {

        const user_id = await selectSession(token);
        if (user_id.rowCount === 0){
            return res.status(404).send("Usuário não está logado!");
        }
        const query = await getUserPosts(id);
        const response = [];
        const newQuery = query.rows.map(post => ({...post, requested_by: user_id.rows[0].user_id}))
      
        for( let i = 0; i < query.rows.length; i++ ) {
          const metadados = await urlMetadata(query.rows[i].link);
    
          const metadataUrl = {
            title: metadados.title === '' ? metadados["og:title"] : metadados.title,
            url: metadados.url,
            image: metadados.image === '' ? metadados["og:image"] : metadados.image,
            description: metadados.description === '' ? metadados["og:description"] : metadados.description,
          };
          const post = { ...newQuery[i], metadataUrl };
          response.push(post);
        }
        res.status(200).send(response)
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
      };

}