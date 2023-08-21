import bcrypt, { compare } from "bcrypt";
import { v4 as uuid } from "uuid";
import { getUser } from "../repositories/user.repository.js";
import { postSignUp } from "../repositories/auth.repository.js";
import { insertSession } from "../repositories/session.repository.js";

export async function signUp(req, res) {
    const { email, password, name, photo } = req.body;
    try {

        const usuarioExistente = await getUser(email);

        if (usuarioExistente.rows.length > 0) {
            return res.status(409).send({ message: "Este usuário já possui cadastro." });
        }

        const hash = await bcrypt.hash(password, 10);

        await postSignUp(email, hash, name, photo);

        res.sendStatus(201);

    } catch (error) {
        console.log("Erro ao fazer cadastro: ", error.message);
        res.status(500).send({ message: error.message });
    };
};

export async function signIn(req, res) {
    const { email, password } = req.body;
    try {

        const usuarioExistente = await getUser(email);

        if (usuarioExistente.rows.length === 0) {
            return res.status(404).send({ message: "Usuário não cadastrado." });
        };

        const isCorrectPassword = bcrypt.compareSync(password, usuarioExistente.rows[0].password);

        if (!isCorrectPassword) {
            return res.status(401).send({ message: "Senha incorreta." });
        };

        const token = uuid();
        const name = usuarioExistente.rows[0].name;
        const userId = usuarioExistente.rows[0].id;
        const photo = usuarioExistente.rows[0].photo;
        await insertSession(token, userId);

        res.status(200).send({ token: token, name: name, photo: photo });

    } catch (error) {
        console.log("Erro ao fazer login: ", error.message);
        res.status(500).send({ message: error.message });
    }
}