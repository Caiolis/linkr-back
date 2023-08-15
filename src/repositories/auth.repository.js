import { db } from "../database/database.js";

export async function postSignUp(email, hash, name, photo) {
    return await db.query(`INSERT INTO users (email, password, name, photo) VALUES ($1, $2, $3, $4);`, [email, hash, name, photo]);
};