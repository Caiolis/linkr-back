import { db } from "../database/database.js";

export async function getUser(email) {
    return await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
};

export async function getUserById(id) {
    return await db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
};