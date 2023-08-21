import { getUsersBySearchBar } from "../repositories/user.repository.js";

export async function searchBar(req, res) {
    const searchTerm = req.query.term;
    try {
        const users = await getUsersBySearchBar(searchTerm);
        res.status(200).send(users.rows);
    } catch (error) {
        console.log("Erro ao buscar usuários: ", error.message);
        res.status(500).send({ message: error.message });
    };
};