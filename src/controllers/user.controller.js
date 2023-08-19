import { findUserById } from "../repositories/user.repository.js";
import { selectSession } from "../repositories/session.repository.js";

export async function getUserById(req, res){

    const { authorization } = req.headers; 
    const token = authorization?.replace("Bearer ", "");
    const { id } = req.params;

    try{
        const session = await selectSession(token);
        if (session.rowCount === 0){
            return res.status(404).send("Usuário não está logado!");
        }
        const user = await findUserById(id);
        res.status(200).send(user.rows[0]);
    }
    catch(error){
        res.status(500).send(error.message);
    }
}