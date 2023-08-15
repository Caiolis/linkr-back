import { db } from "../database/database.js";

export async function getUser(email) {
    return await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
};